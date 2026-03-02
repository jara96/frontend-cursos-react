import { useEffect, useState, useContext } from "react"
import {crearCurso, getCursos, inscribirse, eliminarCurso } from "../api/api"
import { AuthContext } from "../context/AuthContext"
import Navbar from "../components/Navbar"
import type{ Curso } from "../types/types"
import { useNavigate } from "react-router-dom"
import CrearUsuario from "./CrearUsuario"
import AdminUsuarios from "./AdminUsuarios"



const Dashboard = () => {

  const { token, role } = useContext(AuthContext)
  const [cursos, setCursos] = useState<Curso[]>([])

  const [nombre, setNombre] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [cupo, setCupo] = useState(0)
  const navigate = useNavigate()

  

  useEffect(() => {
    if (token) {
      getCursos(token).then(setCursos)
    }
  }, [token])

  const handleInscripcion = async (id: number) => {
    if (!token) return
    await inscribirse(id, token)
    alert("Inscripto correctamente")
    
  }


  const handleCrearCurso = async () => {
  if (!token) return

  await crearCurso({ nombre, descripcion, cupo }, token)

  alert("Curso creado")
  getCursos(token).then(setCursos)

  setNombre("")
  setDescripcion("")
  setCupo(0)
}



  const handleEliminar = async (id: number) => {
  if (!token) return

  await eliminarCurso(id, token)
  alert("Curso eliminado")

  getCursos(token).then(setCursos)
}
  return (
    <>
      <Navbar />
<button
  onClick={() => navigate("/mis-inscripciones")}
  className="mb-4 bg-purple-500 text-white px-4 py-2 rounded"
>
  Ver Mis Inscripciones
</button>
      <div className="p-6 grid grid-cols-3 gap-4">
        {cursos.map(curso => (
          <div key={curso.id} className="border p-4 rounded-xl shadow">

            <h3 className="font-bold">{curso.nombre}</h3>
            <p>{curso.descripcion}</p>

            {/* USER */}
            {role === "ROLE_USER" && (
              <button
                onClick={() => handleInscripcion(curso.id)}
                className="mt-2 bg-green-500 text-white px-3 py-1 rounded"
              >
                Inscribirse
              </button>
            )}

            {/* ADMIN */}
            {role === "ROLE_ADMIN" && (
              <button
                className="mt-2 bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => handleEliminar(curso.id)}
              >
                Eliminar Curso
              </button>
            )}
          </div>
        ))}
      </div>

      {role === "ROLE_ADMIN" && (
  <div className="p-6 bg-gray-100 rounded mb-6">

    <h2 className="font-bold mb-2">Crear Curso</h2>

    <input
      className="border p-2 mr-2"
      placeholder="Nombre"
      value={nombre}
      onChange={e => setNombre(e.target.value)}
    />

    <input
      className="border p-2 mr-2"
      placeholder="Descripción"
      value={descripcion}
      onChange={e => setDescripcion(e.target.value)}
    />

    <input
      className="border p-2 mr-2"
      type="number"
      placeholder="Cupo"
      value={cupo}
      onChange={e => setCupo(Number(e.target.value))}
    />

    <button
      onClick={handleCrearCurso}
      className="bg-blue-500 text-white px-3 py-2 rounded"
    >
      Crear
    </button>
{role === "ROLE_ADMIN" && <CrearUsuario />}
{role === "ROLE_ADMIN" && <AdminUsuarios />}
  </div>
)}
    </>
  )
}

export default Dashboard