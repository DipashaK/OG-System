import React from "react";
import PickMeals from "../Assets/pick-meals-image.png";
import ChooseMeals from "../Assets/choose-image.png";
import DeliveryMeals from "../Assets/delivery-image.png";
import styles from './LandingPage.module.css'; // Make sure you import the CSS module

const Work = () => {
  const workInfoData = [
    {
      image: PickMeals,
      title: "No scam!",
      text: "Don't worry about being scammed by someone. Our AI checks on everyone beforehand.",
    },
    {
      image: ChooseMeals,
      title: "Donation ",
      text: "Need financial help? Don't worry. Our donations got you covered!",
    },
    {
      image: DeliveryMeals,
      title: "Contact Your donor!",
      text: "Contact your donor via chat feature.",
    },
  ];

  return (
    <div className={styles['work-section-wrapper']}>
      <div className={styles['work-section-top']}>
        <p className={styles['primary-subheading']}>Work</p>
        <h1 className={styles['primary-heading']}>How It Works</h1>
        <p className={styles['primary-text']}>
          Contact our donors or recipients. Login / sign up to continue.
        </p>
      </div>
      <div className={styles['work-section-bottom']}>
        {workInfoData.map((data) => (
          <div className={styles['work-section-info']} key={data.title}>
            <div className={styles['info-boxes-img-container']}>
              <img src={data.image} alt={data.title} />
            </div>
            <h2>{data.title}</h2>
            <p>{data.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;
