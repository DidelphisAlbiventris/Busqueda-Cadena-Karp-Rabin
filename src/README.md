Este proyecto es un simulador didactico con el fin de entender el funcionamiento de una busqueda de cadena por Algoritmo Karp-Rabin
la pagina debe de tener los siguientes requerimientos:
#Requerimientos:
1. Dejar escribir una cadena de entre 2 a 4 caracteres y enviarla con un boton
2. Una vez subido generar, una cadena aleatoria de 30 caracteres digitados en la cual se garantice que la cadena original escrita este por lo menos una vez por ejemplo se digita abc, se genera la cadena aleatoria abcbbbacbccacabcacbbbbaaaacabc
3. una vez generada la cadena, se habilita el botón para avanzar el paso. 
La primera vez que se pulsa se indica el valor calculado hash para la cadena inicial
La segunda vez que se pulsa se busca el valor hash de los primeros números de la cadena generada (varia segun la longitud de la cadena) y se compara con el hash de la cadena a buscar, si coinciden lo indica con un mensaje al lado tipo ambos "se ha encontrado una coincidencia" y suma 1 a una variable interna que al final del recorrido se mueesta en pantalla la cantidad de coincidencias. Si no se encuentra se dice la cadena "subcadena" no es igual a "cadenabase" donde subcadena es la cadena que se busco en el momento de la cadena generada y cadenabase es la cadena de entrada. Cada vez que se pulsa el boton de siguiente paso se avaza al siguiente indice de la cadena a buscar y se elimina el ultimo de esta.
4. al final del recorrido se deshabilita el boton de siguiente y aparece una mensaje con "La cantidad de coincidencias de la cadena + ${cadena} es de ${cantidad} veces"


#Herramientas:
el proyecto se realizara en html como base + css para estilos estaticos y react para los renderizados de los pasos y boton de envio.
Ademas, para su despliegue se usara github pages debido a que no tiene persistencia ni ningun stack adicional.

## Ejecución

Desde la raíz del proyecto:

```bash
npm install
npm run dev
```

Abre la dirección que indica Vite. Escribe un patrón de 2 a 4 caracteres y pulsa **Generar cadena**. El botón **Siguiente paso** primero calcula el hash del patrón y después compara una ventana en cada clic. Al terminar, muestra el total y deshabilita el avance.

**Reiniciar recorrido** permite repetir la búsqueda sobre la misma cadena. Generar otra cadena reinicia tanto el recorrido como el contador. Los índices comienzan en 0 y las coincidencias superpuestas también se cuentan.

## Estilo
Debe ser simple y directo sin mucha sobre carga en las explicaciones, manejando la paleta de colores de la Universidad Francisco de Paula Santander, ademas con el logo de esta en la esquina superior izquierda.

al inicio estara el titulo de Simulador de busqueda de cadena: Método de Karp Robin. Inmediatamente abajo una breve explicación de lo que consiste el metodo y seguidamente ya la entrada y la generacion de la cadena. 

Omite la mayoria de  pequeños textos que sobreexplican el como funciona, solo deja lo escencial: el formulario para ingresar la cadena, la cadena que se genera y el boton de paso a paso. al igual que el panel que muestra la cantidad de veces que se encontro.

al final de la pagina debe aparecer el historial de las comparaciones y de footer un texto simple que diga "Aplicación web educativa para los cursos de Estructuras de Datos y Análisis de Algoritmos · compatible con GitHub Pages"

Los textos deben tener la fuente sans-serif moderna para parrafos y Inter Bold para Titulos



## Módulos

- [App.jsx](./App.jsx): coordina el estado de la simulación.
- [formulario.jsx](./formulario.jsx): captura y valida el patrón.
- [lib/karpRabin.js](./lib/karpRabin.js): genera los 30 caracteres con una aparición garantizada y ejecuta el algoritmo paso a paso.
- [components/Simulation.jsx](./components/Simulation.jsx): controles, comparación de hashes, progreso y resultado final.
- [components/SequenceView.jsx](./components/SequenceView.jsx): caracteres, índices y ventana activa.
- [components/HashDetails.jsx](./components/HashDetails.jsx): explicación y cálculo del hash rodante.
- [components/ComparisonLog.jsx](./components/ComparisonLog.jsx): historial de ventanas comparadas.
- [style.css](./style.css): diseño adaptable a escritorio y móvil.

El hash usa base 256, módulo 101 y el código Unicode de cada carácter. Una igualdad de hashes se confirma comparando los caracteres para descartar colisiones. No requiere servidor adicional, almacenamiento ni variables de entorno.

## Verificación y compilación

```bash
npm test
npm run build
```

Las pruebas cubren validación, generación garantizada, orden de los pasos, hash rodante, coincidencias superpuestas, colisiones, caracteres Unicode y reinicio. La compilación genera la aplicación estática en `dist`, lista para un alojamiento como Vercel.
