
import { useEffect, useState } from 'react'

import {
  getDestinatii,
  postDestinatie,
  patchVizitat,
  deleteDestinatie
} from './api/destinatii.js'

import {
  getNevizitate,
  totalZile
} from './utils/destinatii.js'

import ListaDestinatii from './components/ListaDestinatii.jsx'
import FormularDestinatie from './components/FormularDestinatie.jsx'
import Rezumat from './components/Rezumat.jsx'
import Cautare from './components/Cautare.jsx'

import './App.css'

export default function App() {
  const [destinatii, setDestinatii] = useState([])
  const [incarcare, setIncarcare] = useState(true)
  const [eroare, setEroare] = useState(null)
  const [eroareActiune, setEroareActiune] = useState(null)

  const [seTrimite, setSeTrimite] = useState(false)
  const [cautare, setCautare] = useState('')

  const [pagina, setPagina] = useState(1)
  const [totalPagini, setTotalPagini] = useState(1)

  useEffect(() => {
    let activ = true

    async function incarca() {
      try {
        const rezultat = await getDestinatii(pagina)

        if (activ) {
          setDestinatii(rezultat.data)
          setTotalPagini(rezultat.pages || 1)
          setEroare(null)
        }
      } catch (error) {
        if (activ) {
          setEroare(error.message)
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
  }, [pagina])

  async function handleToggle(id) {
    const destinatie = destinatii.find((d) => d.id === id)

    if (!destinatie) {
      return
    }

    setEroareActiune(null)

    try {
      const salvata = await patchVizitat(
        id,
        !destinatie.vizitat
      )

      setDestinatii((curent) =>
        curent.map((d) =>
          d.id === id ? salvata : d
        )
      )
    } catch (error) {
      setEroareActiune(error.message)
    }
  }

  async function handleAdd(destinatie) {
    setSeTrimite(true)
    setEroareActiune(null)

    try {
      await postDestinatie(destinatie)

      const rezultat = await getDestinatii(pagina)

      setDestinatii(rezultat.data)
      setTotalPagini(rezultat.pages || 1)

      return true
    } catch (error) {
      setEroareActiune(error.message)
      return false
    } finally {
      setSeTrimite(false)
    }
  }

  async function handleDelete(id) {
    setEroareActiune(null)

    try {
      await deleteDestinatie(id)

      const rezultat = await getDestinatii(pagina)

      if (rezultat.data.length === 0 && pagina > 1) {
        schimbaPagina(pagina - 1)
      } else {
        setDestinatii(rezultat.data)
        setTotalPagini(rezultat.pages || 1)
      }
    } catch (error) {
      setEroareActiune(error.message)
    }
  }

  function schimbaPagina(paginaNoua) {
    setIncarcare(true)
    setEroare(null)
    setCautare('')
    setPagina(paginaNoua)
  }

  const text = cautare.trim().toLowerCase()

  const afisate = destinatii.filter(
    (d) =>
      d.oras.toLowerCase().includes(text) ||
      d.tara.toLowerCase().includes(text)
  )

  const nevizitate = getNevizitate(destinatii)

  return (
    <main>
      <h1>City Explorer</h1>

      {incarcare ? (
        <p className="stare">
          Se incarca destinatiile...
        </p>
      ) : eroare ? (
        <p className="stare eroare">
          Eroare: {eroare}
        </p>
      ) : (
        <>
          <Rezumat
            total={destinatii.length}
            nevizitate={nevizitate.length}
            zile={totalZile(nevizitate)}
          />

          <FormularDestinatie
            onAdd={handleAdd}
            seTrimite={seTrimite}
          />

          {eroareActiune && (
            <p className="stare eroare">
              {eroareActiune}
            </p>
          )}

          <Cautare
            valoare={cautare}
            onChange={setCautare}
          />

          {destinatii.length === 0 ? (
            <p className="gol">
              Nu exista destinatii. Adauga una folosind formularul.
            </p>
          ) : afisate.length === 0 ? (
            <p className="gol">
              Niciun rezultat pentru «{cautare.trim()}».
            </p>
          ) : (
            <ListaDestinatii
              destinatii={afisate}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          )}

          <div className="paginare">
            <button
              type="button"
              disabled={pagina === 1}
              onClick={() => schimbaPagina(pagina - 1)}
            >
              Inapoi
            </button>

            <span>
              pagina {pagina} din {totalPagini}
            </span>

            <button
              type="button"
              disabled={pagina >= totalPagini}
              onClick={() => schimbaPagina(pagina + 1)}
            >
              Inainte
            </button>
          </div>
        </>
      )}
    </main>
  )
}
