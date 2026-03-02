import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

const Navbar = () => {

  const { role, logout } = useContext(AuthContext)

  return (
    <div className="bg-gray-800 text-white p-4 flex justify-between">
      <h1 className="font-bold">Prueba Seguridad</h1>

      <div className="flex gap-4 items-center">
        <span>{role}</span>
        
        <button
          onClick={logout}
          className="bg-red-500 px-3 py-1 rounded"
        >
          Salir
        </button>
      </div>
    </div>
  )
}

export default Navbar