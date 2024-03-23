// Requests Base URL
const baseUrl = 'http://localhost:5002/api'

type registerData = {
  firstName: string
  lastName?: string
  phone: number
  email: string
  password: string
}

//User Login
export const userLogin = async (data: { email: string; password: string }) => {
  const res = await fetch(`${baseUrl}/users/login`, {
    method: 'POST',
    body: JSON.stringify(data),
  })

  if (res.ok) {
    const data = await res.json()
    localStorage.setItem('token', data.token)
    console.log('Token stored successfully')
    return 'Logged in successfully'
  } else {
    throw new Error('Login Failed')
  }
}

export const userRegister = async (data: registerData) => {
  const res = await fetch(`${baseUrl}/users/register`, {
    method: 'POST',
    body: JSON.stringify(data),
  })

  if (res.ok) {
    const data = res.json()
    console.log(res)
    return data
  } else {
    throw new Error('Registration failed')
  }
}

export const userCurrent = async (token: string) => {
  const res = await fetch(`${baseUrl}/api/users/current`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (res.ok) {
    const data = await res.json()
    return data
  } else {
    throw new Error('User Login failed')
  }
}
