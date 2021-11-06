import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { SearchMini } from '../svgs/SearchMini'


class _MiniSearchBar extends React.Component {

    state = {
        isClicked: false,
    }

    getTotalGuests = () => {
        const { order } = this.props
        if (!order.guests) return null
        let { adult, child, infant } = order.guests
        if (!(adult + child + infant)) return null
        return adult + child + infant
    }

    getDateValue = (date) => {
        if (new Date(date).toLocaleString('en-IL', { month: 'short', day: 'numeric' }) === 'Invalid Date') return 'Add Dates'
        else return new Date(date).toLocaleString('en-IL', { month: 'short', day: 'numeric' })
    }

    onSearchBarClicked = (ev) => {
        this.props.toggleSearchBar(ev)
    }

    capitalizeFirstLetter = (string) => {
        if (string) return string.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
        return null
    }


    render() {
        const { animateClassName, order, pathname } = this.props
        if (pathname === '/stay' && order) return (
            <div className={`mini-search-bar flex space-between ${animateClassName}`} onClick={this.onSearchBarClicked}>
                <span className="fs14 fh18 medium fw-unset">{this.capitalizeFirstLetter(order.address) || 'Location'}</span>
                <div className="seperation-line-vertical"></div>
                {order.checkOut && <span className="fs14 fh18 medium fw-unset">{this.getDateValue(order.checkIn)} - {this.getDateValue(order.checkOut)}</span>}
                {!order.checkOut && <span className="fs14 fh18 book fw-unset">Add dates</span>}
                <div className="seperation-line-vertical"></div>
                {this.getTotalGuests() && <span className="fs14 fh18 medium fw-unset">Guests: {this.getTotalGuests()}</span>}
                {!this.getTotalGuests() && <span className="fs14 fh18 book fw-unset">Add guests</span>}
            </div>
        )
        else
            return (
                <div className={`mini-search-bar flex space-between ${animateClassName}`} onClick={this.onSearchBarClicked}>
                    <span className="fs14 fh18 medium fw-unset">Start your search</span>
                    <button className="search-bar-submit-mini flex ">{<SearchMini className='icon' />}</button>
                </div>
            )
    }
}

function mapStateToProps(state) {
    return {
        order: state.orderReducer.currOrder

    }
}
const mapDispatchToProps = {

}

export const MiniSearchBar = connect(mapStateToProps, mapDispatchToProps)(withRouter(_MiniSearchBar))