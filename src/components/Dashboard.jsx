import React, { useState } from 'react';
import { FiUser, FiCalendar, FiPackage, FiGift, FiSettings, FiLogOut } from 'react-icons/fi';

const Dashboard = ({ user, bookings, donations, orders }) => {
  const [activeTab, setActiveTab] = useState('bookings');

  const tabs = [
    { id: 'bookings', label: 'My Bookings', icon: <FiCalendar />, count: bookings.length },
    { id: 'orders', label: 'Idol Orders', icon: <FiPackage />, count: orders.length },
    { id: 'donations', label: 'Donations', icon: <FiGift />, count: donations.length },
    { id: 'profile', label: 'Profile', icon: <FiUser /> },
    { id: 'settings', label: 'Settings', icon: <FiSettings /> }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'bookings':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold mb-6">Activity & Hall Bookings</h3>
            {bookings.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">No bookings yet</p>
                <a href="/activities" className="text-yellow-600 hover:text-yellow-700 font-semibold">
                  Book an Activity →
                </a>
              </div>
            ) : (
              bookings.map((booking) => (
                <div key={booking.id} className="bg-white rounded-xl shadow p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-xl font-bold">
                        {booking.activity?.name || booking.hall?.name}
                      </h4>
                      <p className="text-gray-600">
                        {booking.type === 'banquet' ? 'Banquet Hall Booking' : 'Activity Booking'}
                      </p>
                    </div>
                    <span className={`px-4 py-1 rounded-full text-sm font-semibold ${
                      booking.status === 'Confirmed'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <div className="text-sm text-gray-500">Booking ID</div>
                      <div className="font-semibold">{booking.bookingId}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Date</div>
                      <div className="font-semibold">{booking.date}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Amount</div>
                      <div className="text-lg font-bold text-yellow-600">₹ {booking.totalAmount}</div>
                    </div>
                  </div>

                  {booking.withRoom && booking.selectedRoom && (
                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                      <div className="font-semibold mb-2">Room Details:</div>
                      <div className="flex justify-between">
                        <span>{booking.selectedRoom.name}</span>
                        <span>₹ {booking.selectedRoom.price}</span>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end space-x-4">
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      View Details
                    </button>
                    <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
                      Download Receipt
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        );

      case 'orders':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold mb-6">Idol Orders</h3>
            {orders.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">No orders yet</p>
                <a href="/idols" className="text-yellow-600 hover:text-yellow-700 font-semibold">
                  Buy an Idol →
                </a>
              </div>
            ) : (
              orders.map((order) => (
                <div key={order.id} className="bg-white rounded-xl shadow p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-xl font-bold">{order.idol.name}</h4>
                      <p className="text-gray-600">Order #{order.orderId}</p>
                    </div>
                    <span className={`px-4 py-1 rounded-full text-sm font-semibold ${
                      order.status === 'Delivered'
                        ? 'bg-green-100 text-green-700'
                        : order.status === 'Processing'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <div className="text-sm text-gray-500">Size</div>
                      <div className="font-semibold">{order.size}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Quantity</div>
                      <div className="font-semibold">{order.quantity}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Order Date</div>
                      <div className="font-semibold">{order.date}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Amount</div>
                      <div className="text-lg font-bold text-yellow-600">₹ {order.totalAmount}</div>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4">
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      Track Order
                    </button>
                    <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
                      View Invoice
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        );

      case 'donations':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold mb-6">Donation History</h3>
            {donations.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">No donations yet</p>
                <a href="/donation" className="text-yellow-600 hover:text-yellow-700 font-semibold">
                  Make a Donation →
                </a>
              </div>
            ) : (
              donations.map((donation) => (
                <div key={donation.id} className="bg-white rounded-xl shadow p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h4 className="text-xl font-bold">Donation #{donation.donationId}</h4>
                      <p className="text-gray-600">{donation.date}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-yellow-600">₹ {donation.amount}</div>
                      <div className="text-sm text-gray-500">Amount Donated</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-sm text-gray-500">Type</div>
                      <div className="font-semibold capitalize">{donation.type} Donation</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Receipt Generated</div>
                      <div className="font-semibold">Yes (80G Eligible)</div>
                    </div>
                  </div>

                  {donation.message && (
                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                      <div className="text-sm text-gray-500 mb-1">Your Message:</div>
                      <div className="italic">"{donation.message}"</div>
                    </div>
                  )}

                  <div className="flex justify-end space-x-4">
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      View Certificate
                    </button>
                    <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
                      Download Receipt
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        );

      case 'profile':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold mb-6">Profile Information</h3>
            <div className="bg-white rounded-xl shadow p-8">
              <div className="flex items-center mb-8">
                <div className="w-24 h-24 rounded-full gold-gradient flex items-center justify-center text-white text-4xl mr-6">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h4 className="text-2xl font-bold">{user.name}</h4>
                  <p className="text-gray-600">{user.email}</p>
                  <p className="text-gray-500 text-sm">Member since {user.joinedDate}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    defaultValue={user.name}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    defaultValue={user.email}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    placeholder="Enter phone number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <input
                    type="text"
                    placeholder="Enter address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="mt-8 flex justify-end space-x-4">
                <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                  Cancel
                </button>
                <button className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold mb-6">Account Settings</h3>
            <div className="bg-white rounded-xl shadow p-8">
              <div className="space-y-8">
                <div>
                  <h4 className="text-lg font-bold mb-4">Change Password</h4>
                  <div className="space-y-4">
                    <input
                      type="password"
                      placeholder="Current Password"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="password"
                      placeholder="New Password"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="password"
                      placeholder="Confirm New Password"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                    />
                    <button className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
                      Update Password
                    </button>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-bold mb-4">Notification Preferences</h4>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-3" defaultChecked />
                      <span>Booking confirmations and reminders</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-3" defaultChecked />
                      <span>Special festival announcements</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-3" />
                      <span>Monthly newsletter</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-3" defaultChecked />
                      <span>Promotional offers</span>
                    </label>
                  </div>
                </div>

                <div className="border-t pt-8">
                  <h4 className="text-lg font-bold mb-4 text-red-600">Danger Zone</h4>
                  <button className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600">
                    Delete Account
                  </button>
                  <p className="text-sm text-gray-500 mt-2">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user.name}!</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-4">
              <FiCalendar className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold">{bookings.length}</div>
              <div className="text-gray-600">Bookings</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-4">
              <FiPackage className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold">{orders.length}</div>
              <div className="text-gray-600">Orders</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-4">
              <FiGift className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold">{donations.length}</div>
              <div className="text-gray-600">Donations</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full gold-gradient flex items-center justify-center text-white mr-4">
              <FiUser className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold">Member</div>
              <div className="text-gray-600">Since {user.joinedDate}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow p-6 sticky top-6">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg flex items-center justify-between transition-colors ${
                    activeTab === tab.id
                      ? 'bg-yellow-50 text-yellow-700 border-l-4 border-yellow-500'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center">
                    <span className="mr-3">{tab.icon}</span>
                    <span>{tab.label}</span>
                  </div>
                  {tab.count !== undefined && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>

            <div className="border-t mt-6 pt-6">
              <button className="w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg flex items-center">
                <FiLogOut className="mr-3" />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;