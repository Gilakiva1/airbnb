import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const minDistance = 20;

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

  const minPrice = () => {
    const { stays } = props
    const minPrice = Math.min.apply(null, stays.map(stay => {
      return stay.price;
    }))
    return minPrice

  }
  const maxPrice = () => {
    const { stays } = props
    const maxPrice = Math.max.apply(null, stays.map(stay => {
      return stay.price;
    }));
    return maxPrice

  }


  const preventPropagation = event => {
    event.stopPropagation()
  }

  return (
    <div onClick={preventPropagation}>
      <Box sx={{ width: 300 }}>
        <Slider
          getAriaLabel={() => 'Minimum distance'}
          value={price}
          onChange={handleChange1}
          valueLabelDisplay="auto"
          min={minPrice()}
          max={maxPrice()}
          disableSwap
        />
        <div className="flex space-between">
          <button onClick={() => { props.onSavePrice([0, 500]) }}>Clear</button>
          <button onClick={() => { props.onSavePrice(price) }}>Save</button>
        </div>
      </Box>
    </div>
  );
}