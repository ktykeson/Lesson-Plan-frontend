import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { Box } from '@mui/material';

const MuiBarChart = ({ data }) => {

  const chartData = data.map(item => ({
    label: item.label,
    value: item.value,
    color: item.color, // Keep the color for styling
  }));

  return (
    <Box sx={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
      <BarChart
        // The dataset is the source of our data
        dataset={chartData}
        // The y-axis will be our value, but we don't need to show the axis line/labels
        yAxis={[{
            scaleType: 'band',
            dataKey: 'label',
        }]}
        // The x-axis is our value axis
        xAxis={[{ 
            max: 100, // Set a max of 100 for percentage scores
        }]}
        // The series defines what bars to draw from the dataset
        series={[
          {
            dataKey: 'value',
            label: 'Score', // This label appears on tooltips
            // Use a function to dynamically set the color of each bar
            color: (item) => item.color,
          },
        ]}
        // Use a horizontal layout, which is great for comparing items
        layout="horizontal"
        // Set a height for the chart
        height={150}
        // Clean up the appearance
        grid={{ vertical: true }}
        legend={{ hidden: true }} // Hide the legend
        margin={{ top: 10, bottom: 10, left: 120, right: 20 }} // Adjust margin for labels
      />
    </Box>
  );
};

export default MuiBarChart;