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

  const [paymentStep, setPaymentStep] = useState('donation');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [termsAccepted, setTermsAccepted] = useState(false);

  const donationTypes = [
    { id: 'general', name: 'General Donation', description: 'Support temple maintenance', icon: '🏛️' },
    { id: 'annadanam', name: 'Annadanam', description: 'Food donation for devotees', amount: 1100, icon: '🍚' },
    { id: 'education', name: 'Education Fund', description: 'Support Vedic education', amount: 2100, icon: '📚' },
    { id: 'renovation', name: 'Temple Renovation', description: 'Help maintain the temple', amount: 5100, icon: '🔨' },
    { id: 'gaushala', name: 'Gaushala', description: 'Support cow shelter', amount: 1100, icon: '🐄' }
  ];

  const presetAmounts = [101, 501, 1001, 2100, 5100];

  const validatePersonalInfo = () => {
    const errors = [];
    
    if (!donationData.name.trim()) {
      errors.push('Please enter your name');
    }
    if (!donationData.email.trim() || !/^\S+@\S+\.\S+$/.test(donationData.email)) {
      errors.push('Please enter a valid email address');
    }
    if (!donationData.phone.trim() || donationData.phone.length < 10) {
      errors.push('Please enter a valid phone number (at least 10 digits)');
    }
    
    if (errors.length > 0) {
      alert(errors.join('\n'));
      return false;
    }
    return true;
  };

  const validateDonationAmount = () => {
    const amount = getDonationAmount();
    
    if (isNaN(amount) || amount < 1) {
      alert('Please enter a valid amount (minimum ₹1)');
      return false;
    }
    return true;
  };

  const proceedToPayment = () => {
    if (!validatePersonalInfo() || !validateDonationAmount()) {
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
    
    const selectedType = donationTypes.find(t => t.id === donationData.type);
    return selectedType?.amount || 0;
  };

  const handlePayment = () => {
    if (!paymentMethod) {
      alert('Please select a payment method');
      return;
    }
    
    if (!termsAccepted) {
      alert('Please accept the terms and conditions');
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
    <div className="min-h-screen bg-primary">
      {/* Hero Banner */}
      <div className="relative h-96 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1621491510317-0015e75fddc7?w=1920&auto=format&fit=crop&q=80"
            alt="Temple Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
        </div>
        
        <div className="relative h-full flex flex-col justify-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-primary text-sm font-medium tracking-wider uppercase mb-2">
              Support Divine Service
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Make a Sacred Donation
            </h1>
            <p className="text-xl text-gray-200">
              Your generous contribution helps sustain temple activities, community service, 
              and spiritual programs that touch thousands of lives.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {paymentStep === 'donation' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Donation Options */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center font-bold mr-3">
                    1
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Select Donation</h2>
                    <p className="text-gray-600">Choose type and amount</p>
                  </div>
                </div>

                {/* Donation Types */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Donation Type</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {donationTypes.map((type) => (
                      <div
                        key={type.id}
                        onClick={() => setDonationData({ ...donationData, type: type.id })}
                        className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                          donationData.type === type.id
                            ? 'border-secondary bg-orange-50'
                            : 'border-gray-200 hover:border-secondary hover:shadow-md'
                        }`}
                      >
                        <div className="flex items-start">
                          <span className="text-2xl mr-3">{type.icon}</span>
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-1">
                              <h4 className="font-bold text-gray-900">{type.name}</h4>
                              {type.amount && (
                                <span className="text-secondary font-bold">₹{type.amount}</span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">{type.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Donation Amount */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Donation Amount</h3>
                  <div className="space-y-4">
                    {/* Preset Amounts */}
                    <div>
                      <p className="text-sm text-gray-600 mb-3">Select Amount (₹)</p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-4">
                        {presetAmounts.map((amount) => (
                          <button
                            key={amount}
                            type="button"
                            onClick={() => setDonationData({ 
                              ...donationData, 
                              amount: amount.toString(),
                              customAmount: ''
                            })}
                            className={`px-4 py-3 border-2 rounded-lg text-center font-medium transition-all duration-300 ${
                              donationData.amount === amount.toString()
                                ? 'border-secondary bg-secondary text-white'
                                : 'border-gray-300 hover:border-secondary hover:bg-orange-50'
                            }`}
                          >
                            ₹{amount}
                          </button>
                        ))}
                      </div>
                      
                      {/* Custom Amount */}
                      <div>
                        <button
                          type="button"
                          onClick={() => setDonationData({ 
                            ...donationData, 
                            amount: 'custom',
                            customAmount: donationData.customAmount || ''
                          })}
                          className={`w-full px-4 py-3 border-2 rounded-lg text-center mb-3 ${
                            donationData.amount === 'custom'
                              ? 'border-secondary bg-secondary text-white'
                              : 'border-gray-300 hover:border-secondary'
                          }`}
                        >
                          Custom Amount
                        </button>
                        
                        {donationData.amount === 'custom' && (
                          <div>
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
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary"
                              placeholder="Enter custom amount"
                              min="1"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Your Information</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={donationData.name}
                        onChange={(e) => setDonationData({ ...donationData, name: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          value={donationData.email}
                          onChange={(e) => setDonationData({ ...donationData, email: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary"
                          placeholder="you@example.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          value={donationData.phone}
                          onChange={(e) => setDonationData({ ...donationData, phone: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary"
                          placeholder="+91 98765 43210"
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary"
                        placeholder="Your message or prayer for the donation..."
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b">
                    Donation Summary
                  </h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Donation Type:</span>
                      <span className="font-semibold">
                        {donationTypes.find(t => t.id === donationData.type)?.name}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Amount:</span>
                      <span className="text-2xl font-bold text-secondary">
                        ₹{getDonationAmount()}
                      </span>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <div className="flex justify-between items-center text-lg font-bold">
                        <span>Total Amount:</span>
                        <span className="text-secondary">₹{getDonationAmount()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <span className="text-secondary mr-2">✓</span> Tax Benefits
                    </h4>
                    <p className="text-sm text-gray-600">
                      All donations are eligible for tax exemption under Section 80G.
                    </p>
                  </div>

                  <button
                    onClick={proceedToPayment}
                    className="w-full py-4 bg-secondary text-white rounded-lg font-bold text-lg hover:bg-orange-700 transition-colors duration-300 shadow-md"
                  >
                    Proceed to Payment
                  </button>
                </div>

                {/* Benefits Section */}
                <div className="bg-secondary rounded-xl p-6 text-white">
                  <h4 className="text-xl font-bold mb-4">Your Donation Supports</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="mr-2">✓</span>
                      <span>Temple maintenance and rituals</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">✓</span>
                      <span>Free food service (Annadanam)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">✓</span>
                      <span>Vedic education programs</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">✓</span>
                      <span>Community welfare activities</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Payment Step */
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Progress Bar */}
              <div className="px-8 pt-8">
                <div className="flex items-center justify-between mb-8">
                  <button
                    onClick={() => setPaymentStep('donation')}
                    className="text-secondary hover:text-orange-700 flex items-center font-medium"
                  >
                    ← Back to Details
                  </button>
                  
                  <div className="flex items-center">
                    <div className="text-center">
                      <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center font-bold mx-2">
                        1
                      </div>
                      <p className="text-xs mt-2 text-gray-500">Details</p>
                    </div>
                    <div className="w-12 h-1 bg-secondary"></div>
                    <div className="text-center">
                      <div className="w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center font-bold mx-2">
                        2
                      </div>
                      <p className="text-xs mt-2 font-medium">Payment</p>
                    </div>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-2">Complete Your Donation</h2>
                <p className="text-gray-600">Total Amount: 
                  <span className="text-2xl font-bold text-secondary ml-2">₹{getDonationAmount()}</span>
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
                {/* Left Column - Payment Methods */}
                <div className="lg:col-span-2">
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
                    <div className="space-y-4">
                      {[
                        { id: 'upi', name: 'UPI Payment', desc: 'GPay, PhonePe, Paytm', icon: '📱' },
                        { id: 'card', name: 'Debit/Credit Card', desc: 'Visa, MasterCard, Rupay', icon: '💳' },
                        { id: 'netbanking', name: 'Net Banking', desc: 'All major Indian banks', icon: '🏦' },
                      ].map((method) => (
                        <div
                          key={method.id}
                          onClick={() => setPaymentMethod(method.id)}
                          className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                            paymentMethod === method.id
                              ? 'border-secondary bg-orange-50'
                              : 'border-gray-200 hover:border-secondary'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <span className="text-2xl mr-4">{method.icon}</span>
                              <div>
                                <h4 className="font-bold text-gray-900">{method.name}</h4>
                                <p className="text-sm text-gray-600">{method.desc}</p>
                              </div>
                            </div>
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                              paymentMethod === method.id ? 'border-secondary bg-secondary' : 'border-gray-300'
                            }`}>
                              {paymentMethod === method.id && (
                                <div className="w-2 h-2 rounded-full bg-white"></div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Terms and Conditions */}
                  <div className="border-t pt-6">
                    <div className="flex items-start mb-6">
                      <input
                        type="checkbox"
                        id="terms"
                        checked={termsAccepted}
                        onChange={(e) => setTermsAccepted(e.target.checked)}
                        className="mr-3 mt-1 h-5 w-5 text-secondary focus:ring-secondary rounded"
                      />
                      <label htmlFor="terms" className="text-sm text-gray-600">
                        I confirm that this donation is made voluntarily and I understand that 
                        the amount is non-refundable. I agree to receive the 80G tax exemption 
                        certificate via email.
                      </label>
                    </div>
                  </div>
                </div>

                {/* Right Column - Summary */}
                <div>
                  <div className="bg-gray-50 rounded-xl p-6 sticky top-8">
                    <h4 className="font-bold text-gray-900 mb-6 pb-4 border-b">Donation Summary</h4>
                    
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Donation Type:</span>
                        <span className="font-semibold text-right">
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
                        <div className="pt-4 border-t">
                          <span className="text-gray-600 block mb-2">Your Message:</span>
                          <p className="text-sm text-gray-700 italic">"{donationData.message}"</p>
                        </div>
                      )}
                      
                      <div className="pt-4 border-t">
                        <div className="flex justify-between text-lg font-bold">
                          <span>Total Amount:</span>
                          <span className="text-secondary">₹{getDonationAmount()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4 mb-6">
                      <h5 className="font-semibold text-secondary mb-2">Secure Payment</h5>
                      <p className="text-sm text-gray-600">
                        Your payment information is encrypted and secure. We never store your card details.
                      </p>
                    </div>

                    <button
                      onClick={handlePayment}
                      disabled={!termsAccepted}
                      className={`w-full py-4 rounded-lg font-bold text-lg transition-colors duration-300 ${
                        termsAccepted
                          ? 'bg-secondary text-white hover:bg-orange-700 shadow-md'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Donate ₹{getDonationAmount()}
                    </button>
                    
                    <p className="text-xs text-center text-gray-500 mt-4">
                      By proceeding, you agree to our Terms of Service
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Info Cards */}
        {paymentStep === 'donation' && (
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
              Benefits of Your Donation
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: '🙏',
                  title: 'Spiritual Merit',
                  desc: 'Gain blessings and contribute to sacred activities',
                  color: 'bg-purple-50 border-purple-100'
                },
                {
                  icon: '🎫',
                  title: 'Tax Exemption',
                  desc: '80G certificate for 50% tax deduction',
                  color: 'bg-green-50 border-green-100'
                },
                {
                  icon: '❤️',
                  title: 'Social Impact',
                  desc: 'Support community welfare and temple services',
                  color: 'bg-red-50 border-red-100'
                }
              ].map((benefit, index) => (
                <div key={index} className={`${benefit.color} border rounded-xl p-6 text-center`}>
                  <div className="w-16 h-16 rounded-full bg-white border-2 border-white shadow-sm flex items-center justify-center text-3xl mx-auto mb-4">
                    {benefit.icon}
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">{benefit.title}</h4>
                  <p className="text-gray-600">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Donation;