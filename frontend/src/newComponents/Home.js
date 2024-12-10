import React from "react";
import BannerBackground from "../Assets/home.webp";
import BannerImage from "../Assets/home.webp";
import Navbar from "./Navbar";
import { FiArrowRight } from "react-icons/fi";
import styles from './LandingPage.module.css';

const Home = () => {
  return (
    <div className={styles['home-container']}>
      <Navbar />
      <div className={styles['home-banner-container']}>
        <div className={styles['home-text-section']}>
          <h1 className={styles['primary-heading']}>
            Transparency for All<br></br> is what we believe in!
          </h1>
          <p className={styles['primary-text']}>
            Introducing a revolutionary system that transforms the way we approach organ donation.
            Here the journey to saving a life becomes personal and meaningful. With this platform, you can
            directly connect with donors, ensuring a smoother and <b>more transparent process</b>.
            <b>Your life, your choices</b>, your chance at a <b>brighter future</b>. Together,
            let's make <b>every heartbeat count. ❤️</b>
          </p>
          <button className={styles['secondary-button']}>
            Login <FiArrowRight />{" "}
          </button>
        </div>
        <div className={styles['home-image-section']}>
          <img src={BannerImage} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Home;
