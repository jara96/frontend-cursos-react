export interface Curso {
  id: number
  nombre: string
  descripcion: string
  cupo: number
}

export interface LoginRequest {
  email: string
  password: string
}

export interface AuthResponse {
  token: string
}