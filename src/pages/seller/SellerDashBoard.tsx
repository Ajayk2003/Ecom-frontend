/**
 * v0 by Vercel.
 * @see https://v0.dev/t/xlwc4xA4HWI
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { useAuth } from '@/auth/authContext'
import { CardTitle, CardHeader, CardContent, Card } from '@/components/ui/card'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

import { BaggageClaim, IndianRupeeIcon, PackageCheck, BaggageClaimIcon } from 'lucide-react'

export default function SellerDashboard() {
  const { token } = useAuth()
  const fetchSellerInfo = async () => {
    const res = await axios.get('http://localhost:5002/api/sellers/SELLERINFO', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const data = res.data
    if (res.status > 299) throw new Error(data.message)
    return data
  }

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ['sellerInfo'],
    queryFn: fetchSellerInfo,
  })
  if (isLoading) {
    return <div>Loading...</div>
  }
  if (isError) {
    return <div>{error.message} Error Occured </div>
  }
  if (data) {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Products Sold</CardTitle>
            <BaggageClaim className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.sales}</div>
            <div />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <IndianRupeeIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{data.revenue}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Inventory</CardTitle>
            <PackageCheck className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.inventory}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">350 remaining</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
            <BaggageClaimIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.orders}</div>
          </CardContent>
        </Card>
      </div>
    )
  }
}
