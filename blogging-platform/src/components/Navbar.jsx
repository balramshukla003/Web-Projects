import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const isAuthRoute = ['/login', '/signup', '/forgot-password'].includes(location.pathname);
    const isHomePage = location.pathname === '/';

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <nav className="flex justify-between items-center p-6 border-b border-gray-800/50 backdrop-blur-sm sticky top-0 z-50">
                <div className="text-2xl font-bold text-white cursor-pointer" onClick={() => { navigate("/") }}>
                    Blog<span className="text-blue-500">Hub</span>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex space-x-8">
                    {!isAuthRoute && (
                        <>
                            <Link to="/" className={`hover:text-blue-400 transition-colors duration-200 ${isHomePage ? 'text-blue-400' : ''}`}>
                                Home
                            </Link>
                            <Link
                                to="/user"
                                className={`hover:text-blue-400 transition-colors duration-200 ${location.pathname.startsWith('/blog') ? 'text-blue-400' : ''}`}
                            >
                                Blogs
                            </Link>
                            <Link
                                to="/about"
                                className={`hover:text-blue-400 transition-colors duration-200 ${location.pathname.startsWith('/about') ? 'text-blue-400' : ''}`}
                            >
                                About
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center z-1">
                    {!isAuthRoute && (
                        <button
                            onClick={toggleMenu}
                            className="text-white focus:outline-none"
                            aria-label="Toggle menu"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    )}
                </div>


                {/* Auth Buttons (visible on both mobile and desktop) */}
                {!isAuthRoute ? (
                    <div className="hidden md:flex space-x-4">
                        {location.pathname !== '/signup' && (
                            <button
                                onClick={() => { navigate('/signup') }}
                                className="border border-blue-500 text-blue-500 hover:bg-blue-500/10 px-6 py-2 rounded-lg transition-all duration-200 hover:scale-105">
                                Sign Up
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="hidden md:flex items-center space-x-6">
                        {location.pathname === '/login' && (
                            <Link to="/signup" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                                Don't have an account? <span className="text-blue-400 font-semibold">Sign up</span>
                            </Link>
                        )}
                        {location.pathname === '/signup' && (
                            <Link to="/login" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                                Already have an account? <span className="text-blue-400 font-semibold">Login</span>
                            </Link>
                        )}
                    </div>
                )}

            </nav>
            {/* Mobile Menu */}
            {isMenuOpen && !isAuthRoute && (
                <div className="md:hidden fixed inset-0 z-40">
                    {/* Overlay */}
                    <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={toggleMenu}
                    />

                    {/* Menu Content */}
                    <div className={
                        `absolute top-0 right-0 h-full w-3/4 max-w-sm bg-gray-900/95 backdrop-blur-sm border-l border-gray-800/50
            transform transition-transform duration-300 ease-in-out
            ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`
                    }>
                        <div className="flex flex-col space-y-6 p-6">
                            <Link
                                to="/"
                                className={`hover:text-blue-400 transition-colors duration-200 ${isHomePage ? 'text-blue-400' : 'text-white'}`}
                                onClick={toggleMenu}
                            >
                                Home
                            </Link>
                            <Link
                                to="/blog"
                                className={`hover:text-blue-400 transition-colors duration-200 ${location.pathname.startsWith('/blog') ? 'text-blue-400' : 'text-white'}`}
                                onClick={toggleMenu}
                            >
                                Blogs
                            </Link>
                            <Link
                                to="/about"
                                className={`hover:text-blue-400 transition-colors duration-200 ${location.pathname.startsWith('/about') ? 'text-blue-400' : 'text-white'}`}
                                onClick={toggleMenu}
                            >
                                About
                            </Link>

                            <div className="pt-4">
                                {location.pathname !== '/signup' && (
                                    <button
                                        onClick={() => {
                                            navigate('/signup');
                                            toggleMenu();
                                        }}
                                        className="w-full border border-blue-500 text-blue-500 hover:bg-blue-500/10 px-4 py-2 rounded-lg transition-all duration-200"
                                    >
                                        Sign Up
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </>
    )
}

export default Navbar