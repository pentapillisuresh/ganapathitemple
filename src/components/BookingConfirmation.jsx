import React from 'react';
import { useParams, Link } from 'react-router-dom';

const BookingConfirmation = ({ findBookingById }) => {
  const { id } = useParams();
  const booking = findBookingById(id);

  if (!booking) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📄</div>
          <h2 className="text-2xl font-bold mb-4">Booking/Order/Donation not found</h2>
          <p className="text-gray-600 mb-6">The reference ID you're looking for doesn't exist.</p>
          <Link to="/" className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const isBooking = booking.type === 'booking';
  const isDonation = booking.type === 'donation';
  const isOrder = booking.type === 'order';

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="w-24 h-24 rounded-full gold-gradient flex items-center justify-center text-white text-4xl mx-auto mb-6">
          {isBooking ? '✅' : isDonation ? '🙏' : '🛍️'}
        </div>
        <h1 className="text-4xl font-bold mb-4">
          {isBooking ? 'Booking Confirmed!' : isDonation ? 'Donation Successful!' : 'Order Placed!'}
        </h1>
        <p className="text-gray-600 text-lg">
          {isBooking
            ? 'Your booking has been confirmed. Details are below.'
            : isDonation
              ? 'Thank you for your generous donation. May Lord Ganesha bless you.'
              : 'Your order has been placed successfully. We will contact you soon.'}
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
        {/* Reference ID */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-2">Reference ID</div>
            <div className="text-2xl font-bold text-yellow-700">{booking.bookingId || booking.donationId || booking.orderId}</div>
            <div className="text-sm text-gray-500 mt-2">
              Please keep this ID for future reference
            </div>
          </div>
        </div>

        {/* Details based on type */}
        <div className="space-y-6">
          {isBooking && booking.activity && (
            <div>
              <h3 className="text-xl font-bold mb-4">Activity Details</h3>
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <h4 className="font-bold text-lg">{booking.activity.name}</h4>
                    <p className="text-gray-600">{booking.activity.description}</p>
                  </div>
                  <div className="mt-4 md:mt-0 text-right">
                    <div className="text-2xl font-bold text-yellow-600">₹ {booking.totalAmount}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {isBooking && booking.hall && (
            <div>
              <h3 className="text-xl font-bold mb-4">Banquet Hall Details</h3>
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <h4 className="font-bold text-lg">{booking.hall.name}</h4>
                    <p className="text-gray-600">Capacity: {booking.hall.capacity} guests</p>
                    <p className="text-gray-600">Type: {booking.hall.type === 'ac' ? 'AC Hall' : 'Non-AC Hall'}</p>
                  </div>
                  <div className="mt-4 md:mt-0 text-right">
                    <div className="text-2xl font-bold text-yellow-600">₹ {booking.totalAmount}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {isDonation && (
            <div>
              <h3 className="text-xl font-bold mb-4">Donation Details</h3>
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <h4 className="font-bold text-lg">
                      {booking.type === 'general' ? 'General Donation' :
                        booking.type === 'annadanam' ? 'Annadanam (Food Donation)' :
                          booking.type === 'education' ? 'Education Fund' :
                            booking.type === 'renovation' ? 'Temple Renovation' :
                              'Gaushala (Cow Shelter)'}
                    </h4>
                    {booking.message && (
                      <p className="text-gray-600 mt-2">Message: {booking.message}</p>
                    )}
                  </div>
                  <div className="mt-4 md:mt-0 text-right">
                    <div className="text-2xl font-bold text-yellow-600">₹ {booking.amount}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {isOrder && (
            <div>
              <h3 className="text-xl font-bold mb-4">Order Details</h3>
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <h4 className="font-bold text-lg">{booking.itemName || 'Idol Purchase'}</h4>
                    <p className="text-gray-600">Status: {booking.status || 'Processing'}</p>
                  </div>
                  <div className="mt-4 md:mt-0 text-right">
                    <div className="text-2xl font-bold text-yellow-600">₹ {booking.totalAmount || booking.amount}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Common Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="font-bold mb-4">Personal Information</h4>
              <div className="space-y-2">
                <div>
                  <div className="text-sm text-gray-600">Name</div>
                  <div className="font-semibold">{booking.name}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Email</div>
                  <div className="font-semibold">{booking.email}</div>
                </div>
                {booking.phone && (
                  <div>
                    <div className="text-sm text-gray-600">Phone</div>
                    <div className="font-semibold">{booking.phone}</div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="font-bold mb-4">Transaction Details</h4>
              <div className="space-y-2">
                <div>
                  <div className="text-sm text-gray-600">Date</div>
                  <div className="font-semibold">{booking.date}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Status</div>
                  <div className="font-semibold text-green-600">{booking.status || 'Completed'}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Payment Method</div>
                  <div className="font-semibold">
                    {booking.paymentMethod === 'upi' ? 'UPI' :
                      booking.paymentMethod === 'card' ? 'Credit/Debit Card' :
                        booking.paymentMethod === 'netbanking' ? 'Net Banking' :
                          booking.paymentMethod === 'cod' ? 'Cash at Temple' :
                            'Online Payment'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          to="/"
          className="px-8 py-4 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors font-bold text-center"
        >
          Return to Home
        </Link>
        {isBooking && booking.hall && (
          <Link
            to="/banquetHalls"
            className="px-8 py-4 border-2 border-yellow-500 text-yellow-600 rounded-lg hover:bg-yellow-50 transition-colors font-bold text-center"
          >
            Book Another Hall
          </Link>
        )}
        {isBooking && booking.activity && (
          <Link
            to="/activities"
            className="px-8 py-4 border-2 border-yellow-500 text-yellow-600 rounded-lg hover:bg-yellow-50 transition-colors font-bold text-center"
          >
            Book Another Activity
          </Link>
        )}
        {isDonation && (
          <Link
            to="/donation"
            className="px-8 py-4 border-2 border-yellow-500 text-yellow-600 rounded-lg hover:bg-yellow-50 transition-colors font-bold text-center"
          >
            Make Another Donation
          </Link>
        )}
        {isOrder && (
          <Link
            to="/idols"
            className="px-8 py-4 border-2 border-yellow-500 text-yellow-600 rounded-lg hover:bg-yellow-50 transition-colors font-bold text-center"
          >
            Shop More Idols
          </Link>
        )}
      </div>

      {/* Important Notes */}
      <div className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h4 className="font-bold text-blue-800 mb-3">Important Notes</h4>
        <ul className="space-y-2 text-blue-700">
          {isBooking && (
            <>
              <li>• Please arrive 15 minutes before your scheduled time</li>
              <li>• Carry a printed copy or digital copy of this confirmation</li>
              <li>• Traditional dress code is recommended for temple activities</li>
            </>
          )}
          {isDonation && (
            <>
              <li>• Tax exemption certificate (80G) will be emailed within 7 working days</li>
              <li>• Receipt will be sent to your registered email address</li>
              <li>• For any queries, email to donations@ganapathitemple.com</li>
            </>
          )}
          {isOrder && (
            <>
              <li>• Order will be dispatched within 3-5 working days</li>
              <li>• Shipping confirmation with tracking details will be sent via email/SMS</li>
              <li>• For order tracking, email to orders@ganapathitemple.com</li>
            </>
          )}
          <li>• For any assistance, call us at +91 98765 43210</li>
        </ul>
      </div>
    </div>
  );
};

export default BookingConfirmation;