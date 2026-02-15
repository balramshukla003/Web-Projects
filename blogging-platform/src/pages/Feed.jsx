import { motion } from 'framer-motion';
import { FaHeart, FaComment, FaBookmark, FaShare } from 'react-icons/fa';
import { useEffect, useState } from 'react';

const FeedPage = () => {
    const [feeds, setFeeds] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate API fetch
        const fetchFeeds = async () => {
            try {
                // Mock data - in a real app, you would fetch this from your backend
                const mockFeeds = [
                    {
                        id: 1,
                        author: 'Jane Cooper',
                        username: '@janecooper',
                        avatar: '👩',
                        content: 'Just published my new article on React performance optimization techniques. Check it out if you want to make your apps faster! #reactjs #webdev',
                        timestamp: '2 hours ago',
                        likes: 24,
                        comments: 8,
                        isLiked: false,
                        isBookmarked: false
                    },
                    {
                        id: 2,
                        author: 'Alex Morgan',
                        username: '@alexmorgan',
                        avatar: '👨',
                        content: 'The key to becoming a better developer is consistency. Code every day, even if it\'s just for 30 minutes. What are you working on today? #coding #programming',
                        timestamp: '5 hours ago',
                        likes: 56,
                        comments: 12,
                        isLiked: true,
                        isBookmarked: true
                    },
                    {
                        id: 3,
                        author: 'Sam Wilson',
                        username: '@samwilson',
                        avatar: '🧑',
                        content: 'Just discovered this amazing new JavaScript library that simplifies state management. Has anyone else tried it? Would love to hear your thoughts! #javascript #webdevelopment',
                        timestamp: '1 day ago',
                        likes: 102,
                        comments: 34,
                        isLiked: false,
                        isBookmarked: false
                    },
                    {
                        id: 4,
                        author: 'Taylor Swift',
                        username: '@taylorswift',
                        avatar: '👩‍🎤',
                        content: 'Debugging is like being a detective in a crime movie where you are also the murderer. Anyone else feel this way? #devhumor #codinglife',
                        timestamp: '2 days ago',
                        likes: 245,
                        comments: 42,
                        isLiked: true,
                        isBookmarked: false
                    },
                    {
                        id: 5,
                        author: 'Chris Evans',
                        username: '@notcap',
                        avatar: '🧔',
                        content: 'Just completed my first open source contribution! The feeling of giving back to the community is amazing. What was your first OSS contribution? #opensource #github',
                        timestamp: '3 days ago',
                        likes: 189,
                        comments: 27,
                        isLiked: false,
                        isBookmarked: true
                    },
                    {
                        id: 6,
                        author: 'Natasha Romanoff',
                        username: '@blackwidow',
                        avatar: '👩',
                        content: 'TypeScript has completely changed how I write JavaScript. The type safety alone is worth the learning curve. Who else has made the switch? #typescript #webdev',
                        timestamp: '4 days ago',
                        likes: 312,
                        comments: 64,
                        isLiked: true,
                        isBookmarked: false
                    },
                    {
                        id: 7,
                        author: 'Bruce Banner',
                        username: '@sciencebro',
                        avatar: '👨‍🔬',
                        content: 'After 3 months of learning, I finally landed my first developer job! To everyone still learning: keep going, it\'s worth it! #careerchange #successstory',
                        timestamp: '5 days ago',
                        likes: 498,
                        comments: 89,
                        isLiked: false,
                        isBookmarked: true
                    },
                    {
                        id: 8,
                        author: 'Wanda Maximoff',
                        username: '@scarletwitch',
                        avatar: '🧙‍♀️',
                        content: 'CSS Grid vs Flexbox - when do you use each? I\'m putting together a comprehensive guide and would love to hear your use cases! #css #frontend',
                        timestamp: '1 week ago',
                        likes: 276,
                        comments: 53,
                        isLiked: true,
                        isBookmarked: true
                    },
                    {
                        id: 9,
                        author: 'Tony Stark',
                        username: '@ironman',
                        avatar: '🤖',
                        content: 'Built a new AI-powered code review tool that automatically detects common anti-patterns. Would anyone be interested in beta testing? #ai #programming',
                        timestamp: '1 week ago',
                        likes: 421,
                        comments: 97,
                        isLiked: false,
                        isBookmarked: false
                    },
                    {
                        id: 10,
                        author: 'Peter Parker',
                        username: '@spidey',
                        avatar: '🕷️',
                        content: 'Just learned about React Server Components and my mind is blown. The future of React is looking exciting! What are your thoughts? #react #nextjs',
                        timestamp: '2 weeks ago',
                        likes: 387,
                        comments: 72,
                        isLiked: true,
                        isBookmarked: false
                    },
                    {
                        id: 11,
                        author: 'Steve Rogers',
                        username: '@cap',
                        avatar: '🛡️',
                        content: 'After 10 years in the industry, my best advice: Learn fundamentals deeply before jumping to frameworks. You won\'t regret it. #programming #careeradvice',
                        timestamp: '2 weeks ago',
                        likes: 512,
                        comments: 103,
                        isLiked: true,
                        isBookmarked: true
                    },
                    {
                        id: 12,
                        author: 'Carol Danvers',
                        username: '@captainmarvel',
                        avatar: '✨',
                        content: 'Why is everyone so obsessed with microservices? For most startups, a well-structured monolith is more than enough. Fight me. #architecture #devops',
                        timestamp: '3 weeks ago',
                        likes: 689,
                        comments: 214,
                        isLiked: false,
                        isBookmarked: true
                    },
                    {
                        id: 13,
                        author: 'Stephen Strange',
                        username: '@drmagic',
                        avatar: '🧙‍♂️',
                        content: 'Documentation is not optional. If you didn\'t document it, you might as well not have built it. #bestpractices #documentation',
                        timestamp: '3 weeks ago',
                        likes: 432,
                        comments: 87,
                        isLiked: false,
                        isBookmarked: false
                    },
                    {
                        id: 14,
                        author: 'T\'Challa',
                        username: '@wakandaforever',
                        avatar: '👑',
                        content: 'The most underrated skill in tech? Communication. You can write perfect code but if you can\'t explain it, your impact is limited. #softskills',
                        timestamp: '1 month ago',
                        likes: 578,
                        comments: 132,
                        isLiked: true,
                        isBookmarked: false
                    },
                    {
                        id: 15,
                        author: 'Nick Fury',
                        username: '@thedirector',
                        avatar: '👁️',
                        content: 'Security isn\'t something you can bolt on at the end. It needs to be part of your development process from day one. #cybersecurity #webdev',
                        timestamp: '1 month ago',
                        likes: 324,
                        comments: 56,
                        isLiked: true,
                        isBookmarked: true
                    }
                ];

                setTimeout(() => {
                    setFeeds(mockFeeds);
                    setLoading(false);
                }, 800); // Simulate network delay
            } catch (error) {
                console.error('Error fetching feeds:', error);
                setLoading(false);
            }
        };

        fetchFeeds();
    }, []);

    const handleLike = (id) => {
        setFeeds(feeds.map(feed => {
            if (feed.id === id) {
                return {
                    ...feed,
                    isLiked: !feed.isLiked,
                    likes: feed.isLiked ? feed.likes - 1 : feed.likes + 1
                };
            }
            return feed;
        }));
    };

    const handleBookmark = (id) => {
        setFeeds(feeds.map(feed => {
            if (feed.id === id) {
                return {
                    ...feed,
                    isBookmarked: !feed.isBookmarked
                };
            }
            return feed;
        }));
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto py-6 px-4 sm:px-6 lg:px-8"
        >
            <h1 className="text-2xl font-bold text-white mb-6">Your Feed</h1>

            <div className="space-y-6">
                {feeds.map((feed) => (
                    <motion.div
                        key={feed.id}
                        whileHover={{ scale: 1.01 }}
                        className="bg-gray-800 rounded-xl p-6 shadow-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex items-start space-x-4">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl">
                                {feed.avatar}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center space-x-2">
                                    <h3 className="font-bold text-white">{feed.author}</h3>
                                    <span className="text-gray-400 text-sm">{feed.username}</span>
                                    <span className="text-gray-500 text-sm">· {feed.timestamp}</span>
                                </div>
                                <p className="mt-2 text-gray-300 whitespace-pre-line">
                                    {feed.content}
                                </p>
                                <div className="mt-4 flex items-center justify-between text-gray-400">
                                    <button
                                        onClick={() => handleLike(feed.id)}
                                        className={`flex items-center space-x-1 ${feed.isLiked ? 'text-red-500' : 'hover:text-red-400'}`}
                                    >
                                        <FaHeart />
                                        <span>{feed.likes}</span>
                                    </button>
                                    <button className="flex items-center space-x-1 hover:text-blue-400">
                                        <FaComment />
                                        <span>{feed.comments}</span>
                                    </button>
                                    <button
                                        onClick={() => handleBookmark(feed.id)}
                                        className={`${feed.isBookmarked ? 'text-yellow-400' : 'hover:text-yellow-400'}`}
                                    >
                                        <FaBookmark />
                                    </button>
                                    <button className="hover:text-green-400">
                                        <FaShare />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default FeedPage;