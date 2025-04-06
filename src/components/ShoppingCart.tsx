import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { X, Minus, Plus, ShoppingCart as ShoppingCartIcon } from 'lucide-react'
import { Button } from './ui/button'
import { Separator } from './ui/separator'
import { ScrollArea } from './ui/scroll-area'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
  type?: 'machine' | 'spare-part'
}

interface ShoppingCartProps {
  isOpen?: boolean
  onClose?: () => void
  items?: CartItem[]
  onUpdateQuantity?: (id: string, quantity: number) => void
  onRemoveItem?: (id: string) => void
  onCheckout?: () => void
}

const ShoppingCart = ({
  isOpen = false,
  onClose = () => {},
  items = [
    {
      id: '1',
      name: 'Industrial Drilling Machine X500',
      price: 2499.99,
      quantity: 1,
      image:
        'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=300&q=80',
      type: 'machine',
    },
    {
      id: '2',
      name: 'Replacement Drill Bit Set (10 pcs)',
      price: 129.99,
      quantity: 2,
      image:
        'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=300&q=80',
      type: 'spare-part',
    },
    {
      id: '3',
      name: 'Motor Belt Assembly',
      price: 89.5,
      quantity: 1,
      image:
        'https://images.unsplash.com/photo-1659004803497-7b0e2a6b8c68?w=300&q=80',
      type: 'spare-part',
    },
  ],
  onUpdateQuantity = () => {},
  onRemoveItem = () => {},
  onCheckout = () => {},
}: ShoppingCartProps) => {
  const [cartOpen, setCartOpen] = useState(isOpen)

  // Calculate subtotal
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  // Handle quantity updates
  const handleQuantityChange = (id: string, change: number) => {
    const item = items.find((item) => item.id === id)
    if (item) {
      const newQuantity = Math.max(1, item.quantity + change)
      onUpdateQuantity(id, newQuantity)
    }
  }

  // Toggle cart visibility
  const toggleCart = () => {
    setCartOpen(!cartOpen)
    if (cartOpen) {
      onClose()
    }
  }

  return (
    <div className='relative z-50 bg-background'>
      {/* Cart Toggle Button */}
      <Button
        variant='outline'
        size='icon'
        className='fixed top-4 right-4 z-50 rounded-full h-12 w-12 flex items-center justify-center shadow-md'
        onClick={toggleCart}
      >
        <ShoppingCartIcon className='h-6 w-6' />
        {items.length > 0 && (
          <span className='absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center'>
            {items.reduce((sum, item) => sum + item.quantity, 0)}
          </span>
        )}
      </Button>

      {/* Cart Drawer */}
      <motion.div
        className='fixed inset-y-0 right-0 w-full sm:w-[450px] bg-background shadow-xl border-l z-40 flex flex-col'
        initial={{ x: '100%' }}
        animate={{ x: cartOpen ? 0 : '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      >
        {/* Cart Header */}
        <div className='p-4 border-b flex items-center justify-between'>
          <h2 className='text-xl font-semibold flex items-center gap-2'>
            <ShoppingCartIcon className='h-5 w-5' />
            Shopping Cart
            <span className='text-sm font-normal text-muted-foreground ml-2'>
              ({items.reduce((sum, item) => sum + item.quantity, 0)} items)
            </span>
          </h2>
          <Button variant='ghost' size='icon' onClick={toggleCart}>
            <X className='h-5 w-5' />
          </Button>
        </div>

        {/* Cart Items */}
        {items.length === 0 ? (
          <div className='flex-1 flex flex-col items-center justify-center p-6 text-center'>
            <ShoppingCartIcon className='h-16 w-16 text-muted-foreground mb-4' />
            <h3 className='text-lg font-medium'>Your cart is empty</h3>
            <p className='text-muted-foreground mt-2'>
              Add products to your cart to see them here.
            </p>
            <Button className='mt-6' onClick={toggleCart}>
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className='flex-1 p-4'>
              <div className='space-y-4'>
                {items.map((item) => (
                  <div key={item.id} className='flex gap-4 pb-4 border-b'>
                    <div className='h-20 w-20 rounded-md overflow-hidden bg-muted flex-shrink-0'>
                      <img
                        src={item.image}
                        alt={item.name}
                        className='h-full w-full object-cover'
                      />
                    </div>
                    <div className='flex-1'>
                      <div className='flex justify-between'>
                        <h3 className='font-medium'>{item.name}</h3>
                        <Button
                          variant='ghost'
                          size='icon'
                          className='h-6 w-6 -mt-1 -mr-1'
                          onClick={() => onRemoveItem(item.id)}
                        >
                          <X className='h-4 w-4' />
                        </Button>
                      </div>
                      <p className='text-sm text-muted-foreground'>
                        {item.type === 'machine' ? 'Machine' : 'Spare Part'}
                      </p>
                      <div className='flex justify-between items-center mt-2'>
                        <div className='flex items-center border rounded-md'>
                          <Button
                            variant='ghost'
                            size='icon'
                            className='h-8 w-8 rounded-none'
                            onClick={() => handleQuantityChange(item.id, -1)}
                          >
                            <Minus className='h-3 w-3' />
                          </Button>
                          <span className='w-8 text-center'>
                            {item.quantity}
                          </span>
                          <Button
                            variant='ghost'
                            size='icon'
                            className='h-8 w-8 rounded-none'
                            onClick={() => handleQuantityChange(item.id, 1)}
                          >
                            <Plus className='h-3 w-3' />
                          </Button>
                        </div>
                        <span className='font-medium'>
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Cart Summary */}
            <div className='p-4 border-t bg-muted/30'>
              <div className='space-y-4'>
                <div className='flex justify-between'>
                  <span>Subtotal</span>
                  <span className='font-medium'>${subtotal.toFixed(2)}</span>
                </div>
                <div className='flex justify-between'>
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <Separator />
                <div className='flex justify-between text-lg font-semibold'>
                  <span>Total</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <Button className='w-full' size='lg' onClick={onCheckout}>
                  Proceed to Checkout
                </Button>
                <Button
                  variant='outline'
                  className='w-full'
                  onClick={toggleCart}
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          </>
        )}
      </motion.div>

      {/* Backdrop */}
      {cartOpen && (
        <motion.div
          className='fixed inset-0 bg-black/50 z-30'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={toggleCart}
        />
      )}
    </div>
  )
}

export default ShoppingCart
