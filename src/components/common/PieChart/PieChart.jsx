import React from 'react';
import styles from './PieChart.module.css';

const PieChart = ({ percentage, label, value }) => {
  // This style object passes the percentage as a CSS variable named '--p'
  // This is a clean way to let CSS handle the drawing.
  const chartStyle = {
    '--p': `${percentage}%`
  };

  return (
    <div className={styles.chartContainer}>
      {/* The style is applied here */}
      <div className={styles.chart} style={chartStyle}></div>
      
      {/* The labels are still rendered as normal */}
      <div className={styles.labels}>
        <span className={styles.label}>{label}</span>
        <span className={styles.value}>{value}</span>
      </div>
    </div>
  );
};

export default PieChart;