import React from "react";
import AboutImageBackground from "../Assets/home.webp";
import styles from './LandingPage.module.css';

const About = () => {
  return (
    <div className={styles['about-section-container']}>
      <div className={styles['about-section-image-container']}>
        <img src={AboutImageBackground} alt="" />
      </div>
      <div className={styles['about-section-text-container']}>
        <p className={styles['primary-subheading']}>About</p>
        <h1 className={styles['primary-heading']}>
          Why choose KAROGYA??
        </h1>
        <p className={styles['primary-text']}>
          Inspired by the <b>legendary Daanveer Karn</b>, we believe in bringing fairness and
          transparency to every aspect of life. 💛 Why should clarity be reserved for a few,
          while something as crucial as your <b>health</b> is overlooked? It’s time to change
          that. Introducing <b>KAROGYA</b>, a revolutionary platform designed to bring{' '}
          <b>complete transparency right to your doorstep</b>.{' '}
        </p>
        <p className={styles['primary-text']}>
          <b>
            🌟 Don’t gamble with your life through ignorance—choose KAROGYA to truly understand
            your donor and your receiver. But that's not all!
          </b>
        </p>

        <div className={styles['about-buttons-container']}>
          <button className={styles['secondary-button']}>Learn More</button>
        </div>
      </div>
    </div>
  );
};

export default About;
