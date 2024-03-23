import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { DialogTrigger, DialogTitle, DialogHeader, DialogFooter, DialogContent, Dialog } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/Input'

export default function Component() {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState(null)
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')

  const handleImageUpload = event => {
    const file = event.target.files[0]
    if (file) {
      setImage(file)
    }
  }

  const handleSubmit = () => {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('price', price)
    formData.append('image', image)
    formData.append('description', description)
    formData.append('category', category)

    fetch('http://localhost:5002/api/products/', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        console.log('Product created:', data)
        // Optionally handle success response here
      })
      .catch(error => {
        console.error('Error creating product:', error)
        // Optionally handle error here
      })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Product</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Product</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Enter product name" value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              placeholder="Enter product price"
              type="number"
              value={price}
              onChange={e => setPrice(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="image">Image</Label>
            <input type="file" id="image" accept="image/*" onChange={handleImageUpload} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="Enter product description"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              placeholder="Enter product category"
              value={category}
              onChange={e => setCategory(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Save
          </Button>
          <div>
            <Button variant="outline">Cancel</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
