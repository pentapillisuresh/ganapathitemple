import React from 'react';
import { Link } from 'react-router-dom';
import { Users, ChevronRight, Wind, Droplets } from 'lucide-react';

const BanquetHallsList = ({ data }) => {
  const halls = data.banquetHalls || [];

  return (
    <div className="min-h-screen bg-white">
      {/* Header Banner */}
      <div className="relative h-[280px] overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1600&auto=format&fit=crop"
          alt="Banquet Halls"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
              Banquet Halls
            </h1>
            <p className="text-lg text-white/90 max-w-2xl">
              Host your special occasions in our well-equipped banquet halls
            </p>
          </div>
        </div>
      </div>

      {/* Halls Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {halls.map((hall) => (
            <div
              key={hall.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={hall.image || "https://images.unsplash.com/photo-1549451371-64aa98a6f660?w=800&auto=format&fit=crop"}
                  alt={hall.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <div className={`px-3 py-1.5 rounded-full text-sm font-semibold flex items-center gap-1.5 ${
                    hall.type === 'ac' 
                      ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                      : 'bg-gray-50 text-gray-700 border border-gray-200'
                  }`}>
                    {hall.type === 'ac' ? <Wind className="w-4 h-4" /> : <Droplets className="w-4 h-4" />}
                    {hall.type === 'ac' ? 'AC Hall' : 'Non-AC'}
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{hall.name}</h3>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="w-4 h-4 mr-2 text-secondary" />
                    {hall.capacity} guests
                  </div>
                  <div className="text-lg font-bold text-secondary">
                    ₹{hall.basePrice?.toLocaleString() || hall.price?.toLocaleString()}
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {hall.description || "Perfect for weddings, receptions, and corporate events"}
                  </p>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Starting from</span>
                  <Link
                    to={`/banquetHalls/${hall.id}`}
                    className="flex items-center text-secondary font-medium text-sm hover:text-[#C2410C] transition-colors"
                  >
                    View Details
                    <ChevronRight className="w-4 h-4 ml-1" />
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

export default BanquetHallsList;