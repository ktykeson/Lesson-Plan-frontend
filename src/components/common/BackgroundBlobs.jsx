import React from 'react';
import styles from './BackgroundBlobs.module.css';

const BackgroundBlobs = () => {
  return (
    <div className={styles.blobContainer}>
      <div className={`${styles.blob} ${styles.blob1}`}></div>
      <div className={`${styles.blob} ${styles.blob2}`}></div>
      <div className={`${styles.blob} ${styles.blob3}`}></div>
    </div>
  );
};

export default BackgroundBlobs;