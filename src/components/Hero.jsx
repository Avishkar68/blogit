import React from "react";
import "../css/Hero.css";
import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <div className="container">
      <div className="herotext-container">
        <p className="hero-headtext">
          Join a vibrant community
          <br />
          of passionatewriters and thinkers,
          <br />
          where every story finds its audience.
        </p>
        <div className="hero-buttons">
          <Link to="/login"><button className="hero-btn1">Login</button></Link>
          <Link to="/register"><button className="hero-btn2">Create an Account</button></Link>
        </div>
      </div>
      <div className="herographic-container">
        <div className="side-graphic">kay taku</div>
      </div>
    </div>
  );
};

export default Hero;
