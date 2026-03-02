import { useState, useContext } from "react"
import { AuthContext } from "../context/AuthContext"

const CrearUsuario = () => {
  const { token } = useContext(AuthContext)

  const [nombre, setNombre] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rol, setRol] = useState("ROLE_USER")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const response = await fetch(
      "http://localhost:8080/auth/admin/crear-usuario",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nombre,
          email,
          password,
          rol,
        }),
      }
    )

    if (!response.ok) {
      alert("Error al crear usuario")
      return
    }

    alert("Usuario creado correctamente")
    setNombre("")
    setEmail("")
    setPassword("")
  }

  return (
    <div className="bg-gray-800 p-6 rounded mt-6">
      <h2 className="text-xl font-bold mb-4">Crear Usuario</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          className="w-full p-2 rounded bg-gray-700"
          placeholder="Nombre"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
        />

        <input
          className="w-full p-2 rounded bg-gray-700"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-2 rounded bg-gray-700"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <select
          className="w-full p-2 rounded bg-gray-700"
          value={rol}
          onChange={e => setRol(e.target.value)}
        >
          <option value="ROLE_USER">USER</option>
          <option value="ROLE_ADMIN">ADMIN</option>
        </select>

        <button className="bg-blue-600 px-4 py-2 rounded">
          Crear
        </button>
      </form>
    </div>
  )
}

export default CrearUsuario