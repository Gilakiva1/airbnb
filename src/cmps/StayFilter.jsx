import { connect } from 'react-redux'
import Nouislider from "nouislider-react";
import { Component } from 'react'
import PriceFilter from './PriceFilter.jsx';
import { onSetFilter } from '../store/stay.action.js'
class _StayFilter extends Component {

    state = {
        filterBy: {
            price: {
                minPrice: '',
                maxPrice: ''
            },
        },
        isPrice: false
    }

    toggelPriceFilter = () => {
        this.setState(prevState => ({ ...prevState, isPrice: !this.state.isPrice }))
    }

    onSavePrice = (price) => {
        console.log('price',price);
        const newPrice = {
            maxPrice:price[1],
            minPrice:price[0],
        }
        console.log('newPrice',newPrice);
        this.setState(({ filterBy: { price: newPrice }}),
            () => {
                this.props.onSetFilter(newPrice)
            })
    }

    render() {
        const { isPrice } = this.state

        return (
            // <div>
            // <label htmlFor="price">Price</label>
            // <input type="range" id="price"></input>
            // </div>
            <section className="filter-container">
                <div>
                    <button onClick={this.toggelPriceFilter}>Price</button>
                    {isPrice && <PriceFilter onSavePrice={this.onSavePrice} />}
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