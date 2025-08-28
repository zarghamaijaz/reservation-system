import React from "react";
import HomeHeader from "../components/HomeHeader";
import { IoBookOutline, IoCarSportOutline  } from "react-icons/io5";
import { BsSignpost2 } from "react-icons/bs";
import { PiGraduationCapLight } from "react-icons/pi";

const Home = () => {
  return (
    <div className="home">
      <div className="medium-container">
        <HomeHeader/>
      </div>
      <div className="text-center mt-huge mb-medium">
        <h2 className="main-title">Stelios Driving School</h2>
        <p className="small-title">Your safe and enjoyable driving journey starts here.</p>
      </div>
      <div className="hero-section">
        <div className="hero-bg-overlay"></div>
        <div className="hero-bg">
          <img src="assets/images/banner.jpg" alt="" className="hero--bg-img" />
        </div>
        <div className="hero-content text-center">
          <h2 className="yellow-bg-title">What can you learn from us?</h2>
          <div className="hero-text-container">
            <p className="small-title">At Stelios Driving School, we offer classes for all kinds of vehicles and for all ages.</p>
            <p className="small-title">We also teach you about road safety to make sure you get on the road with confidence.</p>
          </div>
        </div>
      </div>
      <div className="text-center mt-huge">
        <h2 className="secondary-title">Here's our teaching process.</h2>
        <div className="process-container">
          <div className="process-item">
            <div className="process-icon">
              <IoBookOutline />
            </div>
            <h4 className="process-number">1</h4>
            <h3 className="process-title">Book an appointment</h3>
            <p className="process-description">Visit us and book an appointment with one of our instructors.</p>
          </div>
          <div className="process-item">
            <div className="process-icon">
              <BsSignpost2 />
            </div>
            <h4 className="process-number">2</h4>
            <h3 className="process-title">Learn road signs</h3>
            <p className="process-description">We will make sure yor are aware of road signs and safety.</p>
          </div>
          <div className="process-item">
            <div className="process-icon">
              <IoCarSportOutline />
            </div>
            <h4 className="process-number">3</h4>
            <h3 className="process-title">Learn to drive</h3>
            <p className="process-description">Now it is time to learn how to drive. Level up your driving skills.</p>
          </div>
          <div className="process-item">
            <div className="process-icon">
              <PiGraduationCapLight />
            </div>
            <h4 className="process-number">4</h4>
            <h3 className="process-title">Pass the driving test</h3>
            <p className="process-description">After finished your lessons you will be able to pass the driving test with ease.</p>
          </div>
        </div>
      </div>
      <div className="text-center mt-huge">
        <h2 className="secondary-title">Are you ready to get started?</h2>
      </div>
      <div className="content-container">
        <div className="content-left">
          <div className="content">
            <h3 className="content-title">Excellent</h3>
            <p className="content-description">You are one step closer to a safe and enjoyable driving experience. Click the button below to get started.</p>
            <div className="cta-buttons">
              <a href="#" className="cta-button">Book a lesson</a>
              <a href="#" className="cta-button outlined">Already booked</a>
            </div>
          </div>
        </div>
        <div className="content-right">
          <img src="assets/images/learn-driving.jpg" alt="" className="content-image" />
        </div>
      </div>
      <div className="text-center mt-huge">
        <h2 className="secondary-title">Meet the founders</h2>
      </div>
      <div className="founders-container">
        <div className="founders">
          {/* <div className="founders-image-container">
            <img src="assets/images/founders.jpg" alt="" className="founders-image" />
          </div> */}
          <div className="founders-content">
            <h4 className="founders-name">Mr Stelios</h4>
            <p className="founders-description">Stelios has 10 years of experience in the Limassol Transport Department.</p>
            <p className="founders-description">He worked as a technician and examiner from 2008 to 2018. After that, he decided to start his own driving school in 2018. Since then, he has taught thousands of drivers and improved their driving skills.</p>
          </div>
        </div>
        <div className="founders">
          {/* <div className="founders-image-container">
            <img src="assets/images/founders.jpg" alt="" className="founders-image" />
          </div> */}
          <div className="founders-content">
            <h4 className="founders-name">Mrs Stelios</h4>
            <p className="founders-description">Mrs Stelios works alongside her husband.</p>
            <p className="founders-description">She specializes in road signs and road safety.</p>
            <p className="founders-description">She is a very patient and calm instructor. She loves her job and takes pride in providing driving lessons to ensure all her students pass with the highest standards.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
