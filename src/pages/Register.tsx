import { CardTitle, CardDescription, CardHeader, CardContent, Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/button'
import { useEffect } from 'react'
import { useRegisterStore } from '@/hooks/useRegisterStore'
import { useNavigate } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { useForm } from 'react-hook-form'
import { useToast } from '@/components/ui/use-toast'

export default function UserRegister() {
  const { toast } = useToast()

  const passwordRequirements = {
    minLength: 8,
    maxLength: 30,
    hasLowerCase: true,
    hasUpperCase: true,
    hasNumber: true,
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()
  const { step, nextStep, resetStep } = useRegisterStore()
  const navigate = useNavigate()

  useEffect(() => {}, [resetStep])

  const onSubmitHandler = async data => {
    console.log(data)
    try {
      const response = await fetch('http://localhost:5002/api/auth/register/user', {
        body: JSON.stringify(data),
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const resData = await response.json()
      reset()
      if (response.ok) {
        console.log(resData)
        toast({
          title: 'Registered Successfully',
          description: resData.message,
        })
        navigate('/login/user')
        return
      }
      toast({
        title: 'Registration Failed',
        description: resData.message,
        variant: 'destructive',
      })
      resetStep()
      navigate('/register/', {})
      // Handle the response data here, potentially storing tokens securely
    } catch (err) {
      console.log(err)
      // Handle errors, potentially displaying them to the user
    }
  }

  const onSubmit = data => {
    console.log(data)
    nextStep()
  }
  const emailForm = () => {
    return (
      <Card className="mx-auto md:min-w-[400px]" onSubmit={handleSubmit(onSubmit)}>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Register</CardTitle>
          <CardDescription>Enter your Email to sign up</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="m@example.com"
                {...register('email', { required: true, pattern: /^[^@]+@[^@]+\.[^@]+$/ })}
              />
              {errors.email?.type === 'required' && <span className="text-red-500 text-xs">Email is required</span>}
              {errors.email?.type === 'pattern' && <span className="text-red-500 text-xs">Invalid email format</span>}
            </div>
            <Button className="w-full" type="submit">
              Next
            </Button>
          </form>
        </CardContent>
      </Card>
    )
  }

  const otpForm = () => {
    return (
      <Card className="mx-auto md:min-w-[400px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Verification</CardTitle>
          <CardDescription>Enter the Verification code</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="code">One Time Passcode</Label>
                <Input
                  {...register('code', {
                    required: 'Verification code is required',
                    minLength: 6,
                    maxLength: 6,
                    pattern: /^\d{6}$/, // Ensure exactly 6 digits
                  })}
                  id="code"
                  placeholder="XXX XXX"
                  type="text"
                />
                {errors.email?.type === 'required' && <span className="text-red-500 text-xs">Enter the Code</span>}
                {errors.email?.type === 'pattern' && <span className="text-red-500 text-xs">Invalid code length</span>}
              </div>
              <Button className="w-full" type="submit">
                Next
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    )
  }

  const infoForm = () => {
    return (
      <Card className="mx-auto md:min-w-[400px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Personal Information</CardTitle>
          <CardDescription>Enter your Information Further</CardDescription>
        </CardHeader>
        <CardContent>
          <input hidden />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  {...register('firstName', {
                    required: 'First name is required',
                    minLength: 2,
                    maxLength: 30,
                  })}
                  id="firstName"
                  type="text"
                  // No need for `value` and `onChange` with React Hook Form
                />
                {errors.firstName && <span className="text-red-500 text-xs">{errors.firstName.message}</span>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  {...register('lastName', {
                    required: 'Last name is required',
                    minLength: 2,
                    maxLength: 30,
                  })}
                  id="lastName"
                  type="text"
                  // No need for `value` and `onChange` with React Hook Form
                />
                {errors.lastName && <span className="text-red-500 text-xs">{errors.lastName.message}</span>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  {...register('phone', {
                    required: 'Phone number is required',
                    pattern: /^[0-9]+$/,
                    // You can add a pattern validation for phone format if needed
                  })}
                  id="phone"
                  type="tel"
                  // No need for `value` and `onChange` with React Hook Form
                />
                {errors.phone?.type == 'pattern' && <span className="text-red-500 text-xs">Enter a Valid phone</span>}
                {errors.phone?.type == 'required' && (
                  <span className="text-red-500 text-xs">Phone number is required</span>
                )}
              </div>
              <Button className="w-full" type="submit">
                Register
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    )
  }

  const passwordForm = () => {
    const validatePassword = value => {
      const { minLength, maxLength, hasLowerCase, hasUpperCase, hasNumber } = passwordRequirements
      const errors = []

      if (value.length < minLength) {
        errors.push(`Password must be at least ${minLength} characters long.`)
      }
      if (maxLength && value.length > maxLength) {
        errors.push(`Password cannot exceed ${maxLength} characters.`)
      }
      if (!/[a-z]/.test(value) && hasLowerCase) {
        errors.push('Password must contain at least one lowercase letter.')
      }
      if (!/[A-Z]/.test(value) && hasUpperCase) {
        errors.push('Password must contain at least one uppercase letter.')
      }
      if (!/[0-9]/.test(value) && hasNumber) {
        errors.push('Password must contain at least one number.')
      }

      return errors.length > 0 ? errors.join('\n') : undefined // Return a string of error messages or null if valid
    }

    return (
      <Card className="mx-auto md:min-w-[400px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Password</CardTitle>
          <CardDescription>Choose a Strong password</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  {...register('password', { validate: validatePassword })}
                  id="password"
                  type="password"
                  // No need for `value` and `onChange` with React Hook Form
                />
                {errors.password && (
                  <div className="text-red-500 text-xs">
                    {errors.password.message.split('.').map((err, index) => (
                      <span key={index}>
                        {err} <br></br>
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <Button className="w-full" type="submit">
                Finish up
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    )
  }

  const renderForm = () => {
    switch (step) {
      case 1:
        return emailForm()
      case 2:
        return otpForm()
      case 3:
        return infoForm()
      case 4:
        return passwordForm()
      default:
        return null
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      {renderForm()}
      <Toaster />
    </div>
  )
}
