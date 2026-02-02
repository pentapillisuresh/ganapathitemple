import React from 'react';
import { Link } from 'react-router-dom';

const FeaturedGanapathis = ({ ganapathis }) => {
  return (
    <div className="mb-16 bg-white">
      {/* Hero Section with Temple Background */}
      <div className="relative bg-secondary-gradient py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-4">
            Ganapathi Temple
          </h1>
          <p className="text-xl  max-w-3xl mx-auto text-gray">
            Discover the divine manifestations of Lord Ganesha in 32 unique forms
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header with Explore All Button */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
          <div className="mb-6 md:mb-0">
            <h2 className="text-3xl font-bold text-gray-800">32 Forms of Ganapathi</h2>
            <p className="text-gray-600 mt-2">Discover divine manifestations of Lord Ganesha</p>
          </div>
          <Link 
            to="/ganapathis32" 
            className="px-8 py-3 bg-secondary hover:bg-[#C2410C] text-white rounded-full font-semibold flex items-center justify-center w-full md:w-auto transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
          >
            Explore All 32 Forms
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Ganapathi Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 ">
          {ganapathis.slice(0, 8).map((ganapathi, index) => (
            <div 
              key={ganapathi.id} 
              className="bg-primary  rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 card-hover"
            >
              <div className="flex items-start mb-4 ">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-secondary/90 border border-secondary/30 flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-lg">{index + 1}</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-1">{ganapathi.name}</h3>
                  <p className="text-gray-600 text-sm">{ganapathi.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};




export default FeaturedGanapathis;