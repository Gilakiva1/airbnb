import React from 'react'
import { connect } from 'react-redux'
import { StayPreview } from '../cmps/StayPreview.jsx'
import { StayFilter } from '../cmps/StayFilter.jsx'
import { loadStays } from '../store/stay.action.js'
import { utilService } from '../services/util.service.js'
import { onSetOrder } from '../store/order.action.js'
class _StayList extends React.Component {
    state = {
        orderParams: null,
        filterBy: {
            price: {
                minPrice: -Infinity,
                maxPrice: Infinity
            },
            propertyTypes: [],
            amenities: []
        },  
        isOpenFilter: false

    }

    async componentDidMount() {
        const searchParams = new URLSearchParams(this.props.location.search);
        const getParms = utilService.getQueryParams(searchParams)
        await this.props.loadStays(getParms)
        
        await this.props.onSetOrder(null)
        this.setState({ orderParams: getParms })
    }

    setCheckedPropertyType = (propertyTypes, property) => {
        let key = property === 'types' ? 'propertyTypes' : property
        this.setState({ filterBy: { ...this.state.filterBy, [key]: propertyTypes } }, () => {
        })
    }

    onSavePrice = (price) => {
        const filterPrice = {
            maxPrice: price[1],
            minPrice: price[0],
        }
        this.setState(({ filterBy: { ...this.state.filterBy, price: filterPrice } }))

    }

    minPrice = () => {
        const { minPrice, maxPrice } = this.state.filterBy.price
        if (minPrice === -Infinity && (maxPrice === Infinity || maxPrice === 500)) {
            return `Price`
        } else if ((maxPrice === Infinity || maxPrice === 500) && minPrice !== -Infinity) {
            return `$${minPrice}+`
        }
        else if (minPrice === -Infinity && maxPrice < 500) {
            return `Up to $${maxPrice}`
        }
        else if (maxPrice < 500 && minPrice !== -Infinity) {
            return `$${minPrice} - $${maxPrice}`
        }
    }
    checkAmenities = (amenities, stayAmenities) => {
        let newStayAmenities = stayAmenities.map(amenitie => amenitie[0].toUpperCase() + amenitie.substring(1))
        for (let amenitie of amenities) {
            amenitie = amenitie[0].toUpperCase() + amenitie.substring(1)
            if (!newStayAmenities.includes(amenitie)) return false
        }
        return true
    }
    getStaysForDisplay = () => {
        let { stays } = this.props
        const { propertyTypes, price, amenities } = this.state.filterBy
        stays = stays.filter(stay => {
            const type = stay.type[0].toUpperCase() + stay.type.substring(1)
            return propertyTypes.length ? propertyTypes.includes(type) : true &&
                amenities.length ? this.checkAmenities(amenities, stay.amenities) : true &&
                (stay.price >= price.minPrice) &&
            (stay.price <= price.maxPrice)
        })
        return stays
    }

    render() {
        const stays = this.getStaysForDisplay() 
        const { orderParams } = this.state
        if (!orderParams) return <div>loading...</div>
        return (
            <>

                <h1 className="count-stays airbnb-book fs14 fh18 fw-unset">{stays.length} stays </h1>
                <h1 className="city-name">Stays in {orderParams.address}</h1>
                <div className="list-filter">
                    <StayFilter stays={stays} minPrice={this.minPrice}
                        setCheckedPropertyType={this.setCheckedPropertyType}
                        onSavePrice={this.onSavePrice}
                        removePropertyType={this.removePropertyType} />
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
    loadStays,
    onSetOrder
}
export const StayList = connect(mapStateToProps, mapDispatchToProps)(_StayList)