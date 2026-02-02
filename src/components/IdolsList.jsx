import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Shield, Truck, Package, Search, Filter, ShoppingBag, ChevronRight, Award, CheckCircle } from 'lucide-react';

const IdolsList = ({ data }) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedType, setSelectedType] = React.useState('all');
  const [sortBy, setSortBy] = React.useState('popular');

  const getTypeName = (type) => {
    switch (type) {
      case 'clay': return 'Clay';
      case 'brass': return 'Brass';
      case 'plaster': return 'Plaster';
      case 'marble': return 'Marble';
      default: return type;
    }
  };

  const filteredIdols = data.idols
    .filter(idol => {
      const matchesSearch = idol.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        idol.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedType === 'all' || idol.type === selectedType;
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'rating': return (b.rating || 0) - (a.rating || 0);
        case 'popular':
        default: return (b.reviews || 0) - (a.reviews || 0);
      }
    });

  const idolTypes = ['all', ...new Set(data.idols.map(idol => idol.type))];

  return (
    <div className="min-h-screen bg-white">
      {/* Professional Banner */}
      <div className="relative h-[280px] bg-gradient-to-r from-primary via-primary to-secondary/10 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black/5"></div>
          <div className="absolute top-0 left-0 w-64 h-64 bg-secondary/5 rounded-full -translate-x-32 -translate-y-32"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full translate-x-48 translate-y-48"></div>
        </div>
        
        <div className="relative h-full container mx-auto px-4 flex items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center px-3 py-1 bg-secondary/10 rounded-full mb-4">
              <span className="text-sm font-medium text-secondary">Sacred Collection</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Divine Ganapathi Idols
            </h1>
            
            <p className="text-gray-700 mb-6 max-w-xl">
              Explore our curated collection of meticulously crafted, temple-blessed idols for worship, meditation, and spiritual decoration.
            </p>
            
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">Featured in:</span>
              <div className="flex items-center gap-2">
                <span className="text-xs px-3 py-1 bg-white border border-gray-200 rounded-full">Clay</span>
                <span className="text-xs px-3 py-1 bg-white border border-gray-200 rounded-full">Brass</span>
                <span className="text-xs px-3 py-1 bg-white border border-gray-200 rounded-full">Marble</span>
              </div>
            </div>
          </div>
          
          <div className="hidden lg:block absolute right-0 bottom-0">
            <div className="relative w-64 h-64">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-transparent rounded-l-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 -mt-8">
        {/* Search and Filters Card */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search idols by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary"
              />
            </div>
            
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-500" />
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-3 focus:ring-2 focus:ring-secondary focus:border-secondary"
                >
                  <option value="all">All Materials</option>
                  {idolTypes.filter(type => type !== 'all').map(type => (
                    <option key={type} value={type}>{getTypeName(type)}</option>
                  ))}
                </select>
              </div>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-3 focus:ring-2 focus:ring-secondary focus:border-secondary"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Quick Filter Chips */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedType('all')}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                selectedType === 'all'
                  ? 'bg-secondary text-white'
                  : 'bg-primary text-gray-700 hover:bg-gray-100'
              }`}
            >
              All
            </button>
            {idolTypes.filter(type => type !== 'all').map(type => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  selectedType === type
                    ? 'bg-secondary text-white'
                    : 'bg-primary text-gray-700 hover:bg-gray-100'
                }`}
              >
                {getTypeName(type)}
              </button>
            ))}
          </div>
        </div>

        {/* Results Info */}
        {searchTerm && (
          <div className="flex items-center justify-between mb-6">
            <div className="text-gray-700">
              Showing <span className="font-semibold text-secondary">{filteredIdols.length}</span> of {data.idols.length} idols
            </div>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedType('all');
              }}
              className="text-sm text-secondary hover:text-[#C2410C]"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Idols Grid */}
        {filteredIdols.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredIdols.map((idol) => (
              <div
                key={idol.id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group"
              >
                <div className="relative h-56 bg-primary">
                  <Link to={`/idols/${idol.id}`}>
                    <img
                      src={idol.image}
                      alt={idol.name}
                      className="w-full h-full object-contain p-6 transition-transform group-hover:scale-105 duration-300"
                    />
                  </Link>
                  
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-white/90 backdrop-blur-sm rounded text-xs font-medium text-gray-700">
                      {getTypeName(idol.type)}
                    </span>
                  </div>
                  
                  {idol.rating && (
                    <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-full flex items-center gap-1 text-xs">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span className="font-semibold">{idol.rating}</span>
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1 group-hover:text-secondary transition-colors">
                    <Link to={`/idols/${idol.id}`}>
                      {idol.name}
                    </Link>
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {idol.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <div className="flex items-center text-xs text-gray-600 bg-primary px-2 py-1 rounded">
                      <Shield className="w-3 h-3 mr-1 text-emerald-600" />
                      Blessed
                    </div>
                    <div className="flex items-center text-xs text-gray-600 bg-primary px-2 py-1 rounded">
                      <Truck className="w-3 h-3 mr-1 text-secondary" />
                      Free Shipping
                    </div>
                    <div className="flex items-center text-xs text-gray-600 bg-primary px-2 py-1 rounded">
                      <Package className="w-3 h-3 mr-1 text-blue-600" />
                      Gift Packed
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="text-xs text-gray-500 mb-2">Available Sizes</div>
                    <div className="flex flex-wrap gap-2">
                      {(idol.sizes || []).map((size, index) => (
                        <span
                          key={index}
                          className="text-xs px-3 py-1 bg-primary border border-secondary/20 text-secondary rounded-full"
                        >
                          {size}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <div className="text-sm text-gray-500">Starting from</div>
                      <div className="text-xl font-bold text-secondary">
                        ₹{idol.price.toLocaleString()}
                      </div>
                    </div>
                    <Link
                      to={`/idols/${idol.id}`}
                      className="px-4 py-2 bg-secondary text-white rounded-lg font-medium hover:bg-[#C2410C] transition-colors flex items-center gap-2"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      Purchase Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No idols found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedType('all');
              }}
              className="px-4 py-2 bg-secondary text-white rounded-lg text-sm hover:bg-[#C2410C] transition-colors"
            >
              Reset all filters
            </button>
          </div>
        )}

        {/* Features Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Premium Quality Assurance</h2>
            <p className="text-gray-600 text-sm">Every idol meets our strict quality standards</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-primary p-5 rounded-xl border border-gray-200 hover:border-secondary/30 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Temple Blessed</h3>
                  <p className="text-xs text-gray-600 mt-1">Traditional ceremonies</p>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Each idol undergoes traditional blessing ceremonies performed by experienced temple priests.
              </p>
            </div>

            <div className="bg-primary p-5 rounded-xl border border-gray-200 hover:border-secondary/30 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Handcrafted</h3>
                  <p className="text-xs text-gray-600 mt-1">Artisan quality</p>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Created by skilled artisans using traditional techniques passed down through generations.
              </p>
            </div>

            <div className="bg-primary p-5 rounded-xl border border-gray-200 hover:border-secondary/30 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <Truck className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Secure Delivery</h3>
                  <p className="text-xs text-gray-600 mt-1">Nationwide shipping</p>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Carefully packaged and delivered with tracking across India. Free shipping on orders above ₹5,000.
              </p>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-primary p-5 rounded-xl border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <ShoppingBag className="w-5 h-5 text-secondary" />
              <h3 className="font-medium text-gray-900">Shopping Information</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start text-sm">
                <CheckCircle className="w-4 h-4 text-secondary mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-gray-700 font-medium">Free Shipping</span>
                  <p className="text-gray-600">On orders above ₹5,000 across India</p>
                </div>
              </li>
              <li className="flex items-start text-sm">
                <CheckCircle className="w-4 h-4 text-secondary mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-gray-700 font-medium">Delivery Time</span>
                  <p className="text-gray-600">7-10 business days with tracking</p>
                </div>
              </li>
              <li className="flex items-start text-sm">
                <CheckCircle className="w-4 h-4 text-secondary mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-gray-700 font-medium">Payment Options</span>
                  <p className="text-gray-600">All major cards, UPI, and Cash on Delivery</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-primary p-5 rounded-xl border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">💎</span>
              <h3 className="font-medium text-gray-900">Care Instructions</h3>
            </div>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <span className="text-secondary mr-2 mt-0.5">•</span>
                <span>Clean with soft dry cloth only - avoid water and chemicals</span>
              </li>
              <li className="flex items-start">
                <span className="text-secondary mr-2 mt-0.5">•</span>
                <span>Avoid exposure to direct sunlight and moisture</span>
              </li>
              <li className="flex items-start">
                <span className="text-secondary mr-2 mt-0.5">•</span>
                <span>Use soft base or felt pads to prevent scratches</span>
              </li>
              <li className="flex items-start">
                <span className="text-secondary mr-2 mt-0.5">•</span>
                <span>Store in a dry place with stable temperature</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdolsList;