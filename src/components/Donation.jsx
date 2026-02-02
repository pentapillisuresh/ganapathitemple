import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Donation = ({ onDonation }) => {
  const navigate = useNavigate();
  const [donationData, setDonationData] = useState({
    type: 'general',
    amount: '',
    customAmount: '',
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [paymentStep, setPaymentStep] = useState('donation'); // 'donation' or 'payment'
  const [paymentMethod, setPaymentMethod] = useState('upi');

  const donationTypes = [
    { id: 'general', name: 'General Donation', description: 'Support temple maintenance' },
    { id: 'annadanam', name: 'Annadanam', description: 'Food donation for devotees', amount: 1100 },
    { id: 'education', name: 'Education Fund', description: 'Support Vedic education', amount: 2100 },
    { id: 'renovation', name: 'Temple Renovation', description: 'Help maintain the temple', amount: 5100 },
    { id: 'gaushala', name: 'Gaushala', description: 'Support cow shelter', amount: 1100 }
  ];

  const presetAmounts = [101, 501, 1001, 2100, 5100];

  const validatePersonalInfo = () => {
    if (!donationData.name.trim()) {
      alert('Please enter your name');
      return false;
    }
    if (!donationData.email.trim()) {
      alert('Please enter your email');
      return false;
    }
    if (!donationData.phone.trim() || donationData.phone.length < 10) {
      alert('Please enter a valid phone number (at least 10 digits)');
      return false;
    }
    return true;
  };

  const validateDonationAmount = () => {
    const amount = donationData.amount === 'custom' 
      ? parseInt(donationData.customAmount) 
      : parseInt(donationData.amount);

    if (isNaN(amount) || amount < 1) {
      alert('Please enter a valid amount (minimum ₹1)');
      return false;
    }
    return true;
  };

  const proceedToPayment = () => {
    if (!validatePersonalInfo()) {
      return;
    }
    if (!validateDonationAmount()) {
      return;
    }
    setPaymentStep('payment');
  };

  const getDonationAmount = () => {
    if (donationData.amount === 'custom') {
      return parseInt(donationData.customAmount) || 0;
    }
    
    if (donationData.amount) {
      return parseInt(donationData.amount);
    }
    
    // Check if selected type has fixed amount
    const selectedType = donationTypes.find(t => t.id === donationData.type);
    return selectedType?.amount || 0;
  };

  const handlePayment = () => {
    if (!paymentMethod) {
      alert('Please select a payment method');
      return;
    }

    const amount = getDonationAmount();
    
    const donation = {
      type: donationData.type,
      amount,
      name: donationData.name,
      email: donationData.email,
      phone: donationData.phone,
      message: donationData.message,
      paymentMethod: paymentMethod,
      date: new Date().toISOString(),
      paymentStatus: 'Paid'
    };

    const result = onDonation(donation);
    navigate(`/booking-confirmation/${result.id}`);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Donation</h1>
        <p className="text-gray-600 text-lg">
          Support the temple and participate in sacred services through your generous donations
        </p>
      </div>

      {paymentStep === 'donation' ? (
        <form onSubmit={(e) => e.preventDefault()} className="bg-white rounded-2xl shadow-xl p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Donation Type */}
            <div>
              <h3 className="text-2xl font-bold mb-6">Select Donation Type</h3>
              <div className="space-y-4">
                {donationTypes.map((type) => (
                  <div
                    key={type.id}
                    onClick={() => setDonationData({ ...donationData, type: type.id })}
                    className={`p-4 border-2 rounded-xl cursor-pointer transition-colors ${
                      donationData.type === type.id
                        ? 'border-yellow-500 bg-yellow-50'
                        : 'border-gray-200 hover:border-yellow-500'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-bold text-lg">{type.name}</h4>
                        <p className="text-gray-600">{type.description}</p>
                      </div>
                      {type.amount && (
                        <span className="text-yellow-600 font-bold">₹ {type.amount}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Amount & Details */}
            <div>
              <h3 className="text-2xl font-bold mb-6">Donation Amount</h3>
              
              {/* Preset Amounts */}
              <div className="mb-8">
                <div className="text-gray-700 mb-4">Select Amount</div>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {presetAmounts.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => setDonationData({ 
                        ...donationData, 
                        amount: amount.toString(),
                        customAmount: ''
                      })}
                      className={`px-4 py-3 border-2 rounded-lg text-center ${
                        donationData.amount === amount.toString()
                          ? 'border-yellow-500 bg-yellow-50 text-yellow-700'
                          : 'border-gray-300 hover:border-yellow-500'
                      }`}
                    >
                      ₹ {amount}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setDonationData({ 
                      ...donationData, 
                      amount: 'custom',
                      customAmount: ''
                    })}
                    className={`px-4 py-3 border-2 rounded-lg text-center col-span-3 ${
                      donationData.amount === 'custom'
                        ? 'border-yellow-500 bg-yellow-50 text-yellow-700'
                        : 'border-gray-300 hover:border-yellow-500'
                    }`}
                  >
                    Custom Amount
                  </button>
                </div>

                {/* Custom Amount */}
                {donationData.amount === 'custom' && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Enter Amount (₹)
                    </label>
                    <input
                      type="number"
                      value={donationData.customAmount}
                      onChange={(e) => setDonationData({ 
                        ...donationData, 
                        customAmount: e.target.value 
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                      placeholder="Enter amount"
                      min="1"
                    />
                  </div>
                )}
              </div>

              {/* Donor Information */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                  <input
                    type="text"
                    value={donationData.name}
                    onChange={(e) => setDonationData({ ...donationData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <input
                      type="email"
                      value={donationData.email}
                      onChange={(e) => setDonationData({ ...donationData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                    <input
                      type="tel"
                      value={donationData.phone}
                      onChange={(e) => setDonationData({ ...donationData, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message (Optional)
                  </label>
                  <textarea
                    value={donationData.message}
                    onChange={(e) => setDonationData({ ...donationData, message: e.target.value })}
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                    placeholder="Your message or prayer..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Donation Summary */}
          <div className="border-t mt-8 pt-8">
            <h4 className="text-xl font-bold mb-4">Donation Summary</h4>
            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Donation Type:</span>
                  <span className="font-semibold">
                    {donationTypes.find(t => t.id === donationData.type)?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount:</span>
                  <span className="text-2xl font-bold text-yellow-600">
                    ₹ {getDonationAmount()}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={proceedToPayment}
              className="w-full px-8 py-4 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors font-bold text-lg"
            >
              Proceed to Payment
            </button>
          </div>
        </form>
      ) : (
        /* Payment Step */
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-8">
            <button
              onClick={() => setPaymentStep('donation')}
              className="text-yellow-600 hover:text-yellow-700 flex items-center mb-6"
            >
              ← Back to Donation Details
            </button>
            
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-yellow-500 text-white flex items-center justify-center font-bold">
                1
              </div>
              <div className="h-1 w-12 bg-yellow-200"></div>
              <div className="w-10 h-10 rounded-full bg-yellow-500 text-white flex items-center justify-center font-bold">
                2
              </div>
            </div>
            
            <h2 className="text-2xl font-bold">Complete Your Donation</h2>
            <p className="text-gray-600">Total Amount: <span className="text-2xl font-bold text-yellow-600 ml-2">₹ {getDonationAmount()}</span></p>
          </div>

          {/* Donation Summary */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h4 className="font-bold mb-4">Donation Summary</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Donation Type:</span>
                <span className="font-semibold">
                  {donationTypes.find(t => t.id === donationData.type)?.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Name:</span>
                <span className="font-semibold">{donationData.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Email:</span>
                <span className="font-semibold">{donationData.email}</span>
              </div>
              {donationData.message && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Your Message:</span>
                  <span className="font-semibold text-right max-w-xs">{donationData.message}</span>
                </div>
              )}
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total Amount:</span>
                  <span className="text-yellow-600">₹ {getDonationAmount()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-4">Select Payment Method</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => setPaymentMethod('upi')}
                className={`p-6 border rounded-xl text-left transition-colors ${
                  paymentMethod === 'upi'
                    ? 'border-yellow-500 bg-yellow-50'
                    : 'border-gray-200 hover:border-yellow-500'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-lg">UPI Payment</h4>
                    <p className="text-sm text-gray-600 mt-1">GPay, PhonePe, Paytm</p>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    paymentMethod === 'upi' ? 'border-yellow-500 bg-yellow-500' : 'border-gray-300'
                  }`}>
                    {paymentMethod === 'upi' && (
                      <div className="w-3 h-3 rounded-full bg-white"></div>
                    )}
                  </div>
                </div>
              </button>

              <button
                onClick={() => setPaymentMethod('card')}
                className={`p-6 border rounded-xl text-left transition-colors ${
                  paymentMethod === 'card'
                    ? 'border-yellow-500 bg-yellow-50'
                    : 'border-gray-200 hover:border-yellow-500'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-lg">Debit/Credit Card</h4>
                    <p className="text-sm text-gray-600 mt-1">Visa, MasterCard, Rupay</p>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    paymentMethod === 'card' ? 'border-yellow-500 bg-yellow-500' : 'border-gray-300'
                  }`}>
                    {paymentMethod === 'card' && (
                      <div className="w-3 h-3 rounded-full bg-white"></div>
                    )}
                  </div>
                </div>
              </button>

              <button
                onClick={() => setPaymentMethod('netbanking')}
                className={`p-6 border rounded-xl text-left transition-colors ${
                  paymentMethod === 'netbanking'
                    ? 'border-yellow-500 bg-yellow-50'
                    : 'border-gray-200 hover:border-yellow-500'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-lg">Net Banking</h4>
                    <p className="text-sm text-gray-600 mt-1">All major Indian banks</p>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    paymentMethod === 'netbanking' ? 'border-yellow-500 bg-yellow-500' : 'border-gray-300'
                  }`}>
                    {paymentMethod === 'netbanking' && (
                      <div className="w-3 h-3 rounded-full bg-white"></div>
                    )}
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Tax Exemption Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <h4 className="font-bold text-blue-800 mb-2">Tax Exemption Information</h4>
            <p className="text-sm text-blue-700">
              Ganapathi Temple is registered under Section 80G of the Income Tax Act. 
              All donations are eligible for tax exemption. A receipt with 80G certificate 
              will be emailed to you after payment.
            </p>
          </div>

          {/* Terms and Conditions */}
          <div className="mb-8">
            <div className="flex items-start mb-4">
              <input
                type="checkbox"
                id="terms"
                className="mr-3 mt-1"
                required
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I confirm that this donation is made voluntarily and I understand that 
                the amount is non-refundable. I agree to receive the 80G tax exemption 
                certificate via email.
              </label>
            </div>
          </div>

          {/* Complete Donation Button */}
          <button
            onClick={handlePayment}
            className="w-full px-8 py-4 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors font-bold text-lg"
          >
            Complete Donation - ₹ {getDonationAmount()}
          </button>
        </div>
      )}

      {/* Benefits of Donation */}
      <div className="mt-12 bg-yellow-50 border border-yellow-200 rounded-xl p-8">
        <h3 className="text-2xl font-bold mb-6">Benefits of Donation</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full gold-gradient flex items-center justify-center text-white mx-auto mb-4">
              <span className="text-2xl">🙏</span>
            </div>
            <h4 className="font-bold mb-2">Spiritual Merit</h4>
            <p className="text-gray-600">Gain spiritual blessings and divine grace</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 rounded-full gold-gradient flex items-center justify-center text-white mx-auto mb-4">
              <span className="text-2xl">🎫</span>
            </div>
            <h4 className="font-bold mb-2">Tax Benefits</h4>
            <p className="text-gray-600">80G certificate for tax exemption</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 rounded-full gold-gradient flex items-center justify-center text-white mx-auto mb-4">
              <span className="text-2xl">❤️</span>
            </div>
            <h4 className="font-bold mb-2">Service to Society</h4>
            <p className="text-gray-600">Support temple activities and community service</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donation;