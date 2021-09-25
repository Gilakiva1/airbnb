import React from 'react'
import { connect } from 'react-redux'
import { StayPreview } from '../cmps/StayPreview.jsx'
import { withRouter } from 'react-router'

import { loadStays } from '../store/stay.action.js'
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


        return (
            <section className={`stay-list ${location.pathname === '/' ? 'home' : ''}`}>
                {stays.map((stay, idx) => <StayPreview key={idx} stay={stay} />)}
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