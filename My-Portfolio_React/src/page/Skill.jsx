import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import '../css/Skill.css';
import Icons from '../components/Icons';

const Skill = () => {

    useEffect(() => {
        document.title = "Balram Shukla | Skills";
    }, []);

    const skills = {
        frontend: [
            { name: 'React', icon: '⚛️' },
            { name: 'Flutter', icon: <Icons.Flutter_i color='skyBlue' /> },
            { name: 'HTML', icon: <Icons.html_i color='orange' /> },
            { name: 'CSS', icon: '🎨' },
        ],
        backend: [
            { name: 'Node.js', icon: <Icons.nodeJS color='rgb(42, 195, 0)'/> },
            { name: 'PHP', icon: '🐘' },
            { name: 'REST API', icon: '🔗' },
            { name: 'dotnet', icon: <Icons.dotnet_i color='rgb(10, 148, 203)' /> },
        ],
        database: [
            { name: 'MySQL', icon: <Icons.mysql_i color='Blue' /> },
            { name: 'MongoDB', icon: <Icons.mongodb_i color='green' /> },
            {
                name: 'SQL Server', icon: <Icons.sqlserver_i color='rgb(226, 32, 7)' />
            },
        ],
        languages: [
            { name: 'JavaScript', icon: <Icons.javaSC color=' #f0db4f' /> },
            { name: 'Java', icon: '♨️' },
            { name: 'Python', icon: <Icons.python_i color='blue' /> },
            { name: 'C++', icon: <Icons.c_i color='rgb(3, 112, 246)' /> },
            { name: 'C-Sharp', icon: <Icons.cSharp /> },
        ],
        developmentEnvironments: [
            { name: 'VS Code', icon: <Icons.vsCode color='rgba(46, 5, 209, 0.92)' /> },
            { name: 'Visual Studio', icon: <Icons.ViS color='purple' /> },
            { name: 'IntelliJ IDEA', icon: '👨🏻‍💻' },
            { name: 'Chrome Dev Tool', icon: '🔧' },
            { name: 'Github', icon: <Icons.Github /> },
            { name: 'WinMerge', icon: '🧮' },
        ],
    };

    const sectionVariants = {
        hidden: { opacity: 0, x: 100 },
        visible: (i) => ({
            opacity: 1,
            x: 0,
            transition: { delay: i * .5, type: 'spring', stiffness: 50 },
        }),
    };

    const skillVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: 'spring', stiffness: 100 },
        },
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>My Expertise</h2>
            <div style={styles.grid}>
                {Object.keys(skills).map((category, i) => (
                    <motion.div
                        key={category}
                        style={styles.section}
                        variants={sectionVariants}
                        initial="hidden"
                        animate="visible"
                        custom={i}
                    >
                        <h3 style={styles.sectionTitle}>
                            {category === 'frontend'
                                ? '🖥️ Frontend'
                                : category === 'backend'
                                    ? '⚙️ Backend'
                                    : category === 'database'
                                        ? '💾 Database'
                                        : category === 'languages'
                                            ? '📚 Languages'
                                            : '🛠 Tools'}
                        </h3>
                        <div style={styles.itemsContainer}>
                            {skills[category].map((skill, index) => (
                                <motion.div
                                    key={index}
                                    style={styles.card}
                                    variants={skillVariants}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    <span style={styles.icon}>{skill.icon}</span>
                                    <h4 style={styles.skillName}>{skill.name}</h4>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

// Styling
const styles = {
    container: {
        padding: '2rem',
        backgroundColor: '#232946',
        minHeight: '75vh'
        // boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
    },
    title: {
        textAlign: 'center',
        color: '#fff',
        fontSize: '2.5rem',
        marginBottom: '2rem',
        textTransform: 'uppercase',
        letterSpacing: '2px',
        background: 'linear-gradient(45deg, #00ff88, #00b4d8)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '2rem',
    },
    section: {
        backgroundColor: '#cdd8e4',
        padding: '1.5rem',
        borderRadius: '12px',
    },
    sectionTitle: {
        color: '#232946',
        fontSize: '1.5rem',
        marginBottom: '1rem',
        paddingBottom: '0.5rem',
        borderBottom: '2px solid #232946',
    },
    itemsContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },
    card: {
        backgroundColor: '#232946',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '2px 5px',
        transition: 'all 2s ease',
    },
    icon: {
        fontSize: '1.8rem',
    },
    skillName: {
        color: '#fff',
        margin: '0',
        flexGrow: 1,
        fontSize: '1.1rem',
    },
};

export default Skill;
