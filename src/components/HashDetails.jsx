import { HASH_BASE, HASH_MODULUS } from '../lib/karpRabin.js'

export default function HashDetails({ simulation }) {
  const current = simulation?.history.at(-1)

  return (
    <details className="hash-details">
      <summary>¿Cómo se calcula el hash?</summary>
      <div className="hash-details-content">
        <p>Empezamos con h = 0. Por cada carácter aplicamos:</p>
        <code>h = (h × {HASH_BASE} + código Unicode del carácter) mod {HASH_MODULUS}</code>
        <p>Al mover la ventana, restamos el carácter que sale, desplazamos el hash y sumamos el que entra. Así no recalculamos toda la subcadena.</p>
        <code>h siguiente = ((h − código(sale) × {HASH_BASE}<sup>m − 1</sup>) × {HASH_BASE} + código(entra)) mod {HASH_MODULUS}</code>
        <p>m es la longitud del patrón. El módulo se ajusta para obtener un resultado entre 0 y {HASH_MODULUS - 1}.</p>
        {current?.previousHash !== null && current?.previousHash !== undefined && (
          <div className="rolling-example">
            <strong>Cálculo de la ventana actual</strong>
            <code>
              (({current.previousHash} − {current.outgoing.codePointAt(0)} × {simulation.highestPower}) × {HASH_BASE} + {current.incoming.codePointAt(0)}) mod {HASH_MODULUS} = {current.hash}
            </code>
          </div>
        )}
        <p><strong>Importante:</strong> hashes iguales pueden ser una colisión. Siempre verificamos también los caracteres antes de contar una coincidencia.</p>
      </div>
    </details>
  )
}
