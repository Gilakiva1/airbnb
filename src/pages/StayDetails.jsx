import { Component } from 'react'
import { connect } from 'react-redux'
import { stayService } from '../services/stay.service.js';
import { withRouter } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

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
            <section className="main-container">
                <h1>{stay.name}</h1>
                <div className="flex space-between">
                    <div>
                        <div>
                            {<FontAwesomeIcon className='star-icon' icon={faStar} />}
                            {stay.rating}
                            ({stay.reviews.length - 1} reviews)
                        </div>
                        <div>{stay.loc.address}</div>
                    </div>
                    <div>
                    {/* {<FontAwesomeIcon className='star-icon' icon={fashare} />} <link Share/> */} <link Share/>
                    {/* {<FontAwesomeIcon className='star-icon' icon={faHeart} />} <link Save/> */} <link Save/>
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

