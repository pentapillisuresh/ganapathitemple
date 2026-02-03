import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Calendar, Clock, Users, Home, CheckCircle, ChevronRight, ChevronLeft, Building, Shield, User, Mail, Phone } from 'lucide-react';

const ActivityDetail = ({ data, onBooking }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const activity = data.activities.find(a => a.id === parseInt(id));
  const rooms = data.rooms;

  const [bookingData, setBookingData] = useState({
    date: '',
    timeSlot: '',
    people: 1,
    withRoom: false,
    roomId: null,
    selectedRoom: null,
    name: '',
    email: '',
    phone: ''
  });

  const [formStep, setFormStep] = useState('booking');

  const timeSlots = [
    '6:00 AM - 8:00 AM',
    '8:00 AM - 10:00 AM',
    '10:00 AM - 12:00 PM',
    '4:00 PM - 6:00 PM',
    '6:00 PM - 8:00 PM'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRoomSelect = (roomId) => {
    const room = rooms.find(r => r.id === roomId);
    setBookingData(prev => ({
      ...prev,
      roomId,
      selectedRoom: room
    }));
  };

  const calculateTotal = () => {
    let total = activity.price * bookingData.people;
    if (bookingData.withRoom && bookingData.selectedRoom) {
      total += bookingData.selectedRoom.price;
    }
    return total;
  };

  const validateBookingInfo = () => {
    if (!bookingData.date) {
      alert('Please select date');
      return false;
    }
    if (!bookingData.timeSlot) {
      alert('Please select time slot');
      return false;
    }
    if (!bookingData.name.trim()) {
      alert('Please enter your name');
      return false;
    }
    if (!bookingData.email.trim() || !/\S+@\S+\.\S+/.test(bookingData.email)) {
      alert('Please enter a valid email address');
      return false;
    }
    if (!bookingData.phone.trim() || !/^\d{10}$/.test(bookingData.phone)) {
      alert('Please enter a valid 10-digit phone number');
      return false;
    }
    return true;
  };

  const proceedToPayment = () => {
    if (!validateBookingInfo()) {
      return;
    }
    
    const booking = {
      activity: activity,
      ...bookingData,
      totalAmount: calculateTotal(),
      bookingDate: new Date().toISOString(),
      bookingId: 'TEMPLE-' + Date.now()
    };

    const result = onBooking(booking);
    navigate(`/booking-confirmation/${result.id}`);
  };

  if (!activity) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center bg-primary rounded-2xl shadow-lg p-6 max-w-sm border border-secondary/20">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Activity Not Found</h2>
          <p className="text-gray-600 mb-4 text-sm">The requested activity could not be found.</p>
          <Link 
            to="/activities" 
            className="inline-flex items-center px-4 py-2 bg-secondary text-white rounded-full text-sm font-semibold hover:bg-[#C2410C] transition-all duration-300 shadow-sm hover:shadow"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Activities
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Compact Banner Section */}
      <div className="relative h-[400px] overflow-hidden">
        <img 
          src="/images/about.avif"
          alt="Temple Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
              <div className="mb-4 lg:mb-0">
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-white mb-2">
                  Ganapathi Temple
                </h1>
              
              </div>
              <Link 
                to="/activities" 
                className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm hover:bg-white/30 transition-all duration-300 border border-white/30"
              >
                <ChevronLeft className="w-3 h-3 mr-1" />
                Back to Activities
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Activity Details */}
          <div className="space-y-6">
            {/* Activity Image & Basic Info */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <div className="relative h-80">
                <img 
                  src={activity.image || "https://images.unsplash.com/photo-1634849222816-a451cf81a5c7?w=800&auto=format&fit=crop"}
                  alt={activity.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <h2 className="text-2xl font-serif font-bold text-white mb-1">{activity.name}</h2>
                  <div className="flex items-center gap-3 text-white/90 text-xs">
                    <span className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {activity.duration}
                    </span>
                    <span className="flex items-center">
                      <Users className="w-3 h-3 mr-1" />
                      Up to {activity.maxPeople || '10'} people
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">About This Ritual</h3>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  {activity.fullDescription || "Modak is Lord Ganapathi's favorite sweet. This ritual involves preparing and offering 108 modaks with devotion and prayers for fulfillment of wishes."}
                </p>

                {/* Key Features */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-primary/40 rounded-lg p-3">
                    <div className="text-xs text-gray-600 mb-1">Duration</div>
                    <div className="font-semibold text-gray-900">{activity.duration}</div>
                  </div>
                  <div className="bg-primary/40 rounded-lg p-3">
                    <div className="text-xs text-gray-600 mb-1">Price</div>
                    <div className="text-xl font-bold text-secondary">₹{activity.price.toLocaleString()}</div>
                  </div>
                </div>

                {/* Included Items */}
                <div className="bg-primary/20 rounded-lg p-4 border border-secondary/10">
                  <h4 className="font-semibold text-gray-900 mb-3">What's Included</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      'All ritual materials',
                      'Experienced priest',
                      'Vedic procedures',
                      'Prasadam distribution',
                      'Blessing ceremony',
                      'Spiritual guidance'
                    ].map((item, index) => (
                      <div key={index} className="flex items-center text-xs">
                        <CheckCircle className="w-3 h-3 text-emerald-500 mr-2 flex-shrink-0" />
                        <span className="text-gray-700 truncate">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Important Notes */}
            <div className="bg-primary/10 rounded-xl border border-secondary/10 p-5">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-4 h-4 text-secondary" />
                <h3 className="font-semibold text-gray-900">Important Information</h3>
              </div>
              <ul className="space-y-1 text-xs text-gray-700">
                <li className="flex items-start">
                  <span className="text-secondary mr-2 text-xs">•</span>
                  Arrive 15 minutes before scheduled time
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-2 text-xs">•</span>
                  Traditional attire recommended
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-2 text-xs">•</span>
                  Photography restrictions may apply
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-2 text-xs">•</span>
                  Mobile phones on silent mode
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-2 text-xs">•</span>
                  Follow priest instructions carefully
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column - Booking Form */}
          <div className="lg:sticky lg:top-4">
            <div className="bg-primary rounded-xl border border-secondary/10 p-6 shadow-lg">
              <h2 className="text-xl font-serif font-bold text-gray-900 mb-1">Book This Activity</h2>
              <p className="text-gray-600 text-sm mb-6">Complete the form below to book your sacred ritual</p>
              
              {/* Personal Information */}
              <div className="mb-6">
                <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center">
                  <User className="w-4 h-4 mr-2 text-secondary" />
                  Personal Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={bookingData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-secondary focus:border-secondary text-sm bg-white"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1 flex items-center">
                        <Mail className="w-3 h-3 mr-1 text-secondary" />
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={bookingData.email}
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
                        value={bookingData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-secondary focus:border-secondary text-sm bg-white"
                        placeholder="10-digit number"
                        pattern="[0-9]{10}"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Booking Details */}
              <div className="mb-6">
                <h3 className="text-base font-semibold text-gray-900 mb-4">Booking Details</h3>
                
                {/* Date Selection */}
                <div className="mb-4">
                  <label className="block text-xs font-medium text-gray-700 mb-2 flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-secondary" />
                    Select Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={bookingData.date}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-secondary focus:border-secondary text-sm bg-white"
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>

                {/* Time Slots - 2 Column Layout */}
                <div className="mb-4">
                  <label className="block text-xs font-medium text-gray-700 mb-2 flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-secondary" />
                    Choose a time slot *
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((slot, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setBookingData(prev => ({ ...prev, timeSlot: slot }))}
                        className={`px-3 py-2 border rounded-lg text-xs text-center transition-all duration-150 flex items-center justify-center ${
                          bookingData.timeSlot === slot
                            ? 'border-secondary bg-secondary text-white font-medium'
                            : 'border-gray-300 hover:border-secondary hover:bg-secondary/5'
                        }`}
                      >
                        {slot}
                        {bookingData.timeSlot === slot && (
                          <CheckCircle className="w-3 h-3 ml-1" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Number of People */}
                <div className="mb-4">
                  <label className="block text-xs font-medium text-gray-700 mb-2 flex items-center">
                    <Users className="w-4 h-4 mr-2 text-secondary" />
                    Number of People
                  </label>
                  <div className="flex items-center max-w-[140px]">
                    <button
                      type="button"
                      onClick={() => setBookingData(prev => ({ ...prev, people: Math.max(1, prev.people - 1) }))}
                      className="px-3 py-1 border border-gray-300 rounded-l-lg hover:bg-gray-50 transition-colors text-sm"
                    >
                      -
                    </button>
                    <div className="px-4 py-1 border-t border-b border-gray-300 flex-1 text-center font-semibold text-sm">
                      {bookingData.people}
                    </div>
                    <button
                      type="button"
                      onClick={() => setBookingData(prev => ({ ...prev, people: Math.min(10, prev.people + 1) }))}
                      className="px-3 py-1 border border-gray-300 rounded-r-lg hover:bg-gray-50 transition-colors text-sm"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Room Selection */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <label className="flex items-center text-xs font-medium text-gray-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={bookingData.withRoom}
                        onChange={(e) => setBookingData(prev => ({ 
                          ...prev, 
                          withRoom: e.target.checked,
                          ...(e.target.checked ? {} : { roomId: null, selectedRoom: null })
                        }))}
                        className="mr-2 w-4 h-4 text-secondary focus:ring-secondary rounded border-gray-300"
                      />
                      <Home className="w-4 h-4 mr-2" />
                      I want to book a room
                    </label>
                  </div>

                  {bookingData.withRoom && (
                    <div className="border border-gray-300 rounded-lg p-3 bg-white">
                      <label className="block text-xs font-medium text-gray-700 mb-2">
                        Select Room
                      </label>
                      <div className="space-y-2">
                        {rooms.map((room) => (
                          <div
                            key={room.id}
                            onClick={() => handleRoomSelect(room.id)}
                            className={`p-3 border rounded-lg cursor-pointer transition-all duration-150 text-xs ${
                              bookingData.roomId === room.id
                                ? 'border-secondary bg-secondary/5'
                                : 'border-gray-200 hover:border-secondary'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div className={`w-4 h-4 rounded-full border flex items-center justify-center mr-2 ${
                                  bookingData.roomId === room.id 
                                    ? 'border-secondary bg-secondary' 
                                    : 'border-gray-300'
                                }`}>
                                  {bookingData.roomId === room.id && (
                                    <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                                  )}
                                </div>
                                <div>
                                  <div className="font-medium text-gray-900 text-xs">{room.name}</div>
                                  <div className="text-gray-500 text-[10px] mt-0.5">
                                    <Building className="inline w-2.5 h-2.5 mr-1" />
                                    {room.capacity} people
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-semibold text-secondary text-sm">₹{room.price.toLocaleString()}</div>
                                <div className="text-gray-500 text-[10px]">per day</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Booking Summary */}
              <div className="border-t border-gray-300 pt-6">
                <h3 className="text-lg font-serif font-bold text-gray-900 mb-4">Booking Summary</h3>
                
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Activity</span>
                    <span className="font-medium">{activity.name}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">People</span>
                    <span className="font-medium">{bookingData.people}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Activity Fee</span>
                    <span className="font-medium">₹{activity.price.toLocaleString()}</span>
                  </div>
                  
                  {bookingData.withRoom && bookingData.selectedRoom && (
                    <>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">Room</span>
                        <span className="font-medium">{bookingData.selectedRoom.name}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">Room Price</span>
                        <span className="font-medium">₹{bookingData.selectedRoom.price.toLocaleString()}</span>
                      </div>
                    </>
                  )}
                  
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-gray-900">Total Amount</span>
                      <span className="text-xl font-bold text-secondary">₹{calculateTotal().toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={proceedToPayment}
                  className="w-full px-6 py-3 bg-secondary text-white rounded-full hover:bg-[#C2410C] transition-all duration-300 font-semibold text-sm shadow-md hover:shadow-lg flex items-center justify-center"
                >
                  Proceed to Payment
                  <ChevronRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityDetail;