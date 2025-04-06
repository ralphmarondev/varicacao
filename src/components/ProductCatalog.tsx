import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Search, Filter, ShoppingCart } from 'lucide-react'
import ProductDetail from './ProductDetail'

interface ProductDetailProps {
  isOpen?: boolean
  onClose?: () => void
  onAddToCart?: (product: Product, quantity: number) => void
  product?: {
    id: string
    name: string
    price: number
    description: string
    images: string[]
    specifications: Record<string, string>
    availability: 'In Stock' | 'Low Stock' | 'Out of Stock'
    compatibleParts?: {
      id: string
      name: string
      price: number
      image: string
    }[]
    type: 'machine' | 'spare-part'
  }
}

interface Product {
  id: string
  name: string
  price: number
  image: string
  category: 'machine' | 'spare-part'
  description: string
  inStock: boolean
  compatibleWith?: string[]
}

interface ProductCatalogProps {
  onAddToCart?: (product: Product, quantity: number) => void
}

const ProductCatalog: React.FC<ProductCatalogProps> = ({
  onAddToCart = () => {},
}) => {
  const [activeTab, setActiveTab] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [sortBy, setSortBy] = useState<string>('name-asc')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  // Mock data for products
  const products: Product[] = [
    {
      id: '1',
      name: 'Industrial Mixer XL2000',
      price: 2499.99,
      image:
        'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&q=80',
      category: 'machine',
      description:
        'High-capacity industrial mixer for commercial applications. Features variable speed control and stainless steel construction.',
      inStock: true,
    },
    {
      id: '2',
      name: 'Conveyor Belt System',
      price: 3299.99,
      image:
        'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&q=80',
      category: 'machine',
      description:
        'Modular conveyor belt system for industrial use. Adjustable speed and height.',
      inStock: true,
    },
    {
      id: '3',
      name: 'Mixer Blade Assembly',
      price: 149.99,
      image:
        'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&q=80',
      category: 'spare-part',
      description: 'Replacement blade assembly for Industrial Mixer XL2000.',
      inStock: true,
      compatibleWith: ['1'],
    },
    {
      id: '4',
      name: 'Conveyor Belt Replacement',
      price: 299.99,
      image:
        'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&q=80',
      category: 'spare-part',
      description:
        'Replacement belt for Conveyor Belt System. Heavy-duty rubber construction.',
      inStock: false,
      compatibleWith: ['2'],
    },
    {
      id: '5',
      name: 'Control Panel Unit',
      price: 399.99,
      image:
        'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&q=80',
      category: 'spare-part',
      description:
        'Replacement control panel for Industrial Mixer XL2000 and Conveyor Belt System.',
      inStock: true,
      compatibleWith: ['1', '2'],
    },
    {
      id: '6',
      name: 'Packaging Machine Pro',
      price: 4999.99,
      image:
        'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&q=80',
      category: 'machine',
      description:
        'Automated packaging machine for high-volume production lines.',
      inStock: true,
    },
  ]

  // Filter products based on active tab and search query
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      activeTab === 'all' || product.category === activeTab
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'name-asc':
        return a.name.localeCompare(b.name)
      case 'name-desc':
        return b.name.localeCompare(a.name)
      case 'price-asc':
        return a.price - b.price
      case 'price-desc':
        return b.price - a.price
      default:
        return 0
    }
  })

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product)
  }

  const handleCloseDetail = () => {
    setSelectedProduct(null)
  }

  const handleAddToCart = (product: Product) => {
    onAddToCart(product, 1)
  }

  return (
    <div className='w-full bg-background p-6'>
      <div className='mb-6'>
        <h2 className='text-3xl font-bold mb-2'>Product Catalog</h2>
        <p className='text-muted-foreground'>
          Browse our selection of industrial machines and spare parts
        </p>
      </div>

      <div className='flex flex-col md:flex-row gap-4 mb-6'>
        <div className='relative flex-grow'>
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4' />
          <Input
            placeholder='Search products...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='pl-10'
          />
        </div>
        <div className='flex gap-2 items-center'>
          <Filter className='text-muted-foreground h-4 w-4' />
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Sort by' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='name-asc'>Name (A-Z)</SelectItem>
              <SelectItem value='name-desc'>Name (Z-A)</SelectItem>
              <SelectItem value='price-asc'>Price (Low to High)</SelectItem>
              <SelectItem value='price-desc'>Price (High to Low)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs
        defaultValue='all'
        value={activeTab}
        onValueChange={setActiveTab}
        className='mb-6'
      >
        <TabsList>
          <TabsTrigger value='all'>All Products</TabsTrigger>
          <TabsTrigger value='machine'>Machines</TabsTrigger>
          <TabsTrigger value='spare-part'>Spare Parts</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
        {sortedProducts.map((product) => (
          <Card
            key={product.id}
            className='overflow-hidden hover:shadow-lg transition-shadow'
          >
            <div
              className='h-48 bg-cover bg-center cursor-pointer'
              style={{ backgroundImage: `url(${product.image})` }}
              onClick={() => handleProductClick(product)}
            />
            <CardHeader className='p-4'>
              <div className='flex justify-between items-start'>
                <CardTitle className='text-lg'>{product.name}</CardTitle>
                <Badge variant={product.inStock ? 'default' : 'destructive'}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className='p-4 pt-0'>
              <p className='text-muted-foreground line-clamp-2'>
                {product.description}
              </p>
              <p className='text-xl font-bold mt-2'>
                ${product.price.toFixed(2)}
              </p>
            </CardContent>
            <CardFooter className='p-4 pt-0'>
              <Button
                className='w-full'
                onClick={() => handleAddToCart(product)}
                disabled={!product.inStock}
              >
                <ShoppingCart className='mr-2 h-4 w-4' />
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {sortedProducts.length === 0 && (
        <div className='text-center py-12'>
          <p className='text-muted-foreground'>
            No products found matching your criteria.
          </p>
        </div>
      )}

      {selectedProduct && (
        <ProductDetail
          product={
            selectedProduct
              ? {
                  ...selectedProduct,
                  images: [],
                  specifications: {},
                  availability: selectedProduct.inStock
                    ? 'In Stock'
                    : 'Out of Stock',
                  type: selectedProduct.category,
                }
              : undefined
          }
          onClose={handleCloseDetail}
        />
      )}
    </div>
  )
}

export default ProductCatalog
