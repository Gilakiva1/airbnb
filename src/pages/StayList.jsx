import React from 'react'
import { connect } from 'react-redux'
import { StayPreview } from '../cmps/StayPreview.jsx'
import {StayFilter} from '../cmps/StayFilter.jsx'
import { loadStays } from '../store/stay.action.js'
import PriceFilter from '../cmps/PriceFilter.jsx'
class _StayList extends React.Component {

    state = {}

    componentDidMount(){
        this.props.loadStays()
    }

  

    render() {
        const { stays } = this.props
        if(!stays) return <div>loading...</div>

        return (
           <div className="stay-list">
               <StayFilter/>
               {stays.map((stay,idx) =><StayPreview key={idx} stay={stay} />)}
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
    loadStays


}


export const StayList = connect(mapStateToProps, mapDispatchToProps)(_StayList)