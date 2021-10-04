import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { AirbnbSlider, AirbnbThumbComponent } from './AirbnbSlider'

const minDistance = 20;

export default function PriceFilter(props) {

  const [price, setPrice] = React.useState([0, 100]);
  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) return;
    if (activeThumb === 0) {
      setPrice([Math.min(newValue[0], price[1] - minDistance), price[1]]);
    } else {
      setPrice([price[0], Math.max(newValue[1], price[0] + minDistance)]);
    }
  };

  const handleInputChange = () => {

  }

  const preventPropagation = event => {
    event.stopPropagation()
  }

  return (
    <div className="price-filter" onClick={preventPropagation}>
      <Box sx={{ m: 3 }} />
      <Typography gutterBottom>Airbnb</Typography>
      <AirbnbSlider
        components={{ Thumb: AirbnbThumbComponent }}
        getAriaLabel={(index) => (index === 0 ? 'Minimum price' : 'Maximum price')}
        defaultValue={[20, 40]}
        value={price}
        onChange={handleChange}
        valueLabelDisplay="auto"
        min={0}
        max={500}
        disableSwap
      />
      <div className="inputs-price flex gap10">
        <label className='pointer'>
          <div className="price-input round-edge">
            <span className="fs10 book clr1">min price</span>
            <input className=" pointer fs16 book clr2" name="min-price" type="text" onChange={handleChange} value={price[0]} />
          </div>
        </label>
        <label className='pointer'>
          <div className="price-input round-edge">
            <span className="fs10 book clr1">max price</span>
            <input className="pointer fs16 book clr2" name="max-price" type="text" onChange={handleChange} value={price[1]} />
          </div>
        </label>
      </div>
      <div className="btn-price">
      </div>
      <div className=" btn-save flex white space-between">
        <button onClick={() => { props.onSavePrice([0, 500]) }}>Clear</button>
        <button onClick={() => { props.onSavePrice(price) }}>Save</button>
      </div>
    </div >
  );
}
