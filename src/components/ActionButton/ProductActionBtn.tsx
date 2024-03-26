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
import { useState } from 'react'

function ProductActionBtn({ product }) {
  const { toast } = useToast()
  const { token } = useAuth()
  const [updatedProduct, setUpdatedProduct] = useState(product)

  const updateProduct = async () => {
    const res = await axios.put(`http://localhost:5002/api/products/${product.id}`, updatedProduct, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const data = res.data
    if (res.status > 299) throw new Error(res.data.message)
    console.log(data)
    toast({
      title: data.message,
    })
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
          <DialogTitle> Edit Product </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="id">Product Id</Label>
            <Input id="id" placeholder="Enter your name" value={updatedProduct.id} disabled />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Product Price</Label>
            <Input id="price" placeholder="Enter Price" value={product.price} disabled />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Product Price</Label>
            <Input id="price" placeholder="Enter Price" value={product.price} disabled />
          </div>

          <Select onValueChange={val => setUpdatedProduct({ ...updatedProduct, category: val })}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Electronics">Electronics</SelectItem>
              <SelectItem value="Clothings">Clothings</SelectItem>
              <SelectItem value="Furnitures">Furnitures</SelectItem>
              <SelectItem value="Home Appliances">Home Appliances</SelectItem>
              <SelectItem value="Grocery">Grocery</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={() => updateProduct()}>
            Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ProductActionBtn
