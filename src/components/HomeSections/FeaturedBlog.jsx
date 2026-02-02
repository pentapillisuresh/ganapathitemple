import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Calendar, Clock, User, BookOpen, Heart, MessageCircle } from 'lucide-react';

const FeaturedBlog = ({ blogPosts }) => {
  const getCategoryColor = (category) => {
    switch(category.toLowerCase()) {
      case 'spirituality': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'festivals': return 'bg-secondary/10 text-secondary border-secondary/20';
      case 'traditions': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'rituals': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'yoga': return 'bg-blue-50 text-blue-700 border-blue-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="py-12 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div className="mb-6 md:mb-0">
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-semibold mb-3">
              <BookOpen className="w-4 h-4 mr-2" />
              Spiritual Wisdom
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Spiritual Insights & Temple News</h2>
            <p className="text-gray-600 mt-2">Explore articles on spirituality, festivals, and sacred traditions</p>
          </div>
          <Link 
            to="/blog" 
            className="group inline-flex items-center px-6 py-3.5 bg-secondary hover:bg-[#C2410C] text-white rounded-full font-semibold transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5"
          >
            Read All Articles
            <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div 
              key={post.id} 
              className="group bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-gray-100"
            >
              {/* Image Section */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1.5 rounded-full text-sm font-semibold border ${getCategoryColor(post.category)}`}>
                    {post.category}
                  </span>
                </div>
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Content Section */}
              <div className="p-6">
                {/* Post Meta */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-2 text-secondary" />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center text-sm text-gray-500">
                      <Heart className="w-4 h-4 mr-1 text-rose-500" />
                      {post.likes || '24'}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <MessageCircle className="w-4 h-4 mr-1 text-blue-500" />
                      {post.comments || '8'}
                    </div>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-secondary transition-colors duration-300 line-clamp-2">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 mb-5 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>

                {/* Bottom Meta */}
                <div className="flex items-center justify-between pt-5 border-t border-gray-100">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center mr-3">
                      <User className="w-4 h-4 text-secondary" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{post.author}</div>
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="w-3 h-3 mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                  </div>
                  
                  <Link
                    to={`/blog/${post.id}`}
                    className="px-4 py-2 bg-secondary text-white rounded-full text-sm font-semibold hover:bg-[#C2410C] transition-all duration-300 flex items-center gap-2 group/btn shadow-sm hover:shadow-md"
                  >
                    Read More
                    <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedBlog;