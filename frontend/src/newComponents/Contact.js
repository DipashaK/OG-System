import React from "react";
import styles from './LandingPage.module.css';

const Contact = () => {
  return (
    <div className={styles['contact-page-wrapper']}>
      <h1 className={styles['primary-heading']}>Have Question In Mind?</h1>
      <h1 className={styles['primary-heading']}>Let Us Help You</h1>
      <div className={styles['contact-form-container']}>
        <input type="text" placeholder="yourmail@gmail.com" />
        <button className={styles['secondary-button']}>Submit</button>
      </div>
    </div>
  );
};

export default Contact;
