export type TProduct = {
  id: number
  name: string
  description: string
  price: string // This would probably be better as a number type, assuming it represents actual currency values.
  imageUrl: string | null // Allow for images or non-existent images.
  category: string | null // Allow for categorized or uncategorized products.
  sellerId: number
  createdAt: string // This could potentially be converted to a Date type for additional processing.
  updatedAt: string
}
