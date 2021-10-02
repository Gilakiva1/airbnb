import { Component } from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { ShareSvg } from '../assets/img/stay-details/ShareSvg.jsx';
import { HeartSvg } from '../assets/img/stay-details/HeartSvg.jsx';
import { utilService } from '../services/util.service.js';
import imgUser from '../assets/img/home-page/user.jpg'
import { Tags } from '../cmps/stay-details/Tags.jsx';
import { OrderModal } from '../cmps/OrderModal.jsx';
import { stayService } from '../services/stay.service.js';
import { Amenities } from '../cmps/stay-details/amenities.jsx';
import { DatePicker } from '../cmps/header/DatePicker.jsx';
import { onAddOrder } from '../store/order.action';
import { ReviewPoints } from '../cmps/stay-details/ReviewPoints.jsx';
import { ReviewList } from '../cmps/stay-details/ReviewList.jsx';


export class _StayDetails extends Component {
    state = {
        stay: null,
        order: null
    };
    componentDidMount() {
        this.loadStay()

    } 

    loadStay = async () => {
        const id = this.props.match.params.stayId;
        const stay = await stayService.getById(id)
        if (!stay) this.props.history.push("/")

        const searchParams = new URLSearchParams(this.props.location.search);
        const order = utilService.getQueryParams(searchParams)
        if (order.checkIn && order.checkOut) {

            order.checkIn = new Date(+order.checkIn)
            order.checkOut = new Date(+order.checkOut)
        }

        this.setState({ stay, order })
    }

    handlePickingDates = async (start, end) => {
        const { order } = this.state

        let checkIn = ` ${start.toLocaleString('en-IL', { month: 'short', day: 'numeric' })} `
        if (end) {
            var checkOut = ` ${end.toLocaleString('en-IL', { month: 'short', day: 'numeric' })} `
            order.checkOut = checkOut
        } else {
            order.checkOut = ''
        }
        order.checkIn = checkIn

    }


    preventPropagation = event => {
        event.stopPropagation()
    }


    render() {
        const { stay, order } = this.state

        if (!stay) return <div>Loading...</div>

        return (
            <>
                <section className="stay-details-container">
                    <h1>{stay.name}</h1>
                    <div className="flex space-between">
                        <div className="review-address-container flex">
                            <div className="flex gap5">
                                {<FontAwesomeIcon className='star-icon' icon={faStar} />}
                                <span>{stay.rating}</span><span></span>
                                ({utilService.getRandomIntInclusive(30, 500)} reviews) ·<span> </span>
                            </div>
                            <div>{stay.loc.address}</div>
                        </div>
                        <div className="flex gap5">
                            <ShareSvg /> Share
                            <HeartSvg /> Save
                        </div>
                    </div>
                    <div className="stay-details-grid ">{stay.imgUrls.slice(0, 5).map((img, idx) => {
                        return <div className={`grid-img${idx} pointer`} key={idx}><img className={`img${idx}`} src={img} alt="" /></div>
                    })}</div>
                    <div className="details-main-container flex space-between ">
                        <div className="details-info flex column">
                            <div className="flex space-between">
                                <div className=" flex column space-between">
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
                            <div className="amenities flex column">
                                <h2 className="middle-header">Amenities</h2>
                                <div className="amenities-container">
                                    {stay.amenities.map((amenity, idx) => {
                                        return <Amenities key={idx} amenity={amenity} />
                                    })}
                                </div>
                            </div>
                            <div className="seperation-line"></div>
                            <div >
                                <h2>Select check-in date</h2>
                                <p className="fade-font">Add your travel dates for exact pricing</p>
                                <div className="details-dates flex justify-center">
                                    <DatePicker order={order} className={'datepicker-details'} preventPropagation={this.preventPropagation} handlePickingDates={this.handlePickingDates} />
                                </div>
                            </div>
                            <div className="seperation-line"></div>
                            <div className="details-reviews-header flex gap5">
                                {<FontAwesomeIcon className="star-icon" icon={faStar} />}
                                {stay.rating}
                                ({utilService.getRandomIntInclusive(30, 500)} reviews)
                            </div>
                        </div >
                        <OrderModal stay={stay} order={order} />
                    </div >
                    <ReviewPoints reviews={stay.reviews} />
                    <ReviewList reviews={stay.reviews} />
                    <div className="seperation-line"></div>
                    <h2>Where you’ll be</h2>
                    <p>{stay.loc.address}</p>
                </section >

            </>
        )
    }
}


function mapStateToProps(state) {
    return {
        stays: state.stayReducer.stays,
    }
}
const mapDispatchToProps = {
    onAddOrder
}

export const StayDetails = connect(mapStateToProps, mapDispatchToProps)(_StayDetails)

