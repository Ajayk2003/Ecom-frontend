type ProductProps = {
  name: string
  imageUrl: string
  price: number
  stars: number
}

const ProductCard = ({ product }: { product: ProductProps }) => {
  const { imageUrl, name, price, stars } = product
  return (
    <div>
      <div>
        <img src={imageUrl} alt="product image" />
      </div>
      <div className="flex flex-row items-center justify-center">
        <p>{name}</p>
        <p>{price}</p>
      </div>
    </div>
  )
}

export default ProductCard
