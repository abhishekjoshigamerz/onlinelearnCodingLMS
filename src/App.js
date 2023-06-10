import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Header from './components/Header/Header';
import CarouselComponent from './components/Carousel/Carousel';
import CoursesComponent from './components/Courses/Courses';
import Footer from './components/Footer/Footer';
const App = () => {
  return (
    <div>
      <Header />
      <CarouselComponent />
      <CoursesComponent />
      <Footer />
    </div>
  );
}

export default App;
