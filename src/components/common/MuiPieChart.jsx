import React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { Box, Typography } from '@mui/material';


const SlicColors = ['#00E0BC', '#FF73B6']; 

const MuiPieChart = ({ percentage, label, value }) => {
  const remaining = 100 - percentage;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: percentage, label: 'Correct' },
              { id: 1, value: remaining, label: 'Incorrect' },
            ],
            innerRadius: 40,
            outerRadius: 60,
            paddingAngle: 2,
            cornerRadius: 5,
          },
        ]}
        colors={SlicColors}
        width={150}
        height={150}

        legend={{ hidden: true }}
      >
        <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fontSize="18px" fontWeight="bold">
          {`${percentage}%`}
        </text>
      </PieChart>
      <Typography variant="body1" component="span" fontWeight="600" mt={1}>
        {label}
      </Typography>
      <Typography variant="body2" component="span" color="text.secondary">
        {value}
      </Typography>
    </Box>
  );
};

export default MuiPieChart;