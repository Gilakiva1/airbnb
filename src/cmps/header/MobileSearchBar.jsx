import React, { Component } from 'react'
import { SearchMini } from '../svgs/SearchMini'
import { utilService } from '../../services/util.service'
import { LocationPicking } from './LocationPicking.jsx'


export class MobileSearchBar extends Component {
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
        isPickingGuests: false,
        isPickingDates: false,
        isPickingLocation: false,
        isInsideHeader: true,
        dateFormat: null,
        tempName: false
    }
    onSearchBarClicked = () => {
        this.setState({ isPickingLocation: true })


    }

    render() {
        const { isPickingGuests, isPickingDates, isPickingLocation, criteria } = this.state
        return (
            <header className="main-container-home">
                <div className={`mobile-header-container pointer`} onClick={this.onSearchBarClicked}>
                    <div className="mobile-search-bar ">
                        <div className="flex align-center space-between">
                            <span className="fs14 fh18 medium fw-unset">Start your search</span>
                            <button className="search-bar-submit-mini flex ">{<SearchMini />}</button>
                        </div>
                    </div>
                </div>
                <div className={isPickingLocation ? "picking-location-container" : "none"}> {isPickingLocation && <LocationPicking onImgClick={this.onLocationClick} links={utilService.HomePageImgPopular()} />} </div>
            </header>
        )
    }
}

