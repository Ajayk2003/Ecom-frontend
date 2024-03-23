import { CardTitle, CardDescription, CardHeader, CardContent, Card, CardFooter } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/button'
import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '@/auth/authContext'
import { useForm } from 'react-hook-form' // Import React Hook Form
import { useToast } from '@/components/ui/use-toast'
import { Toaster } from '@/components/ui/toaster'

type LoginPageProps = {
  role: 'admin' | 'user' | 'seller'
}

function LoginPage({ role }: LoginPageProps) {
  const { login, user } = useAuth()
  const navigate = useNavigate()
  const { toast } = useToast()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm() // Use useForm hook

  useEffect(() => {
    if (user) {
      if (user.role !== 'user') {
        navigate(`/${user.role}`)
      } else {
        navigate('/')
      }
    }
  }, [user])

  const onSubmitHandler = async data => {
    try {
      await login({ ...data, role })
    } catch (error) {
      toast({
        title: 'Login failed',
        description: error.message,
        variant: 'destructive',
      })
    }
  }

  return (
    <form className="flex items-center justify-center min-h-screen" onSubmit={handleSubmit(onSubmitHandler)}>
      <Card className="mx-auto max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">{role.charAt(0).toUpperCase() + role.slice(1)} Login</CardTitle>
          <CardDescription>Enter your email and password to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                {...register('email', { required: true, pattern: /^[^@]+@[^@]+\.[^@]+$/ })}
                placeholder="m@example.com"
              />
              {errors.email?.type === 'required' && <span className="text-red-500 text-xs">Email is required</span>}
              {errors.email?.type === 'pattern' && <span className="text-red-500 text-xs">Invalid email format</span>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                {...register('password', { required: true, minLength: 3 })} // Add password validation
                placeholder="Enter password"
              />
              {errors.password?.type === 'required' && (
                <span className="text-red-500 text-xs">Password is required</span>
              )}
              {errors.password?.type === 'minLength' && (
                <span className="text-red-500 text-xs">Password must be at least 6 characters</span>
              )}
            </div>
            <Button className="w-full" type="submit">
              Login
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <div className="text-center text-sm font-medium">
            {role === 'user' && (
              <>
                <Link className="underline" to="/login/admin">
                  Admin login
                </Link>
                <span className="mx-2 text-gray-500 dark:text-gray-400">|</span>
                <Link className="underline" to="/login/seller">
                  Seller login
                </Link>
              </>
            )}
            {role === 'admin' && (
              <>
                <Link className="underline" to="/login/user">
                  User login
                </Link>
                <span className="mx-2 text-gray-500 dark:text-gray-400">|</span>
                <Link className="underline" to="/login/seller">
                  Seller login
                </Link>
              </>
            )}
            {role === 'seller' && (
              <>
                <Link className="underline" to="/login/user">
                  User login
                </Link>
                <span className="mx-2 text-gray-500 dark:text-gray-400">|</span>
                <Link className="underline" to="/login/admin">
                  Admin login
                </Link>
              </>
            )}
          </div>
        </CardFooter>
      </Card>
      <Toaster />
    </form>
  )
}

export default LoginPage
