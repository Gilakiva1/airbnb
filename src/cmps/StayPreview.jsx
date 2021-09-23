import React from "react";
import { connect } from 'react-redux'

class _StayPreview extends React.Component{
    render(){
        const {stay} = this.props
        console.log('Stay :',stay);
        return(
            <div className="stay-contuiner">
                <div className="primary-image">
                    <img src={stay.imgUrls[0]} />
                </div>
                <div>
                <h1>Entire residentail {stay.type} in {stay.loc.address}</h1>
                <h1>{stay.name}</h1>
                <h2>capacity {stay.capacity}</h2>
                <h1>{stay.loc.address}</h1>
                <h1>Reviews {stay.reviews.length}</h1>
                </div>
            </div>
        )

    }
}

function mapStateToProps(state) {
    return {
        
    }
}
const mapDispatchToProps = {
   
}

export const StayPreview = connect(mapStateToProps)(_StayPreview)
