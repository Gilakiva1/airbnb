import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const minDistance = 35;

export default function PriceFilter(props) {
  const [price, setPrice] = React.useState([0, 100]);
  const handleChange1 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) return;
    if (activeThumb === 0) {
      setPrice([Math.min(newValue[0], price[1] - minDistance), price[1]]);
    } else {
      setPrice([price[0], Math.max(newValue[1], price[0] + minDistance)]);
    }
  };

 
  return (
    <Box sx={{ width: 300 }}>
      <Slider
        getAriaLabel={() => 'Minimum distance'}
        value={price}
        onChange={handleChange1}
        valueLabelDisplay="auto"
        min={0}
        max={500}
        disableSwap
      />
      <button onClick={()=>{props.onSavePrice(price)}}>Save</button>
    </Box>
  );
}