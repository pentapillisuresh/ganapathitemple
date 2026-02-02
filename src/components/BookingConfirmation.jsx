import React from 'react';
import { useParams, Link } from 'react-router-dom';

const BookingConfirmation = ({ findBookingById }) => {
  const { id } = useParams();
  const booking = findBookingById(id);

  // Your new color palette
  const primaryColor = '#FFF9EC'; // Light cream/beige
  const secondaryColor = '#EA580C'; // Orange
  const secondaryDark = '#C2410C'; // Dark orange
  const secondaryLight = '#FDBA74'; // Light orange
  const textColor = '#1F2937'; // Gray-800 for text
  const borderColor = '#E5E7EB'; // Gray-200 for borders

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 primary-gradient">
        <div className="text-center max-w-md bg-white rounded-2xl shadow-2xl p-10">
          <div className="w-24 h-24 rounded-full bg-secondary/10 flex items-center justify-center text-5xl mx-auto mb-6">
            <span className="text-secondary">📄</span>
          </div>
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Booking Not Found</h2>
          <p className="text-gray-600 mb-8">The reference ID you're looking for doesn't exist or may have been removed.</p>
          <Link 
            to="/" 
            className="px-8 py-4 rounded-lg font-bold transition-all duration-300 hover:shadow-xl inline-block secondary-gradient text-white hover:scale-[1.02]"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const isBooking = booking.type === 'booking';
  const isDonation = booking.type === 'donation';
  const isOrder = booking.type === 'order';

  // Banner images based on type
  const bannerImage = isBooking 
    ? 'https://images.unsplash.com/photo-1585421514284-efb66c0b54ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80'
    : isDonation 
      ? 'https://images.unsplash.com/photo-1544716278-e513176f20b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80'
      : 'https://images.unsplash.com/photo-1621686306575-7ec5df9f44b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80';

  return (
    <div className="min-h-screen primary-gradient">
      {/* Hero Banner */}
      <div className="relative overflow-hidden temple-bg h-[400px] flex items-center justify-center">
        <div className="absolute inset-0 bg-black/50 z-0"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
            <span className="text-5xl">
              {isBooking ? '✅' : isDonation ? '🙏' : '🛍️'}
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            {isBooking ? 'Booking Confirmed!' : isDonation ? 'Donation Successful!' : 'Order Confirmed!'}
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            {isBooking
              ? 'Your sacred ceremony has been scheduled. Divine blessings await.'
              : isDonation
                ? 'Your generosity supports divine service. May the blessings multiply.'
                : 'Sacred artifacts are being prepared for your spiritual journey.'}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12 -mt-24 relative z-20">
        {/* Confirmation Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 card-hover">
          {/* Reference ID Header */}
          <div className="secondary-gradient p-8 md:p-12">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-4">
                  <span className="text-white font-semibold text-sm">REFERENCE ID</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {booking.bookingId || booking.donationId || booking.orderId}
                </h2>
                <p className="text-white/80">Please save this ID for all future communications</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center min-w-[180px]">
                <div className="text-4xl mb-2">
                  {isBooking ? '📅' : isDonation ? '💰' : '📦'}
                </div>
                <div className="text-white font-bold text-lg">
                  {isBooking ? 'Booking' : isDonation ? 'Donation' : 'Order'}
                </div>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="p-8 md:p-12">
            {/* Details Section */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-3 h-10 rounded-full bg-secondary"></div>
                <h3 className="text-2xl font-bold text-gray-800">
                  {isBooking ? 'Booking Details' : isDonation ? 'Donation Summary' : 'Order Summary'}
                </h3>
              </div>

              {isBooking && booking.activity && (
                <div className="bg-gray-50 rounded-2xl p-8 mb-8 border border-gray-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary rounded-full px-4 py-2 text-sm font-semibold mb-4">
                        <span>🎯</span>
                        ACTIVITY
                      </div>
                      <h4 className="text-xl font-bold text-gray-800 mb-3">{booking.activity.name}</h4>
                      <p className="text-gray-600 mb-6 max-w-2xl">{booking.activity.description}</p>
                      <div className="flex flex-wrap gap-3">
                        <span className="bg-white px-4 py-2 rounded-full text-sm border border-gray-200">
                          📅 {booking.date}
                        </span>
                        <span className="bg-white px-4 py-2 rounded-full text-sm border border-gray-200">
                          ⏰ {booking.time || '10:00 AM'}
                        </span>
                      </div>
                    </div>
                    <div className="text-right ml-8">
                      <div className="text-4xl font-bold text-secondary mb-1">₹ {booking.totalAmount}</div>
                      <div className="text-gray-500 text-sm">Total Amount</div>
                    </div>
                  </div>
                </div>
              )}

              {isBooking && booking.hall && (
                <div className="bg-gray-50 rounded-2xl p-8 mb-8 border border-gray-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary rounded-full px-4 py-2 text-sm font-semibold mb-4">
                        <span>🏛️</span>
                        BANQUET HALL
                      </div>
                      <h4 className="text-xl font-bold text-gray-800 mb-3">{booking.hall.name}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-white p-4 rounded-xl border border-gray-200">
                          <div className="text-gray-500 text-sm mb-1">Capacity</div>
                          <div className="font-semibold text-gray-800">{booking.hall.capacity} guests</div>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-gray-200">
                          <div className="text-gray-500 text-sm mb-1">Hall Type</div>
                          <div className="font-semibold text-gray-800">
                            {booking.hall.type === 'ac' ? 'Air Conditioned' : 'Non-AC'}
                          </div>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-gray-200">
                          <div className="text-gray-500 text-sm mb-1">Booking Date</div>
                          <div className="font-semibold text-gray-800">{booking.date}</div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right ml-8">
                      <div className="text-4xl font-bold text-secondary mb-1">₹ {booking.totalAmount}</div>
                      <div className="text-gray-500 text-sm">Hall Fee</div>
                    </div>
                  </div>
                </div>
              )}

              {isDonation && (
                <div className="bg-gray-50 rounded-2xl p-8 mb-8 border border-gray-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary rounded-full px-4 py-2 text-sm font-semibold mb-4">
                        <span>❤️</span>
                        DONATION
                      </div>
                      <h4 className="text-xl font-bold text-gray-800 mb-3">
                        {booking.donationType === 'general' ? 'General Temple Donation' :
                         booking.donationType === 'annadanam' ? 'Annadanam (Food Offering)' :
                         booking.donationType === 'education' ? 'Education & Scholarship Fund' :
                         booking.donationType === 'renovation' ? 'Temple Renovation Fund' :
                         'Gaushala (Cow Shelter Support)'}
                      </h4>
                      {booking.message && (
                        <div className="mt-6 p-6 bg-white rounded-xl border border-gray-200">
                          <div className="text-gray-500 text-sm mb-2">Your Message:</div>
                          <p className="text-gray-700 italic">"{booking.message}"</p>
                        </div>
                      )}
                    </div>
                    <div className="text-right ml-8">
                      <div className="text-4xl font-bold text-secondary mb-1">₹ {booking.amount}</div>
                      <div className="text-gray-500 text-sm">Donation Amount</div>
                      <div className="mt-4 px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-semibold inline-block">
                        Tax Deductible (80G)
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {isOrder && (
                <div className="bg-gray-50 rounded-2xl p-8 mb-8 border border-gray-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary rounded-full px-4 py-2 text-sm font-semibold mb-4">
                        <span>🛒</span>
                        ORDER DETAILS
                      </div>
                      <h4 className="text-xl font-bold text-gray-800 mb-3">{booking.itemName || 'Sacred Idol'}</h4>
                      <div className="flex items-center gap-4 mb-6">
                        <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                          booking.status === 'Processing' 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : booking.status === 'Shipped'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {booking.status || 'Processing'}
                        </span>
                        <span className="text-gray-600">
                          Estimated Delivery: 5-7 business days
                        </span>
                      </div>
                    </div>
                    <div className="text-right ml-8">
                      <div className="text-4xl font-bold text-secondary mb-1">₹ {booking.totalAmount || booking.amount}</div>
                      <div className="text-gray-500 text-sm">Order Total</div>
                      <div className="mt-4 text-sm text-gray-600">
                        Free Shipping
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Two Column Information */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* Personal Information */}
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                    <span className="text-2xl text-secondary">👤</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-800">Personal Information</h4>
                    <p className="text-gray-500 text-sm">Your contact details</p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <div className="text-gray-500 text-sm mb-2">Full Name</div>
                    <div className="text-lg font-semibold text-gray-800">{booking.name}</div>
                  </div>
                  <div>
                    <div className="text-gray-500 text-sm mb-2">Email Address</div>
                    <div className="text-lg font-semibold text-gray-800">{booking.email}</div>
                  </div>
                  {booking.phone && (
                    <div>
                      <div className="text-gray-500 text-sm mb-2">Phone Number</div>
                      <div className="text-lg font-semibold text-gray-800">{booking.phone}</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Transaction Information */}
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                    <span className="text-2xl text-secondary">💳</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-800">Transaction Details</h4>
                    <p className="text-gray-500 text-sm">Payment information</p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <div className="text-gray-500 text-sm mb-2">Transaction Date</div>
                    <div className="text-lg font-semibold text-gray-800">{booking.date}</div>
                  </div>
                  <div>
                    <div className="text-gray-500 text-sm mb-2">Payment Status</div>
                    <div className="inline-flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-lg font-semibold text-green-600">{booking.status || 'Completed'}</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500 text-sm mb-2">Payment Method</div>
                    <div className="text-lg font-semibold text-gray-800">
                      {booking.paymentMethod === 'upi' ? 'UPI Payment' :
                       booking.paymentMethod === 'card' ? 'Credit/Debit Card' :
                       booking.paymentMethod === 'netbanking' ? 'Net Banking' :
                       booking.paymentMethod === 'cod' ? 'Cash on Delivery' :
                       'Online Payment'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                to="/"
                className="px-10 py-5 rounded-xl font-bold text-center transition-all duration-300 hover:shadow-xl secondary-gradient text-white hover:scale-[1.02] flex items-center justify-center gap-3"
              >
                <span>🏠</span>
                Return to Home
              </Link>
              
              {isBooking && booking.hall && (
                <Link
                  to="/banquetHalls"
                  className="px-10 py-5 rounded-xl font-bold text-center transition-all duration-300 hover:shadow-xl border-2 border-secondary text-secondary hover:bg-secondary/5 hover:scale-[1.02] flex items-center justify-center gap-3"
                >
                  <span>🏛️</span>
                  Book Another Hall
                </Link>
              )}
              
              {isBooking && booking.activity && (
                <Link
                  to="/activities"
                  className="px-10 py-5 rounded-xl font-bold text-center transition-all duration-300 hover:shadow-xl border-2 border-secondary text-secondary hover:bg-secondary/5 hover:scale-[1.02] flex items-center justify-center gap-3"
                >
                  <span>🎯</span>
                  Book Another Activity
                </Link>
              )}
              
              {isDonation && (
                <Link
                  to="/donation"
                  className="px-10 py-5 rounded-xl font-bold text-center transition-all duration-300 hover:shadow-xl border-2 border-secondary text-secondary hover:bg-secondary/5 hover:scale-[1.02] flex items-center justify-center gap-3"
                >
                  <span>❤️</span>
                  Make Another Donation
                </Link>
              )}
              
              {isOrder && (
                <Link
                  to="/idols"
                  className="px-10 py-5 rounded-xl font-bold text-center transition-all duration-300 hover:shadow-xl border-2 border-secondary text-secondary hover:bg-secondary/5 hover:scale-[1.02] flex items-center justify-center gap-3"
                >
                  <span>🛒</span>
                  Shop More Idols
                </Link>
              )}
            </div>

            {/* Important Information */}
            <div className="bg-gradient-to-r from-secondary/5 to-secondary/10 rounded-2xl p-8 border border-secondary/20">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl text-white">📋</span>
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-gray-800 mb-2">Important Information</h4>
                  <p className="text-gray-600">Please read these guidelines carefully</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h5 className="font-bold text-gray-800 mb-4 text-lg">General Guidelines</h5>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-secondary text-sm">✓</span>
                      </div>
                      <span className="text-gray-700">Keep your reference ID for all future communications</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-secondary text-sm">✓</span>
                      </div>
                      <span className="text-gray-700">Carry a valid ID proof along with booking confirmation</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-secondary text-sm">✓</span>
                      </div>
                      <span className="text-gray-700">Traditional attire is appreciated in temple premises</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h5 className="font-bold text-gray-800 mb-4 text-lg">Contact & Support</h5>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-secondary text-sm">📞</span>
                      </div>
                      <span className="text-gray-700">Helpline: <strong>+91 98765 43210</strong> (10 AM - 6 PM)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-secondary text-sm">✉️</span>
                      </div>
                      <span className="text-gray-700">Email: <strong>support@ganeshtemple.com</strong></span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-secondary text-sm">🏛️</span>
                      </div>
                      <span className="text-gray-700">Temple address available on website</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Blessing */}
        <div className="text-center mt-12">
          <div className="inline-block bg-white rounded-2xl px-8 py-6 shadow-lg">
            <p className="text-gray-600 mb-2">Thank you for your sacred participation</p>
            <div className="flex items-center justify-center gap-4">
              <div className="text-3xl">🕉️</div>
              <h3 className="text-2xl font-bold text-gray-800 serif-font">May Lord Ganesha bless you with wisdom and prosperity</h3>
              <div className="text-3xl">🙏</div>
            </div>
            <p className="text-gray-500 mt-4 text-sm serif-font">ॐ गं गणपतये नमः</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;