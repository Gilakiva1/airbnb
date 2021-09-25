import React from "react";
import { connect } from 'react-redux'
import { loadStays } from '../store/stay.action'
class _HomePage extends React.Component {

    componentDidMount() {
        this.props.loadStays()
    }
    render() {
        const { stays } = this.props
        if (!stays) return <h1>loading</h1>
        return (
            <section>
            <div>HomePage</div>
            </section>
        )
    }
}

const mapStateToProps = state => {
    return {
        stays: state.stayReducer.stays
    }
}

const mapDispatchToProps = {
    loadStays

}
export const HomePage = connect(mapStateToProps, mapDispatchToProps)(_HomePage)