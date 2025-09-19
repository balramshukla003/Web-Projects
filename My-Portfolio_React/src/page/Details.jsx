import '../css/Details.css'
import React from 'react'

const Details = () => {
    return (
        <main>
            <section className="personal-section">
                <h1>Personal Details</h1>

                {/* Personal Information */}
                <div className="section">
                    <h2>Personal Information</h2>
                    <p><strong>Name:</strong> Balram Shukla</p>
                    <p><strong>Date of Birth:</strong> January 1, 2000</p>
                    <p><strong>Email:</strong> balram.shukla@example.com</p>
                    <p><strong>Phone:</strong> +91 9876543210</p>
                    <p><strong>Address:</strong> 123, Green Valley Apartments, Lucknow, Uttar Pradesh, India</p>
                </div>

                {/* Education */}
                <div className="section">
                    <h2>Education</h2>
                    <ul>
                        <li>
                            <strong>Bachelor of Technology in Computer Science</strong> <br />
                            ABC University, Lucknow <br />
                            2020 - 2024 (CGPA: 9.2/10)
                        </li>
                        <li>
                            <strong>Higher Secondary Education (Class 12th)</strong> <br />
                            XYZ Public School, Lucknow <br />
                            2018 - 2020 (Percentage: 95%)
                        </li>
                        <li>
                            <strong>Secondary Education (Class 10th)</strong> <br />
                            XYZ Public School, Lucknow <br />
                            2016 - 2018 (Percentage: 93%)
                        </li>
                    </ul>
                </div>

                {/* Certifications */}
                <div className="section">
                    <h2>Certifications</h2>
                    <ul>
                        <li>Full-Stack Web Development - Coursera</li>
                        <li>Data Structures & Algorithms - Udemy</li>
                        <li>Java Programming - HackerRank</li>
                        <li>Cloud Computing with AWS - Google Cloud Academy</li>
                    </ul>
                </div>

                {/* Achievements */}
                <div className="section">
                    <h2>Achievements</h2>
                    <ul>
                        <li>Winner, National Coding Challenge 2023</li>
                        <li>Finalist, Hackathon by Flipkart 2022</li>
                        <li>Top Performer, Accenture Virtual Developer Experience 2024</li>
                        <li>Published research paper on "AI in Healthcare" in IEEE</li>
                    </ul>
                </div>

                {/* Availability */}
                <div className="section">
                    <h2>Availability</h2>
                    <p>
                        I am available for freelance projects, internships, and full-time roles in web development, software engineering, or related fields.
                        Feel free to <a href="/contact">get in touch</a> for collaborations or opportunities.
                    </p>
                </div>
            </section>
        </main>

    )
}

export default Details

