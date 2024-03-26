import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useCartStore } from '@/hooks/useCartStore'
import { TrashIcon, MinusIcon, PlusIcon } from 'lucide-react'
import axios from 'axios'
import { useAuth } from '@/auth/authContext'
import { toast } from '@/components/ui/use-toast'
import { useNavigate } from 'react-router-dom'

export default function Cart() {
  const { addToCart, cart, decreaseQuantity, removeFromCart, increaseQuantity } = useCartStore()
  const { token } = useAuth()
  const navigate = useNavigate()
  let total = 0
  const placeOrder = async () => {
    if (cart.length === 0) {
      console.error('Cart is empty. Cannot place an order.')
      return
    }
    console.log('hello')
    const orderItems = cart.map(item => ({
      productId: item.id,
      quantity: item.quantity,
    }))

    const orderData = {
      items: orderItems,
    }

    try {
      const response = await axios.post('http://localhost:5002/api/orders/', orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.status > 299) {
        console.error('Failed to place order:', response.data)
      } else {
        console.log('Order placed successfully!')
        // toast({
        //   title: 'Order Placed successfully',
        //   description: response.data,
        // })
        navigate('/')
      }
    } catch (error) {
      console.error('Error placing order:', error)
    }
  }
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      <div className="grid md:grid-cols-[1fr_300px] gap-8">
        <div>
          <div className="border-b pb-6 mb-8">
            <h2 className="text-xl font-semibold">{cart.length > 0 ? 'Items' : 'Your Cart is empty'}</h2>
          </div>
          {cart.length > 0 &&
            cart.map(item => {
              total += item.price * item.quantity
              return (
                <Card className="mt-6" key={item.id}>
                  <CardContent className="flex items-start gap-6 p-6">
                    <img
                      alt="Product Image"
                      className="w-20 h-20 object-cover rounded-lg"
                      height="80"
                      src={item.imageUrl}
                      style={{
                        aspectRatio: '80/80',
                        objectFit: 'cover',
                      }}
                      width="80"
                    />
                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-500">₹{item.price}</p>
                    </div>
                    <div className="flex w-24 border rounded-lg items-center justify-between px-2 py-1 border-gray-200 ">
                      <Button size="none" variant="ghost" onClick={() => decreaseQuantity(item.id)}>
                        <MinusIcon className="w-3 h-3" />
                      </Button>
                      <div className="font-semibold">{item.quantity}</div>
                      <Button size="none" variant="ghost" onClick={() => increaseQuantity(item.id)}>
                        <PlusIcon className="w-3 h-3" />
                      </Button>
                    </div>
                    <Button variant="destructive" size="none" onClick={() => removeFromCart(item.id)}>
                      <TrashIcon className="w-5 h-5 p-1" />
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
        </div>
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between mt-2">
              <span>Subtotal</span>
              <span>₹{total}</span>
            </div>
            <div className="flex justify-between mt-2">
              <span>Taxes</span>
              <span>₹{(total * 18) / 100}</span>
            </div>
            <div className="flex justify-between mt-4 mb-8 border-t pt-4">
              <span className="font-semibold">Total</span>
              <span className="font-semibold">₹{(total * 118) / 100}</span>
            </div>
            <Button className="w-full" variant="default" onClick={placeOrder}>
              PLace Order
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
