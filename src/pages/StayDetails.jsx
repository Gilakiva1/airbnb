import { Component } from 'react'
import { connect } from 'react-redux'
import { stayService } from '../services/stay.service.js';
import { withRouter } from 'react-router'
import { Select } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { ShareSvg } from '../assets/img/stay-details/ShareSvg.jsx';
import { HeartSvg } from '../assets/img/stay-details/HeartSvg.jsx';
import { utilService } from '../services/util.service.js';
import imgUser from '../assets/img/home-page/user.jpg'
import { Tags } from '../cmps/Tags.jsx';
import { ReserveModal } from '../cmps/ReserveModal.jsx';
// import { GuestsPicking } from '../cmps/header/GuestsPicking.jsx';


export class _StayDetails extends Component {
    state = {
        stay: null,

    };
    componentDidMount() {
        this.loadStay()
    }

    loadStay = async () => {
        const id = this.props.match.params.stayId;
        console.log('stay id ', id);
        const stay = await stayService.getById(id)
        console.log('stay in stay details', stay);
        if (!stay) this.props.history.push("/")
        this.setState({ stay })

    }

    render() {
        const { stay } = this.state
        if (!stay) return <div>Loading...</div>
        console.log('stay:', stay);
        return (
            <section className="stay-details-container">
                <h1>{stay.name}</h1>
                <div className="flex space-between">
                    <div className="review-address-container flex">
                        <div className="flex gap5">
                            {<FontAwesomeIcon className='star-icon' icon={faStar} />}
                            {stay.rating}
                            ({utilService.getRandomIntInclusive(30, 500)} reviews) ·<span> </span>
                        </div>
                        <div>{stay.loc.address}</div>
                    </div>
                    <div className="flex gap5">
                        <ShareSvg /> Share
                        <HeartSvg /> Save
                    </div>
                </div>
                <div className="stay-details-grid">{stay.imgUrls.map((img, idx) => {
                    return <div className={`grid-img${idx} pointer`} key={idx}><img className={`img${idx}`} src={img} alt="" /></div>
                })}</div>
                <div className="details-main-container flex space-between ">
                    <div className="details-info flex column">
                        <div className="flex space-between">
                            <div className="flex column space-between">
                                <h2>Entire {stay.type} hosted by {stay.host.fullname}</h2>
                                <div className="flex">{stay.capacity} guests · {stay.type} ·  {utilService.getRandomIntInclusive(2, 6)} beds · {utilService.getRandomIntInclusive(1, 5)} baths </div>
                            </div>
                            <div ><img className="user-profile-img" src={imgUser} alt="" /></div>
                        </div>
                        <div className="seperation-line"></div>
                        <div className="tag-container flex column">
                            {stay.tags.map((tag, idx) => (
                                <Tags key={idx} tag={tag} type={stay.type} />
                            ))}
                        </div>
                        <div className="seperation-line"></div>
                        <div className="description">{stay.description}</div>
                        <div className="seperation-line"></div>
                        <div className="amenities">
                            <h2>What this place offers</h2>
                        </div>
                    </div>
                    <ReserveModal stay={stay}/>

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
const mapDispatchToProps = {}

export const StayDetails = connect(mapStateToProps)(_StayDetails)

