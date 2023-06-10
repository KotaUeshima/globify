interface SignUpUser {
  firstName: string
  lastName: string
  email: string
  password: string
}

interface SignUpError {
  firstName: string[]
  lastName: string[]
  email: string[]
  password: string[]
}

interface SignUpBackendError {
  errors: string[]
}
