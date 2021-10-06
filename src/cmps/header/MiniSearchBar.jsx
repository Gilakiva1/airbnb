import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'


class _MiniSearchBar extends React.Component {

    state = {
        isClicked: false,
    }

    getTotalGuests = () => {
        let { adult, child, infant } = this.props.currOrder.guests
        return adult + child + infant
    }


    onSearchBarClicked = () => {
        this.props.toggleSearchBar('on')
    }

    render() {
        const { animateClassName } = this.props
        // const { order } = this.props.currOrder
        // if (this.props.history.location.pathname === '/stay') return (
        //     <div className="mini-search-bar flex " onClick={this.onSearchBarClicked}>
        //         <span>{order?.adress || 'Location'}</span>
        //         <div className="seperation-line-vertical"></div>
        //         {order?.checkOut && <span>`${order.checkIn} - {order.checkOut}`</span>}
        //         {!order?.checkOut && <span>Add Dates</span>}
        //         <div className="seperation-line-vertical"></div>
        //         {order?.guests && <span>Guests: {this.getTotalGuests()}</span>}
        //         {!order?.guests && <span>Add guests</span>}
        //         <button className="search-bar-submit-mini flex">{<FontAwesomeIcon className='search-icon' icon={faSearch} />}</button>
        //     </div>
        // )
        // else
            return (
                <div className={`mini-search-bar flex space-between ${animateClassName}`} onClick={this.onSearchBarClicked}>
                    <span>Start your search</span>
                    <button className="search-bar-submit-mini flex">{<FontAwesomeIcon className='search-icon' icon={faSearch} />}</button>
                </div>
            )
    }
}

function mapStateToProps(state) {
    return {
        currOrder: state.orderReducer.currOrder

    }
}
const mapDispatchToProps = {

}

export const MiniSearchBar = connect(mapStateToProps, mapDispatchToProps)(withRouter(_MiniSearchBar))