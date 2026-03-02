const API_URL = "http://localhost:8080"

export const loginRequest = async (data: any) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })

  if (!response.ok) {
    throw new Error("Error en login")
  }

  return response.text()
}

export const getCursos = async (token: string) => {
  const response = await fetch(`${API_URL}/cursos`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return response.json()
}

export const inscribirse = async (cursoId: number, token: string) => {
  const response = await fetch(`${API_URL}/inscripciones/${cursoId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(errorText)
  }

  return response.json()
}

export const crearCurso = async (data: any, token: string) => {
  const response = await fetch("http://localhost:8080/cursos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  })

  if (!response.ok) {
    throw new Error("Error al crear curso")
  }

  return response.json()
}

export const eliminarCurso = async (id: number, token: string) => {
  const response = await fetch(`http://localhost:8080/cursos/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  if (!response.ok) {
    throw new Error("Error al eliminar")
  }
}


export const getMisInscripciones = async (token: string) => {
  const response = await fetch(
    "http://localhost:8080/inscripciones/mis-inscripciones",
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )

  if (!response.ok) {
    throw new Error("Error al obtener inscripciones")
  }

  return response.json()
}