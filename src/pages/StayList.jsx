import React from 'react'
import { connect } from 'react-redux'
import { StayPreview } from '../cmps/StayPreview.jsx'
import { withRouter } from 'react-router'
import { StayFilter } from '../cmps/StayFilter.jsx'
import { loadStays } from '../store/stay.action.js'
// import quer
const queryString = require('query-string');

class _StayList extends React.Component {
    state = {
        params: null
    }

    componentDidMount() {

        const searchParams = new URLSearchParams(this.props.location.search);

        //Iterate the search parameters.
        console.log('params', searchParams);
        // this.props.loadStays(params)

    }

    render() {

        const { stays } = this.props
        const { params } = this.state

        if (!stays.length) return <div>loading...</div>

        return (
            <>
                <StayFilter />
                <div className="stay-list">
                    {stays.map((stay, idx) => <StayPreview key={stay._id} stay={stay} params={params} />)}
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