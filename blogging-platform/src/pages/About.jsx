import { motion } from 'framer-motion';
import { FaUsers, FaBookReader, FaPenAlt, FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const AboutUs = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-gray-900 min-h-screen">
            <Navbar />

            <motion.main
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="pt-4 pb-12 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl"
            >
                {/* Hero Section */}
                <section className="text-center mb-12 mt-8 sm:mt-12">
                    <motion.h1
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white"
                    >
                        About <span className="text-blue-500">Blog</span>Hub
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto mt-6"
                    >
                        Your premier destination for insightful articles, creative writing, and knowledge sharing.
                    </motion.p>
                </section>

                {/* Content Sections */}
                <div className="space-y-8">
                    {/* Mission Section */}
                    <motion.section
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="bg-gray-800 rounded-xl p-6 sm:p-8"
                    >
                        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-blue-400">Our Mission</h2>
                        <div className="space-y-4 text-gray-300">
                            <p>
                                At BlogHub, we're committed to creating a platform where writers and readers connect over meaningful content.
                                Our mission is to democratize knowledge sharing and foster a community of curious minds.
                            </p>
                            <p>
                                We believe everyone has a story worth telling and knowledge worth sharing. BlogHub provides the tools and audience to make that happen.
                            </p>
                        </div>
                    </motion.section>

                    {/* Features Grid */}
                    <motion.section
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                    >
                        {[
                            { icon: <FaUsers />, title: "Vibrant Community", description: "Join over 50,000 passionate readers and writers who share, discuss, and grow together." },
                            { icon: <FaBookReader />, title: "Diverse Content", description: "From tech tutorials to poetry, find content that matches your interests across 20+ categories." },
                            { icon: <FaPenAlt />, title: "Writer-Friendly", description: "Our intuitive editor and analytics help writers focus on what matters most - their content." },
                            { icon: <FaHeart />, title: "Passion-Driven", description: "Created by content lovers, for content lovers. We're building what we wish existed." }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.02 }}
                                className="bg-gray-800 rounded-xl p-6"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.9 + index * 0.1 }}
                            >
                                <div className="text-blue-400 text-3xl mb-4">
                                    {feature.icon}
                                </div>
                                <h3 className="text-lg sm:text-xl font-bold mb-2">{feature.title}</h3>
                                <p className="text-gray-400 text-sm sm:text-base">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </motion.section>

                    {/* Story Section */}
                    <motion.section
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.4 }}
                        className="bg-gray-800 rounded-xl p-6 sm:p-8"
                    >
                        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-blue-400">Our Story</h2>
                        <div className="space-y-4 text-gray-300">
                            <p>
                                BlogHub was founded in 2022 by a team of writers and developers who were frustrated with existing blogging platforms.
                                We wanted something that combined beautiful design with powerful features - without the complexity.
                            </p>
                            <p>
                                What started as a side project among friends has grown into a platform serving millions of readers monthly.
                                We're still independently owned and committed to keeping BlogHub authentic and community-focused.
                            </p>
                        </div>
                    </motion.section>

                    {/* CTA Section */}
                    <motion.section
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 1.6 }}
                        className="text-center mt-12 px-4"
                    >
                        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-white">Join Our Community</h2>
                        <p className="text-gray-400 mb-8 max-w-2xl mx-auto text-base sm:text-lg">
                            Whether you're a reader or writer, there's a place for you at BlogHub.
                            Start exploring today or share your own perspective with the world.
                        </p>
                        <button
                            onClick={() => navigate('/signup')}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium sm:font-bold py-2 px-6 sm:py-3 sm:px-8 rounded-lg transition duration-200 text-sm sm:text-base"
                        >
                            Get Started
                        </button>
                    </motion.section>
                </div>
            </motion.main>
        </div>
    );
};

export default AboutUs;