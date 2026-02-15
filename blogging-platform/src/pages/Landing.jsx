import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar';

const Landing = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-black text-gray-100">

            <Navbar />

            {/* Hero Section */}
            <section className="container mx-auto px-6 py-32 text-center relative overflow-hidden">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/5 to-blue-500/10 blur-3xl"></div>

                <div className="relative z-10">
                    <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
                        Write, Read & Connect with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">BlogHub</span>
                    </h1>
                    <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
                        A modern platform to share your thoughts, read amazing stories, and connect with like-minded people from around the world.
                    </p>
                    <div className="space-x-4 space-y-4 md:space-y-0">
                        <button onClick={() => { navigate('/signup') }}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-blue-500/25">
                            Get Started
                        </button>
                        <button className="border border-gray-700 hover:border-blue-500 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 hover:bg-gray-900/50 backdrop-blur-sm">
                            Learn More
                        </button>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="container mx-auto px-6 py-16 border-y border-gray-800/50">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div className="group">
                        <div className="text-4xl font-bold text-blue-400 mb-2 group-hover:scale-110 transition-transform duration-200">10K+</div>
                        <div className="text-gray-400">Active Writers</div>
                    </div>
                    <div className="group">
                        <div className="text-4xl font-bold text-purple-400 mb-2 group-hover:scale-110 transition-transform duration-200">50K+</div>
                        <div className="text-gray-400">Stories Published</div>
                    </div>
                    <div className="group">
                        <div className="text-4xl font-bold text-green-400 mb-2 group-hover:scale-110 transition-transform duration-200">100K+</div>
                        <div className="text-gray-400">Monthly Readers</div>
                    </div>
                </div>
            </section>

            {/* Featured Blogs */}
            <section className="container mx-auto px-6 py-20">
                <h2 className="text-4xl font-bold mb-16 text-center">
                    Featured <span className="text-blue-400">Stories</span>
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { category: "Technology", title: "The Future of AI in Content Creation", time: "5 min read" },
                        { category: "Design", title: "Minimalist Design Trends in 2025", time: "3 min read" },
                        { category: "Business", title: "Building a Sustainable Startup", time: "7 min read" }
                    ].map((item, index) => (
                        <div key={index} className="bg-gray-900/50 rounded-xl overflow-hidden border border-gray-800/50 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105 backdrop-blur-sm group">
                            <div className="h-48 bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            <div className="p-6">
                                <div className="flex items-center text-sm mb-3">
                                    <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full">{item.category}</span>
                                    <span className="mx-3 text-gray-500">•</span>
                                    <span className="text-gray-400">{item.time}</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors duration-200">{item.title}</h3>
                                <p className="text-gray-400 mb-4 line-clamp-3">
                                    Discover insights, tips, and strategies that will help you stay ahead in the ever-evolving digital landscape.
                                </p>
                                <Link href="#" className="text-blue-400 hover:text-blue-300 font-semibold inline-flex items-center group">
                                    Read More
                                    <span className="ml-1 group-hover:translate-x-1 transition-transform duration-200">→</span>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Features Section */}
            <section className="bg-gray-900/30 py-20">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-bold mb-16 text-center">
                        Why Choose <span className="text-blue-400">BlogHub?</span>
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: "Easy to Use", desc: "Intuitive editor with markdown support", icon: "✨" },
                            { title: "Community Driven", desc: "Connect with writers worldwide", icon: "🌍" },
                            { title: "Analytics", desc: "Track your content performance", icon: "📊" }
                        ].map((feature, index) => (
                            <div key={index} className="text-center p-6 rounded-xl bg-gray-800/30 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:bg-gray-800/50">
                                <div className="text-4xl mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                                <p className="text-gray-400">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 blur-3xl"></div>
                <div className="container mx-auto px-6 text-center relative z-10">
                    <h2 className="text-4xl font-bold mb-6">Ready to start your blogging journey?</h2>
                    <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                        Join thousands of writers and readers sharing their stories and ideas on our platform.
                    </p>
                    <button
                        onClick={() => { navigate('/signup') }}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-10 py-4 rounded-lg text-lg font-semibold transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-blue-500/25">
                        Create Your Account
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-gray-800/50 py-12 bg-gray-900/30">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="text-2xl font-bold text-white mb-4 md:mb-0">
                            Blog<span className="text-blue-500">Hub</span>
                        </div>
                        <div className="flex space-x-6">
                            <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Terms</Link>
                            <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Privacy</Link>
                            <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Contact</Link>
                        </div>
                    </div>
                    <div className="mt-8 text-center text-gray-500 text-sm">
                        © {new Date().getFullYear()} BlogHub. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Landing