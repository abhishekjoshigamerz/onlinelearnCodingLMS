import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './About.css';
const About = () => {
    return (
        <>
        <Header />
        <div className="about-us-container">
            <h1>About Us</h1>
            <p>
                Welcome to our coding website. Our aim is to empower students to learn coding
                efficiently and effectively. With our state-of-the-art online IDE, students can 
                write, debug, and run their code all in the same place.
            </p>
            <p>
                We believe that coding is an essential skill for the 21st century and beyond. Our 
                platform is designed to make the learning process as engaging and practical as possible. 
                With a range of resources and supportive community, we hope to inspire the next generation 
                of developers and innovators.
            </p>
        </div>
        <Footer />
        </>
    );
};

export default About;
