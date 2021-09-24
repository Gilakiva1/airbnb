// import noUiSlider from 'nouislider';
import { connect } from 'react-redux'
// import Nouislider from "nouislider-react";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import {Component} from 'react'
class _StayFilter extends Component{

    state = {
        price:{
            minPrice:'',
            maxPrice:''
        }
    }
 
    

    render(){

        return(
            <Box sx={{ width: 300 }}>
            <Slider
              getAriaLabel={() => 'Minimum distance'}
              value={value1}
              onChange={handleChange1}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
              disableSwap
            />
            <Slider
              getAriaLabel={() => 'Minimum distance shift'}
              value={value2}
              onChange={handleChange2}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
              disableSwap
            />
          </Box>
        )
            
        
    }
}




function mapStateToProps(state) {
    return {
        stays: state.stayReducer.stays,
    }
}
const mapDispatchToProps = {
    
}


export const StayFilter = connect(mapStateToProps)(_StayFilter)