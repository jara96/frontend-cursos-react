import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useContext } from "react"
import { AuthContext, AuthProvider } from "./context/AuthContext"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import MisInscripciones from "./pages/MisInscripciones"

const AppRoutes = () => {
  const { token } = useContext(AuthContext)

  return (
    <Routes>
      <Route
        path="/"
        element={token ? <Navigate to="/dashboard" /> : <Login />}
      />

      <Route
        path="/dashboard"
        element={token ? <Dashboard /> : <Navigate to="/" />}
      />

    <Route
  path="/mis-inscripciones"
  element={token ? <MisInscripciones /> : <Navigate to="/" />}
/>
    </Routes>
  )
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App