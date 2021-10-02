import React from 'react'
import { connect } from 'react-redux'
import { StayPreview } from '../cmps/StayPreview.jsx'
import { StayFilter } from '../cmps/StayFilter.jsx'
import { loadStays } from '../store/stay.action.js'
import { utilService } from '../services/util.service.js'
class _StayList extends React.Component {
    state = {
        orderParams: null
    }

    async componentDidMount() {
        const searchParams = new URLSearchParams(this.props.location.search);
        const getParms = utilService.getQueryParams(searchParams)
        await this.props.loadStays(getParms)
        this.setState({ orderParams: getParms })
    }

    render() {
        const { stays } = this.props
        const { orderParams } = this.state

        if (!orderParams) return <div>loading...</div>
        return (
            <>
                <h1 className="count-stays airbnb-book fs14 fh18 fw-unset">{stays.length} stays </h1>
                <h1 className="city-name">Stays in {orderParams.address}</h1>
                <div className="list-filter">
                    <StayFilter />
                </div>
                <div className="stay-list">
                    {stays.map((stay, idx) => <StayPreview key={stay._id} stay={stay} orderParams={orderParams} />)}
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