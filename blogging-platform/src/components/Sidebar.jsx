import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import { FaPersonSnowboarding } from 'react-icons/fa6';
import { BsPostcardHeart } from 'react-icons/bs';
import { LuLogOut } from 'react-icons/lu';

const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { path: '/user/feeds', icon: <FaPersonSnowboarding />, name: 'Feed' },
        { path: '/user/post', icon: <BsPostcardHeart />, name: 'Post' },
        { path: '/user/profile', icon: '👤', name: 'Profile' },
    ];

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div className="flex min-h-screen"> {/* <-- FIX: wrapper to align sidebar and content */}
            {/* Desktop Sidebar */}
            <motion.div
                className="hidden md:flex flex-col w-64 h-screen bg-gray-900 border-r border-gray-800 fixed"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                {/* Branding */}
                <div className="p-6 border-b border-gray-800">
                    <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex items-center space-x-2"
                    >
                        <div className="text-2xl font-bold text-white cursor-pointer">
                            Blog<span className="text-blue-500">Hub</span>
                        </div>
                    </motion.div>
                </div>

                {/* Sidebar Nav */}
                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    {navItems.map((item, index) => (
                        <motion.div
                            key={item.path}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                        >
                            <Link
                                to={item.path}
                                className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${location.pathname === item.path
                                    ? 'bg-gray-800 text-blue-400'
                                    : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
                                    }`}
                            >
                                <span className="text-xl mr-3">{item.icon}</span>
                                <span className="font-medium">{item.name}</span>
                            </Link>
                        </motion.div>
                    ))}
                </nav>

                {/* Footer */}
                <motion.div
                    className="p-4 border-t border-gray-800"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    <div className="flex justify-between items-center space-x-3">
                        <div className="flex justify-between items-center space-x-3">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                                <span className="text-white">👤</span>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-white">John Doe</p>
                                <p className="text-xs text-gray-500">Premium Member</p>
                            </div>
                        </div>
                        <button
                            onClick={() => { navigate('/') }}
                            className="group relative p-2 rounded-full transition-all duration-200 hover:bg-gray-800">
                            <LuLogOut className="text-white text-lg group-hover:text-red-400 transition-colors duration-200" />
                        </button>
                    </div>
                </motion.div>
            </motion.div>

            {/* Mobile Header */}
            <div className="md:hidden flex items-center justify-between p-4 bg-gray-900 border-b border-gray-800 fixed top-0 w-full z-50">
                <div className="text-xl font-bold text-white">
                    Blog<span className="text-blue-500">Hub</span>
                </div>
                <button
                    onClick={toggleMobileMenu}
                    className="text-gray-400 hover:text-white focus:outline-none"
                >
                    {isMobileMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Sidebar */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                            onClick={toggleMobileMenu}
                        />
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'tween' }}
                            className="fixed top-0 left-0 h-full w-64 bg-gray-900 border-r border-gray-800 z-50 md:hidden flex flex-col"
                        >
                            <div className="p-6 border-b border-gray-800">
                                <div className="text-2xl font-bold text-white">
                                    Blog<span className="text-blue-500">Hub</span>
                                </div>
                            </div>
                            <div className="flex-1 overflow-y-auto overflow-x-hidden py-2">
                                <nav className="p-4 space-y-2">
                                    {navItems.map((item) => (
                                        <Link
                                            key={item.path}
                                            to={item.path}
                                            onClick={toggleMobileMenu}
                                            className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${location.pathname === item.path
                                                ? 'bg-gray-800 text-blue-400'
                                                : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
                                                }`}
                                        >
                                            <span className="text-xl mr-3">{item.icon}</span>
                                            <span className="font-medium">{item.name}</span>
                                        </Link>
                                    ))}
                                </nav>
                            </div>
                            <div className="p-4 border-t border-gray-800 flex-shrink-0">
                                <div className="flex justify-between items-center space-x-3">
                                    <div className="flex items-center space-x-3">
                                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                                            <span className="text-white">👤</span>
                                        </div>
                                        <div className="flex justify-between items-center space-x-3"></div>
                                        <div>
                                            <p className="text-sm font-medium text-white">John Doe</p>
                                            <p className="text-xs text-gray-500">Premium Member</p>
                                        </div>
                                    </div>
                                    <button className="group relative p-2 rounded-full transition-all duration-200 hover:bg-gray-800">
                                        <LuLogOut className="text-white text-lg group-hover:text-red-400 transition-colors duration-200" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <div className="flex-1 md:ml-64 p-4 mt-16 md:mt-0"> {/* md:ml-64 ensures content shifts right on desktop */}
                <Outlet />
            </div>
        </div>
    );
};

export default Sidebar;
