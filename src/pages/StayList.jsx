import React from 'react'
import { connect } from 'react-redux'
import { StayPreview } from '../cmps/StayPreview.jsx'
import { withRouter } from 'react-router'
import { StayFilter } from '../cmps/StayFilter.jsx'
import { loadStays } from '../store/stay.action.js'
// import MinimumDistanceSlider from '../cmps/try.jsx'
class _StayList extends React.Component {

    state = {}

    componentDidMount() {
        this.loadStay()
    }

    loadStay() {
        this.props.loadStays()
    }

    render() {
        const { stays, location } = this.props
        if (!stays) return <h1>loading</h1>

        return (
            <section className='stay-list'>

                {stays.map((stay, idx) => <StayPreview key={stay._id} stay={stay} location={location} idx={idx} />)}
                {/* <MinimumDistanceSlider /> */}
            </section>

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


export const StayList = connect(mapStateToProps, mapDispatchToProps)(withRouter(_StayList))