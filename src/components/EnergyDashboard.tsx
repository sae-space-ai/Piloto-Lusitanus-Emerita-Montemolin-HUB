import { useState, useMemo } from 'react';
import {
  AreaChart, Area, LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  PieChart, Pie, Cell
} from 'recharts';

// Datos simulados de 24h
const generateHourlyData = () => {
  const data = [];
  for (let i = 0; i < 24; i++) {
    const hour = i;
    const baseConsumption = 350 + Math.sin((hour - 14) * Math.PI / 12) * 180;
    const solarProduction = hour >= 6 && hour <= 20
      ? Math.max(0, Math.sin((hour - 6) * Math.PI / 14) * 420)
      : 0;
    const gridConsumption = Math.max(0, baseConsumption - solarProduction * 0.7);
    const price = 0.05 + Math.sin((hour - 15) * Math.PI / 12) * 0.04 + Math.random() * 0.01;

    data.push({
      hour: `${hour.toString().padStart(2, '0')}:00`,
      consumo: Math.round(baseConsumption),
      solar: Math.round(solarProduction),
      red: Math.round(gridConsumption),
      precio: +(price.toFixed(4)),
      ia: Math.round(baseConsumption * (0.85 + Math.random() * 0.1)),
    });
  }
  return data;
};

const weeklyData = [
  { day: 'Lun', real: 8420, optimizado: 7180, ahorro: 1240 },
  { day: 'Mar', real: 8650, optimizado: 7350, ahorro: 1300 },
  { day: 'Mié', real: 8380, optimizado: 7120, ahorro: 1260 },
  { day: 'Jue', real: 8710, optimizado: 7400, ahorro: 1310 },
  { day: 'Vie', real: 8540, optimizado: 7260, ahorro: 1280 },
  { day: 'Sáb', real: 6200, optimizado: 5270, ahorro: 930 },
  { day: 'Dom', real: 5800, optimizado: 4930, ahorro: 870 },
];

const radarData = [
  { metrica: 'Eficiencia', valor: 87, fullMark: 100 },
  { metrica: 'Renovable', valor: 72, fullMark: 100 },
  { metrica: 'Flexibilidad', valor: 65, fullMark: 100 },
  { metrica: 'Coste', valor: 78, fullMark: 100 },
  { metrica: 'Fiabilidad', valor: 91, fullMark: 100 },
  { metrica: 'Sostenibilidad', valor: 83, fullMark: 100 },
];

const pieData = [
  { name: 'Solar', value: 42, color: '#f59e0b' },
  { name: 'Eólica', value: 18, color: '#3b82f6' },
  { name: 'Red (mix)', value: 32, color: '#6b7280' },
  { name: 'Batería', value: 8, color: '#10b981' },
];

const alerts = [
  { type: 'warning', msg: 'Pico de demanda previsto 14:00-16:00. Carga diferible recomendada.', time: 'hace 12 min' },
  { type: 'success', msg: 'Optimización completada: -14.7% coste energético hoy.', time: 'hace 1 h' },
  { type: 'info', msg: 'Precio horario bajo detectado: 03:00-06:00 (0.042 €/kWh).', time: 'hace 2 h' },
  { type: 'success', msg: 'Autoconsumo renovable: 72% (objetivo: 70%).', time: 'hace 3 h' },
];

export default function EnergyDashboard() {
  const [hourlyData] = useState(generateHourlyData);
  const [selectedMetric, setSelectedMetric] = useState<'consumo' | 'precio' | 'ia'>('consumo');
  const [autoRefresh, setAutoRefresh] = useState(true);

  const metrics = useMemo(() => {
    const totalConsumo = hourlyData.reduce((s, d) => s + d.consumo, 0);
    const totalSolar = hourlyData.reduce((s, d) => s + d.solar, 0);
    const avgPrecio = hourlyData.reduce((s, d) => s + d.precio, 0) / 24;
    const maxDemanda = Math.max(...hourlyData.map(d => d.consumo));
    const ahorroIA = hourlyData.reduce((s, d) => s + (d.consumo - d.ia), 0);
    const autoconsumo = totalSolar / totalConsumo * 100;

    return {
      totalConsumo: (totalConsumo / 1000).toFixed(1),
      totalSolar: (totalSolar / 1000).toFixed(1),
      avgPrecio: avgPrecio.toFixed(4),
      maxDemanda,
      ahorroIA: (ahorroIA / 1000).toFixed(2),
      autoconsumo: autoconsumo.toFixed(0),
      costeHoy: (totalConsumo * avgPrecio / 1000).toFixed(0),
      co2: ((totalConsumo - totalSolar * 0.7) * 0.000233).toFixed(2),
    };
  }, [hourlyData]);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Top bar */}
      <div className="bg-gray-900 border-b border-gray-800 px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h1 className="text-sm font-bold text-white leading-tight">Energy Intelligence Hub</h1>
            <p className="text-xs text-gray-400 leading-tight">Monitorización y optimización en tiempo real</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 text-xs text-gray-400">
            <div className={`w-2 h-2 rounded-full ${autoRefresh ? 'bg-emerald-400 animate-pulse' : 'bg-gray-600'}`}></div>
            <span>{autoRefresh ? 'En vivo' : 'Pausado'}</span>
          </div>
          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className="px-3 py-1.5 text-xs bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 transition-colors"
          >
            {autoRefresh ? '⏸ Pausar' : '▶ Activar'}
          </button>
          <button
            onClick={() => window.print()}
            className="hidden md:block px-3 py-1.5 text-xs bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 transition-colors"
          >
            📊 Exportar
          </button>
        </div>
      </div>

      <div className="p-4 md:p-6 max-w-[1600px] mx-auto space-y-6">
        {/* KPIs principales */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <KPICard
            label="Consumo hoy"
            value={`${metrics.totalConsumo} MWh`}
            change="-3.2%"
            positive={true}
            icon="⚡"
          />
          <KPICard
            label="Generación solar"
            value={`${metrics.totalSolar} MWh`}
            change="+12.4%"
            positive={true}
            icon="☀️"
          />
          <KPICard
            label="Precio medio"
            value={`${metrics.avgPrecio} €/kWh`}
            change="-8.1%"
            positive={true}
            icon="💶"
          />
          <KPICard
            label="Autoconsumo"
            value={`${metrics.autoconsumo}%`}
            change="+5pp"
            positive={true}
            icon="🔄"
          />
        </div>

        {/* Segunda fila KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <KPICard
            label="Ahorro IA"
            value={`${metrics.ahorroIA} MWh`}
            change="+14.7%"
            positive={true}
            icon="🧠"
            accent="purple"
          />
          <KPICard
            label="Coste energético"
            value={`${metrics.costeHoy} €`}
            change="-6.3%"
            positive={true}
            icon="📉"
            accent="blue"
          />
          <KPICard
            label="Pico demanda"
            value={`${metrics.maxDemanda} kW`}
            change="14:30h"
            positive={false}
            icon="📈"
            accent="amber"
          />
          <KPICard
            label="CO₂ evitado"
            value={`${metrics.co2} t`}
            change="+18%"
            positive={true}
            icon="🌱"
            accent="emerald"
          />
        </div>

        {/* Gráfico principal */}
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-4 md:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <div>
              <h2 className="text-lg font-semibold text-white">Perfil de carga — últimas 24h</h2>
              <p className="text-xs text-gray-400">Consumo, generación y optimización IA</p>
            </div>
            <div className="flex gap-1 bg-gray-800 rounded-lg p-1">
              {(['consumo', 'precio', 'ia'] as const).map(m => (
                <button
                  key={m}
                  onClick={() => setSelectedMetric(m)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                    selectedMetric === m
                      ? 'bg-emerald-500 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {m === 'consumo' ? 'Consumo' : m === 'precio' ? 'Precio' : 'IA'}
                </button>
              ))}
            </div>
          </div>
          <div className="h-72 md:h-80">
            <ResponsiveContainer width="100%" height="100%">
              {selectedMetric === 'consumo' ? (
                <AreaChart data={hourlyData}>
                  <defs>
                    <linearGradient id="colorConsumo" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorSolar" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="hour" stroke="#6b7280" fontSize={11} />
                  <YAxis stroke="#6b7280" fontSize={11} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="consumo" stroke="#f59e0b" fill="url(#colorConsumo)" strokeWidth={2} name="Consumo (kW)" />
                  <Area type="monotone" dataKey="solar" stroke="#10b981" fill="url(#colorSolar)" strokeWidth={2} name="Solar (kW)" />
                  <Line type="monotone" dataKey="red" stroke="#6b7280" strokeWidth={1.5} strokeDasharray="4 4" name="Red (kW)" />
                </AreaChart>
              ) : selectedMetric === 'precio' ? (
                <AreaChart data={hourlyData}>
                  <defs>
                    <linearGradient id="colorPrecio" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="hour" stroke="#6b7280" fontSize={11} />
                  <YAxis stroke="#6b7280" fontSize={11} domain={['auto', 'auto']} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                    labelStyle={{ color: '#fff' }}
                    formatter={(value: number) => [`${value.toFixed(4)} €/kWh`, 'Precio']}
                  />
                  <Area type="monotone" dataKey="precio" stroke="#3b82f6" fill="url(#colorPrecio)" strokeWidth={2} />
                </AreaChart>
              ) : (
                <LineChart data={hourlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="hour" stroke="#6b7280" fontSize={11} />
                  <YAxis stroke="#6b7280" fontSize={11} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Line type="monotone" dataKey="consumo" stroke="#f59e0b" strokeWidth={2} name="Real (kW)" />
                  <Line type="monotone" dataKey="ia" stroke="#a855f7" strokeWidth={2} name="IA optimizado (kW)" />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Fila intermedia: Weekly + Radar + Pie */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Ahorro semanal */}
          <div className="bg-gray-900 rounded-2xl border border-gray-800 p-4 md:p-6">
            <h3 className="text-sm font-semibold text-white mb-1">Ahorro semanal</h3>
            <p className="text-xs text-gray-400 mb-4">Real vs optimizado por IA</p>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="day" stroke="#6b7280" fontSize={11} />
                  <YAxis stroke="#6b7280" fontSize={11} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Bar dataKey="real" fill="#6b7280" radius={[4, 4, 0, 0]} name="Real (kWh)" />
                  <Bar dataKey="optimizado" fill="#10b981" radius={[4, 4, 0, 0]} name="Optimizado (kWh)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs">
              <span className="text-gray-400">Total ahorrado</span>
              <span className="text-emerald-400 font-bold">
                {(weeklyData.reduce((s, d) => s + d.ahorro, 0) / 1000).toFixed(1)} MWh
              </span>
            </div>
          </div>

          {/* Radar de performance */}
          <div className="bg-gray-900 rounded-2xl border border-gray-800 p-4 md:p-6">
            <h3 className="text-sm font-semibold text-white mb-1">Índice de performance</h3>
            <p className="text-xs text-gray-400 mb-4">6 dimensiones clave</p>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#374151" />
                  <PolarAngleAxis dataKey="metrica" stroke="#9ca3af" fontSize={10} />
                  <PolarRadiusAxis stroke="#374151" fontSize={9} />
                  <Radar name="Score" dataKey="valor" stroke="#10b981" fill="#10b981" fillOpacity={0.3} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs">
              <span className="text-gray-400">Score global</span>
              <span className="text-emerald-400 font-bold">
                {(radarData.reduce((s, d) => s + d.valor, 0) / radarData.length).toFixed(0)}/100
              </span>
            </div>
          </div>

          {/* Mix energético */}
          <div className="bg-gray-900 rounded-2xl border border-gray-800 p-4 md:p-6">
            <h3 className="text-sm font-semibold text-white mb-1">Mix energético actual</h3>
            <p className="text-xs text-gray-400 mb-4">Distribución de fuentes</p>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                    formatter={(value: number) => [`${value}%`, '']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {pieData.map(d => (
                <div key={d.name} className="flex items-center gap-2 text-xs">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }}></div>
                  <span className="text-gray-400">{d.name}</span>
                  <span className="text-white font-medium ml-auto">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Fila inferior: Alertas + Tabla de horas óptimas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {/* Alertas IA */}
          <div className="bg-gray-900 rounded-2xl border border-gray-800 p-4 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold text-white">Alertas inteligentes</h3>
                <p className="text-xs text-gray-400">Recomendaciones automáticas</p>
              </div>
              <span className="px-2 py-1 text-xs bg-emerald-500/20 text-emerald-400 rounded-full border border-emerald-500/30">
                {alerts.length} activas
              </span>
            </div>
            <div className="space-y-2">
              {alerts.map((alert, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-lg border ${
                    alert.type === 'warning'
                      ? 'bg-amber-500/5 border-amber-500/20'
                      : alert.type === 'success'
                      ? 'bg-emerald-500/5 border-emerald-500/20'
                      : 'bg-blue-500/5 border-blue-500/20'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <span className="text-sm mt-0.5">
                      {alert.type === 'warning' ? '⚠️' : alert.type === 'success' ? '✅' : 'ℹ️'}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-200">{alert.msg}</p>
                      <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tabla horas óptimas */}
          <div className="bg-gray-900 rounded-2xl border border-gray-800 p-4 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold text-white">Ventanas óptimas de carga</h3>
                <p className="text-xs text-gray-400">Recomendación IA para próximas 24h</p>
              </div>
              <span className="px-2 py-1 text-xs bg-purple-500/20 text-purple-400 rounded-full border border-purple-500/30">
                IA
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-gray-400 border-b border-gray-800">
                    <th className="text-left py-2 font-medium">Ventana</th>
                    <th className="text-right py-2 font-medium">Precio</th>
                    <th className="text-right py-2 font-medium">% Renovable</th>
                    <th className="text-right py-2 font-medium">Prioridad</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { ventana: '02:00 – 06:00', precio: '0.042 €/kWh', ren: '38%', prio: 'Alta', color: 'emerald' },
                    { ventana: '06:00 – 09:00', precio: '0.058 €/kWh', ren: '52%', prio: 'Media', color: 'blue' },
                    { ventana: '12:00 – 15:00', precio: '0.051 €/kWh', ren: '89%', prio: 'Alta', color: 'emerald' },
                    { ventana: '15:00 – 18:00', precio: '0.087 €/kWh', ren: '64%', prio: 'Baja', color: 'amber' },
                    { ventana: '22:00 – 01:00', precio: '0.048 €/kWh', ren: '41%', prio: 'Media', color: 'blue' },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-gray-800/50">
                      <td className="py-2.5 text-gray-200">{row.ventana}</td>
                      <td className="py-2.5 text-right text-gray-300">{row.precio}</td>
                      <td className="py-2.5 text-right text-gray-300">{row.ren}</td>
                      <td className="py-2.5 text-right">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                          row.color === 'emerald' ? 'bg-emerald-500/20 text-emerald-400' :
                          row.color === 'blue' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-amber-500/20 text-amber-400'
                        }`}>
                          {row.prio}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500 py-4 border-t border-gray-800">
          <p>Energy Intelligence Hub · Monitorización y optimización energética con IA</p>
          <p className="mt-1">Datos simulados con fines demostrativos · {new Date().toLocaleDateString('es-ES')}</p>
        </div>
      </div>
    </div>
  );
}

function KPICard({
  label, value, change, positive, icon, accent = 'emerald'
}: {
  label: string;
  value: string;
  change: string;
  positive: boolean;
  icon: string;
  accent?: string;
}) {
  const accentColors: Record<string, string> = {
    emerald: 'from-emerald-500/10 to-emerald-500/5 border-emerald-500/20',
    blue: 'from-blue-500/10 to-blue-500/5 border-blue-500/20',
    amber: 'from-amber-500/10 to-amber-500/5 border-amber-500/20',
    purple: 'from-purple-500/10 to-purple-500/5 border-purple-500/20',
  };

  return (
    <div className={`bg-gradient-to-br ${accentColors[accent] || accentColors.emerald} border rounded-xl p-3 md:p-4`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-gray-400">{label}</span>
        <span className="text-lg">{icon}</span>
      </div>
      <p className="text-xl md:text-2xl font-bold text-white">{value}</p>
      <p className={`text-xs mt-1 ${positive ? 'text-emerald-400' : 'text-amber-400'}`}>
        {positive ? '↑' : '↓'} {change}
      </p>
    </div>
  );
}
