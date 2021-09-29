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
        const searchParams = new URLSearchParams(this.props.location.search);
        let newParams = { guests: {} }

        for (let [key, value] of searchParams) {
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

        if (!stays.length) return <div>loading...</div>

        return (
            <>
                <StayFilter />
                <div className="stay-list">
                    {stays.map((stay, idx) => <StayPreview key={stay._id} stay={stay}/>)}
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