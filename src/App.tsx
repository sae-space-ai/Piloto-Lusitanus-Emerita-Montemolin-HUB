import { useState } from 'react';
import EnergyDashboard from './components/EnergyDashboard';
import EnergySimulator from './components/EnergySimulator';
import OpportunityEvaluator from './components/OpportunityEvaluator';
import EconomicModel from './components/EconomicModel';

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<'dashboard' | 'piloto'>('dashboard');

  const handleExport = () => {
    const resumen = `
RESUMEN — Energy Intelligence Hub
===================================
Fecha: ${new Date().toLocaleDateString('es-ES')}

CAPACIDADES DEMOSTRADAS:
• Monitorización energética en tiempo real
• Optimización de cargas con IA
• Predicción de demanda y precio
• Análisis de mix renovable
• Alertas y recomendaciones automáticas
• Simulación de escenarios

MÉTRICAS CLAVE:
• Ahorro energético estimado: 12-18%
• Reducción de coste: 8-15%
• Aumento autoconsumo: +5-10pp
• Reducción CO₂: 15-25%

PLAN DE VALIDACIÓN:
• Fase 1 (30 días): Descubrimiento y métricas
• Fase 2 (30 días): Demostración con datos reales
• Fase 3 (30 días): Evaluación y decisión

AVISO:
Propuesta independiente. Datos simulados con fines demostrativos.
    `.trim();

    const blob = new Blob([resumen], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'energy-intelligence-hub-resumen.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Aviso de transparencia - siempre visible pero discreto */}
      <div className="bg-gray-900 border-b border-gray-800 py-1.5 px-4 no-print">
        <p className="text-[10px] text-gray-400 text-center">
          Propuesta independiente · Datos simulados · Sin aprobación ni patrocinio de terceros
        </p>
      </div>

      {/* Header compacto */}
      <header className="sticky top-0 z-50 bg-gray-950/95 backdrop-blur-sm border-b border-gray-800 no-print">
        <div className="max-w-[1600px] mx-auto px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xs font-bold text-white leading-tight">MONTEMOLIN-AIHUB</h1>
              <p className="text-[10px] text-gray-400 leading-tight">Energy Intelligence Hub</p>
            </div>
          </div>

          {/* Toggle principal */}
          <div className="hidden md:flex items-center gap-1 bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setActiveSection('dashboard')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeSection === 'dashboard'
                  ? 'bg-emerald-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              ⚡ Herramienta
            </button>
            <button
              onClick={() => setActiveSection('piloto')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeSection === 'piloto'
                  ? 'bg-emerald-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              📋 Contexto
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={handleExport}
              className="hidden sm:block px-3 py-1.5 text-xs font-medium text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 rounded-lg transition-colors border border-emerald-500/20">
              📥 Exportar
            </button>
            <button onClick={() => window.print()}
              className="hidden sm:block px-3 py-1.5 text-xs font-medium text-gray-300 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors border border-gray-700">
              🖨️
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-gray-400 hover:text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-800 bg-gray-950 px-4 py-3">
            <div className="flex gap-2 mb-3">
              <button
                onClick={() => { setActiveSection('dashboard'); setMenuOpen(false); }}
                className={`flex-1 px-3 py-2 text-xs font-medium rounded-lg transition-colors ${
                  activeSection === 'dashboard' ? 'bg-emerald-500 text-white' : 'bg-gray-800 text-gray-400'
                }`}
              >
                ⚡ Herramienta
              </button>
              <button
                onClick={() => { setActiveSection('piloto'); setMenuOpen(false); }}
                className={`flex-1 px-3 py-2 text-xs font-medium rounded-lg transition-colors ${
                  activeSection === 'piloto' ? 'bg-emerald-500 text-white' : 'bg-gray-800 text-gray-400'
                }`}
              >
                📋 Contexto
              </button>
            </div>
            <div className="flex gap-2">
              <button onClick={handleExport}
                className="flex-1 px-3 py-2 text-xs font-medium text-emerald-400 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                📥 Exportar
              </button>
              <button onClick={() => window.print()}
                className="flex-1 px-3 py-2 text-xs font-medium text-gray-300 bg-gray-800 rounded-lg border border-gray-700">
                🖨️ Imprimir
              </button>
            </div>
          </div>
        )}
      </header>

      {/* CONTENIDO PRINCIPAL */}
      {activeSection === 'dashboard' ? (
        <EnergyDashboard />
      ) : (
        <div className="bg-white">
          {/* Intro directa */}
          <section className="py-12 px-4 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                IA + Energía = Resultados medibles
              </h2>
              <p className="text-gray-400 text-sm max-w-2xl mx-auto">
                Lo que ves en la herramienta es lo que hacemos. Sin promesas, sin teoría.
                Datos simulados que demuestran capacidades reales aplicables a cualquier instalación industrial o de datos.
              </p>
            </div>
          </section>

          {/* Simulador */}
          <div className="bg-white">
            <div className="py-10 px-4">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Simulador de escenarios</h2>
                  <p className="text-gray-500 text-sm">Ajusta variables. Ve resultados. Decide con datos.</p>
                </div>
              </div>
            </div>
          </div>
          <EnergySimulator />

          {/* Plan */}
          <section className="py-12 px-4 bg-gradient-to-br from-primary-50 to-blue-50">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">90 días para decidir</h2>
                <p className="text-gray-500 text-sm">Sin compromisos largos. Resultados en semanas.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { fase: '01', titulo: 'Descubrimiento', dias: 'Días 1-30', desc: 'Mapeo de necesidades, datos y métricas de éxito.', color: 'emerald' },
                  { fase: '02', titulo: 'Demostración', dias: 'Días 31-60', desc: 'Demostradores funcionales con datos reales o simulados.', color: 'blue' },
                  { fase: '03', titulo: 'Decisión', dias: 'Días 61-90', desc: 'Evaluación económica y dossier go/no-go.', color: 'purple' },
                ].map(item => (
                  <div key={item.fase} className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                        item.color === 'emerald' ? 'bg-emerald-100 text-emerald-700' :
                        item.color === 'blue' ? 'bg-blue-100 text-blue-700' :
                        'bg-purple-100 text-purple-700'
                      }`}>{item.fase}</span>
                      <span className="text-xs text-gray-500">{item.dias}</span>
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-1">{item.titulo}</h3>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Evaluador */}
          <OpportunityEvaluator />

          {/* Modelo económico */}
          <EconomicModel />

          {/* Energía Montemolín */}
          <section className="py-12 px-4 bg-white">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Escenario energético</h2>
                <p className="text-gray-500 text-sm">Prefactibilidad RURAL-GOV-ENERGY</p>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 border border-emerald-200">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-emerald-700">25 MWp</p>
                    <p className="text-xs text-emerald-600">Potencia</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-emerald-700">41.250</p>
                    <p className="text-xs text-emerald-600">MWh/año</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-emerald-700">~1.650</p>
                    <p className="text-xs text-emerald-600">Horas equiv.</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-emerald-700">18.9%</p>
                    <p className="text-xs text-emerald-600">Factor capacidad</p>
                  </div>
                </div>
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-xs text-amber-800">
                    Escenario hipotético. No se afirma existencia de suministro, PPA, permisos, conexión o generación disponible.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Cooperación europea */}
          <section className="py-12 px-4 bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Marco europeo</h2>
                <p className="text-gray-500 text-sm">Programa de financiación relevante</p>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-blue-200 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                    <p className="text-xs text-blue-600 mb-1">Entidad</p>
                    <p className="text-sm font-semibold text-blue-900">MONTEMOLIN-AIHUB</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                    <p className="text-xs text-blue-600 mb-1">Programa</p>
                    <p className="text-sm font-semibold text-blue-900">I3-2026-INV2a</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                    <p className="text-xs text-blue-600 mb-1">Referencia</p>
                    <p className="text-sm font-semibold text-blue-900">SEP-211421662</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                  <p className="text-xs text-amber-800">Documentación en revisión. Sin adjudicación ni participación confirmada de terceros.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Transparencia */}
          <section className="py-12 px-4 bg-gray-900">
            <div className="max-w-3xl mx-auto text-center">
              <div className="p-6 bg-gray-800 rounded-2xl border border-gray-700">
                <p className="text-sm text-gray-200 mb-4 font-medium">
                  Propuesta independiente. FRV y Lusitanus no han aprobado ni patrocinado este piloto.
                </p>
                <div className="text-xs text-gray-400 space-y-1">
                  <p>• Datos simulados con fines demostrativos</p>
                  <p>• Contexto basado en anuncios públicos (planificación, no operación)</p>
                  <p>• Simuladores con valores hipotéticos editables</p>
                  <p>• Sin logos ni marcas de terceros</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4">
                MONTEMOLIN-AIHUB · {new Date().getFullYear()}
              </p>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
