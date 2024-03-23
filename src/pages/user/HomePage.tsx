import { Link } from 'react-router-dom'
import { useToast } from '@/components/ui/use-toast'
import axios from 'axios'
import { useAuth } from '@/auth/authContext'
import { useEffect, useState } from 'react'

export default function HomePage() {
  const { toast } = useToast()
  const { token } = useAuth()
  const [productData, setProductData] = useState()

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5002/api/products/', {
          headers: {
            Authorization: `Bearer ${token} `,
          },
        })
        if (res.status > 299) throw new Error(res.data.message)
        setProductData(res.data)
      } catch (err) {
        toast({
          title: err.message,
        })
      }
    }
    getProducts()
  }, [])

  return (
    <main className="flex-1">
      <section className="w-full py-6 md:py-12 lg:py-16 xl:py-20">
        <div className="container px-4 md:px-6">
          <div className="grid items-center gap-6 lg:grid-cols-[1fr_600px] lg:gap-12 xl:grid-cols-[1fr_800px]">
            <div className="space-y-3">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">Welcome to Azkaban</h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                The best place to find the best products. Shop the items at reasonable.
              </p>
              <Link
                className="inline-flex h-9 items-center justify-center rounded-md border border-gray-200 bg-white px-4 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800  dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                to="/products"
              >
                Shop Now
              </Link>
            </div>
            <img
              alt="Hero"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center lg:order-last"
              height="400"
              src="/placeholder.svg"
              width="600"
            />
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6">
          <div className="grid items-center gap-6 lg:grid-cols-[1fr_600px] lg:gap-12 xl:grid-cols-[1fr_800px]">
            <img
              alt="Hero"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center lg:order-last"
              height="400"
              src="/placeholder.svg"
              width="600"
            />
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">New Arrivals</h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Introducing our latest realesed products.
                </p>
              </div>
              <Link
                className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                to="/products"
              >
                View products
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid items-center gap-6 lg:grid-cols-[1fr_600px] lg:gap-12 xl:grid-cols-[1fr_800px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Featured Products</h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Check out the Best Selling and Trending products.
                </p>
              </div>
              <Link
                className="inline-flex h-9 items-center justify-center rounded-md border border-gray-200 bg-white px-4 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800  dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                to="/products"
              >
                View All Products
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {productData &&
                productData.slice(0, 4).map(product => {
                  console.log(product.imageUrl)
                  return (
                    <div className="group rounded-lg overflow-hidden shadow-md" key={product.id}>
                      <img
                        alt="Product 1"
                        className="aspect-[3/4] object-cover w-full transition-transform group-hover:scale-105 group-hover:transition-none"
                        height="400"
                        src={product.imageUrl}
                        width="300"
                      />
                      <div className="p-4">
                        <h3 className="font-bold line-clamp-2">{product.name} </h3>
                        <p className="font-bold text-gray-500">{product.price}</p>
                      </div>
                    </div>
                  )
                })}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
