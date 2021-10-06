import { connent } from 'react-redux'
import React, { Component } from 'react'


 class _OrderStay extends Component {
    state = {
    }

    render() {
        return (
            <div>
                
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        stays: state.stayReducer.stays,
    }
}
const mapDispatchToProps = {
    // loadStays
}
export const OrderStay = connect(mapStateToProps, mapDispatchToProps)(_OrderStay)
