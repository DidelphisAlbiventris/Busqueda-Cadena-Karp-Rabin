# Stack tecnológico existente

## Runtime y herramientas

- JavaScript con módulos ES (`"type": "module"`).
- React `^19.3.1` y React DOM `^19.3.1`.
- Vite `^8.3.6` como servidor de desarrollo y bundler; el lockfile resuelve la versión instalada.
- `@vitejs/plugin-react` `^6.3.0`.
- Node.js ejecuta las pruebas mediante `node --test`.

## Scripts

| Script | Rol |
| --- | --- |
| `npm run dev` | Inicia el servidor Vite de desarrollo |
| `npm run build` | Genera el bundle estático en `dist` |
| `npm test` | Ejecuta pruebas nativas de Node sobre los archivos `*.test.js` |
| `npm run preview` | Sirve el build de `dist` para una revisión local |

## Dependencias de ejecución

- `react`: componentes y estado de UI.
- `react-dom`: montaje del árbol React.

## Dependencias de desarrollo

- `vite`: servidor, transformación y build.
- `@vitejs/plugin-react`: integración JSX/React con Vite.

## Restricciones y hallazgos

- No hay backend, base de datos, ORM, variables de entorno ni dependencias de red de aplicación.
- No hay ESLint, Prettier ni script de lint configurados; la validación de calidad está limitada actualmente a compilación y pruebas.
- `src/vite.config.js` parece una configuración Vite redundante y no se usa desde el script `build`.
- El nombre de paquete usa `karp_robin`, mientras que la aplicación y el algoritmo se refieren a Karp-Rabin; es una inconsistencia de nomenclatura, no un error de ejecución.
