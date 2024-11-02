import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn, faWhatsapp } from '@fortawesome/free-brands-svg-icons'; // استيراد الأيقونات

import './FooterApp.css'; 
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="custom-footer">
      <div className="footer-container">
        <div className="footer-row">
          <div className="footer-about">
            <h5>About Us</h5>
            <p>
              We are a leading e-commerce platform providing the best products at the best prices. Our commitment is to deliver quality and value to our customers.
            </p>
          </div>
          <div className="footer-links">
            <h5>Quick Links</h5>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/checkout">Shop Card</Link></li>
              <li><Link to="/login">Contact Us</Link></li>
              <li><Link to="/return_policy">FAQs</Link></li>
            </ul>
          </div>
          <div className="footer-social">
            <h5>Follow Us</h5>
            <ul className="social-links">
              <li><a href="https://www.facebook.com/omar.mohamed.24"><FontAwesomeIcon icon={faFacebookF} /></a></li>
              <li><a href="#"><FontAwesomeIcon icon={faTwitter} /></a></li>
              <li><a href="https://www.instagram.com/0mar_m_0sman?igsh=MTh2cDlhbDhlYmxrdw=="><FontAwesomeIcon icon={faInstagram} /></a></li>
              <li><a href="https://www.linkedin.com/in/omar-m-osman-075678289/"><FontAwesomeIcon icon={faLinkedinIn} /></a></li>
              <li><a href="https://wa.me/201024456408"><FontAwesomeIcon icon={faWhatsapp} /></a></li>
            </ul>
          </div>
          <div className="footer-contact">
            <h5>Contact Info</h5>
            <p>Alexandria City, EGY</p>
            <p>Email: <a href="mailto:omar.mohamed11221@gmail.com">omar.mohamed11221@gmail.com</a></p>
            <p>Phone: <a href="tel:+1024456408">+20 1024456408</a></p>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} E-Commerce Website. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
