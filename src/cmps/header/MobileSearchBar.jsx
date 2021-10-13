import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { SearchMini } from '../svgs/SearchMini'
import { utilService } from '../../services/util.service'
import { onSetOrder } from '../../store/order.action';
import { LocationPicking } from './LocationPicking.jsx'


class _MobileSearchBar extends Component {
    state = {
        criteria: {
            address: '',
            checkIn: '',
            checkOut: '',
            guests: {
                adult: 0,
                child: 0,
                infant: 0
            },
        },
        isSearchClicked: false,
        isPickingGuests: false,
        isPickingDates: false,
        isPickingLocation: false,
        isInsideHeader: true,
        dateFormat: null,
        tempName: false
    }

    inputRef = React.createRef(null)

    componentDidMount() {
        window.addEventListener('click', this.closeInputs)
        if (this.props.history.location.pathname === '/') {
            this.props.onSetOrder(null)
        }
    }
    componentWillUnmount() {
        window.removeEventListener('click', this.closeInputs)
    }

    closeInputs = () => {
        this.setState({ isSearchClicked: false })
    }

    onImgClick = () => {
    }
    onSearchBarClicked = (ev) => {
        ev.stopPropagation()
        this.setState({ isSearchClicked: true })
    }

    onLocationClick = async (order) => {
        const queryString = utilService.makeQueryParams(order)
        await this.props.onSetOrder(order)
        this.props.history.push(`/stay?${queryString}`)
    }
    handleChange = (ev) => {
        const { criteria } = this.state
        const field = ev.target.name
        const value = ev.target.value
        this.setState({ criteria: { ...criteria, [field]: value } })
    }

    render() {
        const { isSearchClicked } = this.state
        const { screenWidth } = this.props
        return (
            <header className="main-container-home">

                {/* {isSearchClicked && <div className="screen"></div>} */}
                <div className={`mobile-header-container pointer`} onClick={this.onSearchBarClicked}>
                    <div className="mobile-search-bar relative ">
                        <div className="flex align-center space-between">
                            {isSearchClicked &&
                                <form action="" className="mobile-search">
                                    <input ref={this.inputRef} className="input-container" type="text" placeholder="Where are you going?" name="address" autoComplete="off" onChange={this.handleChange} />
                                </form>}
                            {!isSearchClicked && <span className="fs14 fh18 medium fw-unset">Start your search</span>}
                            <button className="search-bar-submit-mini flex ">{<SearchMini />}</button>
                        </div>

                    </div>
                </div >
                {isSearchClicked &&
                    <div className="picking-location-container">
                        <LocationPicking screenWidth={screenWidth} onImgClick={this.onLocationClick} links={utilService.HomePageImgPopular()} />
                    </div>
                }
            </header >
        )
    }
}
function mapStateToProps(state) {
    return state
}
const mapDispatchToProps = {
    onSetOrder

}

export const MobileSearchBar = connect(mapStateToProps, mapDispatchToProps)(withRouter(_MobileSearchBar))




