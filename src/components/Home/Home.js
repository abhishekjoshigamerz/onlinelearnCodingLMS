
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { Route, Routes } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Header from '../Header/Header';
import CarouselComponent from '../Carousel/Carousel';
import CoursesComponent from '../Courses/Courses';
import Footer from '../Footer/Footer';
import CourseContent from '../CourseContent/CourseContent';
import TopicContent from '../CourseContent/TopicContent/TopicContent';
import Login from '../Login/Login';
import Register from '../Register/Register';
import About from '../About/About';
import Contact from '../Contact/Contact';
import Dashboard from '../Dashboard/Dashboard';


const Home = () => {
  return (
    <div>
      <Header />
      <CarouselComponent />
      <CoursesComponent />
      <Footer />
    </div>
  );
}

export default Home;
