# Simulador Karp-Rabin

Aplicación educativa en React para entender la búsqueda de un patrón dentro de una cadena mediante el algoritmo Karp-Rabin.

## Flujo de la simulación

1. Se introduce un patrón de 2 a 5 caracteres.
2. Se genera una cadena de 30 caracteres que contiene el patrón al menos una vez.
3. El primer paso calcula el hash del patrón.
4. Cada paso siguiente toma una ventana de la misma longitud, calcula su hash y lo compara con el hash del patrón.
5. Si los hashes coinciden, también se comparan los caracteres para confirmar que no exista una colisión.
6. Las coincidencias confirmadas se guardan mediante su índice inicial, empezando en `0`. Esto permite distinguir también coincidencias superpuestas.

La búsqueda se puede controlar con **Siguiente paso**, reiniciar con **Reiniciar recorrido** o reproducir automáticamente con una pausa de 1,5 segundos entre comparaciones.

## Cálculo del hash

El hash polinómico utiliza base `B = 256`, módulo `q = 101` y el código Unicode de cada carácter. Para una ventana de longitud `m`:

```text
x_i = (C_i * B^(m-1) + C_(i+1) * B^(m-2) + ... + C_(i+m-1)) mod q
```

Al mover la ventana, se resta el carácter saliente multiplicado por `B^(m-1)`, se desplaza el hash multiplicando por `B` y se suma el carácter entrante. Esta actualización, llamada **hash rodante**, permite avanzar sin volver a calcular toda la subcadena.

El módulo hace que el hash sea compacto, pero también permite colisiones: dos cadenas distintas pueden producir el mismo valor. Por eso Karp-Rabin usa el hash como filtro y confirma una coincidencia comparando el texto real.

## Ejecución

Desde la raíz del proyecto:

```bash
npm install
npm run dev
```

Para verificar la lógica y generar la versión de producción:

```bash
npm test
npm run build
```

La aplicación no necesita servidor, base de datos ni almacenamiento. El workflow de GitHub Pages publica automáticamente los cambios enviados a `main`.

## Módulos

- [App.jsx](./App.jsx): coordina el estado, la reproducción automática y la interfaz principal.
- [formulario.jsx](./formulario.jsx): captura y valida el patrón.
- [lib/karpRabin.js](./lib/karpRabin.js): generación de texto, hash polinómico, hash rodante y transiciones puras.
- [components/Simulation.jsx](./components/Simulation.jsx): controles, ventana actual, comparación y resultado final.
- [components/SequenceView.jsx](./components/SequenceView.jsx): cadena, índices y coincidencias resaltadas.
- [components/HashDetails.jsx](./components/HashDetails.jsx): desglose de términos y comparación de hashes.
- [components/ComparisonLog.jsx](./components/ComparisonLog.jsx): historial de ventanas comparadas.
- [style.css](./style.css): diseño responsive.
