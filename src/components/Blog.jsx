import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, User, ChevronRight, Mail, BookOpen, Sparkles, Search, Filter } from 'lucide-react';

const Blog = ({ data }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', label: 'All Posts', count: data.blogPosts.length },
    { id: 'spirituality', label: 'Spirituality', count: data.blogPosts.filter(p => p.category === 'spirituality').length },
    { id: 'festivals', label: 'Festivals', count: data.blogPosts.filter(p => p.category === 'festivals').length },
    { id: 'rituals', label: 'Rituals', count: data.blogPosts.filter(p => p.category === 'rituals').length },
    { id: 'temple-news', label: 'Temple News', count: data.blogPosts.filter(p => p.category === 'temple-news').length },
    { id: 'devotional', label: 'Devotional', count: data.blogPosts.filter(p => p.category === 'devotional').length }
  ];

  const getCategoryColor = (category) => {
    switch(category?.toLowerCase()) {
      case 'spirituality': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'festivals': return 'bg-secondary/10 text-secondary border-secondary/20';
      case 'rituals': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'temple-news': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'devotional': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const filteredPosts = data.blogPosts
    .filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

  return (
    <div className="min-h-screen bg-white">
      {/* Professional Banner */}
      <div className="relative h-[280px] bg-gradient-to-r from-primary via-primary to-secondary/20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full translate-x-1/2 translate-y-1/2"></div>
        </div>
        
        <div className="relative h-full container mx-auto px-4 flex items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center px-3 py-1 bg-secondary/10 rounded-full mb-4">
              <BookOpen className="w-4 h-4 text-secondary mr-2" />
              <span className="text-sm font-medium text-secondary">Spiritual Insights</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Temple Blog & Spiritual Wisdom
            </h1>
            
            <p className="text-gray-700 mb-6 max-w-xl">
              Explore insightful articles on Hindu traditions, festivals, rituals, and spiritual practices
            </p>
            
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-1" />
                <span>Expert priests & scholars</span>
              </div>
              <span className="mx-2">•</span>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                <span>Weekly updates</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-3 focus:ring-2 focus:ring-secondary focus:border-secondary"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
                  selectedCategory === category.id
                    ? 'bg-secondary text-white'
                    : 'bg-primary text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category.label}
                <span className={`text-xs px-1.5 py-0.5 rounded ${
                  selectedCategory === category.id
                    ? 'bg-white/20'
                    : 'bg-gray-100'
                }`}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Latest Articles
            <span className="text-sm text-gray-500 ml-2 font-normal">
              ({filteredPosts.length} posts)
            </span>
          </h2>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-sm text-secondary hover:text-[#C2410C]"
            >
              Clear search
            </button>
          )}
        </div>

        {/* Blog Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group">
                <div className="relative h-48 bg-primary">
                  <img 
                    src={post.image || `https://images.unsplash.com/photo-${1601379327922 + post.id}?w=500`}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <span className={`px-2 py-1 bg-white/90 backdrop-blur-sm rounded text-xs ${getCategoryColor(post.category)}`}>
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="w-3 h-3 mr-1" />
                      {post.date}
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="w-3 h-3 mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                  
                  <Link to={`/blog/${post.id}`}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-secondary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                  </Link>
                  
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center text-xs text-gray-500">
                      <User className="w-3 h-3 mr-1" />
                      {post.author}
                    </div>
                    <Link
                      to={`/blog/${post.id}`}
                      className="text-sm text-secondary hover:text-[#C2410C] font-medium flex items-center"
                    >
                      Read More
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="px-4 py-2 bg-secondary text-white rounded-lg text-sm hover:bg-[#C2410C] transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Newsletter Subscription */}
        <div className="bg-primary rounded-xl border border-gray-200 p-6 md:p-8 mb-12">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-lg mb-4">
              <Mail className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Stay Connected with Spiritual Wisdom
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Subscribe to our newsletter for weekly spiritual insights, festival updates, and temple news
            </p>
          </div>
          
          <div className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary"
              />
              <button className="px-6 py-3 bg-secondary text-white rounded-lg font-medium hover:bg-[#C2410C] transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
            <p className="text-xs text-gray-500 text-center mt-3">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center text-sm text-gray-600">
              <Sparkles className="w-4 h-4 text-secondary mr-2" />
              Weekly spiritual insights
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="w-4 h-4 text-secondary mr-2" />
              Festival updates & schedules
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <BookOpen className="w-4 h-4 text-secondary mr-2" />
              Exclusive articles & guides
            </div>
          </div>
        </div>

        {/* Recent Comments/Testimonials */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">
            What Readers Are Saying
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-primary p-5 rounded-xl border border-gray-200">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Rajesh Kumar</div>
                  <div className="text-xs text-gray-500">on "Ganesh Chaturthi Guide"</div>
                </div>
              </div>
              <p className="text-sm text-gray-600 italic">
                "The detailed explanation of rituals helped our family perform the puja perfectly. Thank you!"
              </p>
            </div>
            
            <div className="bg-primary p-5 rounded-xl border border-gray-200">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Priya Sharma</div>
                  <div className="text-xs text-gray-500">on "Daily Puja Routine"</div>
                </div>
              </div>
              <p className="text-sm text-gray-600 italic">
                "Practical advice that's easy to implement. My daily spiritual practice has improved significantly."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;