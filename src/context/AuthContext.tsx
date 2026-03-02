import { createContext, useState, useEffect } from "react"
import { jwtDecode } from "jwt-decode"

interface DecodedToken {
  sub: string
  exp: number
  role: string
}

interface AuthContextType {
  token: string | null
  role: string | null
  login: (token: string) => void
  logout: () => void
}
interface JwtPayload {
  sub: string
  role: string
  exp: number
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
)

export const AuthProvider = ({ children }: any) => {

  const [token, setToken] = useState<string | null>(null)
  const [role, setRole] = useState<string | null>(null)

 useEffect(() => {
  const savedToken = localStorage.getItem("token")

  if (savedToken) {
    const decoded: DecodedToken = jwtDecode(savedToken)

    const isExpired = decoded.exp * 1000 < Date.now()

    if (isExpired) {
      logout()
    } else {
      setToken(savedToken)
      setRole(decoded.role)
    }
  }
}, [])

  const login = (token: string) => {
  const decoded = jwtDecode<JwtPayload>(token)

  setToken(token)
  setRole(decoded.role)

  localStorage.setItem("token", token)
  localStorage.setItem("role", decoded.role)
}

  const logout = () => {
    localStorage.removeItem("token")
    setToken(null)
    setRole(null)
  }

  return (
    <AuthContext.Provider value={{ token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}