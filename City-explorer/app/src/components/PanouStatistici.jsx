
import { useEffect, useState } from 'react'

export default function PanouStatistici() {
  const [destinatii, setDestinatii] = useState([])
  const [incarcare, setIncarcare] = useState(true)
  const [eroare, setEroare] = useState(null)
  const [prag, setPrag] = useState('3')

  useEffect(() => {
    let activ = true

    async function incarca() {
      try {
        const response = await fetch('http://localhost:3001/destinatii')

        if (!response.ok) {
          throw new Error(`Serverul a raspuns cu ${response.status}`)
        }

        const date = await response.json()

        if (activ) {
          setDestinatii(date)
        }
      } catch (err) {
        if (activ) {
          setEroare(err.message)
        }
      } finally {
        if (activ) {
          setIncarcare(false)
        }
      }
    }

    incarca()

    return () => {
      activ = false
    }
  }, [])

  if (incarcare) {
    return <p className="stare">Se incarca statisticile...</p>
  }

  if (eroare) {
    return (
      <p className="stare eroare">
        Statistici indisponibile: {eroare}
      </p>
    )
  }

  const filtrate = destinatii.filter(
    (d) => d.zile >= Number(prag)
  )

  const totalZile = filtrate.reduce(
    (suma, d) => suma + Number(d.zile), 0
  )

  const medie = filtrate.length === 0
    ? 0
    : totalZile / filtrate.length

  return (
    <section className="panou">
      <h2>Statistici</h2>

      <label>
        Cel putin{' '}
        <input
          type="number"
          value={prag}
          onChange={(event) => setPrag(event.target.value)}
        />{' '}
        zile
      </label>

      {filtrate.length === 0 && (
        <p className="gol">
          Nicio destinatie cu cel putin {prag} zile.
        </p>
      )}

      {filtrate.length > 0 && (
        <ul>
          <li>Destinatii: {filtrate.length}</li>
          <li>Total zile: {totalZile}</li>
          <li>Media: {medie.toFixed(1)} zile</li>
        </ul>
      )}
    </section>
  )
}
