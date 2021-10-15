import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { SearchMini } from '../svgs/SearchMini'
import { utilService } from '../../services/util.service'
import { onSetOrder, onTogglePage } from '../../store/order.action';
import { MobileLocationForm } from '../home-page/MobileLocationForm'
import { MobileDateForm } from '../home-page/MobileDateForm'
import { MobileGuestsForm } from '../home-page/MobileGuestsForm'


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

    onSearchBarClicked = async (ev) => {
        ev.stopPropagation()
        this.props.onTogglePage()
        this.setState({ isPickingLocation: true, isSearchClicked: true }, () => {
            this.inputRef.current.focus()
        })
    }

    onToggleInputs = () => {
        const { isPickingLocation, isPickingDates } = this.state
        if (!isPickingLocation) return
        this.setState({ isPickingDates: true, isPickingLocation: false })
    }

    handleChange = ({ target }) => {
        const { criteria } = this.state
        this.setState({ criteria: { ...criteria, [target.name]: target.value } })
    }

    handlePickingDates = (start, end) => {
        let { criteria } = this.state
        let { checkIn, checkOut } = criteria
        checkIn = start
        if (end) checkOut = end
        this.setState({ criteria: { ...criteria, checkIn, checkOut }, dateFormat: { start, end } })
    }

    handleGuestsChanege = (field, value) => {
        let { criteria } = this.state
        let { guests } = criteria
        this.setState({ criteria: { ...criteria, guests: { ...guests, [field]: value } } })
    }

    onLocationClick = async (order) => {
        const queryString = utilService.makeQueryParams(order)
        await this.props.onSetOrder(order)
        this.props.history.push(`/stay?${queryString}`)
    }
    // handleChange = (ev) => {
    //     const { criteria } = this.state
    //     const field = ev.target.name
    //     const value = ev.target.value
    //     this.setState({ criteria: { ...criteria, [field]: value } })
    // }
    preventPropagation = event => {
        event.stopPropagation()
    }

    onChangeform = (ev, diff) => {
        switch (diff) {
            case 'date': this.setState({ isPickingLocation: false, isPickingDates: true })
                break;
            case 'guest': this.setState({ isPickingDates: false, isPickingGuests: true })
                break;
            case 'order': this.onSubmit()

            default:
                break;
        }
        ev.preventDefault()
        console.log('hi');
    }
    onSubmit = async (ev) => {
        ev.preventDefault()
        const { criteria, dateFormat } = this.state
        if (dateFormat) {
            criteria.checkIn = Date.parse(dateFormat.start)
            criteria.checkOut = Date.parse(dateFormat.end)
        }
        const queryString = utilService.makeQueryParams(criteria)
        await this.props.onSetOrder(criteria)
        this.props.history.push(`/stay?${queryString}`)

    }

    onGoBack = (diff) => {
        switch (diff) {
            case 'home': this.setState({ isPickingLocation: false }, () => { this.props.onTogglePage() })
                break;
            case 'location': this.setState({ isPickingDates: false, isPickingLocation: true })
                break;
            default:
                break;
        }
    }

    render() {
        const { isPickingLocation, isPickingDates, isPickingGuests, isSearchClicked } = this.state
        const { address, checkIn, checkOut } = this.state.criteria
        const { screenWidth } = this.props
        return (
            <header className="main-container-home">

                {!isSearchClicked &&
                    <div className={`mobile-header-container pointer`} onClick={this.onSearchBarClicked}>
                        <div className="mobile-search-bar relative ">
                            <div className="flex align-center space-between">
                                <span className="fs14 fh18 medium fw-unset">Start your search</span>
                                <button className="search-bar-submit-mini flex "><SearchMini /></button>
                            </div>
                        </div>
                    </div >
                }
                <div className={`${isPickingLocation ? 'show' : ''} picking-location-container`} >
                    <MobileLocationForm onChangeForm={this.onChangeform} onImgClick={this.onLocationClick} links={utilService.HomePageImgPopular()} value={address} ref={this.inputRef} onGoBack={this.onGoBack} onChange={this.handleChange} />
                </div>
                <div className={`${isPickingDates ? 'show' : ''} picking-dates-container`} >
                    <MobileDateForm onChangeForm={this.onChangeform} checkIn={checkIn} checkOut={checkOut} onGoBack={this.onGoBack} handlePickingDates={this.handlePickingDates} />
                </div>
                <div className={`${isPickingGuests ? 'show' : ''} picking-guest-container`} >
                    <MobileGuestsForm onChangeForm={this.onChangeform} onGoBack={this.onGoBack} handleGuestsChanege={this.handleGuestsChanege} />
                </div>
            </header >
        )
    }
}
function mapStateToProps({ orderReducer }) {
    return {
        isMobileSearch: orderReducer.isMobileSearch
    }
}
const mapDispatchToProps = {
    onSetOrder,
    onTogglePage

}

export const MobileSearchBar = connect(mapStateToProps, mapDispatchToProps)(withRouter(_MobileSearchBar))




