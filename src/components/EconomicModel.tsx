import { useState, useMemo } from 'react';

export default function EconomicModel() {
  const [costeDesarrollo, setCosteDesarrollo] = useState(45000); // €
  const [costeInfraestructura, setCosteInfraestructura] = useState(25000); // €/año
  const [horasAhorro, setHorasAhorro] = useState(120); // horas/año ahorradas
  const [valorHora, setValorHora] = useState(65); // €/hora
  const [ahorroEnergia, setAhorroEnergia] = useState(15); // % ahorro energético
  const [consumoBase, setConsumoBase] = useState(4380000); // kWh/año
  const [precioEnergia, setPrecioEnergia] = useState(0.08); // €/kWh
  const [precioServicio, setPrecioServicio] = useState(3500); // €/mes

  const resultados = useMemo(() => {
    const costeAnualTotal = costeInfraestructura + (precioServicio * 12);
    const beneficioProductividad = horasAhorro * valorHora;
    const beneficioEnergia = consumoBase * precioEnergia * (ahorroEnergia / 100);
    const beneficioTotalAnual = beneficioProductividad + beneficioEnergia;
    const roi = ((beneficioTotalAnual - costeAnualTotal) / costeAnualTotal) * 100;
    const payback = costeDesarrollo / (beneficioTotalAnual - costeAnualTotal);
    const beneficio3Anios = (beneficioTotalAnual * 3) - costeDesarrollo - (costeAnualTotal * 3);

    return {
      costeAnualTotal,
      beneficioProductividad,
      beneficioEnergia,
      beneficioTotalAnual,
      roi,
      payback: payback > 0 ? payback : Infinity,
      beneficio3Anios
    };
  }, [costeDesarrollo, costeInfraestructura, horasAhorro, valorHora, ahorroEnergia, consumoBase, precioEnergia, precioServicio]);

  return (
    <section id="modelo-economico" className="py-16 px-4 bg-gradient-to-br from-gray-50 to-emerald-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Modelo Económico</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Estimación de viabilidad económica. <strong>Todos los valores son supuestos editables</strong> y no representan un presupuesto aprobado por FRV.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Controles de coste */}
            <div className="space-y-5">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Supuestos de coste</h3>
              
              <div>
                <label className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                  <span>Coste de desarrollo (una vez)</span>
                  <span className="text-primary-600">{(costeDesarrollo / 1000).toFixed(0)} k€</span>
                </label>
                <input type="range" min="10000" max="150000" step="5000" value={costeDesarrollo}
                  onChange={e => setCosteDesarrollo(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600" />
              </div>

              <div>
                <label className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                  <span>Infraestructura cloud/anual</span>
                  <span className="text-primary-600">{(costeInfraestructura / 1000).toFixed(0)} k€</span>
                </label>
                <input type="range" min="5000" max="100000" step="1000" value={costeInfraestructura}
                  onChange={e => setCosteInfraestructura(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600" />
              </div>

              <div>
                <label className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                  <span>Precio servicio mensual</span>
                  <span className="text-primary-600">{precioServicio.toLocaleString()} €/mes</span>
                </label>
                <input type="range" min="500" max="15000" step="500" value={precioServicio}
                  onChange={e => setPrecioServicio(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600" />
              </div>

              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 pt-4">Supuestos de beneficio</h3>

              <div>
                <label className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                  <span>Horas ahorradas/año</span>
                  <span className="text-primary-600">{horasAhorro} h</span>
                </label>
                <input type="range" min="10" max="500" step="10" value={horasAhorro}
                  onChange={e => setHorasAhorro(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600" />
              </div>

              <div>
                <label className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                  <span>Valor hora (€)</span>
                  <span className="text-primary-600">{valorHora} €/h</span>
                </label>
                <input type="range" min="25" max="150" step="5" value={valorHora}
                  onChange={e => setValorHora(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600" />
              </div>

              <div>
                <label className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                  <span>% Ahorro energético</span>
                  <span className="text-primary-600">{ahorroEnergia}%</span>
                </label>
                <input type="range" min="1" max="40" step="1" value={ahorroEnergia}
                  onChange={e => setAhorroEnergia(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600" />
              </div>
            </div>

            {/* Resultados */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Resultados económicos</h3>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-red-50 rounded-xl p-4 border border-red-100">
                  <p className="text-xs text-red-600 font-medium">Coste anual total</p>
                  <p className="text-xl font-bold text-red-900">{(resultados.costeAnualTotal / 1000).toFixed(1)} k€</p>
                </div>
                <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                  <p className="text-xs text-green-600 font-medium">Beneficio anual</p>
                  <p className="text-xl font-bold text-green-900">{(resultados.beneficioTotalAnual / 1000).toFixed(1)} k€</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                  <p className="text-xs text-blue-600 font-medium">ROI anual</p>
                  <p className="text-xl font-bold text-blue-900">{resultados.roi > 0 ? `${resultados.roi.toFixed(0)}%` : 'Negativo'}</p>
                </div>
                <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
                  <p className="text-xs text-purple-600 font-medium">Payback</p>
                  <p className="text-xl font-bold text-purple-900">
                    {resultados.payback === Infinity ? 'No recupera' : `${resultados.payback.toFixed(1)} años`}
                  </p>
                </div>
              </div>

              <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
                <p className="text-xs text-emerald-600 font-medium mb-1">Beneficio acumulado 3 años</p>
                <p className="text-2xl font-bold text-emerald-900">
                  {(resultados.beneficio3Anios / 1000).toFixed(0)} k€
                </p>
                <p className="text-xs text-emerald-700 mt-1">
                  (Beneficio productividad + ahorro energético − costes totales)
                </p>
              </div>

              {/* Desglose */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <p className="text-xs font-semibold text-gray-700 mb-2">Desglose de beneficios:</p>
                <div className="text-xs text-gray-600 space-y-1">
                  <p>• Productividad: {horasAhorro} h × {valorHora} €/h = {resultados.beneficioProductividad.toLocaleString()} €/año</p>
                  <p>• Ahorro energía: {consumoBase.toLocaleString()} kWh × {precioEnergia} €/kWh × {ahorroEnergia}% = {resultados.beneficioEnergia.toFixed(0)} €/año</p>
                  <p>• Coste anual: {costeInfraestructura.toLocaleString()} € + ({precioServicio} × 12) = {resultados.costeAnualTotal.toLocaleString()} €</p>
                </div>
              </div>

              <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-xs text-yellow-800">
                  ⚠️ <strong>Aviso:</strong> Estos son supuestos editables. No representan un presupuesto aprobado por FRV ni cifras reales del proyecto Lusitanus.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
