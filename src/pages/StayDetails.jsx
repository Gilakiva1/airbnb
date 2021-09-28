import { Component } from 'react'
import { connect } from 'react-redux'
import { stayService } from '../services/stay.service.js';
import { withRouter } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { ShareSvg } from '../assets/img/stay-details/ShareSvg.jsx';
import { HeartSvg } from '../assets/img/stay-details/HeartSvg.jsx';

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
        // if(!stay) this.props.history.push("/stay")
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
                    <div className="flex">
                        <div className="flex">
                            {<FontAwesomeIcon className='star-icon' icon={faStar} />}
                            {stay.rating}
                            ({stay.reviews.length} reviews)
                        </div>
                        <div>{stay.loc.address}</div>
                    </div>
                    <div className="flex gap5">
                    <ShareSvg/> Share
                   <HeartSvg/> Save
                    </div>
                </div>
                <h2>capacity {stay.capacity}</h2>
                <h2>{stay.loc.address}</h2>
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

