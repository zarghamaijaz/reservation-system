import React from "react";
import HomeHeader from "../components/HomeHeader";
import { IoBookOutline, IoCarSportOutline  } from "react-icons/io5";
import { BsSignpost2, BsTelephone } from "react-icons/bs";
import { PiGraduationCapLight } from "react-icons/pi";
import HomeFooter from "../components/HomeFooter";
import { SlLocationPin } from "react-icons/sl";
import { Link } from "react-router";
import { FaFacebookSquare, FaInstagramSquare, FaViber, FaWhatsapp } from "react-icons/fa";
import ImageGallery from "../components/ImageGallery";
import { AiFillTikTok } from "react-icons/ai";

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
            <p className="process-description">Now it is time to learn how to drive and level up your driving skills.</p>
          </div>
          <div className="process-item">
            <div className="process-icon">
              <PiGraduationCapLight />
            </div>
            <h4 className="process-number">4</h4>
            <h3 className="process-title">Pass the driving test</h3>
            <p className="process-description">After finishing your lessons you will be able to pass the driving test with ease.</p>
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
              <Link to="/login" className="cta-button">Book a lesson</Link>
              {/* <a href="#" className="cta-button outlined">Already booked</a> */}
            </div>
          </div>
        </div>
        <div className="content-right">
          <img src="assets/images/learn-driving.jpg" alt="" className="content-image" />
        </div>
      </div>
      <div className="text-center mt-huge">
        <h2 className="secondary-title">Meet the founder</h2>
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
            <Link className="link link-primary" to="/about">Continue reading</Link>
          </div>
        </div>
        {/* Only need to display one founder */}
        {/* <div className="founders">
          <div className="founders-image-container">
            <img src="assets/images/founders.jpg" alt="" className="founders-image" />
          </div>
          <div className="founders-content">
            <h4 className="founders-name">Mrs Stelios</h4>
            <p className="founders-description">Mrs Stelios works alongside her husband.</p>
            <p className="founders-description">She specializes in road signs and road safety.</p>
            <p className="founders-description">She is a very patient and calm instructor. She loves her job and takes pride in providing driving lessons to ensure all her students pass with the highest standards.</p>
          </div>
        </div> */}
      </div>
      <div  id="location" className="text-center mt-huge">
        <h2 className="secondary-title">Our location & contact</h2>
      </div>
      <div className="location-container">
        <div className="location-card">
          <div className="location-icons">
            <div className="location-icon">
              <SlLocationPin/>
            </div>
          </div>
          <h3 className="location-name">Stelios Stylianou Driving School</h3>
          <p className="location-description">Located on Epidamou 2 , 3070 in Limassol Cyprus</p>
          <a href="https://maps.app.goo.gl/ox8i8gFfsKtS4Z5Z8" target="_blank" className="link link-primary mb-8">View on map</a>
          <div className="location-icons">
            <a href="https://wa.me/35797760000" className="location-icon whatsapp">
              <FaWhatsapp/>
            </a>
            <a href="https://msng.link/o?35797760000=vi" className="location-icon viber">
              <FaViber/>
            </a>
          </div>
          <a href="tel:97760000" className="location-description link link-primary">📞 97760000</a>
          <div className="location-icons">
            <a href="https://wa.me/35796131370" className="location-icon whatsapp">
              <FaWhatsapp/>
            </a>
            <a href="https://msng.link/o?35796131370=vi" className="location-icon viber">
              <FaViber/>
            </a>
          </div>
          <a href="tel:96131370" className="location-description link link-primary">📞 96131370</a>
          <div className="location-icons">
            <a href="https://www.facebook.com/share/177u4eVgWP/" className="location-icon facebook">
              <FaFacebookSquare/>
            </a>
            <a href="https://www.instagram.com/steliosdrivigschool?igsh=MWQ2cDMyeGE5ZW9pMw==" className="location-icon instagram">
              <FaInstagramSquare/>
            </a>
            <a href="https://www.tiktok.com/@stelios.driving.s?_t=ZN-8zN0Iah4EgY&_r=1" className="location-icon tiktok">
              <AiFillTikTok/>
            </a>
          </div>
        </div>
      </div>
      <div className="text-center mt-huge">
        <h2 className="secondary-title">Explore our gallery</h2>
      </div>
      <ImageGallery/>
      <HomeFooter/>
    </div>
  );
};

export default Home;
