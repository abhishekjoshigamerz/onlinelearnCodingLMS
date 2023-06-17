import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { Route, Routes } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Header from './components/Header/Header';
import CarouselComponent from './components/Carousel/Carousel';
import CoursesComponent from './components/Courses/Courses';
import Footer from './components/Footer/Footer';
import CourseContent from './components/CourseContent/CourseContent';
import TopicContent from './components/CourseContent/TopicContent/TopicContent';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import Dashboard from './components/Dashboard/Dashboard';
import Home from './components/Home/Home';
import Setting from './components/Settings/Setting';
import PracticeIDE from './components/PracticeIDE/PracticeIDE';
import { RequireAuth } from "react-auth-kit";

const App = () => {
  return (
    <Routes>
       <Route
          path="/"
          element={<Home />}
        ></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/contact' element={<Contact />}></Route>
        
        <Route path='/dashboard/' element={<RequireAuth loginPath="/login"> 
          <Dashboard />
        </RequireAuth>}></Route>
        <Route path='/courses/:slug' element={<RequireAuth loginPath="/login">
          <CourseContent />
          </RequireAuth>}></Route>
        
        <Route path='/courses/:slug/topic/:id' element={<RequireAuth loginPath='/login'>
          <TopicContent />
        </RequireAuth>}></Route>
        <Route path='/settings' element={<RequireAuth loginPath='/login'>
          <Setting />
        </RequireAuth>}></Route>
        <Route path='/practice-ide' element={<RequireAuth loginPath='/login'>
          <PracticeIDE />
        </RequireAuth>}></Route>

    </Routes>
  );
}

export default App;
