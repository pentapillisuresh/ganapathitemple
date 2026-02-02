import React from 'react';
import { Link } from 'react-router-dom';
import { FiActivity, FiHome, FiGift, FiShoppingBag } from 'react-icons/fi';

const QuickActions = () => {
  const quickActions = [
    {
      icon: <FiActivity className="w-8 h-8" />,
      title: "Activities",
      description: "Book sacred rituals",
      link: "/activities",
      color: "bg-blue-500"
    },
    {
      icon: <FiHome className="w-8 h-8" />,
      title: "Banquet Halls",
      description: "Host your events",
      link: "/banquetHalls",
      color: "bg-green-500"
    },
    {
      icon: <FiGift className="w-8 h-8" />,
      title: "Donation",
      description: "Support the temple",
      link: "/donation",
      color: "bg-purple-500"
    },
    {
      icon: <FiShoppingBag className="w-8 h-8" />,
      title: "Idol Purchase",
      description: "Buy sacred idols",
      link: "/idols",
      color: "bg-red-500"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {quickActions.map((action, index) => (
        <Link
          key={index}
          to={action.link}
          className="bg-white rounded-xl shadow-md p-6 card-hover transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
        >
          <div className={`${action.color} w-16 h-16 rounded-full flex items-center justify-center text-white mb-4 transition-transform duration-300 group-hover:scale-110`}>
            {action.icon}
          </div>
          <h3 className="text-xl font-bold mb-2">{action.title}</h3>
          <p className="text-gray-600">{action.description}</p>
          <div className="mt-4 text-yellow-600 font-medium flex items-center">
            Explore
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default QuickActions;