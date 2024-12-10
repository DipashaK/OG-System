import React from "react";
import ProfilePic from "../Assets/john-doe-image.png";
import { AiFillStar } from "react-icons/ai";
import styles from './LandingPage.module.css';

const Testimonial = () => {
  return (
    <div className={styles['work-section-wrapper']}>
      <div className={styles['work-section-top']}>
        <p className={styles['primary-subheading']}>Testimonial</p>
        <h1 className={styles['primary-heading']}>What They Are Saying</h1>
        <p className={styles['primary-text']}>
          Don't believe such a good thing can exist? Hear from existing users.
        </p>
      </div>
      <div className={styles['testimonial-section-bottom']}>
        <div className={styles['testimonials-stars-container']}>
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
        </div>
        <p>
          Reviews will appear here!
        </p>
        <h2>John Doe</h2>
      </div>
    </div>
  );
};

export default Testimonial;
