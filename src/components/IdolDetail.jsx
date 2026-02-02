import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Package, Ruler, Shield, Truck, Star, Gem, CheckCircle, Heart, Share2, ShoppingCart, RotateCcw, Award, Clock, Users, MapPin, Phone, Mail } from 'lucide-react';

const IdolDetail = ({ data, onOrder }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Find idol by ID
  const idol = data.idols?.find(i => 
    i.id?.toString() === id?.toString() || 
    i.id === parseInt(id)
  );

  const [orderData, setOrderData] = useState({
    size: '',
    quantity: 1,
    giftWrapping: false,
    personalization: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: ''
  });

  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const getTypeColor = (type) => {
    switch(type) {
      case 'clay': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'brass': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'plaster': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'marble': return 'bg-slate-50 text-slate-700 border-slate-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'clay': return '🏺';
      case 'brass': return '🔶';
      case 'plaster': return '🗿';
      case 'marble': return '💎';
      default: return '🛐';
    }
  };

  const getTypeName = (type) => {
    switch(type) {
      case 'clay': return 'Clay';
      case 'brass': return 'Brass';
      case 'plaster': return 'Plaster';
      case 'marble': return 'Marble';
      default: return type;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateTotal = () => {
    if (!idol) return 0;
    
    let total = idol.price * orderData.quantity;

    // Gift wrapping charge
    if (orderData.giftWrapping) {
      total += 500; // Gift wrapping charge
    }

    // Shipping charges
    if (total < 5000) {
      total += 200; // Shipping charge for orders below ₹5000
    }

    return total;
  };

  const validateOrderInfo = () => {
    if (!orderData.size) {
      alert('Please select size');
      return false;
    }
    if (orderData.quantity < 1) {
      alert('Please select quantity');
      return false;
    }
    if (!orderData.name.trim()) {
      alert('Please enter your name');
      return false;
    }
    if (!orderData.email.trim() || !/\S+@\S+\.\S+/.test(orderData.email)) {
      alert('Please enter a valid email address');
      return false;
    }
    if (!orderData.phone.trim() || !/^\d{10}$/.test(orderData.phone)) {
      alert('Please enter a valid 10-digit phone number');
      return false;
    }
    if (!orderData.address.trim()) {
      alert('Please enter your address');
      return false;
    }
    if (!orderData.pincode.trim() || !/^\d{6}$/.test(orderData.pincode)) {
      alert('Please enter a valid 6-digit pincode');
      return false;
    }
    return true;
  };

  const handleOrder = () => {
    if (!validateOrderInfo()) {
      return;
    }

    const order = {
      type: 'idol',
      idol: idol,
      ...orderData,
      totalAmount: calculateTotal(),
      orderDate: new Date().toISOString(),
      orderId: 'IDOL-' + Date.now(),
      status: 'Processing'
    };

    const result = onOrder(order);
    navigate(`/booking-confirmation/${result.id}`);
  };

  if (!idol) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center bg-primary rounded-2xl shadow-lg p-6 max-w-sm border border-secondary/20">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Idol Not Found</h2>
          <p className="text-gray-600 mb-4 text-sm">The requested idol could not be found.</p>
          <Link
            to="/idols"
            className="inline-flex items-center px-4 py-2 bg-secondary text-white rounded-full text-sm font-semibold hover:bg-[#C2410C] transition-all duration-300 shadow-sm hover:shadow"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Idols Collection
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Banner Section */}
      <div className="relative h-[400px] overflow-hidden">
        <img
          src={idol.bannerImage || idol.image || "https://images.unsplash.com/photo-1632783652065-77c05d7d7b0e?w=1600&auto=format&fit=crop"}
          alt={idol.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
              <div className="mb-4 lg:mb-0">
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-white mb-2">
                  Sacred Idols Collection
                </h1>
           
              </div>
              <Link
                to="/idols"
                className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm hover:bg-white/30 transition-all duration-300 border border-white/30"
              >
                <ChevronLeft className="w-3 h-3 mr-1" />
                Back to Collection
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Idol Details */}
          <div className="space-y-6">
            {/* Main Image & Gallery */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <div className="relative">
                <div className="h-[400px] bg-gray-50 flex items-center justify-center p-8">
                  <img
                    src={idol.images?.[selectedImage] || idol.image}
                    alt={idol.name}
                    className="max-h-full max-w-full object-contain"
                  />
                  {/* Type Badge */}
                  <div className="absolute top-4 left-4">
                    <div className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 border backdrop-blur-sm ${getTypeColor(idol.type)}`}>
                      <span className="text-lg">{getTypeIcon(idol.type)}</span>
                      {getTypeName(idol.type)}
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button
                      onClick={() => setIsWishlisted(!isWishlisted)}
                      className={`p-2 rounded-full backdrop-blur-sm border ${
                        isWishlisted 
                          ? 'bg-red-500/20 border-red-300 text-red-600' 
                          : 'bg-white/20 border-white/30 text-white'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500' : ''}`} />
                    </button>
                    <button className="p-2 rounded-full backdrop-blur-sm bg-white/20 border border-white/30 text-white">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Thumbnail Gallery */}
                {idol.images && idol.images.length > 1 && (
                  <div className="p-4 border-t border-gray-100">
                    <div className="flex gap-3 overflow-x-auto pb-2">
                      {idol.images.map((img, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImage(index)}
                          className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                            selectedImage === index 
                              ? 'border-secondary' 
                              : 'border-gray-200'
                          }`}
                        >
                          <img 
                            src={img} 
                            alt={`${idol.name} view ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6">
                {/* Title and Rating */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">
                      {idol.name}
                    </h2>
                    <div className="flex items-center gap-4">
                      {idol.rating && (
                        <div className="flex items-center">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-4 h-4 ${
                                  i < Math.floor(idol.rating) 
                                    ? 'fill-amber-400 text-amber-400' 
                                    : 'fill-gray-200 text-gray-200'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="ml-2 text-sm font-semibold text-gray-700">
                            {idol.rating}
                          </span>
                          <span className="ml-2 text-sm text-gray-500">
                            ({idol.reviews || 0} reviews)
                          </span>
                        </div>
                      )}
                      <div className="flex items-center text-sm text-emerald-600">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        In Stock
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Description</h3>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">
                    {idol.description}
                  </p>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    This sacred Ganapathi idol is meticulously crafted by skilled artisans using traditional techniques passed down through generations. Perfect for home worship, meditation, or as a decorative piece that brings positive energy to your space.
                  </p>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Key Features</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {(idol.features || []).map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Specifications */}
                <div className="bg-primary/20 rounded-lg p-4 border border-secondary/10">
                  <h4 className="font-semibold text-gray-900 mb-3">Specifications</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-gray-600 mb-1">Material</div>
                      <div className="text-sm font-medium text-gray-900">{getTypeName(idol.type)}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-600 mb-1">Weight</div>
                      <div className="text-sm font-medium text-gray-900">{idol.weight || '2-5 kg'}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-600 mb-1">Craftsmanship</div>
                      <div className="text-sm font-medium text-gray-900">Handcrafted</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-600 mb-1">Finish</div>
                      <div className="text-sm font-medium text-gray-900">{idol.finish || 'Matte'}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-primary/10 rounded-xl border border-secondary/10 p-5">
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-5 h-5 text-secondary" />
                <h3 className="font-semibold text-gray-900">Benefits & Care</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mr-2" />
                    <span>Enhances positive energy</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mr-2" />
                    <span>Ideal for daily worship</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mr-2" />
                    <span>Eco-friendly materials</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Shield className="w-4 h-4 text-blue-500 mr-2" />
                    <span>Blessed at temple</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Package className="w-4 h-4 text-amber-500 mr-2" />
                    <span>Gift-ready packaging</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <RotateCcw className="w-4 h-4 text-purple-500 mr-2" />
                    <span>7-day replacement</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="bg-primary/10 rounded-xl border border-secondary/10 p-5">
              <div className="flex items-center gap-2 mb-4">
                <Truck className="w-5 h-5 text-secondary" />
                <h3 className="font-semibold text-gray-900">Shipping & Delivery</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 text-secondary mr-2" />
                    <span>Delivery Time</span>
                  </div>
                  <span className="font-medium text-gray-900">7-10 business days</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 text-secondary mr-2" />
                    <span>Shipping</span>
                  </div>
                  <span className="font-medium text-gray-900">
                    {calculateTotal() >= 5000 ? 'FREE' : '₹200'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mr-2" />
                    <span>Cash on Delivery</span>
                  </div>
                  <span className="font-medium text-gray-900">Available</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Form */}
          <div className="lg:sticky lg:top-4">
            <div className="bg-primary rounded-xl border border-secondary/10 p-6 shadow-lg">
              <h2 className="text-xl font-serif font-bold text-gray-900 mb-1">Order This Idol</h2>
              <p className="text-gray-600 text-sm mb-6">Complete the form below to place your order</p>

              {/* Size Selection */}
              <div className="mb-6">
                <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center">
                  <Ruler className="w-5 h-5 mr-2 text-secondary" />
                  Select Size
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {(idol.sizes || []).map((size, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setOrderData(prev => ({ ...prev, size }))}
                      className={`px-4 py-3 border rounded-lg text-sm text-center transition-all duration-150 flex flex-col items-center justify-center ${
                        orderData.size === size
                          ? 'border-secondary bg-secondary text-white font-medium'
                          : 'border-gray-300 hover:border-secondary hover:bg-secondary/5'
                      }`}
                    >
                      {size}
                      <span className="text-xs mt-1 opacity-75">
                        {size === 'Small' ? '8-12"' : size === 'Medium' ? '12-18"' : '18-24"'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <h3 className="text-base font-semibold text-gray-900 mb-4">Quantity</h3>
                <div className="flex items-center max-w-[200px]">
                  <button
                    type="button"
                    onClick={() => setOrderData(prev => ({ ...prev, quantity: Math.max(1, prev.quantity - 1) }))}
                    className="px-4 py-2 border border-gray-300 rounded-l-lg hover:bg-gray-50 transition-colors text-lg"
                  >
                    -
                  </button>
                  <div className="px-6 py-2 border-t border-b border-gray-300 flex-1 text-center font-bold text-lg">
                    {orderData.quantity}
                  </div>
                  <button
                    type="button"
                    onClick={() => setOrderData(prev => ({ ...prev, quantity: prev.quantity + 1 }))}
                    className="px-4 py-2 border border-gray-300 rounded-r-lg hover:bg-gray-50 transition-colors text-lg"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Personalization */}
              <div className="mb-6">
                <h3 className="text-base font-semibold text-gray-900 mb-3">Personalization (Optional)</h3>
                <textarea
                  name="personalization"
                  value={orderData.personalization}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-secondary focus:border-secondary text-sm bg-white h-24"
                  placeholder="Any special instructions, blessings required, or personalized messages..."
                  maxLength={200}
                />
                <div className="text-xs text-gray-500 mt-1 text-right">
                  {orderData.personalization.length}/200 characters
                </div>
              </div>

              {/* Additional Options */}
              <div className="mb-6 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="flex items-center text-sm font-medium text-gray-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={orderData.giftWrapping}
                      onChange={(e) => setOrderData(prev => ({
                        ...prev,
                        giftWrapping: e.target.checked
                      }))}
                      className="mr-3 w-4 h-4 text-secondary focus:ring-secondary rounded border-gray-300"
                    />
                    <Package className="w-4 h-4 mr-2" />
                    Gift Wrapping (₹500)
                  </label>
                  <span className="text-sm font-semibold text-secondary">₹500</span>
                </div>
              </div>

              {/* Personal Information */}
              <div className="mb-6 border-t border-gray-300 pt-6">
                <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-secondary" />
                  Personal Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={orderData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-secondary focus:border-secondary text-sm bg-white"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1 flex items-center">
                        <Mail className="w-3 h-3 mr-1 text-secondary" />
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={orderData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-secondary focus:border-secondary text-sm bg-white"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1 flex items-center">
                        <Phone className="w-3 h-3 mr-1 text-secondary" />
                        Phone *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={orderData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-secondary focus:border-secondary text-sm bg-white"
                        placeholder="10-digit number"
                        pattern="[0-9]{10}"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Address *</label>
                    <textarea
                      name="address"
                      value={orderData.address}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-secondary focus:border-secondary text-sm bg-white h-16"
                      placeholder="Full address with landmark"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">City *</label>
                      <input
                        type="text"
                        name="city"
                        value={orderData.city}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-secondary focus:border-secondary text-sm bg-white"
                        placeholder="City"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Pincode *</label>
                      <input
                        type="text"
                        name="pincode"
                        value={orderData.pincode}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-secondary focus:border-secondary text-sm bg-white"
                        placeholder="6-digit pincode"
                        pattern="[0-9]{6}"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="border-t border-gray-300 pt-6">
                <h3 className="text-lg font-serif font-bold text-gray-900 mb-4">Order Summary</h3>

                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Idol</span>
                    <span className="font-medium">{idol.name}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Size</span>
                    <span className="font-medium">{orderData.size || 'Not selected'}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Quantity</span>
                    <span className="font-medium">{orderData.quantity}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Unit Price</span>
                    <span className="font-medium">₹{idol.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">₹{(idol.price * orderData.quantity).toLocaleString()}</span>
                  </div>

                  {/* Additional Services */}
                  {orderData.giftWrapping && (
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">Gift Wrapping</span>
                      <span className="font-medium">₹500</span>
                    </div>
                  )}

                  {calculateTotal() < 5000 && (
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">Shipping Charges</span>
                      <span className="font-medium">₹200</span>
                    </div>
                  )}

                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-sm font-bold text-gray-900">Total Amount</div>
                        <div className="text-xs text-gray-500">
                          {calculateTotal() >= 5000 ? 'FREE Shipping ✓' : 'Shipping: ₹200'}
                        </div>
                      </div>
                      <span className="text-xl font-bold text-secondary">
                        ₹{calculateTotal().toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handleOrder}
                    disabled={!orderData.size}
                    className={`w-full px-6 py-3 rounded-full text-sm font-semibold shadow-md hover:shadow-lg flex items-center justify-center transition-all duration-300 ${
                      !orderData.size
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-secondary text-white hover:bg-[#C2410C]'
                    }`}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Place Order
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </button>
                  
                  <button
                    onClick={() => {
                      if (!orderData.size) {
                        alert('Please select size first');
                        return;
                      }
                      // Simulate COD order
                      handleOrder();
                    }}
                    disabled={!orderData.size}
                    className={`w-full px-6 py-3 rounded-full text-sm font-semibold border transition-all duration-300 ${
                      !orderData.size
                        ? 'border-gray-300 text-gray-400 cursor-not-allowed'
                        : 'border-secondary text-secondary hover:bg-secondary hover:text-white'
                    }`}
                  >
                    Cash on Delivery
                  </button>
                </div>

                <div className="text-xs text-gray-500 mt-4 text-center">
                  By placing your order, you agree to our{' '}
                  <Link to="/terms" className="text-secondary hover:underline">Terms & Conditions</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdolDetail;