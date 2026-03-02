import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext"

interface Inscripcion {
  id: number
  curso: string
  fecha: string
}

const MisInscripciones = () => {
  const { token } = useContext(AuthContext)
const [inscripciones, setInscripciones] = useState<Inscripcion[]>([])

useEffect(() => {
  fetch("http://localhost:8080/inscripciones/mis-inscripciones", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => {
      if (!res.ok) {
        throw new Error("Error al traer inscripciones")
      }
      return res.json()
    })
    .then(data => {
      console.log("Inscripciones:", data)
      setInscripciones(data)
    })
    .catch(err => console.error(err))
}, [token])

  return (
    <div>
      <h1>Mis Inscripciones</h1>
      {inscripciones.length === 0 ? (
  <p>No estás inscripto en ningún curso.</p>
) : (
  inscripciones.map(ins => (
    <div key={ins.id} className="bg-gray-800 p-4 rounded mb-2">
      <p className="font-bold">{ins.curso}</p>
      <p className="text-sm text-gray-400">{ins.fecha}</p>
    </div>
  ))
)}
    </div>
  )
}

export default MisInscripciones