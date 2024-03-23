import { useAuth } from '@/auth/authContext'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { CalendarIcon } from 'lucide-react'

export default function OrdersPage() {
  const { token } = useAuth()
  const { toast } = useToast()

  const getOrders = async () => {
    const res = await axios.get('http://localhost:5002/api/orders/', {
      headers: {
        Authorization: `Bearer ${token} `,
      },
    })

    if (res.status > 299) throw new Error(res.data)
    return res.data
  }

  const { data, error, isError, isLoading } = useQuery({
    queryKey: ['ordersData'],
    queryFn: getOrders,
  })

  if (isLoading) {
    return <div>Loading.. Please wait</div>
  }

  if (isError) {
    toast({
      title: error.message,
    })
  }
  console.log(data)
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Your Orders</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Order #3210</CardTitle>
            <CardDescription>Shipped</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <span>February 20, 2022</span>
            </div>
            <Button size="sm">View order</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Order #3209</CardTitle>
            <CardDescription>Paid</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <span>January 5, 2022</span>
            </div>
            <Button size="sm">View order</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Order #3204</CardTitle>
            <CardDescription>Unfulfilled</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <span>August 3, 2021</span>
            </div>
            <Button size="sm">View order</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
