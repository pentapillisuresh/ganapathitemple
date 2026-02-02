import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, Clock, User, ChevronRight, Mail, BookOpen, Sparkles, ArrowLeft, Share2, Heart, MessageCircle, Tag, Facebook, Twitter, Linkedin, Copy, CheckCircle } from 'lucide-react';

const BlogDetail = ({ data }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Find blog post by ID
  const post = data.blogPosts?.find(p => 
    p.id?.toString() === id?.toString() || 
    p.id === parseInt(id)
  );

  const [isLiked, setIsLiked] = React.useState(false);
  const [isCopied, setIsCopied] = React.useState(false);
  const [comment, setComment] = React.useState('');
  const [comments, setComments] = React.useState([
    {
      id: 1,
      name: 'Rajesh Kumar',
      text: 'The detailed explanation of rituals helped our family perform the puja perfectly. Thank you for this insightful article!',
      time: '2 days ago',
      likes: 5
    },
    {
      id: 2,
      name: 'Priya Sharma',
      text: 'Practical advice that\'s easy to implement. My daily spiritual practice has improved significantly.',
      time: '1 week ago',
      likes: 3
    }
  ]);

  const relatedPosts = data.blogPosts
    .filter(p => p.id !== post?.id && p.category === post?.category)
    .slice(0, 3);

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

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = post?.title || '';

    switch(platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
        break;
    }
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      const newComment = {
        id: comments.length + 1,
        name: 'You',
        text: comment,
        time: 'Just now',
        likes: 0
      };
      setComments([newComment, ...comments]);
      setComment('');
    }
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center bg-primary rounded-2xl shadow-lg p-6 max-w-sm border border-secondary/20">
          <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-3">Article Not Found</h2>
          <p className="text-gray-600 mb-4 text-sm">The requested blog article could not be found.</p>
          <button
            onClick={() => navigate('/blog')}
            className="inline-flex items-center px-4 py-2 bg-secondary text-white rounded-full text-sm font-semibold hover:bg-[#C2410C] transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[280px] bg-gradient-to-r from-primary via-primary to-secondary/20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full translate-x-1/2 translate-y-1/2"></div>
        </div>
        
        <div className="relative h-full container mx-auto px-4 flex items-center">
          <div className="max-w-4xl">
            <button
              onClick={() => navigate('/blog')}
              className="inline-flex items-center px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full mb-4 text-sm font-medium text-gray-700 hover:bg-white/30 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Blog
            </button>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-700">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-secondary" />
                {post.date}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-secondary" />
                {post.readTime}
              </div>
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2 text-secondary" />
                By {post.author}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            {/* Category Badge */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Tag className="w-5 h-5 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Category</span>
              </div>
              <span className={`px-4 py-2 rounded-lg font-medium border ${getCategoryColor(post.category)}`}>
                {post.category}
              </span>
            </div>

            {/* Share Section */}
            <div className="bg-primary rounded-xl border border-gray-200 p-5 mb-6">
              <h4 className="font-medium text-gray-900 mb-4">Share This Article</h4>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleShare('facebook')}
                  className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 hover:bg-blue-100 transition-colors"
                  aria-label="Share on Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleShare('twitter')}
                  className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-500 hover:bg-blue-100 transition-colors"
                  aria-label="Share on Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleShare('linkedin')}
                  className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-700 hover:bg-blue-100 transition-colors"
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleShare('copy')}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                    isCopied 
                      ? 'bg-emerald-50 text-emerald-600' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  aria-label={isCopied ? "Link copied!" : "Copy link"}
                >
                  {isCopied ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Like Section */}
            <div className="bg-primary rounded-xl border border-gray-200 p-5 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                      isLiked
                        ? 'bg-rose-50 text-rose-600'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isLiked ? 'fill-rose-600' : ''}`} />
                  </button>
                  <div>
                    <div className="font-medium text-gray-900">
                      {post.likes ? post.likes + (isLiked ? 1 : 0) : '24'}
                    </div>
                    <div className="text-xs text-gray-500">Likes</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{comments.length}</div>
                    <div className="text-xs text-gray-500">Comments</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Articles */}
            {relatedPosts.length > 0 && (
              <div className="bg-primary rounded-xl border border-gray-200 p-5">
                <h4 className="font-medium text-gray-900 mb-4">Related Articles</h4>
                <div className="space-y-4">
                  {relatedPosts.map(relatedPost => (
                    <Link
                      key={relatedPost.id}
                      to={`/blog/${relatedPost.id}`}
                      className="block group"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={relatedPost.image}
                            alt={relatedPost.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-900 text-sm group-hover:text-secondary transition-colors line-clamp-2">
                            {relatedPost.title}
                          </h5>
                          <div className="flex items-center text-xs text-gray-500 mt-1">
                            <Calendar className="w-3 h-3 mr-1" />
                            {relatedPost.date}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Main Article Content */}
          <div className="lg:col-span-2">
            <article className="prose prose-lg max-w-none">
              {/* Featured Image */}
              <div className="rounded-xl overflow-hidden mb-8">
                <img
                  src={post.image || "https://images.unsplash.com/photo-1621491510317-0015e75fddc7?w=1200"}
                  alt={post.title}
                  className="w-full h-auto rounded-xl"
                />
              </div>

              {/* Article Content */}
              <div className="text-gray-700 leading-relaxed space-y-6">
                <p className="text-lg font-medium text-gray-800">
                  {post.excerpt}
                </p>

                <p>
                  In Hindu spirituality, each ritual and tradition carries deep symbolic meaning that connects 
                  the physical world with the divine realm. These practices have been passed down through generations, 
                  preserving ancient wisdom while adapting to contemporary contexts.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 pt-4">
                  The Spiritual Significance
                </h2>

                <p>
                  The deeper we explore these practices, the more we understand their profound impact on 
                  spiritual growth and inner peace. Every ritual is designed to align our consciousness with 
                  higher principles and universal truths.
                </p>

                <div className="bg-secondary/5 rounded-xl p-6 border border-secondary/20 my-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Sparkles className="w-6 h-6 text-secondary" />
                    <h3 className="text-xl font-bold text-gray-900">Key Insight</h3>
                  </div>
                  <p className="text-gray-700 italic">
                    "True spirituality lies not in the ritual itself, but in the consciousness with which 
                    we perform it. When approached with devotion and understanding, every practice becomes 
                    a bridge to the divine."
                  </p>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 pt-4">
                  Practical Applications
                </h2>

                <p>
                  Implementing these spiritual practices in daily life requires consistency and understanding. 
                  Here are some practical ways to integrate these teachings:
                </p>

                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Start with small daily practices and gradually build consistency</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Understand the meaning behind each ritual to enhance its effectiveness</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Create a sacred space in your home dedicated to spiritual practice</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Join community gatherings and temple events for collective energy</span>
                  </li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 pt-4">
                  Conclusion
                </h2>

                <p>
                  As we continue our spiritual journey, it's important to remember that growth happens gradually. 
                  Each small step taken with sincerity brings us closer to inner peace and understanding. 
                  May your spiritual practice bring you closer to the divine and fill your life with peace, 
                  wisdom, and joy.
                </p>
              </div>
            </article>

            {/* Author Bio */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <User className="w-8 h-8 text-secondary" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">About the Author</h4>
                  <p className="text-gray-600 mt-2">
                    {post.author} is an experienced priest and spiritual guide with over 20 years of 
                    experience in Vedic traditions. He specializes in making ancient wisdom accessible 
                    to modern seekers.
                  </p>
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Comments ({comments.length})
              </h3>

              {/* Add Comment Form */}
              <form onSubmit={handleAddComment} className="mb-8">
                <div className="bg-primary rounded-xl border border-gray-200 p-4">
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Share your thoughts..."
                    className="w-full border-0 bg-transparent resize-none focus:ring-0 text-gray-700 placeholder-gray-500"
                    rows={3}
                  />
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-500">
                      Share your spiritual insights and experiences
                    </div>
                    <button
                      type="submit"
                      disabled={!comment.trim()}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        comment.trim()
                          ? 'bg-secondary text-white hover:bg-[#C2410C]'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      Post Comment
                    </button>
                  </div>
                </div>
              </form>

              {/* Comments List */}
              <div className="space-y-6">
                {comments.map(comment => (
                  <div key={comment.id} className="bg-primary rounded-xl border border-gray-200 p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                          <User className="w-5 h-5 text-secondary" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{comment.name}</div>
                          <div className="text-xs text-gray-500">{comment.time}</div>
                        </div>
                      </div>
                      <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
                        <Heart className="w-4 h-4" />
                        <span>{comment.likes}</span>
                      </button>
                    </div>
                    <p className="text-gray-700">{comment.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="bg-primary rounded-xl border border-gray-200 p-8">
            <div className="text-center max-w-2xl mx-auto">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-lg mb-4">
                <Mail className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Subscribe to Spiritual Wisdom
              </h3>
              <p className="text-gray-600 mb-6">
                Get weekly articles, festival updates, and spiritual insights delivered to your inbox
              </p>
              
              <div className="max-w-md mx-auto">
                <div className="flex gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary"
                  />
                  <button className="px-6 py-3 bg-secondary text-white rounded-lg font-medium hover:bg-[#C2410C] transition-colors">
                    Subscribe
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;