import React from 'react'
import { FcOk,FcVlc } from "react-icons/fc";
import Header from '../Header/Header';
import AboutUs from '../About/AboutUs';
import  Course  from '../Course/Course';
import Contact from '../Contact/Contact';
import Footer from '../Footer/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
export const Home = () => {
 
  
  return (
      <div>
        <Header />
        <section className="bg-home bg-gradient" id="home">
        <div className="home-center">
            <div className="home-desc-center">
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-sm-6">
                            <div className="home-title">
                                <h5 className="mb-3 text-white-50">Discover CodeMaster Today</h5>
                                <h2 className="mb-4 text-white">Turn Your Coding Journey Into an Adventure with CodeMaster</h2>
                                <p className="text-white-50 home-desc font-16 mb-5">CodeMaster is an all-inclusive premium learning platform that includes an integrated IDE, built using the latest web technologies including HTML5, CSS3, and JavaScript,  Dive in to learn programming in a uniquely interactive and engaging environment. </p>
                                <div className="watch-video mt-5">
                                    <a href="#" className="btn btn-custom me-4">Get Started <FcOk size={22} /></a>
                                    <a href="http://vimeo.com/99025203" className="video-play-icon text-white">
                                        <FcVlc size={22} /> <span>Watch The Video</span></a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5 offset-lg-1 col-sm-6">
                            <div className="home-img mo-mt-20">
                                <img src="/assets/landingPage/landingpageheader.png" alt="" className="img-fluid mx-auto d-block"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
        <AboutUs />
        <Course />
        <Contact />
        <Footer />
      </div>
  )
}

export default Home;