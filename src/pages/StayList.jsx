import React from 'react'
import { connect } from 'react-redux'
import { StayPreview } from '../cmps/StayPreview.jsx'
import { withRouter } from 'react-router'
import { StayFilter } from '../cmps/StayFilter.jsx'
import { loadStays } from '../store/stay.action.js'
const queryString = require('query-string');

class _StayList extends React.Component {
    state = {
    }

    componentDidMount() {
        const params = queryString.parse(this.props.location.search)
        console.log('params', params);
        console.log('this.props', this.props.location.search);
        // const params = new URLSearchParams(this.props.location)
        // const city = new URLSearchParams(this.props.location.search).get("city")
        this.props.loadStays(params)
    }

    render() {

        const { stays } = this.props
        if (!stays.length) return <div>loading...</div>

        return (
            <>
                <StayFilter />
                <div className="stay-list">
                    {stays.map((stay, idx) => <StayPreview key={stay._id} stay={stay} />)}
                </div>
            </>
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