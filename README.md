# Simulador Karp-Rabin

Aplicación web educativa para visualizar paso a paso la búsqueda de cadenas mediante el algoritmo Karp-Rabin.

## Cómo funciona Karp-Rabin

El simulador busca un patrón dentro de una cadena de 30 caracteres usando una ventana deslizante. Para cada ventana calcula un valor numérico y lo compara con el hash del patrón. Así puede descartar rápidamente una ventana cuyo hash sea diferente, sin comparar todos sus caracteres desde el inicio.

El hash polinómico usa base `B = 256`, módulo `q = 101` y el código Unicode de cada carácter. Para una ventana de longitud `m`, la fórmula es:

```text
x_i = (C_i * B^(m-1) + C_(i+1) * B^(m-2) + ... + C_(i+m-1)) mod q
```

Al desplazar la ventana una posición, el algoritmo elimina la contribución del carácter que sale, multiplica por la base y suma el carácter que entra. Este hash rodante evita recalcular toda la ventana en cada paso.

Una igualdad de hashes solo indica una coincidencia candidata: el simulador compara también las cadenas para descartar colisiones. Cuando la comparación es exacta, guarda el índice inicial de la coincidencia; por eso también se pueden identificar coincidencias superpuestas.

La búsqueda puede ejecutarse paso a paso o reproducirse automáticamente con una pausa de 1,5 segundos entre ventanas. El índice de cada posición comienza en `0`.

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
