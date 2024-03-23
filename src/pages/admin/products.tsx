import { useAuth } from '@/auth/authContext'
import ActionBtn from '@/components/ActionButton/ActionBtn'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger, DialogFooter, DialogTitle, DialogContent, DialogHeader } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useToast } from '@/components/ui/use-toast'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

type Product = {
  id: number // Ensures integer type for `id` field
  name: string
  description: string
  price: number // Converts `Decimal` to `number` for simpler calculations
  imageUrl?: string | null // Optional field with nullable type
  category: string
  sellerId: number
  isDeleted: boolean
  createdAt: string
  updatedAt: string
}

function ProductsPage() {
  const [productData, setProductData] = useState<Product[] | null>()
  const { toast } = useToast()
  const navigate = useNavigate()
  const { token } = useAuth()

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch('http://localhost:5002/api/products/', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const data = await response.json()
        if (!response.ok) {
          toast({
            title: data.message,
          })
        }

        setProductData(data)
        console.log(productData)
      } catch (error) {
        console.error('Error fetching products:', error)
        // Handle the error appropriately, e.g., display an error message to the user
      }
    }
    getProducts()
  })

  if (productData) {
    return (
      <div className="border shadow-sm rounded-lg p-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Id</TableHead>
              <TableHead className="min-w-[150px]">Name</TableHead>
              <TableHead className="text-right">price</TableHead>
              <TableHead className="hidden md:table-cell">Description</TableHead>
              <TableHead className="hidden md:table-cell">Category</TableHead>
              <TableHead className="hidden sm:table-cell">Seller Id</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productData.map(product => (
              <TableRow>
                <TableCell className="font-medium">{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell className="text-right">{product.price}</TableCell>
                <TableCell className="hidden md:table-cell">{product.description}</TableCell>
                <TableCell className="hidden md:table-cell">{product.category}</TableCell>
                <TableCell className="hidden sm:table-cell">{product.sellerId}</TableCell>
                <TableCell className="text-right">
                  <Dialog>
                    <DialogTrigger asChild>
                      <ActionBtn />
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Details</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Name</Label>
                          <Input id="name" placeholder="Enter your name" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" placeholder="Enter your email" type="email" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="address">Address</Label>
                          <Input id="address" placeholder="Enter your address" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Save</Button>
                        <div>
                          <Button variant="outline">Cancel</Button>
                        </div>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }
}

export default ProductsPage
