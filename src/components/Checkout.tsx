import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Building2,
  Truck,
  User,
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
} from "lucide-react";

import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Separator } from "./ui/separator";
import { Textarea } from "./ui/textarea";
import { Progress } from "./ui/progress";

interface CheckoutProps {
  cartItems?: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }>;
  onBack?: () => void;
  onComplete?: () => void;
}

const Checkout = ({
  cartItems = [
    {
      id: "1",
      name: "Industrial Drilling Machine X500",
      price: 2499.99,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=400&q=80",
    },
    {
      id: "2",
      name: "Replacement Drill Bits (Set of 5)",
      price: 129.99,
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&q=80",
    },
  ],
  onBack = () => {},
  onComplete = () => {},
}: CheckoutProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Customer Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",

    // Shipping Information
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "Brazil",

    // Payment Information
    paymentMethod: "creditCard",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    bankName: "",
    accountNumber: "",
    notes: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({ ...prev, paymentMethod: value }));
  };

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
    else onBack();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 4) {
      // Process payment and complete order
      onComplete();
    } else {
      nextStep();
    }
  };

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = 25.0;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-background w-full max-w-[1000px] mx-auto p-4 md:p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Checkout</h1>
        <Progress value={(step / 4) * 100} className="h-2 mb-4" />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span className={step >= 1 ? "font-medium text-primary" : ""}>
            Customer Info
          </span>
          <span className={step >= 2 ? "font-medium text-primary" : ""}>
            Shipping
          </span>
          <span className={step >= 3 ? "font-medium text-primary" : ""}>
            Payment
          </span>
          <span className={step >= 4 ? "font-medium text-primary" : ""}>
            Review
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit}>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>
                  {step === 1 && (
                    <>
                      <User className="inline mr-2 h-5 w-5" /> Customer
                      Information
                    </>
                  )}
                  {step === 2 && (
                    <>
                      <MapPin className="inline mr-2 h-5 w-5" /> Shipping
                      Information
                    </>
                  )}
                  {step === 3 && (
                    <>
                      <CreditCard className="inline mr-2 h-5 w-5" /> Payment
                      Method
                    </>
                  )}
                  {step === 4 && (
                    <>
                      <ShieldCheck className="inline mr-2 h-5 w-5" /> Review
                      Order
                    </>
                  )}
                </CardTitle>
                <CardDescription>
                  {step === 1 && "Please enter your contact details"}
                  {step === 2 && "Where should we ship your order?"}
                  {step === 3 && "Select your preferred payment method"}
                  {step === 4 &&
                    "Please review your order details before confirming"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Step 1: Customer Information */}
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Shipping Information */}
                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="address">Street Address</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State/Province</Label>
                        <Input
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="zipCode">Postal/Zip Code</Label>
                        <Input
                          id="zipCode"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Input
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Payment Method */}
                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <RadioGroup
                      value={formData.paymentMethod}
                      onValueChange={handleRadioChange}
                      className="space-y-4"
                    >
                      <div className="flex items-center space-x-2 border p-4 rounded-md hover:bg-muted cursor-pointer">
                        <RadioGroupItem value="creditCard" id="creditCard" />
                        <Label
                          htmlFor="creditCard"
                          className="flex items-center cursor-pointer"
                        >
                          <CreditCard className="mr-2 h-5 w-5" />
                          Credit Card
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 border p-4 rounded-md hover:bg-muted cursor-pointer">
                        <RadioGroupItem
                          value="bankTransfer"
                          id="bankTransfer"
                        />
                        <Label
                          htmlFor="bankTransfer"
                          className="flex items-center cursor-pointer"
                        >
                          <Building2 className="mr-2 h-5 w-5" />
                          Bank Transfer
                        </Label>
                      </div>
                    </RadioGroup>

                    {formData.paymentMethod === "creditCard" && (
                      <div className="space-y-4 mt-4 border p-4 rounded-md bg-muted/30">
                        <div className="space-y-2">
                          <Label htmlFor="cardName">Name on Card</Label>
                          <Input
                            id="cardName"
                            name="cardName"
                            value={formData.cardName}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input
                            id="cardNumber"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            placeholder="XXXX XXXX XXXX XXXX"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiryDate">Expiry Date</Label>
                            <Input
                              id="expiryDate"
                              name="expiryDate"
                              value={formData.expiryDate}
                              onChange={handleInputChange}
                              placeholder="MM/YY"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvv">CVV</Label>
                            <Input
                              id="cvv"
                              name="cvv"
                              value={formData.cvv}
                              onChange={handleInputChange}
                              placeholder="123"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {formData.paymentMethod === "bankTransfer" && (
                      <div className="space-y-4 mt-4 border p-4 rounded-md bg-muted/30">
                        <div className="space-y-2">
                          <Label htmlFor="bankName">Bank Name</Label>
                          <Input
                            id="bankName"
                            name="bankName"
                            value={formData.bankName}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="accountNumber">Account Number</Label>
                          <Input
                            id="accountNumber"
                            name="accountNumber"
                            value={formData.accountNumber}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="notes">Order Notes (Optional)</Label>
                      <Textarea
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                        placeholder="Special instructions for delivery or any other notes"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Review Order */}
                {step === 4 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="space-y-4">
                      <h3 className="font-medium">Customer Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">Name:</span>{" "}
                          {formData.firstName} {formData.lastName}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Email:</span>{" "}
                          {formData.email}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Phone:</span>{" "}
                          {formData.phone}
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="font-medium">Shipping Information</h3>
                      <div className="grid grid-cols-1 gap-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">
                            Address:
                          </span>{" "}
                          {formData.address}
                        </div>
                        <div>
                          <span className="text-muted-foreground">City:</span>{" "}
                          {formData.city}, {formData.state} {formData.zipCode}
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            Country:
                          </span>{" "}
                          {formData.country}
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="font-medium">Payment Method</h3>
                      <div className="text-sm">
                        {formData.paymentMethod === "creditCard" ? (
                          <div className="flex items-center">
                            <CreditCard className="mr-2 h-4 w-4" />
                            Credit Card ending in{" "}
                            {formData.cardNumber.slice(-4)}
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <Building2 className="mr-2 h-4 w-4" />
                            Bank Transfer - {formData.bankName}
                          </div>
                        )}
                      </div>
                    </div>

                    {formData.notes && (
                      <>
                        <Separator />
                        <div className="space-y-2">
                          <h3 className="font-medium">Order Notes</h3>
                          <p className="text-sm">{formData.notes}</p>
                        </div>
                      </>
                    )}
                  </motion.div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button type="button" variant="outline" onClick={prevStep}>
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  {step === 1 ? "Back to Cart" : "Previous"}
                </Button>
                <Button type="submit">
                  {step < 4 ? (
                    <>
                      Next <ChevronRight className="ml-2 h-4 w-4" />
                    </>
                  ) : (
                    "Confirm Order"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
              <CardDescription>Review your items</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <div className="h-16 w-16 rounded-md overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      ${item.price.toFixed(2)} x {item.quantity}
                    </p>
                  </div>
                  <div className="font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6 text-xs text-muted-foreground">
                <p className="flex items-center">
                  <Truck className="mr-2 h-4 w-4" />
                  Estimated delivery: 3-5 business days
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
