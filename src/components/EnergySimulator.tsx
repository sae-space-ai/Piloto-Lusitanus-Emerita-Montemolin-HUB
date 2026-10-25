import { useState, useMemo } from 'react';

export default function EnergySimulator() {
  const [consumo, setConsumo] = useState(500); // kW
  const [horasOp, setHorasOp] = useState(8760); // horas/año
  const [costeEnergia, setCosteEnergia] = useState(0.08); // €/kWh
  const [porcRenovable, setPorcRenovable] = useState(70); // %
  const [flexibilidad, setFlexibilidad] = useState(30); // %
  const [costeComputacional, setCosteComputacional] = useState(0.15); // €/kWh computación

  const resultados = useMemo(() => {
    const consumoAnual = consumo * horasOp; // kWh/año
    const costeTotal = consumoAnual * costeEnergia; // €/año
    const energiaRenovable = consumoAnual * (porcRenovable / 100); // kWh/año renovable
    const costeRenovable = energiaRenovable * costeEnergia * 0.85; // descuento renovable
    const costeNoRenovable = (consumoAnual - energiaRenovable) * costeEnergia;
    const costeTotalAjustado = costeRenovable + costeNoRenovable;
    const ahorroFlexibilidad = costeTotalAjustado * (flexibilidad / 100) * 0.2; // 20% ahorro por flexibilidad
    const costeFinal = costeTotalAjustado - ahorroFlexibilidad;
    const costeComputo = consumoAnual * (costeComputacional / costeEnergia) * 0.3; // 30% es coste computacional

    return {
      consumoAnual,
      costeTotal,
      energiaRenovable,
      costeTotalAjustado,
      ahorroFlexibilidad,
      costeFinal,
      costeComputo,
      co2Evitado: energiaRenovable * 0.000233 // tCO2/kWh factor España
    };
  }, [consumo, horasOp, costeEnergia, porcRenovable, flexibilidad, costeComputacional]);

  return (
    <section id="simulador" className="py-16 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Simulador Energético</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Herramienta interactiva para estimar escenarios energéticos. <strong>Todos los valores son hipotéticos</strong> y no representan datos operativos de Lusitanus.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Controles */}
            <div className="space-y-5">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Variables de entrada</h3>
              
              <div>
                <label className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                  <span>Potencia consumida</span>
                  <span className="text-primary-600">{consumo} kW</span>
                </label>
                <input type="range" min="50" max="2000" step="10" value={consumo}
                  onChange={e => setConsumo(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600" />
              </div>

              <div>
                <label className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                  <span>Horas de operación/año</span>
                  <span className="text-primary-600">{horasOp.toLocaleString()} h</span>
                </label>
                <input type="range" min="1000" max="8760" step="100" value={horasOp}
                  onChange={e => setHorasOp(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600" />
              </div>

              <div>
                <label className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                  <span>Coste energía</span>
                  <span className="text-primary-600">{(costeEnergia * 100).toFixed(1)} c€/kWh</span>
                </label>
                <input type="range" min="0.03" max="0.20" step="0.005" value={costeEnergia}
                  onChange={e => setCosteEnergia(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600" />
              </div>

              <div>
                <label className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                  <span>% Renovable</span>
                  <span className="text-primary-600">{porcRenovable}%</span>
                </label>
                <input type="range" min="0" max="100" step="5" value={porcRenovable}
                  onChange={e => setPorcRenovable(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600" />
              </div>

              <div>
                <label className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                  <span>Flexibilidad de cargas</span>
                  <span className="text-primary-600">{flexibilidad}%</span>
                </label>
                <input type="range" min="0" max="80" step="5" value={flexibilidad}
                  onChange={e => setFlexibilidad(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600" />
              </div>

              <div>
                <label className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                  <span>Coste computacional (€/kWh)</span>
                  <span className="text-primary-600">{costeComputacional.toFixed(3)} €/kWh</span>
                </label>
                <input type="range" min="0.05" max="0.30" step="0.01" value={costeComputacional}
                  onChange={e => setCosteComputacional(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600" />
              </div>
            </div>

            {/* Resultados */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Resultados estimados</h3>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                  <p className="text-xs text-blue-600 font-medium">Consumo anual</p>
                  <p className="text-xl font-bold text-blue-900">{(resultados.consumoAnual / 1000).toFixed(0)} MWh</p>
                </div>
                <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                  <p className="text-xs text-green-600 font-medium">Energía renovable</p>
                  <p className="text-xl font-bold text-green-900">{(resultados.energiaRenovable / 1000).toFixed(0)} MWh</p>
                </div>
                <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
                  <p className="text-xs text-amber-600 font-medium">Coste total</p>
                  <p className="text-xl font-bold text-amber-900">{(resultados.costeTotal / 1000).toFixed(0)} k€</p>
                </div>
                <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
                  <p className="text-xs text-purple-600 font-medium">Coste con flexibilidad</p>
                  <p className="text-xl font-bold text-purple-900">{(resultados.costeFinal / 1000).toFixed(0)} k€</p>
                </div>
                <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                  <p className="text-xs text-emerald-600 font-medium">Ahorro flexibilidad</p>
                  <p className="text-xl font-bold text-emerald-900">{(resultados.ahorroFlexibilidad / 1000).toFixed(1)} k€/año</p>
                </div>
                <div className="bg-teal-50 rounded-xl p-4 border border-teal-100">
                  <p className="text-xs text-teal-600 font-medium">CO₂ evitado</p>
                  <p className="text-xl font-bold text-teal-900">{resultados.co2Evitado.toFixed(1)} tCO₂</p>
                </div>
              </div>

              {/* Fórmulas */}
              <div className="mt-4 bg-gray-50 rounded-xl p-4 border border-gray-200">
                <p className="text-xs font-semibold text-gray-700 mb-2">Fórmulas y supuestos:</p>
                <div className="text-xs text-gray-600 space-y-1 font-mono">
                  <p>Consumo_anual = Potencia × Horas_op = {consumo} × {horasOp} = {resultados.consumoAnual.toLocaleString()} kWh</p>
                  <p>Coste_base = Consumo × Precio = {(resultados.consumoAnual).toLocaleString()} × {costeEnergia} = {resultados.costeTotal.toFixed(0)} €</p>
                  <p>Descuento_renovable = 15% sobre energía verde</p>
                  <p>Ahorro_flexibilidad = Coste_ajustado × {flexibilidad}% × 20%</p>
                  <p>Factor_CO₂ = 0.233 tCO₂/MWh (mix eléctrico España)</p>
                </div>
              </div>

              <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-xs text-yellow-800">
                  ⚠️ <strong>Aviso:</strong> Todos los valores son hipotéticos. No representan datos reales de Lusitanus ni de FRV.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
