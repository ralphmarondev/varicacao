import React, { useState } from 'react'
import { ShoppingCart, Search, Menu, X } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'
import { Separator } from './ui/separator'
import ProductCatalog from './ProductCatalog'
import ShoppingCartComponent from './ShoppingCart'

const HomePage = () => {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [cartItems, setCartItems] = useState<
    Array<{
      id: string
      name: string
      price: number
      quantity: number
    }>
  >([])

  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  )
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const formatPeso = (amount: number) =>
    new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
    }).format(amount)
  const featuredMachines = [
    {
      id: '1',
      name: 'Cacao Beans Segregator',
      price: 4000,
      image:
        'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80',
      description: 'High-capacity industrial mixer for large-scale production',
    },
    {
      id: '2',
      name: 'Precision Cutter Pro',
      price: 8750,
      image:
        'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80',
      description: 'Advanced cutting machine with precision control',
    },
    {
      id: '3',
      name: 'Automated Packaging System',
      price: 15000,
      image:
        'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80',
      description: 'Complete packaging solution for industrial applications',
    },
  ]

  const featuredParts = [
    {
      id: '101',
      name: 'Motor Driver',
      price: 450,
      image: '/motor_driver.png',
      description: 'Compatible with Precision Cutter Pro models',
    },
    {
      id: '102',
      name: 'Servo Motors',
      price: 320,
      image: '/servo_motor.png',
      description: 'For Industrial Mixer XL-5000 series',
    },
    {
      id: '103',
      name: 'Stepper Motors',
      price: 580,
      image: '/stepper_motor.png',
      description: 'Replacement kit for Automated Packaging Systems',
    },
  ]

  const addToCart = (product: { id: string; name: string; price: number }) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id)
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        return [...prevItems, { ...product, quantity: 1 }]
      }
    })
  }

  return (
    <div className='min-h-screen bg-background'>
      {/* Header */}
      <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
        <div className='container flex h-16 items-center justify-between'>
          <div className='flex items-center gap-2'>
            <Button
              variant='ghost'
              size='icon'
              className='md:hidden'
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? (
                <X className='h-5 w-5' />
              ) : (
                <Menu className='h-5 w-5' />
              )}
            </Button>
            <a href='#' className='flex items-center gap-2'>
              <img
                src='https://api.dicebear.com/7.x/avataaars/svg?seed=varicacao'
                alt='Logo'
                className='h-8 w-8'
              />
              <span className='font-bold text-xl'>Varicacao Tech</span>
            </a>
          </div>

          <nav className='hidden md:flex items-center gap-6'>
            <a href='#' className='text-sm font-medium hover:text-primary'>
              Home
            </a>
            <a
              href='#machines'
              className='text-sm font-medium hover:text-primary'
            >
              Machines
            </a>
            <a href='#parts' className='text-sm font-medium hover:text-primary'>
              Spare Parts
            </a>
            <a href='#about' className='text-sm font-medium hover:text-primary'>
              About Us
            </a>
            <a
              href='#contact'
              className='text-sm font-medium hover:text-primary'
            >
              Contact
            </a>
          </nav>

          <div className='flex items-center gap-4'>
            <Button variant='ghost' size='icon'>
              <Search className='h-5 w-5' />
            </Button>
            <Button
              variant='ghost'
              size='icon'
              onClick={toggleCart}
              className='relative'
            >
              <ShoppingCart className='h-5 w-5' />
              {cartItemCount > 0 && (
                <Badge className='absolute -top-2 -right-2 px-1.5 py-0.5 text-xs'>
                  {cartItemCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className='md:hidden border-t p-4 bg-background'>
            <nav className='flex flex-col space-y-4'>
              <a href='#' className='text-sm font-medium hover:text-primary'>
                Home
              </a>
              <a
                href='#machines'
                className='text-sm font-medium hover:text-primary'
              >
                Machines
              </a>
              <a
                href='#parts'
                className='text-sm font-medium hover:text-primary'
              >
                Spare Parts
              </a>
              <a
                href='#about'
                className='text-sm font-medium hover:text-primary'
              >
                About Us
              </a>
              <a
                href='#contact'
                className='text-sm font-medium hover:text-primary'
              >
                Contact
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className='relative'>
        <div className='absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5 z-0'></div>
        <div className='relative container mx-auto px-4 py-16 md:py-24 z-10'>
          <div className='max-w-3xl'>
            <h1 className='text-4xl md:text-5xl font-bold tracking-tight mb-4'>
              VariCacao Tech
            </h1>
            <p className='text-xl text-muted-foreground mb-8'>
              High-quality cacao bean segregator and compatible spare parts for
              your manufacturing needs, COCOA-nize your world.
            </p>
            <div className='flex flex-col sm:flex-row gap-4'>
              <Button size='lg' className='font-semibold'>
                Browse Machines
              </Button>
              <Button size='lg' variant='outline' className='font-semibold'>
                Explore Spare Parts
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Machine */}
      <section id='machines' className='container mx-auto px-4 py-16'>
        <div className='flex justify-between items-center mb-8'>
          <h2 className='text-3xl font-bold'>Featured Machine</h2>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {featuredMachines.length > 0 && (
            <Card key={featuredMachines[0].id} className='overflow-hidden'>
              <div className='aspect-video relative overflow-hidden'>
                <img
                  src={featuredMachines[0].image}
                  alt={featuredMachines[0].name}
                  className='object-cover w-full h-full transition-transform hover:scale-105'
                />
              </div>
              <CardContent className='p-6'>
                <h3 className='text-xl font-semibold mb-2'>
                  {featuredMachines[0].name}
                </h3>
                <p className='text-muted-foreground mb-4'>
                  {featuredMachines[0].description}
                </p>
                <div className='flex justify-between items-center'>
                  <span className='text-lg font-bold'>
                    P{featuredMachines[0].price.toLocaleString()}
                  </span>
                  <Button onClick={() => addToCart(featuredMachines[0])}>
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Featured Spare Parts */}
      <section id='parts' className='bg-muted/30'>
        <div className='container mx-auto px-4 py-16'>
          <div className='flex justify-between items-center mb-8'>
            <h2 className='text-3xl font-bold'>Popular Spare Parts</h2>
            <Button variant='outline'>View All</Button>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {featuredParts.map((part) => (
              <Card key={part.id} className='overflow-hidden'>
                <div className='aspect-square relative overflow-hidden'>
                  <img
                    src={part.image}
                    alt={part.name}
                    className='object-cover w-full h-full transition-transform hover:scale-105'
                  />
                </div>
                <CardContent className='p-6'>
                  <h3 className='text-xl font-semibold mb-2'>{part.name}</h3>
                  <p className='text-muted-foreground mb-4'>
                    {part.description}
                  </p>
                  <div className='flex justify-between items-center'>
                    <span className='text-lg font-bold'>
                      P{part.price.toLocaleString()}
                    </span>
                    <Button onClick={() => addToCart(part)}>Add to Cart</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Company */}
      <section id='about' className='container mx-auto px-4 py-16'>
        <h2 className='text-3xl font-bold mb-8'>About Varicacao Tech</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
          <div>
            <img
              src='https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80'
              alt='Company Facility'
              className='rounded-lg shadow-lg w-full'
            />
          </div>
          <div>
            <h3 className='text-2xl font-semibold mb-4'>Our Vision</h3>
            <p className='text-muted-foreground mb-6'>
              Our vision is to transform tha cacao industry by giving farmers
              the tools they need to easily segregate different cacao varities,
              helping them improve quality and grow their businesses
            </p>
            <h3 className='text-2xl font-semibold mb-4'>Our Mission</h3>
            <p className='text-muted-foreground mb-6'>
              Our mission is to design innovative cacao segregators that help
              segregation Process of cacao varities. We are commited to support
              our customers with exceptional service and continuous
              technological advancements, ensuring that every cacao producer can
              achieve success in cacao industry.
            </p>
            <Button>Learn More About Us</Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className='bg-muted/30'>
        <div className='container mx-auto px-4 py-16'>
          <h2 className='text-3xl font-bold mb-12 text-center'>Our Team</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <Card className='p-6'>
              <div className='flex items-center mb-4'>
                <img
                  src='https://api.dicebear.com/7.x/avataaars/svg?seed=client1'
                  alt='Client'
                  className='w-12 h-12 rounded-full mr-4'
                />
                <div>
                  <h4 className='font-semibold'>Jaylord Agub</h4>
                  <p className='text-sm text-muted-foreground'></p>
                </div>
              </div>
            </Card>
            <Card className='p-6'>
              <div className='flex items-center mb-4'>
                <img
                  src='https://api.dicebear.com/7.x/avataaars/svg?seed=client2'
                  alt='Client'
                  className='w-12 h-12 rounded-full mr-4'
                />
                <div>
                  <h4 className='font-semibold'>Marylitte Capistrano</h4>
                  <p className='text-sm text-muted-foreground'></p>
                </div>
              </div>
            </Card>
            <Card className='p-6'>
              <div className='flex items-center mb-4'>
                <img
                  src='https://api.dicebear.com/7.x/avataaars/svg?seed=client3'
                  alt='Client'
                  className='w-12 h-12 rounded-full mr-4'
                />
                <div>
                  <h4 className='font-semibold'>Jamaica Quizzagan</h4>
                  <p className='text-sm text-muted-foreground'></p>
                </div>
              </div>
            </Card>
            <Card className='p-6'>
              <div className='flex items-center mb-4'>
                <img
                  src='https://api.dicebear.com/7.x/avataaars/svg?seed=client3'
                  alt='Client'
                  className='w-12 h-12 rounded-full mr-4'
                />
                <div>
                  <h4 className='font-semibold'>Glenn Kylle Fronda</h4>
                  <p className='text-sm text-muted-foreground'></p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id='contact' className='container mx-auto px-4 py-16'>
        <h2 className='text-3xl font-bold mb-8'>Contact Us</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
          <div>
            <h3 className='text-xl font-semibold mb-4'>Get in Touch</h3>
            <p className='text-muted-foreground mb-6'>
              Have questions about our products or services? Our team is here to
              help. Contact us using the information below or fill out the form,
              and we'll get back to you as soon as possible.
            </p>
            <div className='space-y-4'>
              <div className='flex items-center'>
                <div className='w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5 text-primary'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
                    />
                  </svg>
                </div>
                <span>09267906457</span>
              </div>
              <div className='flex items-center'>
                <div className='w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5 text-primary'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                    />
                  </svg>
                </div>
                <span>info@varicacaotech.com</span>
              </div>
              <div className='flex items-center'>
                <div className='w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5 text-primary'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                    />
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                    />
                  </svg>
                </div>
                <span>68D Provincial Road, Linao East, Tuguegarao City</span>
              </div>
            </div>
          </div>
          <div>
            <form className='space-y-4'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <label
                    htmlFor='name'
                    className='block text-sm font-medium mb-1'
                  >
                    Name
                  </label>
                  <input
                    type='text'
                    id='name'
                    className='w-full p-2 border rounded-md'
                  />
                </div>
                <div>
                  <label
                    htmlFor='email'
                    className='block text-sm font-medium mb-1'
                  >
                    Email
                  </label>
                  <input
                    type='email'
                    id='email'
                    className='w-full p-2 border rounded-md'
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor='subject'
                  className='block text-sm font-medium mb-1'
                >
                  Subject
                </label>
                <input
                  type='text'
                  id='subject'
                  className='w-full p-2 border rounded-md'
                />
              </div>
              <div>
                <label
                  htmlFor='message'
                  className='block text-sm font-medium mb-1'
                >
                  Message
                </label>
                <textarea
                  id='message'
                  rows={5}
                  className='w-full p-2 border rounded-md'
                ></textarea>
              </div>
              <Button className='w-full md:w-auto'>Send Message</Button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className='bg-muted'>
        <div className='container mx-auto px-4 py-12'>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
            <div>
              <div className='flex items-center gap-2 mb-4'>
                <img
                  src='https://api.dicebear.com/7.x/avataaars/svg?seed=varicacao'
                  alt='Logo'
                  className='h-8 w-8'
                />
                <span className='font-bold text-xl'>Varicacao Tech</span>
              </div>
              <p className='text-muted-foreground mb-4'>
                Providing high-quality industrial machinery and spare parts
                solutions since 2003.
              </p>
            </div>
            <div>
              <h4 className='font-semibold text-lg mb-4'>Quick Links</h4>
              <ul className='space-y-2'>
                <li>
                  <a
                    href='#'
                    className='text-muted-foreground hover:text-primary'
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href='#machines'
                    className='text-muted-foreground hover:text-primary'
                  >
                    Machines
                  </a>
                </li>
                <li>
                  <a
                    href='#parts'
                    className='text-muted-foreground hover:text-primary'
                  >
                    Spare Parts
                  </a>
                </li>
                <li>
                  <a
                    href='#about'
                    className='text-muted-foreground hover:text-primary'
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href='#contact'
                    className='text-muted-foreground hover:text-primary'
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className='font-semibold text-lg mb-4'>Products</h4>
              <ul className='space-y-2'>
                <li>
                  <a
                    href='#'
                    className='text-muted-foreground hover:text-primary'
                  >
                    Cacao Beans Segregator
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='text-muted-foreground hover:text-primary'
                  >
                    Spare Parts Replacement
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className='font-semibold text-lg mb-4'>Newsletter</h4>
              <p className='text-muted-foreground mb-4'>
                Subscribe to our newsletter for the latest product updates and
                industry news.
              </p>
              <div className='flex'>
                <input
                  type='email'
                  placeholder='Your email'
                  className='flex-1 p-2 border rounded-l-md'
                />
                <Button className='rounded-l-none'>Subscribe</Button>
              </div>
            </div>
          </div>
          <Separator className='my-8' />
          <div className='flex flex-col md:flex-row justify-between items-center'>
            <p className='text-muted-foreground text-sm'>
              © 2025 Varicacao Tech. All rights reserved.
            </p>
            <div className='flex space-x-4 mt-4 md:mt-0'>
              <a href='#' className='text-muted-foreground hover:text-primary'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='h-5 w-5'
                >
                  <path d='M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z'></path>
                </svg>
              </a>
              <a href='#' className='text-muted-foreground hover:text-primary'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='h-5 w-5'
                >
                  <path d='M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z'></path>
                </svg>
              </a>
              <a href='#' className='text-muted-foreground hover:text-primary'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='h-5 w-5'
                >
                  <rect x='2' y='2' width='20' height='20' rx='5' ry='5'></rect>
                  <path d='M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z'></path>
                  <line x1='17.5' y1='6.5' x2='17.51' y2='6.5'></line>
                </svg>
              </a>
              <a href='#' className='text-muted-foreground hover:text-primary'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='h-5 w-5'
                >
                  <path d='M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z'></path>
                  <rect x='2' y='9' width='4' height='12'></rect>
                  <circle cx='4' cy='4' r='2'></circle>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Shopping Cart Sidebar */}
      {isCartOpen && (
        <ShoppingCartComponent
          isOpen={isCartOpen}
          onClose={toggleCart}
          items={cartItems}
          // setItems={setCartItems}
          onUpdateQuantity={(id, quantity) => {
            setCartItems((prevItems) =>
              prevItems.map((item) =>
                item.id === id ? { ...item, quantity } : item
              )
            )
          }}
          onRemoveItem={(id) => {
            setCartItems((prevItems) =>
              prevItems.filter((item) => item.id !== id)
            )
          }}
        />
      )}
    </div>
  )
}

export default HomePage
