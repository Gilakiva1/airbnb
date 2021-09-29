import { Component } from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { ShareSvg } from '../assets/img/stay-details/ShareSvg.jsx';
import { HeartSvg } from '../assets/img/stay-details/HeartSvg.jsx';
import { utilService } from '../services/util.service.js';
import imgUser from '../assets/img/home-page/user.jpg'
import { Tags } from '../cmps/Tags.jsx';
import { OrderModal } from '../cmps/OrderModal.jsx';
import { stayService } from '../services/stay.service.js';
import { orderService } from '../services/order.service.js';


export class _StayDetails extends Component {
    state = {
        stay: null
    };
    componentDidMount() {
        this.loadStay()
        // this.loadOrder()

    }

    loadStay = async () => {
        const id = this.props.match.params.stayId;
        const stay = await stayService.getById(id)
        if (!stay) this.props.history.push("/")
        this.setState({ stay })
    }

    render() {
        const { stay } = this.state
        const { order } = this.props
<<<<<<< HEAD
      
=======
>>>>>>> 861a3c60b4df3fabea35bd1083569beb71b3b369
        if (!stay) return <div>Loading...</div>

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
                            <div className="det flex column space-between">
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
                    <OrderModal />
                </div>
            </section>
        )
    }
}


function mapStateToProps(state) {
    return {
        stays: state.stayReducer.stays,
        order: state.orderReducer.order
    }
}
const mapDispatchToProps = {
    // onLoadOrder
}

export const StayDetails = connect(mapStateToProps)(_StayDetails)

