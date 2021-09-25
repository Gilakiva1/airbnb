import React from "react";
import { connect } from 'react-redux'
import { loadStays } from '../store/stay.action'
import { StayPreview } from '../cmps/StayPreview'
import HeroLogo from '../assets/img/hero.png';
class _HomePage extends React.Component {

    componentDidMount() {
        this.props.loadStays()
        // in backend get top 5 only!
    }
    onTopRated = () => {

    }



    render() {
        const { stays } = this.props
        if (!stays) return <h1>loading</h1>
        return <>
            <section className="hero-logo ">
                <img src={HeroLogo} alt="" />
            </section>

            <main className="home-page main-container">
                <h1>top rated</h1>
                <section className="top-rated">

                </section>

            </main>
        </>

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