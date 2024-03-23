import { useAuth } from '@/auth/authContext'
import { Route, Navigate } from 'react-router-dom'

// Define the type for the user role
type UserRole = 'user' | 'admin' | 'seller'

interface ProtectedRouteProps {
  children: React.ReactNode
  redirectTo: string
  role: UserRole
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, redirectTo, role }) => {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    // Show a loading indicator while authentication is being checked
    return <div>Loading...</div>
  }

  if (!user) {
    // Redirect to login if not authenticated
    return <Navigate to={redirectTo} replace />
  }

  // If role is specified, check for authorized role before rendering children
  if (role && user.type !== role) {
    // Redirect to unauthorized route if role doesn't match
    return <Navigate to={redirectTo!} replace />
  }

  return children
}

export default ProtectedRoute
