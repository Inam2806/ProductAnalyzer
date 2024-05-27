// Footer.jsx

import React from 'react';
import './style/Footer.scss'; // Add the appropriate style file
import { Link } from 'react-router-dom';

const Footer = () => {
  const scrollToTop = () => {
  window.scrollTo(0, 0);
  };


  return (
    <footer className="footer_1" >
      <div className="footer-container_1">
       <div className="footer-buttons_1">
  <Link to={`/Contact`} onClick={scrollToTop} rel="noopener noreferrer">
    <button className="black-button_1" >Contact</button>
  </Link>
  <Link to={`/about`}  onClick={scrollToTop} rel="noopener noreferrer">
    <button className="black-button_1" >About</button>
          </Link>
      
</div>
    <div className="social-media_1">
                    <a href="https://www.facebook.com/Inamulhaque2806" target="_blank" rel="noopener noreferrer" style={{ color: 'White' }}><i className="fa fa-facebook"></i></a>
                    <a href="https://www.instagram.com/inam_ul_haque_" target="_blank" rel="noopener noreferrer" style={{ color: 'White' }}><i className="fa fa-instagram"></i></a>
                    <a href="https://twitter.com/Inam2806" target="_blank" rel="noopener noreferrer" style={{ color: 'White' }}><i className="fa fa-twitter"></i></a>
                    <a href="https://www.linkedin.com/in/inamul-haque-3844a81a0/" target="_blank" rel="noopener noreferrer" style={{ color: 'White' }}><i className="fa fa-linkedin"></i></a>
    </div>
  </div>
  <p className="copyright_1">© Copyright 2024 || All Right are Reserved</p>
</footer>
  );
};

export default Footer;
