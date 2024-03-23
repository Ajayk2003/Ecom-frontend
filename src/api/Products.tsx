import { useQuery } from '@tanstack/react-query'
import { TProduct } from '../lib/types'

const getProducts = async () => {
  const res = await fetch('http://localhost:5002/api/products/')
  if (!res.ok) {
    throw new Error('Failed to fetch')
  }
  const data = (await res.json()) as TProduct[] // Ensure array of TProduct
  return data
}

export const ProductsQuery = () =>
  useQuery<TProduct[], Error>({
    queryKey: ['products'],
    queryFn: getProducts,
  })
