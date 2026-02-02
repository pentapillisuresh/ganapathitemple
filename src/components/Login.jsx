import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-full gold-gradient flex items-center justify-center text-white text-4xl mx-auto mb-4">
            🕉️
          </div>
          <h2 className="text-3xl font-bold">
            Welcome to Ganapathi Temple
          </h2>
          <p className="text-gray-600 mt-2">
            No login required to access our services
          </p>
        </div>

        <div className="space-y-6 text-center">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-yellow-800 mb-2">Direct Access</h3>
            <p className="text-yellow-700">
              You can book activities, halls, purchase idols, and make donations without any login.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Link
              to="/activities"
              className="px-6 py-4 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors font-bold text-center"
            >
              Book Activities
            </Link>
            <Link
              to="/banquetHalls"
              className="px-6 py-4 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors font-bold text-center"
            >
              Book Halls
            </Link>
            <Link
              to="/idols"
              className="px-6 py-4 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors font-bold text-center"
            >
              Buy Idols
            </Link>
            <Link
              to="/donation"
              className="px-6 py-4 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors font-bold text-center"
            >
              Make Donation
            </Link>
          </div>

          <div className="pt-4 border-t">
            <p className="text-gray-600 mb-4">
              All bookings and donations are saved locally in your browser.
            </p>
            <Link
              to="/"
              className="inline-block px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;