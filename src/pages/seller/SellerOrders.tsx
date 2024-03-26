import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useQuery } from '@tanstack/react-query'
import { useToast } from '@/components/ui/use-toast'
import { useAuth } from '@/auth/authContext'
import ActionBtn from '@/components/ActionButton/ActionBtn'

export default function SellerOrders() {
  const { toast } = useToast()
  const { token } = useAuth()
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5002/api/orders/', {
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
      console.error('Error fetching orders:', error)
    }
  }

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ['orderData'],
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
        <TableCaption>A list of your recent Orders.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>User Id</TableHead>
            <TableHead>Items </TableHead>
            <TableHead>Total Price</TableHead>
            <TableHead>Order Status</TableHead>
            <TableHead> Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data &&
            data?.map(item => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.userId}</TableCell>
                <TableCell>{item.items.length}</TableCell>
                <TableCell>{item.totalPrice}</TableCell>
                <TableCell>{item.orderStatus}</TableCell>
                <TableCell>
                  <ActionBtn order={order} />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  )
}
