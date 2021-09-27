import { Component } from 'react'
import { connect } from 'react-redux'
import { stayService } from '../services/stay.service.js';
import { withRouter } from 'react-router'

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
            <div>

                <h2>Entire residentail {stay.type} in {stay.loc.address}</h2>
                    <h1>{stay.name}</h1>
                    <h2>capacity {stay.capacity}</h2>
                    <h2>{stay.loc.address}</h2>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        stays: state.stayReducer.stays,
    }
}
const mapDispatchToProps = {}

export const StayDetails = connect(mapStateToProps)(withRouter(_StayDetails))