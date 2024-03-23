import { useQuery } from '@tanstack/react-query'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuContent,
  DropdownMenuGroup,
} from './ui/dropdown-menu'
import { useAuth } from '@/auth/authContext'
import { useToast } from './ui/use-toast'

export function UserNav() {
  const { logout, user, token } = useAuth()
  const { toast } = useToast()
  const getUserById = async () => {
    const res = await fetch(`http://localhost:5002/api/auth/current/${user?.id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const data = await res.json()
    if (res.ok) {
      console.log(data)
      return data
    }
    toast({
      title: data.message,
    })
    throw new Error(data.message)
  }

  const {
    data: userData,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['userData'],
    queryFn: getUserById,
  })
  if (isLoading) {
    return <div>Loading</div>
  }
  if (isError) {
    console.log(error)
    toast({
      title: error.message,
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8 outline-none ring-0">
            <AvatarImage src="/avatars/01.png" alt="ajay" className="outline-none ring-0" />
            <AvatarFallback>
              {userData.firstName.charAt(0).toUpperCase() + userData.lastName.charAt(0).toUpperCase()}
            </AvatarFallback>
            {/* <AvatarFallback>ajay</AvatarFallback> */}
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{userData.firstName}</p>
            <p className="text-xs leading-none text-muted-foreground">{userData.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Profile</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
