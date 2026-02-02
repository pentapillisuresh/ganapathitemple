import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Users, ArrowRight } from 'lucide-react';

const FeaturedActivities = ({ activities }) => {
  return (
    <section className="py-12 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center px-3 py-1.5 bg-secondary/10 text-secondary rounded-full text-xs font-semibold mb-3 tracking-wide uppercase">
            <Calendar className="w-3 h-3 mr-1.5" />
            Divine Ceremonies
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Sacred Activities & Rituals
          </h2>
          <p className="text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Experience divine blessings through authentic Vedic ceremonies
          </p>
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {activities.slice(0, 3).map((activity) => (
            <Link 
              key={activity.id} 
              to={`/activity/${activity.id}`}
              className="group block"
            >
              <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden rounded-[1rem] hover:rounded-lg">
                
                {/* Image Container */}
                <div className="relative overflow-hidden h-48">
                  <img 
                    src={activity.image} 
                    alt={activity.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 bg-white/95 backdrop-blur-sm text-gray-800 text-xs font-medium rounded-full shadow-sm">
                      {activity.category || 'Pooja'}
                    </span>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-300" />
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Title */}
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-secondary transition-colors duration-200 line-clamp-1">
                    {activity.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                    {activity.description}
                  </p>

                  {/* Meta Information */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="w-3.5 h-3.5 mr-1.5" />
                      {activity.duration || '2h'}
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <Users className="w-3.5 h-3.5 mr-1.5" />
                      {activity.maxPeople || '10'}
                    </div>
                  </div>

                  {/* Price and CTA - Horizontal alignment */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="min-w-0">
                      <div className="text-xs text-gray-500 truncate">Starting from</div>
                      <div className="text-lg font-bold text-gray-900 truncate">
                        ₹{activity.price.toLocaleString()}
                      </div>
                    </div>
                    
                    {/* Round Button */}
                    <div 
                      onClick={(e) => e.preventDefault()}
                      className="relative z-10"
                    >
                      <div className="px-4 py-2.5 bg-secondary text-white rounded-full text-sm font-medium hover:bg-secondary-600 transition-all duration-200 flex items-center gap-1.5 group/btn shadow-sm hover:shadow-md">
                        <span className="whitespace-nowrap">Book Now</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform duration-200" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All CTA - Round Button */}
        <div className="text-center">
          <Link 
            to="/activities" 
            className="inline-flex items-center px-6 py-3 border border-secondary/30 text-secondary rounded-full text-base font-medium hover:bg-secondary hover:text-white transition-all duration-200 group/cta shadow-sm hover:shadow-md bg-white"
          >
            <span>View All Activities</span>
            <ArrowRight className="w-4 h-4 ml-2 group-hover/cta:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedActivities;