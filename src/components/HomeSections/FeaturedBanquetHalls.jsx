import React from 'react';
import { Link } from 'react-router-dom';
import { Users, ChevronRight, Wind, Droplets, Calendar, MapPin, CheckCircle } from 'lucide-react';

const FeaturedBanquetHalls = ({ banquetHalls }) => {
  return (
    <div className="py-12 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div className="mb-6 md:mb-0">
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-semibold mb-3">
              <Calendar className="w-4 h-4 mr-2" />
              Venue Spaces
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Banquet Halls</h2>
            <p className="text-gray-600 mt-2">Host your special occasions in sacred spaces</p>
          </div>
          <Link
            to="/banquetHalls"
            className="group inline-flex items-center px-6 py-3.5 bg-secondary hover:bg-[#C2410C] text-white rounded-full font-semibold transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5"
          >
            View All Halls
            <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>

        {/* Banquet Halls Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(banquetHalls || []).slice(0, 3).map((hall) => (
            <div
              key={hall.id}
              className="group bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-gray-100"
            >
              {/* Image Container */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={hall.image || "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&auto=format&fit=crop"}
                  alt={hall.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Type Badge */}
                <div className="absolute top-4 left-4">
                  <div className={`px-3 py-1.5 rounded-full text-sm font-semibold flex items-center gap-1.5 ${
                    hall.type === 'ac' 
                      ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                      : 'bg-gray-50 text-gray-700 border border-gray-200'
                  }`}>
                    {hall.type === 'ac' ? (
                      <>
                        <Wind className="w-3.5 h-3.5" />
                        AC Hall
                      </>
                    ) : (
                      <>
                        <Droplets className="w-3.5 h-3.5" />
                        Non-AC
                      </>
                    )}
                  </div>
                </div>

                {/* Features Icons */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <Users className="w-4 h-4 text-secondary" />
                    <span className="text-sm font-semibold text-gray-800">
                      {hall.capacity} Guests
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Title and Location */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-secondary transition-colors duration-300">
                    {hall.name}
                  </h3>
                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPin className="w-4 h-4 mr-2 text-secondary" />
                    <span>{hall.location || "Temple Premises"}</span>
                  </div>
                </div>

                {/* Features List */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {(hall.features || []).slice(0, 4).map((feature, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" />
                      <span className="truncate">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                  <div>
                    <div className="text-sm text-gray-500">Starting from</div>
                    <div className="text-2xl font-bold text-secondary">
                      ₹{(hall.basePrice || hall.price || 0).toLocaleString()}
                      <span className="text-sm text-gray-500 font-normal"> / 4 hours</span>
                    </div>
                  </div>
                  <Link
                    to={`/banquetHalls/${hall.id}`}
                    className="px-5 py-2.5 bg-secondary text-white rounded-full font-semibold hover:bg-[#C2410C] transition-all duration-300 flex items-center gap-2 group/btn shadow-sm hover:shadow-md"
                  >
                    Book Now
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

export default FeaturedBanquetHalls;