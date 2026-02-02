import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Package, Ruler, Shield, Truck, Star, Gem, CheckCircle } from 'lucide-react';

const FeaturedIdols = ({ idols }) => {
  const getTypeColor = (type) => {
    switch (type) {
      case 'clay': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'brass': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'plaster': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'marble': return 'bg-slate-50 text-slate-700 border-slate-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'clay': return '🏺';
      case 'brass': return '🔶';
      case 'plaster': return '🗿';
      case 'marble': return '💎';
      default: return '🛐';
    }
  };

  const getTypeName = (type) => {
    switch (type) {
      case 'clay': return 'Clay';
      case 'brass': return 'Brass';
      case 'plaster': return 'Plaster';
      case 'marble': return 'Marble';
      default: return type;
    }
  };

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div className="mb-6 md:mb-0">
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-primary text-secondary text-sm font-semibold mb-3">
              <Gem className="w-4 h-4 mr-2" />
              Sacred Collection
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Sacred Ganapathi Idols</h2>
            <p className="text-gray-600 mt-2">Authentic idols for worship, meditation, and decoration</p>
          </div>
          <Link
            to="/idols"
            className="group inline-flex items-center px-6 py-3.5 bg-secondary hover:bg-[#C2410C] text-white rounded-full font-semibold transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5"
          >
            View Collection
            <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>

        {/* Idols Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {idols.map((idol) => (
            <div
              key={idol.id}
              className="group bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-gray-100"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden bg-gray-50">
                <img
                  src={idol.image}
                  alt={idol.name}
                  className="w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-105"
                />
                {/* Type Badge */}
                <div className="absolute top-4 left-4">
                  <div className={`px-3 py-1.5 rounded-full text-sm font-semibold flex items-center gap-1.5 border ${getTypeColor(idol.type)}`}>
                    <span className="text-base">{getTypeIcon(idol.type)}</span>
                    {getTypeName(idol.type)}
                  </div>
                </div>

                {/* Rating Badge */}
                {idol.rating && (
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-semibold text-gray-800">{idol.rating}</span>
                  </div>
                )}

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Title and Description */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-secondary transition-colors duration-300">
                    {idol.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                    {idol.description}
                  </p>
                </div>

                {/* Features */}
                <div className="flex items-center gap-4 mb-5">
                  <div className="flex items-center text-sm text-gray-600">
                    <Shield className="w-4 h-4 mr-1.5 text-emerald-500" />
                    Blessed
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Truck className="w-4 h-4 mr-1.5 text-secondary" />
                    Free Shipping
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Package className="w-4 h-4 mr-1.5 text-blue-500" />
                    Gift Packed
                  </div>
                </div>

                {/* Available Sizes */}
                <div className="mb-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Ruler className="w-4 h-4 mr-2 text-secondary" />
                    <span className="font-medium">Available Sizes</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {idol.sizes.map((size, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 bg-primary border border-secondary/20 text-secondary rounded-full text-sm font-medium transition-all duration-200 hover:bg-secondary hover:text-white cursor-pointer group/size"
                      >
                        {size}
                        <CheckCircle className="inline w-3.5 h-3.5 ml-1 opacity-0 group-hover/size:opacity-100 transition-opacity duration-200" />
                      </span>
                    ))}
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between pt-5 border-t border-gray-100">
                  <div>
                    <div className="text-sm text-gray-500">Starting from</div>
                    <div className="text-2xl font-bold text-secondary">
                      ₹{idol.price.toLocaleString()}
                      {idol.discountedPrice && (
                        <span className="ml-2 text-sm text-gray-400 line-through">
                          ₹{idol.discountedPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                  <Link
                    to={`/idols/${idol.id}`}
                    className="px-5 py-2.5 bg-secondary text-white rounded-full font-semibold hover:bg-[#C2410C] transition-all duration-300 flex items-center gap-2 group/btn shadow-sm hover:shadow-md"
                  >
                    Purchase Now
                    <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>


      </div>
    </div>
  );
};



export default FeaturedIdols;