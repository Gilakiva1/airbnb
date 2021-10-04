import { Component } from 'react'
import PriceFilter from './PriceFilter.jsx';
import { LabelFilter } from './LabelFilter.jsx';

export class StayFilter extends Component {

    state = {
        isPrice: false,
        isPropertyType: false,
        isAmenities: false
    }
    componentDidMount() {
        // window.addEventListener('click', this.closeFilters)
    }

    componentWillUnmount() {
        // window.removeEventListener('click', this.closeFilters)        
    }

    closeFilters = () => {
        this.setState({ isPrice: false, isPropertyType: false, isAmenities: false })
    }

    toggelPriceFilter = (ev) => {
        ev.stopPropagation()
        this.setState(prevState => ({ ...prevState, isPrice: !this.state.isPrice }))
    }

    toggelPropertyTypeFilter = (ev) => {
        ev.stopPropagation()
        this.setState(prevState => ({ ...prevState, isPropertyType: !this.state.isPropertyType }))
    }

    toggelAmenitiesFilter = (ev) => {
        ev.stopPropagation()
        this.setState(prevState => ({ ...prevState, isAmenities: !this.state.isAmenities }))

    }

    render() {
        const { isPrice, isPropertyType, isAmenities } = this.state
        const { stays, setCheckedPropertyType } = this.props
        return (
            <section className="filter-container flex">
                <div className="price-container">
                    <button onClick={this.toggelPriceFilter}>{this.props.minPrice()}</button>
                    {isPrice && <PriceFilter stays={stays} onSavePrice={this.props.onSavePrice} />}
                </div>
                <div className="type-container">
                    <button onClick={this.toggelPropertyTypeFilter}>Property Type</button>
                    {isPropertyType && <LabelFilter
                        property="type"
                        stays={stays}
                        setCheckedPropertyType={setCheckedPropertyType} />}
                </div>
                <div className="amenities-container-filter">
                    <button onClick={this.toggelAmenitiesFilter}>Amenities</button>
                    {isAmenities && <LabelFilter
                        property="amenities"
                        stays={stays}
                        setCheckedPropertyType={setCheckedPropertyType} />}
                    {/* {isAmenities && <AmenitiesFilter stays={stays} removePropertyType={this.props.removePropertyType} setCheckedPropertyType={this.props.setCheckedPropertyType} />} */}

                </div>
            </section>
        )
    }
}



