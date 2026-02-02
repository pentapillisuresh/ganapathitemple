import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Calendar, Clock, Users, Home, CheckCircle, ChevronRight, ChevronLeft, Building, Shield, User, Mail, Phone, Wind, Wifi, Coffee, Car, Volume2, Tv, Droplets } from 'lucide-react';

const BanquetHallsDetail = ({ data, onBooking }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Find hall by ID (handle both string and number)
  const hall = data.banquetHalls?.find(h => 
    h.id?.toString() === id?.toString() || 
    h.id === parseInt(id)
  );

  const [bookingData, setBookingData] = useState({
    date: '',
    timeSlot: '',
    guests: 50,
    hours: 4,
    eventType: '',
    withCatering: false,
    withDecoration: false,
    name: '',
    email: '',
    phone: ''
  });

  const [formStep, setFormStep] = useState('booking');

  const timeSlots = [
    '9:00 AM - 1:00 PM',
    '2:00 PM - 6:00 PM',
    '6:00 PM - 10:00 PM',
    '10:00 AM - 6:00 PM',
    '6:00 PM - 12:00 AM'
  ];

  const eventTypes = [
    'Wedding',
    'Reception',
    'Birthday',
    'Anniversary',
    'Corporate Event',
    'Religious Ceremony',
    'Family Function',
    'Other'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateTotal = () => {
    if (!hall) return 0;
    
    let total = hall.basePrice || hall.price || 0;

    // Additional hour charges
    if (bookingData.hours > 4) {
      const extraHours = bookingData.hours - 4;
      total += extraHours * ((hall.basePrice || hall.price || 0) * 0.25);
    }

    // Additional services
    if (bookingData.withCatering) total += hall.cateringPrice || 0;
    if (bookingData.withDecoration) total += hall.decorationPrice || 0;

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
    if (!bookingData.eventType) {
      alert('Please select event type');
      return false;
    }
    if (bookingData.guests > (hall?.capacity || 0)) {
      alert(`Maximum capacity for ${hall?.name} is ${hall?.capacity} guests`);
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
      type: 'banquet',
      hall: hall,
      ...bookingData,
      totalAmount: calculateTotal(),
      bookingDate: new Date().toISOString(),
      bookingId: 'TEMPLE-' + Date.now()
    };

    const result = onBooking(booking);
    navigate(`/booking-confirmation/${result.id}`);
  };

  const getFeatureIcon = (feature) => {
    const featureIcons = {
      'AC': Wind,
      'WiFi': Wifi,
      'Parking': Car,
      'Catering': Coffee,
      'Sound System': Volume2,
      'Projector': Tv,
      'Non-AC': Droplets,
      'Decoration': '🎨'
    };

    for (const [key, icon] of Object.entries(featureIcons)) {
      if (feature?.toLowerCase()?.includes(key.toLowerCase())) {
        return icon;
      }
    }
    return Building;
  };

  if (!hall) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center bg-primary rounded-2xl shadow-lg p-6 max-w-sm border border-secondary/20">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Banquet Hall Not Found</h2>
          <p className="text-gray-600 mb-4 text-sm">The requested banquet hall could not be found.</p>
          <Link
            to="/banquetHalls"
            className="inline-flex items-center px-4 py-2 bg-secondary text-white rounded-full text-sm font-semibold hover:bg-[#C2410C] transition-all duration-300 shadow-sm hover:shadow"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Banquet Halls
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Banner Section */}
      <div className="relative h-[320px] overflow-hidden">
        <img
          src={hall.bannerImage || hall.image || "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1600&auto=format&fit=crop"}
          alt={hall.name}
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
                <div className="flex flex-wrap items-center gap-2 text-xs text-white/80">
                  <Link to="/" className="hover:text-white transition-colors">Home</Link>
                  <span className="text-white/50">|</span>
                  <Link to="/banquetHalls" className="font-medium text-white">Banquet Halls</Link>
                  <span className="text-white/50">|</span>
                  <Link to="/activities" className="hover:text-white transition-colors">Activities</Link>
                  <span className="text-white/50">|</span>
                  <Link to="/ganapathis32" className="hover:text-white transition-colors">32 Ganapathis</Link>
                  <span className="text-white/50">|</span>
                  <Link to="/idols" className="hover:text-white transition-colors">Idols</Link>
                </div>
              </div>
              <Link
                to="/banquetHalls"
                className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm hover:bg-white/30 transition-all duration-300 border border-white/30"
              >
                <ChevronLeft className="w-3 h-3 mr-1" />
                Back to Halls
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Hall Details */}
          <div className="space-y-6">
            {/* Hall Image & Basic Info */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <div className="relative h-64">
                <img
                  src={hall.image || "https://images.unsplash.com/photo-1549451371-64aa98a6f660?w=800&auto=format&fit=crop"}
                  alt={hall.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <h2 className="text-2xl font-serif font-bold text-white mb-1">{hall.name}</h2>
                  <div className="flex items-center gap-3 text-white/90 text-xs">
                    <span className="flex items-center bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                      <Users className="w-3 h-3 mr-1" />
                      Capacity: {hall.capacity} guests
                    </span>
                    <span className={`flex items-center px-2 py-1 rounded-full ${
                      hall.type === 'ac' 
                        ? 'bg-blue-500/20 backdrop-blur-sm' 
                        : 'bg-gray-500/20 backdrop-blur-sm'
                    }`}>
                      {hall.type === 'ac' ? <Wind className="w-3 h-3 mr-1" /> : <Droplets className="w-3 h-3 mr-1" />}
                      {hall.type === 'ac' ? 'AC Hall' : 'Non-AC'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">About This Hall</h3>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  {hall.description || "A spacious and well-equipped banquet hall perfect for weddings, receptions, corporate events, and religious ceremonies. Located within the temple premises with a peaceful ambiance."}
                </p>

                {/* Key Features */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-primary/40 rounded-lg p-3">
                    <div className="text-xs text-gray-600 mb-1">Base Price</div>
                    <div className="text-xl font-bold text-secondary">₹{(hall.basePrice || hall.price || 0).toLocaleString()}</div>
                    <div className="text-[10px] text-gray-500">for 4 hours</div>
                  </div>
                  <div className="bg-primary/40 rounded-lg p-3">
                    <div className="text-xs text-gray-600 mb-1">Capacity</div>
                    <div className="font-semibold text-gray-900 text-lg">{hall.capacity?.toLocaleString() || "0"}</div>
                    <div className="text-[10px] text-gray-500">maximum guests</div>
                  </div>
                </div>

                {/* Features Grid */}
                <div className="bg-primary/20 rounded-lg p-4 border border-secondary/10">
                  <h4 className="font-semibold text-gray-900 mb-3">Hall Features</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {(hall.features || []).map((feature, index) => {
                      const Icon = getFeatureIcon(feature);
                      return (
                        <div key={index} className="flex items-center text-xs">
                          {typeof Icon === 'string' ? (
                            <span className="mr-2">{Icon}</span>
                          ) : (
                            <Icon className="w-3 h-3 text-secondary mr-2 flex-shrink-0" />
                          )}
                          <span className="text-gray-700 truncate">{feature}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Services */}
            <div className="bg-primary/10 rounded-xl border border-secondary/10 p-5">
              <div className="flex items-center gap-2 mb-3">
                <Coffee className="w-4 h-4 text-secondary" />
                <h3 className="font-semibold text-gray-900">Additional Services</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mr-2" />
                    <span>Catering Services</span>
                  </div>
                  <span className="font-semibold text-secondary">₹{(hall.cateringPrice || 5000).toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mr-2" />
                    <span>Decoration Package</span>
                  </div>
                  <span className="font-semibold text-secondary">₹{(hall.decorationPrice || 8000).toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mr-2" />
                    <span>Audio-Visual Equipment</span>
                  </div>
                  <span className="font-semibold text-secondary">₹{(hall.avEquipmentPrice || 3000).toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Important Notes */}
            <div className="bg-primary/10 rounded-xl border border-secondary/10 p-5">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-4 h-4 text-secondary" />
                <h3 className="font-semibold text-gray-900">Terms & Conditions</h3>
              </div>
              <ul className="space-y-1 text-xs text-gray-700">
                <li className="flex items-start">
                  <span className="text-secondary mr-2 text-xs">•</span>
                  50% advance payment required for confirmation
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-2 text-xs">•</span>
                  Full payment 7 days before the event
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-2 text-xs">•</span>
                  No outside food allowed (except with permission)
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-2 text-xs">•</span>
                  Damage deposit of ₹10,000 (refundable)
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-2 text-xs">•</span>
                  Events must conclude by 12:00 AM
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column - Booking Form */}
          <div className="lg:sticky lg:top-4">
            <div className="bg-primary rounded-xl border border-secondary/10 p-6 shadow-lg">
              <h2 className="text-xl font-serif font-bold text-gray-900 mb-1">Book This Hall</h2>
              <p className="text-gray-600 text-sm mb-6">Complete the form below to book the banquet hall</p>

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

                {/* Time Slots */}
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

                {/* Event Type */}
                <div className="mb-4">
                  <label className="block text-xs font-medium text-gray-700 mb-2">
                    Event Type *
                  </label>
                  <select
                    name="eventType"
                    value={bookingData.eventType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-secondary focus:border-secondary text-sm bg-white"
                    required
                  >
                    <option value="">Select event type</option>
                    {eventTypes.map((type, index) => (
                      <option key={index} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {/* Number of Guests */}
                <div className="mb-4">
                  <label className="block text-xs font-medium text-gray-700 mb-2 flex items-center">
                    <Users className="w-4 h-4 mr-2 text-secondary" />
                    Number of Guests
                  </label>
                  <div className="flex items-center max-w-[180px]">
                    <button
                      type="button"
                      onClick={() => setBookingData(prev => ({ ...prev, guests: Math.max(10, prev.guests - 10) }))}
                      className="px-3 py-1 border border-gray-300 rounded-l-lg hover:bg-gray-50 transition-colors text-sm"
                    >
                      -
                    </button>
                    <div className="px-4 py-1 border-t border-b border-gray-300 flex-1 text-center font-semibold text-sm">
                      {bookingData.guests}
                    </div>
                    <button
                      type="button"
                      onClick={() => setBookingData(prev => ({
                        ...prev,
                        guests: Math.min(hall.capacity || 500, prev.guests + 10)
                      }))}
                      className="px-3 py-1 border border-gray-300 rounded-r-lg hover:bg-gray-50 transition-colors text-sm"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Max capacity: {hall.capacity} guests
                    {bookingData.guests > (hall.capacity || 0) && (
                      <span className="text-red-500 ml-2">⚠️ Exceeds capacity</span>
                    )}
                  </div>
                </div>

                {/* Duration */}
                <div className="mb-4">
                  <label className="block text-xs font-medium text-gray-700 mb-2">
                    Duration (Hours)
                  </label>
                  <select
                    name="hours"
                    value={bookingData.hours}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-secondary focus:border-secondary text-sm bg-white"
                  >
                    {[4, 6, 8, 10, 12].map(hours => (
                      <option key={hours} value={hours}>{hours} hours</option>
                    ))}
                  </select>
                </div>

                {/* Additional Services */}
                <div className="mb-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="flex items-center text-xs font-medium text-gray-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={bookingData.withCatering}
                        onChange={(e) => setBookingData(prev => ({
                          ...prev,
                          withCatering: e.target.checked
                        }))}
                        className="mr-2 w-4 h-4 text-secondary focus:ring-secondary rounded border-gray-300"
                      />
                      <Coffee className="w-4 h-4 mr-2" />
                      Include Catering Services
                    </label>
                    <span className="text-xs font-semibold text-secondary">
                      ₹{(hall.cateringPrice || 5000).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="flex items-center text-xs font-medium text-gray-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={bookingData.withDecoration}
                        onChange={(e) => setBookingData(prev => ({
                          ...prev,
                          withDecoration: e.target.checked
                        }))}
                        className="mr-2 w-4 h-4 text-secondary focus:ring-secondary rounded border-gray-300"
                      />
                      <span className="mr-2">🎨</span>
                      Include Decoration Package
                    </label>
                    <span className="text-xs font-semibold text-secondary">
                      ₹{(hall.decorationPrice || 8000).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Booking Summary */}
              <div className="border-t border-gray-300 pt-6">
                <h3 className="text-lg font-serif font-bold text-gray-900 mb-4">Booking Summary</h3>

                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Hall</span>
                    <span className="font-medium">{hall.name}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Event Type</span>
                    <span className="font-medium">{bookingData.eventType || 'Not selected'}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Guests</span>
                    <span className="font-medium">{bookingData.guests} / {hall.capacity}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-medium">{bookingData.hours} hours</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Base Price (4h)</span>
                    <span className="font-medium">₹{(hall.basePrice || hall.price || 0).toLocaleString()}</span>
                  </div>

                  {/* Additional Hours */}
                  {bookingData.hours > 4 && (
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">Extra {bookingData.hours - 4} hours</span>
                      <span className="font-medium">
                        ₹{(((hall.basePrice || hall.price || 0) * 0.25 * (bookingData.hours - 4)).toLocaleString())}
                      </span>
                    </div>
                  )}

                  {/* Additional Services */}
                  {bookingData.withCatering && (
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">Catering Service</span>
                      <span className="font-medium">₹{(hall.cateringPrice || 5000).toLocaleString()}</span>
                    </div>
                  )}
                  {bookingData.withDecoration && (
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">Decoration Package</span>
                      <span className="font-medium">₹{(hall.decorationPrice || 8000).toLocaleString()}</span>
                    </div>
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
                  disabled={bookingData.guests > (hall.capacity || 0)}
                  className={`w-full px-6 py-3 rounded-full text-sm font-semibold shadow-md hover:shadow-lg flex items-center justify-center transition-all duration-300 ${
                    bookingData.guests > (hall.capacity || 0)
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-secondary text-white hover:bg-[#C2410C]'
                  }`}
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

export default BanquetHallsDetail;