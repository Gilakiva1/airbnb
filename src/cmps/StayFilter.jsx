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
        window.addEventListener('click', this.onCloseFilters)
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.onCloseFilters)
    }

    onCloseFilters = () => {
        this.setState({ isPrice: false, isPropertyType: false, isAmenities: false })
    }

    toggelPriceFilter = async (ev) => {
        await this.onCloseFilters()
        ev.stopPropagation()
        this.setState(prevState => ({ ...prevState, isPrice: !this.state.isPrice }))
    }

    toggelPropertyTypeFilter = async (ev) => {
        await this.onCloseFilters()
        ev.stopPropagation()
        this.setState(prevState => ({ ...prevState, isPropertyType: !this.state.isPropertyType }))
    }

    toggelAmenitiesFilter = async (ev) => {
        ev.stopPropagation()
        await this.onCloseFilters()
        this.setState(prevState => ({ ...prevState, isAmenities: !this.state.isAmenities }))

    }

    render() {
        const { isPrice, isPropertyType, isAmenities } = this.state
        const { stays, setCheckedPropertyType } = this.props
        return (
            <section className="filter-container flex gap10 ">
                <div className="price-container ">
                    <button className="hover-grey" onClick={this.toggelPriceFilter}>{this.props.minPrice()}</button>
                    {isPrice && <PriceFilter stays={stays} onSavePrice={this.props.onSavePrice} />}
                </div>
                <div className="type-container ">
                    <button className="hover-grey" onClick={this.toggelPropertyTypeFilter}>Property Type</button>
                    {isPropertyType && <LabelFilter
                        property="type"
                        stays={stays}
                        setCheckedPropertyType={setCheckedPropertyType} />}
                </div>
                <div className="amenities-container-filter ">
                    <button className="hover-grey" onClick={this.toggelAmenitiesFilter}>Amenities</button>
                    {isAmenities && <LabelFilter
                        property="amenities"
                        stays={stays}
                        setCheckedPropertyType={setCheckedPropertyType} />}
                    {/* {isAmenities && <AmenitiesFilter stays={stays} removePropertyType={this.props.removePropertyType} setCheckedPropertyType={this.props.setCheckedPropertyType} />} */}

                </div>
            </section >
        )
    }
}



