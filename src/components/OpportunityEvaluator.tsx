import { useState, useMemo } from 'react';

interface Criterio {
  id: string;
  nombre: string;
  descripcion: string;
  peso: number;
  valor: number; // 0-10
}

export default function OpportunityEvaluator() {
  const [criterios, setCriterios] = useState<Criterio[]>([
    { id: 'necesidad', nombre: 'Necesidad real', descripcion: '¿Existe un problema concreto que resolver?', peso: 1.5, valor: 5 },
    { id: 'interlocutor', nombre: 'Interlocutor identificado', descripcion: '¿Hay una persona de contacto con capacidad de decisión?', peso: 1.3, valor: 5 },
    { id: 'datos', nombre: 'Permisos de datos', descripcion: '¿Se pueden acceder a los datos necesarios?', peso: 1.2, valor: 5 },
    { id: 'tecnica', nombre: 'Viabilidad técnica', descripcion: '¿La tecnología disponible resuelve el problema?', peso: 1.0, valor: 5 },
    { id: 'economica', nombre: 'Viabilidad económica', descripcion: '¿El ROI justifica la inversión?', peso: 1.4, valor: 5 },
    { id: 'encaje', nombre: 'Encaje confirmado por FRV', descripcion: '¿FRV ha expresado interés formal?', peso: 1.5, valor: 3 },
    { id: 'siguiente', nombre: 'Siguiente paso acordado', descripcion: '¿Hay un compromiso de avance?', peso: 1.1, valor: 5 },
  ]);

  const actualizarValor = (id: string, valor: number) => {
    setCriterios(prev => prev.map(c => c.id === id ? { ...c, valor } : c));
  };

  const resultado = useMemo(() => {
    const sumaPonderada = criterios.reduce((acc, c) => acc + c.valor * c.peso, 0);
    const sumaPesos = criterios.reduce((acc, c) => acc + c.peso, 0);
    const puntuacion = sumaPonderada / sumaPesos;
    
    let recomendacion = '';
    let color = '';
    if (puntuacion >= 7.5) {
      recomendacion = 'Alta prioridad. Avanzar con fase de descubrimiento.';
      color = 'text-green-700 bg-green-50 border-green-200';
    } else if (puntuacion >= 5) {
      recomendacion = 'Oportunidad moderada. Requiere más información antes de comprometer recursos.';
      color = 'text-amber-700 bg-amber-50 border-amber-200';
    } else {
      recomendacion = 'Prioridad baja. No avanzar hasta resolver bloqueantes clave.';
      color = 'text-red-700 bg-red-50 border-red-200';
    }

    return { puntuacion, recomendacion, color };
  }, [criterios]);

  return (
    <section id="evaluador" className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Evaluador de Oportunidades</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Siete criterios para evaluar si merece la pena explorar una colaboración. Ajuste los valores según la información disponible.
          </p>
        </div>

        <div className="bg-gray-50 rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Criterios */}
            <div className="lg:col-span-2 space-y-4">
              {criterios.map(criterio => (
                <div key={criterio.id} className="bg-white rounded-xl p-4 border border-gray-200 hover:border-primary-300 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-800">{criterio.nombre}</h4>
                      <p className="text-xs text-gray-500">{criterio.descripcion}</p>
                    </div>
                    <span className="text-sm font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded-full">
                      Peso: ×{criterio.peso}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="0"
                      max="10"
                      step="1"
                      value={criterio.valor}
                      onChange={e => actualizarValor(criterio.id, Number(e.target.value))}
                      className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                    />
                    <span className="text-lg font-bold text-gray-800 w-8 text-center">{criterio.valor}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Resultado */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Resultado</h3>
                
                {/* Gauge */}
                <div className="flex justify-center mb-4">
                  <div className="relative w-40 h-40">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                      <circle
                        cx="50" cy="50" r="40" fill="none"
                        stroke={resultado.puntuacion >= 7.5 ? '#22c55e' : resultado.puntuacion >= 5 ? '#f59e0b' : '#ef4444'}
                        strokeWidth="8"
                        strokeDasharray={`${(resultado.puntuacion / 10) * 251.2} 251.2`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl font-bold text-gray-900">{resultado.puntuacion.toFixed(1)}</span>
                    </div>
                  </div>
                </div>

                <div className={`p-4 rounded-lg border ${resultado.color}`}>
                  <p className="text-sm font-medium">{resultado.recomendacion}</p>
                </div>

                <div className="mt-4 space-y-2">
                  <h4 className="text-xs font-semibold text-gray-600 uppercase">Escala de referencia</h4>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span>7.5–10: Alta prioridad</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                    <span>5.0–7.4: Moderada</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span>0–4.9: Baja / bloqueante</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
