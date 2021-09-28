import React from 'react'
import { connect } from 'react-redux'
import { StayPreview } from '../cmps/StayPreview.jsx'
import { withRouter } from 'react-router'
import { StayFilter } from '../cmps/StayFilter.jsx'
import { loadStays } from '../store/stay.action.js'
const queryString = require('query-string');

class _StayList extends React.Component {
    state = {}
    componentDidMount() {
        let params1 = queryString.parse(this.props.location.search)
        console.log(params1);
        const params = new URLSearchParams(this.props.location)
        console.log('params :',params);
        const city = new URLSearchParams(this.props.location.search).get("city")
        console.log('city :',city);
        // const queryString = location.search;
        // const urlParams = new URLSearchParams(queryString);
        // const page_type = urlParams.get('city')
        // console.log('city', page_type);
        this.props.loadStays()
    }

    render() {

        const { stays } = this.props
        if (!stays) return <div>loading...</div>

        return (

            <div className="stay-list full">
                <StayFilter />
                {stays.map((stay, idx) => <StayPreview key={stay._id} stay={stay} />)}
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