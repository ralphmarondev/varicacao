import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Plus, Minus, ShoppingCart, Check } from "lucide-react";

interface ProductDetailProps {
  isOpen?: boolean;
  onClose?: () => void;
  product?: {
    id: string;
    name: string;
    price: number;
    description: string;
    images: string[];
    specifications: Record<string, string>;
    availability: "In Stock" | "Low Stock" | "Out of Stock";
    compatibleParts?: {
      id: string;
      name: string;
      price: number;
      image: string;
    }[];
    type: "machine" | "spare-part";
  };
}

const ProductDetail: React.FC<ProductDetailProps> = ({
  isOpen = true,
  onClose = () => {},
  product = {
    id: "1",
    name: "Industrial Milling Machine X2000",
    price: 12500,
    description:
      "High-performance industrial milling machine suitable for precision manufacturing. Features advanced CNC controls and durable construction for long-term reliability.",
    images: [
      "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=800&q=80",
      "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800&q=80",
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
    ],
    specifications: {
      Dimensions: "120 x 80 x 160 cm",
      Weight: "850 kg",
      Power: "380V, 3-phase",
      "Max RPM": "12,000",
      "Control System": "Advanced CNC",
      Material: "Cast Iron Frame",
      Warranty: "2 Years",
    },
    availability: "In Stock",
    compatibleParts: [
      {
        id: "sp1",
        name: "Milling Cutter Set",
        price: 299,
        image:
          "https://images.unsplash.com/photo-1591172126506-db8ef536ce3f?w=400&q=80",
      },
      {
        id: "sp2",
        name: "Replacement Motor",
        price: 799,
        image:
          "https://images.unsplash.com/photo-1581092160607-ee22731c2eaf?w=400&q=80",
      },
      {
        id: "sp3",
        name: "Control Panel",
        price: 599,
        image:
          "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=400&q=80",
      },
    ],
    type: "machine",
  },
}) => {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("details");
  const [addedToCart, setAddedToCart] = useState(false);

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    // In a real implementation, this would add the product to a cart state or context
    console.log(`Added ${quantity} of ${product.name} to cart`);
    setAddedToCart(true);

    // Reset the added state after a delay
    setTimeout(() => {
      setAddedToCart(false);
    }, 2000);
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "In Stock":
        return "bg-green-100 text-green-800";
      case "Low Stock":
        return "bg-yellow-100 text-yellow-800";
      case "Out of Stock":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {product.name}
          </DialogTitle>
          <DialogDescription className="text-gray-500">
            Product ID: {product.id}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {/* Product Images */}
          <div>
            <Carousel className="w-full">
              <CarouselContent>
                {product.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <div className="overflow-hidden rounded-lg">
                        <img
                          src={image}
                          alt={`${product.name} - Image ${index + 1}`}
                          className="w-full h-64 object-cover"
                        />
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>

            <div className="flex justify-center mt-4 space-x-2">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className="w-16 h-16 rounded-md overflow-hidden border-2 border-gray-200 cursor-pointer hover:border-primary"
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-3xl font-bold">
                  ${product.price.toLocaleString()}
                </h3>
                <div className="mt-2">
                  <Badge
                    className={`${getAvailabilityColor(product.availability)}`}
                  >
                    {product.availability}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="w-16 text-center"
                  min="1"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={incrementQuantity}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Button
              className="w-full mt-6"
              size="lg"
              onClick={handleAddToCart}
              disabled={addedToCart}
            >
              {addedToCart ? (
                <>
                  <Check className="mr-2 h-4 w-4" /> Added to Cart
                </>
              ) : (
                <>
                  <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                </>
              )}
            </Button>

            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="mt-8"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="mt-4">
                <p className="text-gray-700">{product.description}</p>
              </TabsContent>
              <TabsContent value="specifications" className="mt-4">
                <div className="space-y-2">
                  {Object.entries(product.specifications).map(
                    ([key, value]) => (
                      <div key={key} className="flex justify-between py-2">
                        <span className="font-medium">{key}</span>
                        <span className="text-gray-600">{value}</span>
                      </div>
                    ),
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Compatible Parts Section (only for machines) */}
        {product.type === "machine" &&
          product.compatibleParts &&
          product.compatibleParts.length > 0 && (
            <div className="mt-10">
              <Separator className="my-6" />
              <h3 className="text-xl font-semibold mb-4">
                Compatible Spare Parts
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {product.compatibleParts.map((part) => (
                  <Card key={part.id} className="overflow-hidden">
                    <div className="h-40 overflow-hidden">
                      <img
                        src={part.image}
                        alt={part.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h4 className="font-medium">{part.name}</h4>
                      <div className="flex justify-between items-center mt-2">
                        <span className="font-bold">${part.price}</span>
                        <Button size="sm" variant="outline">
                          <ShoppingCart className="h-4 w-4 mr-2" /> Add
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetail;
