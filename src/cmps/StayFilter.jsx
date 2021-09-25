import { connect } from 'react-redux'
import Nouislider from "nouislider-react";
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
            <div>
            <label htmlFor="price">Price</label>
            <input type="range" id="price"></input>
            </div>
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