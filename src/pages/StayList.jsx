import React from 'react'
import { connect } from 'react-redux'
import { StayPreview } from '../cmps/StayPreview.jsx'
import { StayFilter } from '../cmps/StayFilter.jsx'
import { loadStays } from '../store/stay.action.js'
import { utilService } from '../services/util.service.js'

class _StayList extends React.Component {
    state = {
        params: null
    }

    async componentDidMount() {
        // window.scrollTo(0, 0);
        // window.top.location.reload();
        // window.parent.location = 0;
        // window.opener.top.location.reload();
        window.page = 0

        const searchParams = new URLSearchParams(this.props.location.search);
        let newParams = {}
        for (let [key, value] of searchParams) {
            if (key === 'adult') {
                newParams.guests = {}
            }
            if (key === 'adult' || key === 'child' || key === 'infant') {
                newParams.guests[key] = +value
            } else {
                newParams[key] = value
            }
        }
        await this.props.loadStays(newParams)
        this.setState({ params: utilService.makeQueryParams(newParams) })
    }

    render() {
        const { stays } = this.props
        const { params } = this.state
        var city = ''
        if (params) {
            city = params.split('=')[1];
        }

        if (!stays.length) return <div>loading...</div>
        return (
            <>
                <h1 className="count-stays airbnb-book fs14 fh18 fw-unset">{stays.length} stays </h1>
                <h1 className="city-name">Stays in {city}</h1>
                <div className="list-filter">
                    <StayFilter />
                </div>
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