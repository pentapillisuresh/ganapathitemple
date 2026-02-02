import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Users, ChevronRight, BookOpen, Sparkles, Shield, AlertCircle } from 'lucide-react';

const Activities = ({ data }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const categories = [
    { id: 'all', label: 'All Activities', count: data.activities.length },
    { id: 'daily', label: 'Daily Rituals', count: data.activities.filter(a => a.category === 'daily').length },
    { id: 'festival', label: 'Festival Special', count: data.activities.filter(a => a.category === 'festival').length },
    { id: 'special', label: 'Special Pujas', count: data.activities.filter(a => a.category === 'special').length },
    { id: 'personal', label: 'Personal Ceremonies', count: data.activities.filter(a => a.category === 'personal').length }
  ];

  const filteredActivities = selectedFilter === 'all' 
    ? data.activities 
    : data.activities.filter(activity => activity.category === selectedFilter);

  return (
    <div className="min-h-screen bg-white">
      {/* Professional Banner */}
      <div className="relative h-[400px] bg-gradient-to-r from-primary via-primary to-secondary/20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-64 h-64 bg-secondary/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full translate-x-1/2 translate-y-1/2"></div>
        </div>
        
        <div className="relative h-full container mx-auto px-4 flex items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center px-3 py-1 bg-secondary/10 rounded-full mb-4">
              <BookOpen className="w-4 h-4 text-secondary mr-2" />
              <span className="text-sm font-medium text-secondary">Sacred Activities</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Vedic Rituals & Ceremonies
            </h1>
            
            <p className="text-gray-700 mb-6 max-w-xl">
              Book authentic Vedic ceremonies and rituals performed by experienced temple priests with traditional purity
            </p>
            
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                <span>Experienced Priests</span>
              </div>
              <span className="mx-2">•</span>
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-1" />
                <span>Traditional Methods</span>
              </div>
              <span className="mx-2">•</span>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                <span>Flexible Scheduling</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Category Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedFilter(category.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                  selectedFilter === category.id
                    ? 'bg-secondary text-white'
                    : 'bg-primary text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category.label}
                <span className={`text-xs px-1.5 py-0.5 rounded ${
                  selectedFilter === category.id
                    ? 'bg-white/20'
                    : 'bg-gray-100'
                }`}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Activities Grid */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Available Rituals
              <span className="text-sm text-gray-500 ml-2 font-normal">
                ({filteredActivities.length} activities)
              </span>
            </h2>
            <div className="text-sm text-gray-600">
              Showing {filteredActivities.length} of {data.activities.length} rituals
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredActivities.map((activity) => (
              <div key={activity.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48 bg-primary">
                  <img 
                    src={activity.image} 
                    alt={activity.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-1 bg-white/90 backdrop-blur-sm rounded text-xs text-gray-700">
                      {activity.category === 'daily' ? 'Daily' : 
                       activity.category === 'festival' ? 'Festival' : 
                       activity.category === 'special' ? 'Special' : 'Personal'}
                    </span>
                  </div>
                </div>
                
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {activity.name}
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {activity.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-1" />
                      {activity.duration}
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">From</div>
                      <div className="text-xl font-bold text-secondary">
                        ₹{activity.price.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  
                  <Link
                    to={`/activity/${activity.id}`}
                    className="block w-full text-center px-4 py-3 bg-secondary text-white rounded-lg font-medium hover:bg-[#C2410C] transition-colors"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Important Information */}
        <div className="mb-12">
          <div className="bg-primary rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-secondary" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Important Information</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">General Guidelines</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-secondary rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                    <span>All rituals performed by experienced Vedic priests</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-secondary rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                    <span>Booking confirmation subject to priest availability</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-secondary rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                    <span>Arrive 15 minutes before scheduled time</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Additional Details</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-secondary rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                    <span>Traditional dress code is appreciated</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-secondary rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                    <span>Cancellations must be made 24 hours in advance</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-secondary rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                    <span>All rituals include prasadam (blessed offering)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Process Flow */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">
            Simple Booking Process
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-lg font-bold text-secondary">1</span>
              </div>
              <h4 className="font-medium text-gray-900 mb-1">Select Ritual</h4>
              <p className="text-sm text-gray-600">Choose from our list of authentic Vedic rituals</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-lg font-bold text-secondary">2</span>
              </div>
              <h4 className="font-medium text-gray-900 mb-1">Pick Date & Time</h4>
              <p className="text-sm text-gray-600">Select convenient date and time slot</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-lg font-bold text-secondary">3</span>
              </div>
              <h4 className="font-medium text-gray-900 mb-1">Make Payment</h4>
              <p className="text-sm text-gray-600">Secure online payment options</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-lg font-bold text-secondary">4</span>
              </div>
              <h4 className="font-medium text-gray-900 mb-1">Attend Ritual</h4>
              <p className="text-sm text-gray-600">Receive confirmation and attend ceremony</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-primary rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Frequently Asked Questions</h3>
          
          <div className="space-y-4">
            <div className="border-b border-gray-200 pb-4">
              <h4 className="font-medium text-gray-900 mb-2">How do I book a ritual?</h4>
              <p className="text-sm text-gray-600">
                Select your desired ritual, choose date and time, make payment online, and receive confirmation. You'll get all details via email.
              </p>
            </div>
            
            <div className="border-b border-gray-200 pb-4">
              <h4 className="font-medium text-gray-900 mb-2">What should I wear?</h4>
              <p className="text-sm text-gray-600">
                Traditional Indian attire is appreciated. For men: dhoti/kurta. For women: sari/salwar kameez. Avoid black clothing.
              </p>
            </div>
            
            <div className="pb-4">
              <h4 className="font-medium text-gray-900 mb-2">Can I bring family members?</h4>
              <p className="text-sm text-gray-600">
                Yes, family members are welcome to participate. Please mention number of participants during booking.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activities;