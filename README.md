# Simulador Karp-Rabin

Aplicación web educativa para visualizar paso a paso la búsqueda de cadenas mediante el algoritmo Karp-Rabin.

## Requisitos

- Node.js 20 o superior.
- npm.

## Ejecutar en local

Desde la raíz del proyecto:

```bash
npm install
npm run dev
```

Abre la URL que muestre Vite, normalmente `http://localhost:5173/`.

## Verificar y compilar

```bash
npm test
npm run build
npm run preview
```

El build se genera en `dist/` y no debe versionarse.

## Publicar en GitHub Pages

El workflow de [Deploy to GitHub Pages](./.github/workflows/deploy-pages.yml) compila y publica automáticamente cada push a `main`.

1. Crea un repositorio en GitHub.
2. Sube el proyecto a la rama `main`.
3. En GitHub, entra en **Settings → Pages**.
4. En **Build and deployment**, selecciona **GitHub Actions**.
5. Espera la ejecución del workflow **Deploy to GitHub Pages**.

La configuración de Vite detecta automáticamente el nombre del repositorio y ajusta la ruta base para un sitio de proyecto.

## Estructura principal

- [`src/App.jsx`](./src/App.jsx): estado y composición principal.
- [`src/components/`](./src/components/): interfaz de la simulación.
- [`src/lib/karpRabin.js`](./src/lib/karpRabin.js): algoritmo, hash y transiciones.
- [`src/lib/karpRabin.test.js`](./src/lib/karpRabin.test.js): pruebas de la lógica.
- [`src/style.css`](./src/style.css): estilos responsive.
- [`src/README.md`](./src/README.md): especificación funcional original.
