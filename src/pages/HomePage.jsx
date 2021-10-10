import { Link } from "react-router-dom";
import React from "react";
import imgHost from '../assets/img/home-page/host.jpg'
import imgHero from '../assets/img/hero-cut.jpg'
import { PopularImgList } from "../cmps/home-page/PopularImgList";
import { LabelsImgList } from "../cmps/home-page/LabelsImgList"
import { utilService } from "../services/util.service";
import { onSetOrder } from '../store/order.action';
import { withRouter } from 'react-router'
import { connect } from "react-redux";
import { AppFooter } from "../cmps/footer/AppFooter";



export class _HomePage extends React.Component {
    state = {
        popularImgs: '',
        labelsImgs: '',
        screenWidth: 600
    }
    componentDidMount() {
        window.addEventListener('resize', this.onResizeScreen)
        this.props.onSetOrder(null)
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.onResizeScreen)
    }
    onResizeScreen = ({ target }) => {
        this.setState(prevState => ({ ...prevState, screenWidth: target.innerWidth }));
    }


    onImgClick = async (order) => {
        const queryString = utilService.makeQueryParams(order)
        await this.props.onSetOrder(order)
        this.props.history.push(`/stay?${queryString}`)
    }



    render() {
        const { screenWidth } = this.state

        return (

            <>
                <div className="hero-logo full relative">
                    {screenWidth > 550 &&
                        <div className="btn-flex-container fh20  absolute flex align-center column">
                            <h1 className="fs18">Not sure where to go? Perfect.</h1>
                            <Link to="/stay" className="btn-flex"><span style={{ '-webkit-background-clip': 'text' }}>I'm flexiable</span></Link>
                        </div>
                    }
                    <img src={imgHero} />
                </div >
                <section className="home-page">
                    <h1 className="title-popular fs32 fh52 fw-unset bold">Popular Destinations</h1>
                    <PopularImgList onImgClick={this.onImgClick} links={utilService.HomePageImgPopular()} />
                    <h1 className="title-label fs32 fh52 fw-unset bold">Live Anywhere</h1>
                    <LabelsImgList links={utilService.HomePageImgLabels()} />
                    <Link to='/host'>
                        <div className="host-container ">
                            <img className="round-edge" src={imgHost} />
                            <div className="host-info flex column justify-center align-center">
                                <h1 className="info-first wide">Try hosting</h1>
                                <p className="info-seconde">Earn extra income and unlock new opportunities by sharing your space.</p>
                                <button className="host-btn flex round-edge">Learn more</button>
                            </div>
                        </div>
                    </Link>
                </section>
            </>
        )

    }
}

function mapStateToProps(state) {
    return {
        currOrder: state.orderReducer.currOrder,
    }
}
const mapDispatchToProps = {
    onSetOrder
}

export const HomePage = connect(mapStateToProps, mapDispatchToProps)(withRouter(_HomePage))
