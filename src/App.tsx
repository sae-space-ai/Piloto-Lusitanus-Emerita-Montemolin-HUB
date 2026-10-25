import { useState } from 'react';
import EnergySimulator from './components/EnergySimulator';
import OpportunityEvaluator from './components/OpportunityEvaluator';
import EconomicModel from './components/EconomicModel';

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { id: 'presentacion', label: 'Presentación' },
    { id: 'contexto', label: 'Contexto' },
    { id: 'simulador', label: 'Simulador' },
    { id: 'aplicaciones-ia', label: 'IA' },
    { id: 'plan-90', label: 'Plan 90 días' },
    { id: 'evaluador', label: 'Evaluador' },
    { id: 'energia-montemolin', label: 'Energía' },
    { id: 'modelo-economico', label: 'Modelo Eco.' },
    { id: 'cooperacion', label: 'Cooperación' },
    { id: 'transparencia', label: 'Transparencia' },
  ];

  const handleExport = () => {
    const resumen = `
RESUMEN PILOTO - Lusitanus Mérida × MONTEMOLIN-AIHUB
=====================================================
Fecha: ${new Date().toLocaleDateString('es-ES')}

PROPÓSITO:
Propuesta exploratoria de colaboración entre MONTEMOLIN-AIHUB y FRV / Proyecto Lusitanus.
Inteligencia artificial y energía sostenible, evaluadas con datos y rigor.

CONTEXTO:
- Proyecto anunciado por FRV en ExpacioMérida
- Reserva de 240.000 m²
- Inversión inicial anunciada: 2.800 M€
- Estado: Planificación (no infraestructura operativa)

PLAN DE 90 DÍAS:
1. Descubrimiento (días 1-30)
2. Demostración (días 31-60)
3. Evaluación y dossier (días 61-90)

ENERGÍA MONTENOLÍN:
- Escenario prefactibilidad: 25 MWp
- Generación estimada: 41.250 MWh/año
- Estado: Escenario hipotético (sin permisos, PPA o conexión confirmados)

COOPERACIÓN EUROPEA:
- Programa: I3-2026-INV2a
- Referencia: SEP-211421662
- Estado: Documentación en revisión

AVISO:
Propuesta independiente. FRV y Lusitanus no han aprobado ni patrocinado este piloto.
    `.trim();

    const blob = new Blob([resumen], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'piloto-lusitanus-montemolin-resumen.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Aviso de transparencia superior */}
      <div className="bg-amber-50 border-b border-amber-200 py-2 px-4 no-print">
        <p className="text-xs text-amber-800 text-center font-medium">
          ⚠️ Propuesta independiente. FRV y Lusitanus no han aprobado ni patrocinado este piloto.
        </p>
      </div>

      {/* Header / Navegación */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm no-print">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <div>
              <h1 className="text-sm font-bold text-gray-900 leading-tight">MONTEMOLIN-AIHUB</h1>
              <p className="text-xs text-gray-500 leading-tight">Piloto Lusitanus Mérida</p>
            </div>
          </div>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map(item => (
              <a key={item.id} href={`#${item.id}`}
                className="px-2 py-1 text-xs text-gray-600 hover:text-primary-700 hover:bg-primary-50 rounded-md transition-colors">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button onClick={handleExport}
              className="hidden sm:block px-3 py-1.5 text-xs font-medium text-primary-700 bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors">
              📥 Exportar
            </button>
            <button onClick={() => window.print()}
              className="hidden sm:block px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
              🖨️ Imprimir
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-gray-900">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white px-4 py-3">
            <nav className="grid grid-cols-2 gap-1">
              {navItems.map(item => (
                <a key={item.id} href={`#${item.id}`}
                  onClick={() => setMenuOpen(false)}
                  className="px-3 py-2 text-sm text-gray-700 hover:text-primary-700 hover:bg-primary-50 rounded-md transition-colors">
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
              <button onClick={handleExport}
                className="flex-1 px-3 py-2 text-xs font-medium text-primary-700 bg-primary-50 rounded-lg">
                📥 Exportar DEMO
              </button>
              <button onClick={() => window.print()}
                className="flex-1 px-3 py-2 text-xs font-medium text-gray-700 bg-gray-100 rounded-lg">
                🖨️ Imprimir
              </button>
            </div>
          </div>
        )}
      </header>

      {/* SECCIÓN 1: Presentación ejecutiva */}
      <section id="presentacion" className="py-20 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-primary-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-4 py-1 bg-primary-500/20 border border-primary-400/30 rounded-full text-sm text-primary-200 mb-6">
            Piloto exploratorio · 90 días
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Lusitanus Mérida<br />
            <span className="text-primary-300">×</span> MONTEMOLIN-AIHUB
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Inteligencia artificial y energía sostenible, evaluadas con datos y rigor.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#simulador" className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl transition-colors shadow-lg">
              Explorar simulador
            </a>
            <a href="#plan-90" className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition-colors border border-white/20">
              Ver plan de 90 días
            </a>
          </div>
        </div>
      </section>

      {/* SECCIÓN 2: Contexto verificado */}
      <section id="contexto" className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Contexto Verificado</h2>
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-700">240.000</p>
                <p className="text-sm text-blue-600">m² reservados</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-700">2.800 M€</p>
                <p className="text-sm text-blue-600">Inversión inicial anunciada</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-700">FRV</p>
                <p className="text-sm text-blue-600">Promotor anunciado</p>
              </div>
            </div>
            <div className="space-y-3 text-sm text-gray-700">
              <p>• Proyecto anunciado por FRV en el evento <strong>ExpacioMérida</strong>.</p>
              <p>• Reserva de 240.000 m² en el entorno de Mérida, Extremadura.</p>
              <p>• Inversión inicial anunciada de 2.800 millones de euros.</p>
            </div>
            <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-xs text-amber-800">
                📋 <strong>Etiquetado como planificación.</strong> Esta información proviene de anuncios públicos. No constituye infraestructura operativa ni datos confirmados de operación.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 3: Simulador energético */}
      <EnergySimulator />

      {/* SECCIÓN 4: Aplicaciones de IA */}
      <section id="aplicaciones-ia" className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Aplicaciones de IA Propuestas</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Cuatro áreas de aplicación con dos demostradores concretos para evaluar viabilidad.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-200">
              <div className="text-2xl mb-2">📄</div>
              <h3 className="font-semibold text-blue-900 mb-1">Inteligencia Documental</h3>
              <p className="text-xs text-blue-700">Extracción y clasificación automática de documentación técnica, regulatoria y de cumplimiento.</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-5 border border-purple-200">
              <div className="text-2xl mb-2">👁️</div>
              <h3 className="font-semibold text-purple-900 mb-1">Visión Artificial</h3>
              <p className="text-xs text-purple-700">Monitorización visual de instalaciones, detección de anomalías y control de seguridad.</p>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-5 border border-emerald-200">
              <div className="text-2xl mb-2">⚙️</div>
              <h3 className="font-semibold text-emerald-900 mb-1">Automatización</h3>
              <p className="text-xs text-emerald-700">Optimización de procesos operativos, gestión de cargas y respuesta a demanda.</p>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-5 border border-amber-200">
              <div className="text-2xl mb-2">📊</div>
              <h3 className="font-semibold text-amber-900 mb-1">Análisis Energético</h3>
              <p className="text-xs text-amber-700">Predicción de consumo, detección de ineficiencias y optimización de mix energético.</p>
            </div>
          </div>

          {/* Demostradores */}
          <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Demostradores propuestos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 border-2 border-primary-200 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-0.5 bg-primary-100 text-primary-700 text-xs font-medium rounded-full">Demo 1</span>
                <h4 className="font-semibold text-gray-800">Optimizador de Cargas con IA</h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Sistema que ajusta el consumo computacional en función del precio horario de la electricidad y la disponibilidad renovable.
              </p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• Input: precios horarios, previsión renovable, demanda</li>
                <li>• Output: schedule óptimo de cargas</li>
                <li>• Métrica: reducción de coste energético (%)</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 border-2 border-primary-200 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-0.5 bg-primary-100 text-primary-700 text-xs font-medium rounded-full">Demo 2</span>
                <h4 className="font-semibold text-gray-800">Monitor de Eficiencia Documental</h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Automatización del análisis de documentación de cumplimiento normativo y generación de informes de estado.
              </p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• Input: documentación regulatoria, informes técnicos</li>
                <li>• Output: dashboard de cumplimiento, alertas</li>
                <li>• Métrica: horas ahorradas en revisión manual</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 5: Plan de 90 días */}
      <section id="plan-90" className="py-16 px-4 bg-gradient-to-br from-primary-50 to-blue-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Plan de 90 Días</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Estructura de trabajo para evaluar la oportunidad con rigor y sin compromisos prematuros.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm relative">
              <div className="absolute -top-3 left-6 px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full">
                FASE 1
              </div>
              <h3 className="font-bold text-gray-800 mt-2 mb-2">Descubrimiento</h3>
              <p className="text-xs text-gray-500 mb-3">Días 1–30</p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-start gap-2"><span className="text-blue-500 mt-0.5">●</span> Mapeo de necesidades reales</li>
                <li className="flex items-start gap-2"><span className="text-blue-500 mt-0.5">●</span> Identificación de interlocutores</li>
                <li className="flex items-start gap-2"><span className="text-blue-500 mt-0.5">●</span> Evaluación de datos disponibles</li>
                <li className="flex items-start gap-2"><span className="text-blue-500 mt-0.5">●</span> Definición de métricas de éxito</li>
              </ul>
              <div className="mt-4 p-2 bg-blue-50 rounded-lg">
                <p className="text-xs text-blue-700"><strong>Entregable:</strong> Informe de descubrimiento</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm relative">
              <div className="absolute -top-3 left-6 px-3 py-1 bg-primary-600 text-white text-xs font-bold rounded-full">
                FASE 2
              </div>
              <h3 className="font-bold text-gray-800 mt-2 mb-2">Demostración</h3>
              <p className="text-xs text-gray-500 mb-3">Días 31–60</p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-start gap-2"><span className="text-primary-500 mt-0.5">●</span> Desarrollo de demostradores</li>
                <li className="flex items-start gap-2"><span className="text-primary-500 mt-0.5">●</span> Pruebas con datos simulados</li>
                <li className="flex items-start gap-2"><span className="text-primary-500 mt-0.5">●</span> Validación técnica</li>
                <li className="flex items-start gap-2"><span className="text-primary-500 mt-0.5">●</span> Medición de resultados</li>
              </ul>
              <div className="mt-4 p-2 bg-primary-50 rounded-lg">
                <p className="text-xs text-primary-700"><strong>Entregable:</strong> Demo funcional + métricas</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm relative">
              <div className="absolute -top-3 left-6 px-3 py-1 bg-purple-600 text-white text-xs font-bold rounded-full">
                FASE 3
              </div>
              <h3 className="font-bold text-gray-800 mt-2 mb-2">Evaluación y Decisión</h3>
              <p className="text-xs text-gray-500 mb-3">Días 61–90</p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-start gap-2"><span className="text-purple-500 mt-0.5">●</span> Evaluación económica</li>
                <li className="flex items-start gap-2"><span className="text-purple-500 mt-0.5">●</span> Análisis de riesgos</li>
                <li className="flex items-start gap-2"><span className="text-purple-500 mt-0.5">●</span> Dossier de decisión</li>
                <li className="flex items-start gap-2"><span className="text-purple-500 mt-0.5">●</span> Recomendación go/no-go</li>
              </ul>
              <div className="mt-4 p-2 bg-purple-50 rounded-lg">
                <p className="text-xs text-purple-700"><strong>Entregable:</strong> Dossier de decisión final</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 6: Evaluador de oportunidades */}
      <OpportunityEvaluator />

      {/* SECCIÓN 7: Energía Montemolín */}
      <section id="energia-montemolin" className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Energía Montemolín</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Escenario de prefactibilidad RURAL-GOV-ENERGY. Todos los datos son hipotéticos.
            </p>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 md:p-8 border border-emerald-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-emerald-800 mb-4">Escenario de prefactibilidad</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-emerald-200">
                    <span className="text-sm text-gray-700">Potencia instalada</span>
                    <span className="font-bold text-emerald-800">25 MWp</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-emerald-200">
                    <span className="text-sm text-gray-700">Generación estimada</span>
                    <span className="font-bold text-emerald-800">41.250 MWh/año</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-emerald-200">
                    <span className="text-sm text-gray-700">Horas equivalentes</span>
                    <span className="font-bold text-emerald-800">~1.650 h/año</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-emerald-200">
                    <span className="text-sm text-gray-700">Factor de capacidad</span>
                    <span className="font-bold text-emerald-800">~18.9%</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-gray-700">Escenario</span>
                    <span className="font-bold text-emerald-800">RURAL-GOV-ENERGY</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-emerald-800 mb-4">Supuestos del cálculo</h3>
                <div className="text-xs text-gray-600 space-y-2 font-mono bg-white rounded-lg p-4 border border-emerald-100">
                  <p>Irradiación Extremadura: ~1.700 kWh/m²/año</p>
                  <p>PR (Performance Ratio): 0.82</p>
                  <p>Generación = 25 MW × 1.700 × 0.82 = 34.850 GWh... ajustado</p>
                  <p>Estimación: 41.250 MWh/año (con trackers)</p>
                </div>
                <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-xs text-amber-800">
                    ⚠️ <strong>No se afirma</strong> que exista suministro, PPA, permisos, conexión a red o generación disponible. Este es un escenario de prefactibilidad hipotético.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 8: Modelo económico */}
      <EconomicModel />

      {/* SECCIÓN 9: Cooperación europea */}
      <section id="cooperacion" className="py-16 px-4 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Cooperación Europea</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Marco de financiación europea relevante para el piloto.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 md:p-8 border border-blue-200 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-blue-800 mb-4">Programa y referencia</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 text-sm">🇪🇺</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">MONTEMOLIN-AIHUB</p>
                      <p className="text-xs text-gray-500">Entidad coordinadora de la propuesta</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 text-sm">📋</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">I3-2026-INV2a</p>
                      <p className="text-xs text-gray-500">Programa de investigación e innovación</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 text-sm">🔖</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">SEP-211421662</p>
                      <p className="text-xs text-gray-500">Referencia de la propuesta</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-blue-800 mb-4">Estado actual</h3>
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 bg-amber-400 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-amber-800">En revisión</span>
                  </div>
                  <p className="text-xs text-gray-600">
                    La documentación de propuesta está en revisión. <strong>No hay adjudicación ni participación confirmada de FRV</strong> en este programa.
                  </p>
                </div>
                <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-xs text-gray-600">
                    <strong>Nota:</strong> La mención de este programa es informativa. La posible vinculación con FRV/Lusitanus es exploratoria y no constituye un compromiso de ninguna de las partes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 10: Transparencia */}
      <section id="transparencia" className="py-16 px-4 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Declaración de Transparencia</h2>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
            <div className="max-w-2xl mx-auto space-y-4">
              <div className="p-4 bg-amber-500/10 border border-amber-400/30 rounded-xl">
                <p className="text-amber-200 font-medium">
                  ⚠️ Propuesta independiente. FRV y Lusitanus no han aprobado ni patrocinado este piloto.
                </p>
              </div>
              <div className="text-sm text-gray-300 space-y-3 text-left">
                <p>• Este sitio web es una <strong>propuesta exploratoria</strong> creada por MONTEMOLIN-AIHUB con fines de evaluación previa.</p>
                <p>• Los datos sobre Lusitanus provienen de <strong>anuncios públicos</strong> y están etiquetados como planificación.</p>
                <p>• Los simuladores y modelos económicos utilizan <strong>valores hipotéticos editables</strong>.</p>
                <p>• No se afirma la existencia de acuerdos, permisos, conexiones o suministros.</p>
                <p>• No se utilizan logos corporativos de terceros sin permiso.</p>
                <p>• La cooperación europea mencionada está <strong>en revisión, sin adjudicación</strong>.</p>
              </div>
            </div>
          </div>
          <div className="mt-8 text-xs text-gray-500">
            <p>MONTEMOLIN-AIHUB · Piloto exploratorio · {new Date().getFullYear()}</p>
            <p className="mt-1">Este piloto no sustituye un análisis profesional ni constituye oferta contractual.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
