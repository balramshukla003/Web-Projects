import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar.jsx'

const Login = () => {
    const navigate = useNavigate()
    return (
        <div className="min-h-screen bg-black text-gray-100 flex flex-col">

            <Navbar />

            {/* Main Content Area */}
            <div className="flex flex-1">
                
                {/* Left Side - Image with Animation */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="hidden md:flex flex-1 bg-gradient-to-br from-blue-900/20 to-purple-900/20 relative overflow-hidden"
                >
                    <motion.img
                        src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80"
                        alt="BlogHub"
                        className="absolute inset-0 w-full h-full object-cover opacity-80"
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/30 z-10 flex items-end p-12">
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                        >
                            <h2 className="text-4xl font-bold mb-4">Share Your Thoughts</h2>
                            <p className="text-gray-300 max-w-md">
                                Join thousands of writers and readers in a community built around sharing knowledge and stories.
                            </p>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Right Side - Login Form */}
                <div className="flex-1 flex flex-col overflow-y-auto">
                    {/* Main Content */}
                    <section className="container mx-auto px-6 py-16 max-w-md flex-1 flex flex-col justify-center">
                        <div className="text-center mb-10">
                            <motion.h1
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="text-4xl font-bold mb-3"
                            >
                                Welcome back
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                                className="text-gray-400"
                            >
                                Sign in to access your account
                            </motion.p>
                        </div>

                        <motion.form
                            className="space-y-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                        >
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium mb-2">Email or Phone Number</label>
                                <input
                                    type="text"
                                    id="email"
                                    className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    placeholder="you@example.com or +1 (123) 456-7890"
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium mb-2">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    placeholder="••••••••"
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="remember"
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-700 rounded bg-gray-800"
                                    />
                                    <label htmlFor="remember" className="ml-2 block text-sm text-gray-400">
                                        Remember me
                                    </label>
                                </div>

                                <Link to="/forgot-password" className="text-sm text-blue-400 hover:underline">
                                    Forgot password?
                                </Link>
                            </div>

                            <motion.button
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-[1.02] shadow-lg hover:shadow-blue-500/25"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Sign In
                            </motion.button>

                            <div className="text-center text-sm text-gray-500">
                                Don't have an account? <Link to="/signup" className="text-blue-400 hover:underline">Sign up</Link>
                            </div>
                        </motion.form>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default Login