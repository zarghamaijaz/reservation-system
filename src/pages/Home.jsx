import React from "react";
import { Link } from "react-router";

const Home = () => {
  return (
    <div className="medium-container">
      <div className="flex flex-col h-screen w-screen p-4">
        <header className="home-header">
          <div className="home-header-logo-container">
            <h2 className="logo-text">Stelios Driving School</h2>
          </div>
          <div className="home-header-buttons">
            <Link to="/login-types" className="button button-primary">
              Login
            </Link>
          </div>
        </header>
        <div className="main-content">
          <div className="card">
            <h2 className="card-title">About Stelios</h2>
            <p className="description">
              Stelios has 10 years previous experience working for the Limassol
              Transport Department as a technician and examiner. His experience
              in the Transport Department raised his awareness of areas that
              could be improved and he felt he wanted to do more to help
              increase driving standards in the area that's why he started his own driving school in 2018.
            </p>
            <p className="description">
              Many new drivers do not feel confident which can affect their
              ability to drive safely. Stelios felt that by using his previous
              experience and becoming a qualified driving instructor he could
              make a positive change towards improving road safety in Limassol.
            </p>
            <p className="description">
              Stelios is a very patient and calm instructor. He loves his job
              and takes pride in providing driving lessons to ensure all his
              students pass with the highest standards.
            </p>
            <h2 className="card-title">Want to book a lesson?</h2>
            <p className="description">Please feel free to give us a call to ask any questions or book a lesson.</p>
            <h2 className="card-title">Our location</h2>
            <p className="description">Stelios Stylianou Driving School, located on Epidamou 2 , 3070 in Limassol Cyprus, is a premier driving institution dedicated to fostering safe and responsible driving skills. Currently operational, the school has earned an impressive average rating highlighting its commitment to excellence and student satisfaction.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
