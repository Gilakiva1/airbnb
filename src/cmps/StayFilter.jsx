import { connect } from 'react-redux'
import { Component } from 'react'
import PriceFilter from './PriceFilter.jsx';
import { onSetFilter } from '../store/stay.action.js'
import { PropertyTypeFilter } from './PropertyTypeFilter.jsx';

class _StayFilter extends Component {

    state = {
        filterBy: {
            price: {
                minPrice: '',
                maxPrice: ''
            },
            propertyTypes: {
                types:[],
                isRemoveType:false
            },
        },
        isPrice: false,
        isPropertyType: false
    }

    componentDidMount() {
        window.addEventListener('click', this.closeFilters)
    }
    setCheckedPropertyType = (type) => {
        var { propertyTypes } = this.state.filterBy
        var {types} = propertyTypes
        types.push(type)
        this.setState(({ filterBy: { ...this.state.filterBy, propertyTypes:{types,isRemoveType:false} } }),
            () => {
                this.props.onSetFilter(this.state.filterBy)
            })
    }

    removePropertyType = (removeType) => {
        const { propertyTypes } = this.state.filterBy
        var {types} = propertyTypes
        const idx = types.findIndex(type => type === removeType)
        types.splice(idx, 1)
        this.setState(({ filterBy: {...this.state.filterBy, propertyTypes:{types,isRemoveType:true} } }),
            () => {
                this.props.onSetFilter(this.state.filterBy)
            })
    }

    closeFilters = () => {
        this.setState({ isPrice: false })
    }
    toggelPriceFilter = (ev) => {
        ev.stopPropagation()
        this.setState(prevState => ({ ...prevState, isPrice: !this.state.isPrice }))
    }
    toggelPropertyTypeFilter = (ev) => {
        ev.stopPropagation()
        this.setState(prevState => ({ ...prevState, isPropertyType: !this.state.isPropertyType }))
    }

    onSavePrice = (price) => {
        const newPrice = {
            maxPrice: price[1],
            minPrice: price[0],
        }
        this.setState(({ filterBy: { ...this.state.filterBy, price: newPrice } }),
            () => {
                this.props.onSetFilter(this.state.filterBy)
            })
    }

    minPrice = () => {
        const { minPrice, maxPrice } = this.state.filterBy.price
        if (!minPrice && (!maxPrice || maxPrice === 500)) {
            return `Price`
        } else if ((!maxPrice || maxPrice === 500) && minPrice) {
            return `$${minPrice}+`
        }
        else if (!minPrice && maxPrice < 500) {
            return `Up to $${maxPrice}`
        }
        else if (maxPrice < 500 && minPrice) {
            return `$${minPrice} - $${maxPrice}`
        }
    }

    render() {
        const { isPrice, isPropertyType } = this.state
        return (
            <section className="filter-container flex">
                <div>
                    <button onClick={this.toggelPriceFilter}>{this.minPrice()}</button>
                    {isPrice && <PriceFilter onSavePrice={this.onSavePrice} />}
                </div>
                <div>
                    <button onClick={this.toggelPropertyTypeFilter}>Property Type</button>
                    {isPropertyType && <PropertyTypeFilter removePropertyType={this.removePropertyType} setCheckedPropertyType={this.setCheckedPropertyType} />}

                </div>
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        stays: state.stayReducer.stays,
    }
}
const mapDispatchToProps = {
    onSetFilter
    
}

export const StayFilter = connect(mapStateToProps, mapDispatchToProps)(_StayFilter)