import React, { useState } from 'react';
import { BookOpen, Sparkles, Star, Search, Filter, ChevronRight, Heart, Share2, Target, Zap, Shield, Award } from 'lucide-react';

const Ganapathis32 = ({ data }) => {
  const [selectedGanapathi, setSelectedGanapathi] = useState(data.ganapathis32[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAttribute, setSelectedAttribute] = useState('all');

  const attributes = [
    { id: 'all', label: 'All Attributes' },
    { id: 'wisdom', label: 'Wisdom & Knowledge' },
    { id: 'protection', label: 'Protection' },
    { id: 'prosperity', label: 'Prosperity' },
    { id: 'peace', label: 'Peace' },
    { id: 'success', label: 'Success' },
  ];

  const filteredGanapathis = data.ganapathis32.filter(ganapathi => {
    const matchesSearch = ganapathi.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ganapathi.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAttribute = selectedAttribute === 'all' || ganapathi.attributes?.includes(selectedAttribute);
    return matchesSearch && matchesAttribute;
  });

  const getAttributeIcon = (attribute) => {
    switch(attribute) {
      case 'wisdom': return <BookOpen className="w-4 h-4" />;
      case 'protection': return <Shield className="w-4 h-4" />;
      case 'prosperity': return <Star className="w-4 h-4" />;
      case 'peace': return <Sparkles className="w-4 h-4" />;
      case 'success': return <Target className="w-4 h-4" />;
      default: return <Zap className="w-4 h-4" />;
    }
  };

  const getAttributeColor = (attribute) => {
    switch(attribute) {
      case 'wisdom': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'protection': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'prosperity': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'peace': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'success': return 'bg-secondary/10 text-secondary border-secondary/20';
      default: return 'bg-primary text-gray-700 border-gray-200';
    }
  };

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
              <span className="text-sm font-medium text-secondary">Divine Manifestations</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              32 Forms of Ganapathi
            </h1>
            
            <p className="text-gray-700 mb-6 max-w-xl">
              Discover the complete pantheon of Lord Ganesha's divine forms, each representing unique spiritual attributes and blessings
            </p>
            
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="flex items-center">
                <Sparkles className="w-4 h-4 mr-1" />
                <span>32 Divine Manifestations</span>
              </div>
              <span className="mx-2">•</span>
              <div className="flex items-center">
                <Award className="w-4 h-4 mr-1" />
                <span>Ancient Scriptures</span>
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
                placeholder="Search Ganapathi forms by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <select
                value={selectedAttribute}
                onChange={(e) => setSelectedAttribute(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-3 focus:ring-2 focus:ring-secondary focus:border-secondary"
              >
                {attributes.map(attr => (
                  <option key={attr.id} value={attr.id}>{attr.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick Attribute Filter */}
          <div className="flex flex-wrap gap-2">
            {attributes.map(attr => (
              <button
                key={attr.id}
                onClick={() => setSelectedAttribute(attr.id)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                  selectedAttribute === attr.id
                    ? attr.id === 'all' 
                      ? 'bg-secondary text-white' 
                      : `${getAttributeColor(attr.id.split('-')[0])} border`
                    : 'bg-primary text-gray-700 hover:bg-gray-100'
                }`}
              >
                {attr.id !== 'all' && getAttributeIcon(attr.id)}
                {attr.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left - Forms List */}
          <div className="lg:col-span-1">
            <div className="bg-primary rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">32 Divine Forms</h3>
                <span className="text-sm text-gray-600">
                  {filteredGanapathis.length} of {data.ganapathis32.length}
                </span>
              </div>
              
              <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
                {filteredGanapathis.map((ganapathi) => (
                  <button
                    key={ganapathi.id}
                    onClick={() => setSelectedGanapathi(ganapathi)}
                    className={`w-full text-left p-4 rounded-lg transition-all ${
                      selectedGanapathi.id === ganapathi.id
                        ? 'bg-secondary/10 border-l-4 border-secondary'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${
                        selectedGanapathi.id === ganapathi.id
                          ? 'bg-secondary text-white'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        <span className="font-semibold">{ganapathi.id}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-gray-900">{ganapathi.name}</h4>
                          <ChevronRight className={`w-4 h-4 ${
                            selectedGanapathi.id === ganapathi.id ? 'text-secondary' : 'text-gray-400'
                          }`} />
                        </div>
                        <p className="text-xs text-gray-600 truncate mt-1">
                          {ganapathi.description}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="mt-6 bg-primary rounded-xl border border-gray-200 p-6">
              <h4 className="font-medium text-gray-900 mb-4">Spiritual Attributes</h4>
              <div className="space-y-3">
                {attributes.filter(a => a.id !== 'all').map(attr => (
                  <div key={attr.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded flex items-center justify-center ${getAttributeColor(attr.id)}`}>
                        {getAttributeIcon(attr.id)}
                      </div>
                      <span className="text-sm text-gray-700">{attr.label.split(' ')[0]}</span>
                    </div>
                    <span className="text-xs px-2 py-1 bg-gray-100 rounded">
                      {data.ganapathis32.filter(g => g.attributes?.includes(attr.id)).length} forms
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right - Detailed View */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              {/* Image Section */}
              <div className="relative h-64 bg-gradient-to-br from-primary to-primary/80">
                <div className="absolute inset-0 bg-black/20"></div>
                <img 
                  src={selectedGanapathi.image} 
                  alt={selectedGanapathi.name}
                  className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-1">
                        {selectedGanapathi.name}
                      </h2>
                      <p className="text-white/90 text-sm">
                        Form #{selectedGanapathi.id} • {selectedGanapathi.sanskritName}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30">
                        <Heart className="w-4 h-4" />
                      </button>
                      <button className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6">
                {/* Description */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <BookOpen className="w-5 h-5 text-secondary" />
                    <h3 className="text-lg font-semibold text-gray-900">Divine Description</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {selectedGanapathi.fullDescription || selectedGanapathi.description}
                  </p>
                </div>

                {/* Attributes */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-5 h-5 text-secondary" />
                    <h3 className="text-lg font-semibold text-gray-900">Spiritual Attributes</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(selectedGanapathi.attributes || ['wisdom', 'protection', 'prosperity']).map(attr => (
                      <span key={attr} className={`px-3 py-1.5 rounded-lg text-sm flex items-center gap-2 ${getAttributeColor(attr)}`}>
                        {getAttributeIcon(attr)}
                        {attr === 'wisdom' ? 'Wisdom & Knowledge' :
                         attr === 'protection' ? 'Divine Protection' :
                         attr === 'prosperity' ? 'Wealth & Prosperity' :
                         attr === 'peace' ? 'Inner Peace' :
                         attr === 'success' ? 'Success & Victory' : attr}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-primary p-5 rounded-xl border border-gray-200">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                        <Target className="w-5 h-5 text-secondary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Significance</h4>
                        <p className="text-sm text-gray-600">Divine purpose</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700">
                      This form represents specific divine qualities that devotees can invoke through dedicated prayer and meditation for spiritual growth.
                    </p>
                  </div>

                  <div className="bg-primary p-5 rounded-xl border border-gray-200">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                        <span className="text-lg">🕉️</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Sacred Mantra</h4>
                        <p className="text-sm text-gray-600">Primary chant</p>
                      </div>
                    </div>
                    <div className="font-mono text-secondary bg-secondary/5 p-3 rounded-lg text-center">
                      "Om Gam Ganapataye Namaha"
                    </div>
                  </div>
                </div>

                {/* Benefits Section */}
                <div className="bg-secondary/5 rounded-xl border border-secondary/20 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Shield className="w-5 h-5 text-secondary" />
                    <h3 className="text-lg font-semibold text-gray-900">Spiritual Benefits</h3>
                  </div>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <li className="flex items-start text-sm">
                      <div className="w-1.5 h-1.5 bg-secondary rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                      <span className="text-gray-700">Removes obstacles and challenges from life's path</span>
                    </li>
                    <li className="flex items-start text-sm">
                      <div className="w-1.5 h-1.5 bg-secondary rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                      <span className="text-gray-700">Bestows wisdom, knowledge, and clarity of mind</span>
                    </li>
                    <li className="flex items-start text-sm">
                      <div className="w-1.5 h-1.5 bg-secondary rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                      <span className="text-gray-700">Provides divine protection and guidance</span>
                    </li>
                    <li className="flex items-start text-sm">
                      <div className="w-1.5 h-1.5 bg-secondary rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                      <span className="text-gray-700">Promotes success in all endeavors and ventures</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Featured Forms */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Featured Forms</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {data.ganapathis32.slice(0, 4).map((ganapathi) => (
                  <button
                    key={ganapathi.id}
                    onClick={() => setSelectedGanapathi(ganapathi)}
                    className={`bg-primary p-4 rounded-xl border transition-all ${
                      selectedGanapathi.id === ganapathi.id
                        ? 'border-secondary bg-secondary/5'
                        : 'border-gray-200 hover:border-secondary/50'
                    }`}
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-2 ${
                        selectedGanapathi.id === ganapathi.id
                          ? 'bg-secondary text-white'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        <span className="font-semibold text-sm">{ganapathi.id}</span>
                      </div>
                      <h5 className="font-medium text-gray-900 text-sm mb-1">{ganapathi.name}</h5>
                      <p className="text-xs text-gray-600 line-clamp-2">{ganapathi.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ganapathis32;