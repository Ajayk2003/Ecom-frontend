import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useQuery } from '@tanstack/react-query'
import { useToast } from '@/components/ui/use-toast'
import { useAuth } from '@/auth/authContext'

type SellerData = {
  id: number
  firstName: string
  secondName: string
  email: string
  sellerDescription: string
  isDeleted: boolean
  createdAt: string
  updatedAt: string
}

export default function SellersPage() {
  const { toast } = useToast()
  const { token } = useAuth()
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5002/api/sellers/', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()
      if (response.ok) {
        return data
      }

      throw new Error(data.message)
    } catch (error) {
      console.error('Error fetching sellers:', error)
    }
  }

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ['sellerData'],
    queryFn: fetchData,
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    toast({
      title: error.message,
    })
    return
  }
  console.log(data)
  return (
    <div className="max-w-[1000px] mt-5  w-full mx-auto">
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data &&
            data?.map(seller => (
              <TableRow key={seller.id}>
                <TableCell>{seller.id}</TableCell>
                <TableCell>{seller.firstName}</TableCell>
                <TableCell>{seller.lastName}</TableCell>
                <TableCell>{seller.email}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  )
}
