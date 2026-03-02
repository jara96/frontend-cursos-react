import { useState, useContext } from "react"
import { loginRequest } from "../api/api"
import { AuthContext } from "../context/AuthContext"

const Login = () => {

  const { login } = useContext(AuthContext)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async () => {
    try {
        const token = await loginRequest({ email, password })
        login(token)
    } catch (error) {
      alert("Credenciales incorrectas")
    }
  }

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-md w-80">
        <h2 className="text-xl font-bold mb-4">Login</h2>

        <input
          className="border w-full p-2 mb-2"
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />

        <input
          className="border w-full p-2 mb-4"
          type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white w-full py-2 rounded"
        >
          Ingresar
        </button>
      </div>
    </div>
  )
}

export default Login