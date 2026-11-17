# Estructura del proyecto

## Clasificación

- Tipo: frontend SPA.
- Lenguaje: JavaScript/JSX.
- Runtime de desarrollo y pruebas: Node.js con scripts npm.
- Build y servidor local: Vite.
- Persistencia y backend: no existen.
- Módulos desplegables: una aplicación web estática.

## Módulos y capas

| Ruta | Responsabilidad | Capa |
| --- | --- | --- |
| `index.html` | Documento HTML raíz, metadatos, favicon y montaje de React | Entrada/documento |
| `src/main.jsx` | Crea la raíz React y habilita `StrictMode` | Bootstrap |
| `src/App.jsx` | Orquesta el estado global de una simulación y compone la pantalla | Presentación/orquestación |
| `src/formulario.jsx` | Captura y valida el patrón de búsqueda | Presentación/entrada |
| `src/components/` | Renderiza simulación, secuencia e historial | Presentación |
| `src/lib/karpRabin.js` | Validación, generación de texto, hash y transiciones puras | Dominio/lógica |
| `src/lib/karpRabin.test.js` | Pruebas unitarias de la lógica del algoritmo | Verificación |
| `src/style.css` | Estilos globales, responsive y accesibilidad visual | Presentación |
| `src/assets/logo.png` | Recurso gráfico institucional | Assets |

## Entrada y flujo principal

1. `index.html` carga `src/main.jsx`.
2. `main.jsx` monta `App` sobre `#root`.
3. `App` recibe el patrón desde `Formulario` y crea una simulación.
4. `Simulation` solicita avances; `App` aplica `advanceSimulation` de forma inmutable.
5. `SequenceView` y `ComparisonLog` muestran el estado derivado.

## Funcionalidad

- Captura y validación de patrones de 2 a 4 caracteres.
- Generación determinista bajo un proveedor aleatorio inyectable, con aparición garantizada del patrón en un texto de 30 caracteres.
- Ejecución paso a paso del hash de patrón y de cada ventana.
- Conteo de coincidencias superpuestas y detección explícita de colisiones.
- Reinicio sobre el mismo texto.
- Historial visual de comparaciones y diseño adaptable.

## Configuración relevante

- `package.json`: scripts y dependencias React/Vite.
- `vite.config.js`: plugin React para Vite.
- `.gitignore`: excluye dependencias, build y configuraciones locales.

## Observaciones estructurales

- `src/vite.config.js` duplica la configuración raíz y no está referenciado por el build; debe considerarse archivo huérfano.
- `src/components/HashDetails.jsx` está documentado pero no importado por ningún componente; actualmente es código no alcanzable desde la UI.
- La configuración de Vite y el entrypoint están correctamente ubicados en la raíz y `src/main.jsx`, respectivamente.
