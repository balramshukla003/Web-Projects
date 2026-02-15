import React, { useState, useEffect } from 'react';
import { 
  Heart, MessageCircle, User, Calendar, Edit3, Trash2, 
  Home, Plus, Menu, X, LogOut, BookOpen, User as UserIcon, 
  Settings, Search, ChevronDown, ChevronUp, Share2, Bookmark,
  MoreHorizontal, Clock, Eye, BarChart2, Send
} from 'lucide-react';

const BlogPage = () => {
    const [currentPage, setCurrentPage] = useState('feed');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedPost, setExpandedPost] = useState(null);
    const [newComment, setNewComment] = useState('');
    const [activeTab, setActiveTab] = useState('all');

    const [posts, setPosts] = useState([
        {
            id: 1,
            title: "Welcome to Modern Blogging",
            content: "This is a modern, sleek blogging platform built with React and Tailwind CSS. Share your thoughts, stories, and ideas with the world in this beautiful, responsive interface. The platform features a clean design with smooth animations and intuitive navigation.\n\nKey Features:\n- Real-time updates\n- Markdown support\n- Responsive design\n- Dark/light mode\n- Analytics dashboard\n\nThe future of blogging is here, and it's more accessible than ever before. Whether you're a seasoned writer or just starting out, our platform provides all the tools you need to share your voice with the world.",
            author: "John Doe",
            username: "@johndoe",
            date: "2024-12-15",
            likes: 12,
            liked: false,
            comments: [
                { id: 1, author: "Jane Smith", content: "Great platform! Love the design.", date: "2024-12-15" },
                { id: 2, author: "Mike Johnson", content: "Looking forward to posting here regularly.", date: "2024-12-15" }
            ],
            views: 245,
            readTime: "5 min",
            category: "Platform"
        },
        {
            id: 2,
            title: "The Future of Web Development",
            content: "Web development continues to evolve at a rapid pace. From React to Vue, from REST to GraphQL, the landscape is constantly shifting. What excites me most is how accessible these technologies have become for developers of all skill levels.\n\nModern frameworks make it easier than ever to build beautiful, functional applications. The rise of serverless architectures and edge computing is changing how we think about deployment and scalability.\n\nIn the coming years, we'll see even more:\n- AI-assisted development\n- WebAssembly adoption\n- Improved performance metrics\n- More accessible web standards\n\nThe future is bright for web developers!",
            author: "Jane Smith",
            username: "@janesmith",
            date: "2024-12-14",
            likes: 8,
            liked: true,
            comments: [
                { id: 1, author: "Alex Wong", content: "Great insights! WebAssembly is particularly exciting.", date: "2024-12-14" }
            ],
            views: 189,
            readTime: "7 min",
            category: "Technology"
        }
    ]);

    const categories = ["All", "Technology", "Design", "Business", "Platform"];

    const [newPost, setNewPost] = useState({
        title: '',
        content: '',
        category: 'Technology'
    });

    useEffect(() => {
        // Close sidebar when clicking outside on mobile
        const handleClickOutside = (event) => {
            if (isSidebarOpen && !event.target.closest('.sidebar') && !event.target.closest('.menu-button')) {
                setIsSidebarOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isSidebarOpen]);

    const handleSubmit = () => {
        if (newPost.title && newPost.content) {
            const post = {
                id: posts.length + 1,
                ...newPost,
                author: "Current User",
                username: "@currentuser",
                date: new Date().toISOString().split('T')[0],
                likes: 0,
                liked: false,
                comments: [],
                views: 0,
                readTime: `${Math.max(1, Math.floor(newPost.content.split(' ').length / 200))} min`
            };
            setPosts([post, ...posts]);
            setNewPost({ title: '', content: '', category: 'Technology' });
            setCurrentPage('feed');
        }
    };

    const handleLike = (postId) => {
        setPosts(posts.map(post =>
            post.id === postId
                ? {
                    ...post,
                    liked: !post.liked,
                    likes: post.liked ? post.likes - 1 : post.likes + 1
                }
                : post
        ));
    };

    const handleDelete = (postId) => {
        setPosts(posts.filter(post => post.id !== postId));
    };

    const handleAddComment = (postId) => {
        if (newComment.trim()) {
            setPosts(posts.map(post => 
                post.id === postId
                    ? {
                        ...post,
                        comments: [
                            ...post.comments,
                            {
                                id: post.comments.length + 1,
                                author: "Current User",
                                content: newComment,
                                date: new Date().toISOString().split('T')[0]
                            }
                        ]
                    }
                    : post
            ));
            setNewComment('');
        }
    };

    const filteredPosts = posts.filter(post => 
        (post.title.toLowerCase().includes(searchQuery.toLowerCase())) || 
        (post.content.toLowerCase().includes(searchQuery.toLowerCase()))
        && (activeTab === 'all' || post.category === activeTab)
    );

    const Sidebar = () => (
        <div className={`sidebar fixed inset-y-0 left-0 z-50 w-64 bg-gray-900/90 backdrop-blur-lg border-r border-gray-800/50 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-300 ease-in-out`}>
            <div className="flex flex-col h-full p-4">
                {/* Logo and close button */}
                <div className="flex items-center justify-between p-4 mb-8">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                            <Edit3 className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-white">BlogHub</h1>
                    </div>
                    <button 
                        onClick={() => setIsSidebarOpen(false)}
                        className="md:hidden text-gray-400 hover:text-white"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Search */}
                <div className="relative mb-8 mx-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search posts..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    />
                </div>

                {/* Navigation */}
                <nav className="flex-1 space-y-2">
                    <button
                        onClick={() => {
                            setCurrentPage('feed');
                            setActiveTab('all');
                        }}
                        className={`flex items-center w-full gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${currentPage === 'feed'
                            ? 'bg-white/20 text-white shadow-lg'
                            : 'text-white/70 hover:text-white hover:bg-white/10'
                            }`}
                    >
                        <Home className="w-5 h-5" />
                        <span>Feed</span>
                    </button>
                    <button
                        onClick={() => setCurrentPage('create')}
                        className={`flex items-center w-full gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${currentPage === 'create'
                            ? 'bg-white/20 text-white shadow-lg'
                            : 'text-white/70 hover:text-white hover:bg-white/10'
                            }`}
                    >
                        <Plus className="w-5 h-5" />
                        <span>Create Post</span>
                    </button>
                    <button
                        onClick={() => setCurrentPage('bookmarks')}
                        className={`flex items-center w-full gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${currentPage === 'bookmarks'
                            ? 'bg-white/20 text-white shadow-lg'
                            : 'text-white/70 hover:text-white hover:bg-white/10'
                            }`}
                    >
                        <Bookmark className="w-5 h-5" />
                        <span>Bookmarks</span>
                    </button>
                    <button
                        onClick={() => setCurrentPage('profile')}
                        className={`flex items-center w-full gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${currentPage === 'profile'
                            ? 'bg-white/20 text-white shadow-lg'
                            : 'text-white/70 hover:text-white hover:bg-white/10'
                            }`}
                    >
                        <UserIcon className="w-5 h-5" />
                        <span>Profile</span>
                    </button>
                    <button
                        onClick={() => setCurrentPage('analytics')}
                        className={`flex items-center w-full gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${currentPage === 'analytics'
                            ? 'bg-white/20 text-white shadow-lg'
                            : 'text-white/70 hover:text-white hover:bg-white/10'
                            }`}
                    >
                        <BarChart2 className="w-5 h-5" />
                        <span>Analytics</span>
                    </button>
                    <button
                        onClick={() => setCurrentPage('settings')}
                        className={`flex items-center w-full gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${currentPage === 'settings'
                            ? 'bg-white/20 text-white shadow-lg'
                            : 'text-white/70 hover:text-white hover:bg-white/10'
                            }`}
                    >
                        <Settings className="w-5 h-5" />
                        <span>Settings</span>
                    </button>
                </nav>

                {/* User & Logout */}
                <div className="p-4 border-t border-gray-800/50 mt-auto">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <div className="font-medium text-white">Current User</div>
                            <div className="text-xs text-gray-400">@currentuser</div>
                        </div>
                    </div>
                    <button className="flex items-center w-full gap-3 px-4 py-3 rounded-xl font-medium text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300">
                        <LogOut className="w-5 h-5" />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </div>
    );

    const CreatePostPage = () => (
        <div className="space-y-8">
            <div className="text-center">
                <h2 className="text-4xl font-bold text-white mb-4">Create New Post</h2>
                <p className="text-white/70 text-lg">Share your thoughts with the world</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
                <div className="space-y-6">
                    <div>
                        <label className="block text-white/90 text-sm font-medium mb-2">
                            Post Title
                        </label>
                        <input
                            type="text"
                            value={newPost.title}
                            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                            className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
                            placeholder="What's your post about?"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-white/90 text-sm font-medium mb-2">
                            Category
                        </label>
                        <select
                            value={newPost.category}
                            onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                            className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
                        >
                            {categories.filter(cat => cat !== 'All').map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-white/90 text-sm font-medium mb-2">
                            Content
                        </label>
                        <textarea
                            value={newPost.content}
                            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                            rows="8"
                            className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 resize-none"
                            placeholder="Share your thoughts..."
                            required
                        />
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={handleSubmit}
                            className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-3 px-8 rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                            Publish Post
                        </button>
                        <button
                            onClick={() => setCurrentPage('feed')}
                            className="px-8 py-3 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition-all duration-300"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    const PostCard = ({ post }) => (
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h3 className="text-white font-semibold">{post.author}</h3>
                        <div className="flex items-center gap-2 text-white/70 text-sm">
                            <Calendar className="w-4 h-4" />
                            {post.date}
                            <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full">
                                {post.category}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => handleDelete(post.id)}
                        className="text-white/60 hover:text-red-400 transition-colors duration-200 p-1"
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>
                    <button className="text-white/60 hover:text-white transition-colors duration-200 p-1">
                        <MoreHorizontal className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <h2 className="text-2xl font-bold text-white mb-4">
                {post.title}
            </h2>

            <p className={`text-white/90 text-lg leading-relaxed mb-6 ${expandedPost !== post.id ? 'line-clamp-3' : ''}`}>
                {post.content}
            </p>

            <div className="flex justify-between items-center mb-4 text-white/70 text-sm">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                    </div>
                    <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {post.views} views
                    </div>
                </div>
                <button 
                    onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
                    className="text-blue-400 hover:text-blue-300 flex items-center gap-1"
                >
                    {expandedPost === post.id ? (
                        <>
                            <span>Show less</span>
                            <ChevronUp className="w-4 h-4" />
                        </>
                    ) : (
                        <>
                            <span>Read more</span>
                            <ChevronDown className="w-4 h-4" />
                        </>
                    )}
                </button>
            </div>

            <div className="flex items-center gap-6 pt-4 border-t border-white/20">
                <button
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${post.liked
                        ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                        : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-red-400'
                        }`}
                >
                    <Heart className={`w-5 h-5 ${post.liked ? 'fill-current' : ''}`} />
                    <span className="font-medium">{post.likes}</span>
                </button>

                <button 
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/70 hover:bg-white/20 transition-all duration-300"
                    onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
                >
                    <MessageCircle className="w-5 h-5" />
                    <span className="font-medium">{post.comments.length}</span>
                </button>

                <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/70 hover:bg-white/20 transition-all duration-300">
                    <Bookmark className="w-5 h-5" />
                </button>

                <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/70 hover:bg-white/20 transition-all duration-300">
                    <Share2 className="w-5 h-5" />
                </button>
            </div>

            {expandedPost === post.id && (
                <div className="mt-6 pt-6 border-t border-white/20">
                    <h4 className="text-lg font-semibold text-white mb-4">Comments ({post.comments.length})</h4>
                    
                    <div className="space-y-4 mb-6">
                        {post.comments.map(comment => (
                            <div key={comment.id} className="bg-white/5 rounded-xl p-4">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                                        <User className="w-4 h-4 text-purple-400" />
                                    </div>
                                    <div>
                                        <h5 className="text-sm font-medium text-white">{comment.author}</h5>
                                        <div className="text-xs text-white/50">{comment.date}</div>
                                    </div>
                                </div>
                                <p className="text-white/90 text-sm">{comment.content}</p>
                            </div>
                        ))}
                    </div>

                    <div className="flex gap-3">
                        <input
                            type="text"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Add a comment..."
                            className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                        />
                        <button
                            onClick={() => handleAddComment(post.id)}
                            className="bg-cyan-500 text-white px-4 py-2 rounded-xl hover:bg-cyan-600 transition-colors"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );

    const FeedPage = () => (
        <div className="space-y-8">
            <div className="text-center">
                <h2 className="text-4xl font-bold text-white mb-4">Latest Posts</h2>
                <p className="text-white/70 text-lg">Discover amazing stories from our community</p>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
                {categories.map(category => (
                    <button
                        key={category}
                        onClick={() => setActiveTab(category === 'All' ? 'all' : category)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === (category === 'All' ? 'all' : category)
                            ? 'bg-cyan-500 text-white shadow-lg'
                            : 'bg-white/10 text-white/80 hover:bg-white/20'
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {filteredPosts.length === 0 ? (
                <div className="text-center py-16">
                    <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <BookOpen className="w-12 h-12 text-white/60" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                        {searchQuery ? 'No matching posts found' : 'No posts yet'}
                    </h3>
                    <p className="text-white/70 text-lg mb-6">
                        {searchQuery ? 'Try a different search term' : 'Be the first to share your thoughts!'}
                    </p>
                    {!searchQuery && (
                        <button
                            onClick={() => setCurrentPage('create')}
                            className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-3 px-8 rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                            Create First Post
                        </button>
                    )}
                </div>
            ) : (
                <div className="space-y-6">
                    {filteredPosts.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>
            )}
        </div>
    );

    const ProfilePage = () => (
        <div className="space-y-8">
            <div className="text-center">
                <h2 className="text-4xl font-bold text-white mb-4">Your Profile</h2>
                <p className="text-white/70 text-lg">Manage your account and posts</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex flex-col items-center text-center">
                        <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
                            <UserIcon className="w-16 h-16 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-white">Current User</h3>
                        <p className="text-white/70">@currentuser</p>
                        <p className="text-white/80 mt-4">Joined December 2023</p>
                        
                        <div className="mt-6 w-full">
                            <button className="w-full bg-white/10 text-white py-2 px-4 rounded-lg hover:bg-white/20 transition-colors">
                                Edit Profile
                            </button>
                        </div>
                    </div>

                    <div className="flex-1">
                        <div className="grid grid-cols-3 gap-4 mb-8">
                            <div className="bg-white/10 rounded-xl p-4 text-center">
                                <div className="text-3xl font-bold text-white mb-1">{posts.length}</div>
                                <div className="text-white/70">Posts</div>
                            </div>
                            <div className="bg-white/10 rounded-xl p-4 text-center">
                                <div className="text-3xl font-bold text-white mb-1">
                                    {posts.reduce((sum, post) => sum + post.likes, 0)}
                                </div>
                                <div className="text-white/70">Likes</div>
                            </div>
                            <div className="bg-white/10 rounded-xl p-4 text-center">
                                <div className="text-3xl font-bold text-white mb-1">
                                    {posts.reduce((sum, post) => sum + post.comments.length, 0)}
                                </div>
                                <div className="text-white/70">Comments</div>
                            </div>
                        </div>

                        <h4 className="text-xl font-bold text-white mb-4">Your Recent Posts</h4>
                        <div className="space-y-4">
                            {posts.slice(0, 3).map(post => (
                                <div key={post.id} className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors">
                                    <div className="flex justify-between items-center">
                                        <h5 className="font-medium text-white">{post.title}</h5>
                                        <div className="text-sm text-white/70">{post.date}</div>
                                    </div>
                                    <div className="flex gap-4 mt-2 text-sm">
                                        <div className="flex items-center text-white/70">
                                            <Heart className="w-4 h-4 mr-1" />
                                            {post.likes}
                                        </div>
                                        <div className="flex items-center text-white/70">
                                            <MessageCircle className="w-4 h-4 mr-1" />
                                            {post.comments.length}
                                        </div>
                                        <div className="flex items-center text-white/70">
                                            <Eye className="w-4 h-4 mr-1" />
                                            {post.views}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const AnalyticsPage = () => (
        <div className="space-y-8">
            <div className="text-center">
                <h2 className="text-4xl font-bold text-white mb-4">Your Analytics</h2>
                <p className="text-white/70 text-lg">Track your content performance</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl p-6 border border-cyan-500/30">
                        <div className="text-3xl font-bold text-white mb-2">{posts.length}</div>
                        <div className="text-cyan-400 font-medium">Total Posts</div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl p-6 border border-purple-500/30">
                        <div className="text-3xl font-bold text-white mb-2">
                            {posts.reduce((sum, post) => sum + post.views, 0)}
                        </div>
                        <div className="text-purple-400 font-medium">Total Views</div>
                    </div>
                    <div className="bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-xl p-6 border border-red-500/30">
                        <div className="text-3xl font-bold text-white mb-2">
                            {posts.reduce((sum, post) => sum + post.likes, 0)}
                        </div>
                        <div className="text-red-400 font-medium">Total Likes</div>
                    </div>
                    <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl p-6 border border-green-500/30">
                        <div className="text-3xl font-bold text-white mb-2">
                            {posts.reduce((sum, post) => sum + post.comments.length, 0)}
                        </div>
                        <div className="text-green-400 font-medium">Total Comments</div>
                    </div>
                </div>

                <div className="bg-white/5 rounded-xl p-6 mb-6">
                    <h3 className="text-xl font-bold text-white mb-4">Views Over Time</h3>
                    <div className="h-64 bg-white/5 rounded-lg flex items-center justify-center text-white/50">
                        <p>Chart visualization would appear here</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white/5 rounded-xl p-6">
                        <h3 className="text-xl font-bold text-white mb-4">Top Performing Posts</h3>
                        <div className="space-y-4">
                            {[...posts]
                                .sort((a, b) => b.views - a.views)
                                .slice(0, 3)
                                .map(post => (
                                    <div key={post.id} className="flex items-center justify-between">
                                        <div>
                                            <h4 className="font-medium text-white">{post.title}</h4>
                                            <div className="text-sm text-white/50">{post.views} views</div>
                                        </div>
                                        <div className="text-cyan-400">{post.likes} likes</div>
                                    </div>
                                ))}
                        </div>
                    </div>

                    <div className="bg-white/5 rounded-xl p-6">
                        <h3 className="text-xl font-bold text-white mb-4">Engagement by Category</h3>
                        <div className="space-y-4">
                            {categories
                                .filter(cat => cat !== 'All')
                                .map(category => {
                                    const categoryPosts = posts.filter(post => post.category === category);
                                    const totalLikes = categoryPosts.reduce((sum, post) => sum + post.likes, 0);
                                    const totalComments = categoryPosts.reduce((sum, post) => sum + post.comments.length, 0);
                                    
                                    return (
                                        <div key={category} className="flex items-center justify-between">
                                            <div className="font-medium text-white">{category}</div>
                                            <div className="flex gap-4">
                                                <div className="text-sm text-white/70 flex items-center gap-1">
                                                    <Heart className="w-4 h-4" /> {totalLikes}
                                                </div>
                                                <div className="text-sm text-white/70 flex items-center gap-1">
                                                    <MessageCircle className="w-4 h-4" /> {totalComments}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const SettingsPage = () => (
        <div className="space-y-8">
            <div className="text-center">
                <h2 className="text-4xl font-bold text-white mb-4">Settings</h2>
                <p className="text-white/70 text-lg">Customize your experience</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
                <div className="space-y-8">
                    <div>
                        <h3 className="text-xl font-bold text-white mb-6">Account Settings</h3>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-white/90 text-sm font-medium mb-2">
                                    Display Name
                                </label>
                                <input
                                    type="text"
                                    defaultValue="Current User"
                                    className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
                                />
                            </div>
                            <div>
                                <label className="block text-white/90 text-sm font-medium mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    defaultValue="user@example.com"
                                    className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
                                />
                            </div>
                            <div>
                                <label className="block text-white/90 text-sm font-medium mb-2">
                                    Change Password
                                </label>
                                <input
                                    type="password"
                                    placeholder="Enter new password"
                                    className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-white/20">
                        <h3 className="text-xl font-bold text-white mb-6">Preferences</h3>
                        <div className="space-y-4">
                            <label className="flex items-center justify-between gap-4 cursor-pointer p-3 hover:bg-white/10 rounded-lg">
                                <div>
                                    <div className="font-medium text-white">Dark Mode</div>
                                    <div className="text-sm text-white/60">Use dark theme</div>
                                </div>
                                <div className="relative inline-block w-12 h-6 rounded-full bg-white/20">
                                    <input type="checkbox" className="opacity-0 w-0 h-0 peer" defaultChecked />
                                    <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-cyan-500 rounded-full transition-all duration-300 before:content-[''] before:absolute before:h-5 before:w-5 before:left-1 before:bottom-0.5 before:bg-white before:rounded-full before:transition-all before:duration-300 peer-checked:before:translate-x-6"></span>
                                </div>
                            </label>
                            <label className="flex items-center justify-between gap-4 cursor-pointer p-3 hover:bg-white/10 rounded-lg">
                                <div>
                                    <div className="font-medium text-white">Email Notifications</div>
                                    <div className="text-sm text-white/60">Receive email updates</div>
                                </div>
                                <div className="relative inline-block w-12 h-6 rounded-full bg-white/20">
                                    <input type="checkbox" className="opacity-0 w-0 h-0 peer" defaultChecked />
                                    <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-cyan-500 rounded-full transition-all duration-300 before:content-[''] before:absolute before:h-5 before:w-5 before:left-1 before:bottom-0.5 before:bg-white before:rounded-full before:transition-all before:duration-300 peer-checked:before:translate-x-6"></span>
                                </div>
                            </label>
                            <label className="flex items-center justify-between gap-4 cursor-pointer p-3 hover:bg-white/10 rounded-lg">
                                <div>
                                    <div className="font-medium text-white">Public Profile</div>
                                    <div className="text-sm text-white/60">Make your profile visible to others</div>
                                </div>
                                <div className="relative inline-block w-12 h-6 rounded-full bg-white/20">
                                    <input type="checkbox" className="opacity-0 w-0 h-0 peer" defaultChecked />
                                    <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-cyan-500 rounded-full transition-all duration-300 before:content-[''] before:absolute before:h-5 before:w-5 before:left-1 before:bottom-0.5 before:bg-white before:rounded-full before:transition-all before:duration-300 peer-checked:before:translate-x-6"></span>
                                </div>
                            </label>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-white/20">
                        <button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-3 px-8 rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            {/* Mobile header */}
            <header className="md:hidden fixed top-0 left-0 right-0 z-40 bg-gray-900/90 backdrop-blur-lg border-b border-gray-800/50 p-4 flex justify-between items-center">
                <button 
                    onClick={() => setIsSidebarOpen(true)}
                    className="menu-button text-white p-2"
                >
                    <Menu className="w-6 h-6" />
                </button>
                <h1 className="text-xl font-bold text-white">BlogHub</h1>
                <div className="w-6"></div> {/* Spacer for balance */}
            </header>

            {/* Sidebar overlay */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <Sidebar />

            {/* Main content */}
            <main className="md:ml-64 p-4 pt-20 md:pt-4">
                <div className="max-w-4xl mx-auto">
                    <div className="animate-fadeIn">
                        {currentPage === 'feed' && <FeedPage />}
                        {currentPage === 'create' && <CreatePostPage />}
                        {currentPage === 'profile' && <ProfilePage />}
                        {currentPage === 'analytics' && <AnalyticsPage />}
                        {currentPage === 'settings' && <SettingsPage />}
                        {currentPage === 'bookmarks' && (
                            <div className="text-center py-16">
                                <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Bookmark className="w-12 h-12 text-white/60" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">Your Bookmarks</h3>
                                <p className="text-white/70 text-lg mb-6">Save posts to read later</p>
                                <button
                                    onClick={() => setCurrentPage('feed')}
                                    className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-3 px-8 rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                                >
                                    Browse Posts
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default BlogPage;