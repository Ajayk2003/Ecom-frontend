import { useCartStore, cartItem } from '@/hooks/useCartStore'

function Cart() {
  const { cartItems } = useCartStore()
  return cartItems.length === 0 ? (
    <div>Cart is Empty</div>
  ) : (
    <div>
      {cartItems.map((item) => (
        <CartItem item={item} />
      ))}
    </div>
  )
}

const CartItem = ({ item }: { item: cartItem }) => {
  const { onCartDelete, updateItemQuantity } = useCartStore()
  return (
    <div key={item.productId}>
      <button
        onClick={() => updateItemQuantity(item.productId, item.quantity + 1)}
      >
        add 1
      </button>
      <button onClick={() => onCartDelete(item.productId)}>Delete item</button>
    </div>
  )
}

export default Cart
