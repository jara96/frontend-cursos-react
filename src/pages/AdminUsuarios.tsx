import { useEffect, useState, useContext } from "react"
import { AuthContext } from "../context/AuthContext"

interface Usuario {
  id: number
  nombre: string
  email: string
  roles: string[]
}

interface PageResponse {
  content: Usuario[]
  page: number
  size: number
  totalElements: number
  totalPages: number
}

const AdminUsuarios = () => {
  const { token } = useContext(AuthContext)

  // 🔥 Estado inicial válido (NO null)
  const [data, setData] = useState<PageResponse>({
    content: [],
    page: 0,
    size: 5,
    totalElements: 0,
    totalPages: 0
  })

  const [search, setSearch] = useState("")
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(false)
  const [rol, setRol] = useState<string>("")

  const fetchUsuarios = async () => {
    if (!token) return

    setLoading(true)

    try {
      const res = await fetch(
  `http://localhost:8080/admin/usuarios?search=${search}&rol=${rol}&page=${page}&size=5`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (!res.ok) throw new Error("Error al traer usuarios")

      const json: PageResponse = await res.json()
      setData(json)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsuarios()
  }, [page, search, rol])

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold mb-4">Lista de Usuarios</h2>
<div className="flex gap-2 mb-4">
  <button
    onClick={() => {
      setRol("")
      setPage(0)
    }}
    className="bg-gray-700 px-4 py-2 rounded"
  >
    Todos
  </button>

  <button
    onClick={() => {
      setRol("ROLE_ADMIN")
      setPage(0)
    }}
    className="bg-red-600 px-4 py-2 rounded"
  >
    Admins
  </button>

  <button
    onClick={() => {
      setRol("ROLE_USER")
      setPage(0)
    }}
    className="bg-green-600 px-4 py-2 rounded"
  >
    Users
  </button>
</div>
      {/* BUSCADOR */}
      <div className="flex gap-2 mb-4">
        <input
          className="bg-gray-700 p-2 rounded w-full"
          placeholder="Buscar por nombre o email"
          value={search}
          onChange={e => {
            setPage(0)
            setSearch(e.target.value)
          }}
        />
      </div>

      {/* TABLA */}
      <div className="bg-gray-800 rounded p-4 min-h-[200px]">
        {loading && <p>Cargando...</p>}

        {!loading && data.content.length === 0 && (
          <p className="text-gray-400">No se encontraron usuarios</p>
        )}

        {!loading &&
          data.content.map(usuario => (
            <div
              key={usuario.id}
              className="border-b border-gray-700 py-2"
            >
              <p className="font-bold">{usuario.nombre}</p>
              <p className="text-sm text-gray-400">{usuario.email}</p>
              <p className="text-xs text-yellow-400">
                {usuario.roles.join(", ")}
              </p>
            </div>
          ))}
      </div>

      {/* PAGINACIÓN */}
      <div className="flex justify-between mt-4 items-center">
        <button
          disabled={page === 0}
          onClick={() => setPage(prev => prev - 1)}
          className="bg-gray-700 px-4 py-2 rounded disabled:opacity-50"
        >
          Anterior
        </button>

        <span>
          Página {data.page + 1} de {data.totalPages}
        </span>

        <button
          disabled={page >= data.totalPages - 1}
          onClick={() => setPage(prev => prev + 1)}
          className="bg-gray-700 px-4 py-2 rounded disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </div>
  )
}

export default AdminUsuarios