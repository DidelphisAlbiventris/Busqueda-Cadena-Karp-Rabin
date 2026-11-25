# Simulador Karp-Rabin

Aplicación web educativa para visualizar paso a paso la búsqueda de cadenas mediante el algoritmo Karp-Rabin.

## Cómo funciona Karp-Rabin

El usuario introduce un patrón de 2 a 5 caracteres y la cadena de texto donde desea buscarlo. La cadena debe tener al menos la longitud del patrón y no necesita contenerlo. El simulador utiliza una ventana deslizante: calcula el hash de cada ventana y lo compara con el hash del patrón para descartar rápidamente las ventanas diferentes.

El hash polinómico usa base `B = 256`, módulo `q = 101` y el código Unicode de cada carácter. Para una ventana de longitud `m`, la fórmula es:

```text
x_i = (C_i * B^(m-1) + C_(i+1) * B^(m-2) + ... + C_(i+m-1)) mod q
```

Al desplazar la ventana una posición, el algoritmo elimina la contribución del carácter que sale, multiplica por la base y suma el carácter que entra. Este hash rodante evita recalcular toda la ventana en cada paso.

Una igualdad de hashes solo indica una coincidencia candidata: el simulador compara también las cadenas para descartar colisiones. Cuando la comparación es exacta, guarda el índice inicial de la coincidencia; por eso también se pueden identificar coincidencias superpuestas.

Las coincidencias se resaltan en verde y la ventana actual de una colisión se muestra en amarillo pálido. Una colisión ocurre cuando los hashes son iguales, pero los caracteres son distintos; su posición no se registra como coincidencia.

La búsqueda puede ejecutarse paso a paso o reproducirse automáticamente con una pausa de 1,5 segundos entre ventanas. El índice de cada posición comienza en `0`.


## Autores y datos académicos

- Johan Alexis Barrera Vargas — 1152538.
- Joseer Sneider Carrillo Gónzalez — 1152539.
- Correo de contacto: johanalexisbv@ufps.edu.co.
- Análisis de Algoritmos, Ingeniería de Sistemas, Universidad Francisco de Paula Santander.
- Profesor: Ph.D. Marco Antonio Adarme Jaimes.
- Cúcuta, Norte de Santander, Colombia · 2026.
- Repositorio: https://github.com/DidelphisAlbiventris/Busqueda-Cadena-Karp-Rabin

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

La configuración de Vite detecta automáticamente el nombre del repositorio y ajusta la ruta base para un sitio de proyecto.

## Estructura principal

- [`src/App.jsx`](./src/App.jsx): estado y composición principal.
- [`src/components/`](./src/components/): interfaz de la simulación.
- [`src/lib/karpRabin.js`](./src/lib/karpRabin.js): algoritmo, hash y transiciones.
- [`src/lib/karpRabin.test.js`](./src/lib/karpRabin.test.js): pruebas de la lógica.
- [`src/style.css`](./src/style.css): estilos responsive.
- [`src/README.md`](./src/README.md): especificación funcional original.
