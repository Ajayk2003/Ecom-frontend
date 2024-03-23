import { useAuth } from '@/auth/authContext'
import SearchBar from '@/components/SearchBar'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/hooks/useCartStore'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

type productData = {
  id: number
  name: string
  price: number
  description: string
  imageUrl: string
  sellerId: number
  createdAt: string
  updatedAt: string
}

export default function Products() {
  const { token } = useAuth()
  const { addToCart } = useCartStore()
  const [search, setSearch] = useState('')
  const getProducts = async () => {
    const res = await fetch('http://localhost:5002/api/products/', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const data = await res.json()
    if (res.ok) {
      return data
    }
    throw new Error(data.message)
  }

  const { data: productData, isLoading } = useQuery<productData[]>({
    queryKey: ['productsData'],
    queryFn: getProducts,
  })

  if (isLoading) {
    return <div>Loading.... Please Wait</div>
  }

  // Filter products based on search string
  const filteredProducts = productData?.filter(product => product.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="flex-1 p-4">
      <SearchBar search={search} setSearch={setSearch} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
        {filteredProducts?.map(product => (
          <div
            key={product.id}
            className="group relative overflow-hidden rounded-lg shadow hover:shadow-lg transition-shadow duration-200"
          >
            <img
              alt="Product 1"
              className="object-cover w-full h-64"
              height="500"
              src={product.imageUrl}
              style={{
                aspectRatio: '500/500',
                objectFit: 'cover',
              }}
              width="500"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-base font-medium text-gray-500">{product.price}</p>
              <Button className="mt-2 w-full" onClick={() => addToCart(product)}>
                Add to Cart
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
