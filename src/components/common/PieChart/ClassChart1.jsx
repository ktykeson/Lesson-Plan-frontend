import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ClassChart1 = ({ data }) => {
  const {
    greenCount,
    yellowCount,
    redCount,
    averageGrade,
    fullCompletionCount,
    aboveHalfCompletionCount,
    belowHalfCompletionCount
  } = data;

  const pieData = {
    labels: ['Groter dan 7', '5.5 – 7.0', 'Kleiner dan 5.5'],
    datasets: [
      {
        data: [greenCount, yellowCount, redCount],
        backgroundColor: ['#4CAF50', '#FFEB3B', '#F44336'],
        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {
    responsive: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontFamily: 'sans-serif',
      fontSize: '12px',
      maxWidth: '600px',
      margin: '0 auto',
    },
    contentRow: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      gap: '24px',
      width: '100%',
    },
    title: {
      fontSize: '14px',
      fontWeight: 'bold',
      marginBottom: '10px',
    },
    chartColumn: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    infoColumn: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      fontSize: '12px',
      minWidth: '130px',
    },
    legendItem: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '6px',
    },
    colorBox: (color) => ({
      width: '12px',
      height: '12px',
      backgroundColor: color,
      marginRight: '6px',
      border: '1px solid #888',
    }),
    avgGradeBox: {
      marginTop: '12px',
      marginBottom: '8px',
      width: '100%',
    },
    avgGradeTitle: {
      fontSize: '11px',
      color: '#555',
    },
    avgGradeValue: {
      fontSize: '24px',
      fontWeight: 'bold',
    },
    tableWrapper: {
      marginTop: '16px',
      fontSize: '12px',
      width: '100%',
      minWidth: '140px',
    },
    tableTitleRow: {
      display: 'grid',
      gridTemplateColumns: '1fr auto',
      columnGap: '12px',
      alignItems: 'center',
      fontWeight: 'bold',
      fontSize: '11px',
      marginBottom: '6px',
      color: '#555',
    },
    tableGrid: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
    },
    tableRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    tableLabel: {
      fontSize: '12px',
      color: '#333',
    },
    button: {
      fontSize: '12px',
      padding: '4px 10px',
      borderRadius: '6px',
      backgroundColor: '#f0f0f0',
      border: '1px solid #ccc',
      cursor: 'pointer',
      fontWeight: 'bold',
    },
    separator: {
      marginTop: '20px',
      borderTop: '1px solid #ccc',
      width: '100%',
    }
  };

  return (
    <div style={styles.container}>

      <div style={styles.contentRow}>
        {/* Pie Chart Column */}
        <div style={styles.chartColumn}>
          <div style={styles.title}>Titel</div>
          <Pie data={pieData} options={pieOptions} width={200} height={200} />
        </div>

        {/* Info Column */}
        <div style={styles.infoColumn}>
          {/* Legend */}
          <div style={styles.legendItem}>
            <div style={styles.colorBox('#4CAF50')} />
            <span>Groter dan 7</span>
          </div>
          <div style={styles.legendItem}>
            <div style={styles.colorBox('#FFEB3B')} />
            <span>5.5 – 7.0</span>
          </div>
          <div style={styles.legendItem}>
            <div style={styles.colorBox('#F44336')} />
            <span>Kleiner dan 5.5</span>
          </div>

          {/* Average Grade */}
          <div style={styles.avgGradeBox}>
            <div style={styles.avgGradeTitle}>Gem. cijfer</div>
            <div style={styles.avgGradeValue}>{averageGrade}</div>
          </div>

          {/* Completion Table */}
          <div style={styles.tableWrapper}>
            <div style={styles.tableTitleRow}>
              <span>Gemaakt</span>
              <span>Aantal studenten</span>
            </div>
            <div style={styles.tableGrid}>
              <div style={styles.tableRow}>
                <span style={styles.tableLabel}>100%</span>
                <button style={styles.button}>{fullCompletionCount}</button>
              </div>
              <div style={styles.tableRow}>
                <span style={styles.tableLabel}>&gt;50%</span>
                <button style={styles.button}>{aboveHalfCompletionCount}</button>
              </div>
              <div style={styles.tableRow}>
                <span style={styles.tableLabel}>&lt;50%</span>
                <button style={styles.button}>{belowHalfCompletionCount}</button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ClassChart1;
