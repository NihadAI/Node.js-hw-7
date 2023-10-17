import './ticker.css'

function Ticker() {
  return (
    <div className="ticker-wrap">
        <ul className="ticker">
            <li className="ticker__item">New York</li>
            <li className="ticker__item">Los Angeles</li>
            <li className="ticker__item">Kyiv</li>
            <li className="ticker__item">Paris</li>
            <li className="ticker__item">Berlin</li>
            <li className="ticker__item">Warszawa</li>
        </ul>
    </div>
  )
}

export default Ticker