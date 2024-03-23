import { MoreHorizontalIcon } from 'lucide-react'
import { Button } from '../ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Label } from '../ui/label'
import { Input } from '../ui/Input'
import axios from 'axios'
import { useAuth } from '@/auth/authContext'
import { useToast } from '../ui/use-toast'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function OrderActionBtn({ order }) {
  const { toast } = useToast()
  const { token } = useAuth()
  const navigate = useNavigate()
  const [status, setStatus] = useState(order.status)
  const changeOrderStatus = async () => {
    const res = await axios.put(
      `http://localhost:5002/api/orders/`,
      {
        ...order,
        status,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    const data = res.data
    if (res.status > 299) throw new Error(res.data.message)
    console.log(data)
    toast({
      title: data.message,
    })
    navigate('/admin/orders', { replace: true })
  }

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="ghost">
            <MoreHorizontalIcon className="w-4 h-4" />
            <span className="sr-only">Actions</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DialogTrigger>
            <DropdownMenuItem>Update</DropdownMenuItem>
          </DialogTrigger>
          <DialogTrigger>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle> Edit Details </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Order Id</Label>
            <Input id="name" placeholder="Enter your name" value={order.id} disabled />
          </div>

          <Select onValueChange={val => setStatus(val)}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cancelled">cancelled</SelectItem>
              <SelectItem value="shipped">shipped</SelectItem>
              <SelectItem value="delivered">delivered</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={() => changeOrderStatus()}>
            Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default OrderActionBtn
