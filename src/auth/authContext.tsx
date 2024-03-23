import { createContext, useContext, useState, useEffect } from 'react'

// Define types for your users
type UserType = 'user' | 'admin' | 'seller'

// Define the shape of your user object
interface User {
  id: string
  role: UserType
  email: string
  // Add other user properties here as needed
}

type UserBody = {
  email: string
  password: string
  role: 'admin' | 'seller' | 'user'
}
// Define the shape of your authentication context
interface AuthContextType {
  token: string | null
  user: User | null
  login: (data: UserBody) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

// Create the initial context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Custom hook to access the authentication context
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Define your AuthProvider component
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null)
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true)

  useEffect(() => {
    // Check authentication status on component mount
    localStorage.getItem('token')
    if (token) {
      verifyToken(token)
    } else {
      setIsAuthenticated(false)
    }
  }, [])

  const baseUrl = 'http://localhost:5002/api/auth'
  // Function to handle login
  const login = async ({ email, password, role }: UserBody) => {
    const response = await fetch('http://localhost:5002/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, role }),
    })
    if (response.ok) {
      const { token } = await response.json()
      localStorage.setItem('token', token)
      await verifyToken(token)
    } else {
      // Handle login error
      const data = await response.json()
      console.error('Login failed' + ' error : ' + data.message)
      throw new Error(data.message)
    }
  }

  // Function to handle token verification
  const verifyToken = async (token: string) => {
    try {
      const response = await fetch(baseUrl + '/current', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (response.ok) {
        const user = await response.json()
        setUser(user)
      } else {
        const data = await response.json()
        // Handle token verification error
        console.error(data.message)
        localStorage.removeItem('token')
      }
    } catch (error) {
      console.error('Token verification error:', error)
    }
  }

  // Function to handle logout
  const logout = () => {
    setUser(null)
    localStorage.removeItem('token')
  }

  // Create the context value
  const contextValue: AuthContextType = {
    token,
    user,
    login,
    logout,
    isAuthenticated,
  }

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}
