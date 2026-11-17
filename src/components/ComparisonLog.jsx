export default function ComparisonLog({ history }) {
  return (
    <section className="panel history-panel" aria-labelledby="history-heading">
      <div className="history-heading">
        <h2 id="history-heading">Historial de comparaciones</h2>
        <span className="pill" aria-label={`${history.length} comparaciones`}>{history.length}</span>
      </div>
      {history.length === 0 ? <p className="history-empty">Aún no hay comparaciones.</p> : (
        <div className="table-scroll" tabIndex={0} role="region" aria-label="Historial de ventanas comparadas">
          <table>
            <thead>
              <tr><th scope="col">Índice</th><th scope="col">Subcadena</th><th scope="col">Hash</th><th scope="col">Resultado</th></tr>
            </thead>
            <tbody>
              {[...history].reverse().map((entry) => (
                <tr key={entry.index}>
                  <td>{entry.index}</td>
                  <td><code className="literal-text">{entry.substring}</code></td>
                  <td><code>{entry.hash}</code></td>
                  <td>
                    <span className={`result-tag${entry.isMatch ? ' result-tag--match' : entry.isCollision ? ' result-tag--collision' : ''}`}>
                      {entry.isMatch ? 'Coincidencia' : entry.isCollision ? 'Colisión' : 'Sin coincidencia'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
