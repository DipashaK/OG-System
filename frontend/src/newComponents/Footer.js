import React from "react";
import Logo from "../Assets/Logo.svg";
import { BsTwitter } from "react-icons/bs";
import { SiLinkedin } from "react-icons/si";
import { BsYoutube } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import styles from './LandingPage.module.css';

const Footer = () => {
  return (
    <div className={styles['footer-wrapper']}>
      <div className={styles['footer-section-one']}>
        <div className={styles['footer-icons']}>
          <BsTwitter />
          <SiLinkedin />
          <BsYoutube />
          <FaFacebookF />
        </div>
      </div>
      <div className={styles['footer-section-two']}>
        <div className={styles['footer-section-columns']}>
          <span>Quality</span>
          <span>Help</span>
          <span>Share</span>
          <span>Testimonials</span>
          <span>Work</span>
        </div>
        <div className={styles['footer-section-columns']}>
          <span>1234567890</span>
          <span>hello@karogya.com</span>
          <span>press@karogya.com</span>
          <span>contact@karogya.com</span>
        </div>
        <div className={styles['footer-section-columns']}>
          <span>Terms & Conditions</span>
          <span>Privacy Policy</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
