import React from "react";
import { connect } from 'react-redux'
import { withRouter } from "react-router";

class _StayPreview extends React.Component {
    render() {
        const { stay, location } = this.props
        if (!stay) return 'loading'
        console.log('Stay :', stay);
        if (location.pathname === '/stay') {
            return (
                <section className="stay-container">
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
                </section>
            )
        } else {
            return <section className="stay-container">
                <div className="primary-image">
                    <img src={stay.imgUrls[0]} />
                </div>
            </section>
        }

    }
}

function mapStateToProps(state) {
    return {

    }
}
const mapDispatchToProps = {

}

export const StayPreview = connect(mapStateToProps)(withRouter(_StayPreview))
