import { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { utilService } from '../services/util.service';
import { GuestsPicking } from './header/GuestsPicking';

export class OrderModal extends Component {

    state = {
        criteria: {
            dates: {
                chackIn: '',
                chackOut: ''
            },
            guests: {
                adult: 0,
                child: 0,
                infant: 0
            }
        },
        isReserve:false,
        isPickingGuests: false
    }

    componentDidMount() {
        window.addEventListener('click', this.setIsPickingGuests)
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.setIsPickingGuests)
    }

    setIsPickingGuests = () => {
        let { isPickingGuests } = this.state
        isPickingGuests = false
        this.setState({ isPickingGuests })
    };

    handleChange = (ev) => {
        const { criteria } = this.state
        const field = ev.target.name
        const value = ev.target.value
        this.setState({ criteria: { ...criteria, [field]: value } })
    }

    closeInputs = () => {
        let { isPickingGuests } = this.state
        isPickingGuests = false
        this.setState({ isPickingGuests })
    }

    activeInput = (input) => {
        this.closeInputs()
        switch (input) {
            case 'guest':
                this.setState({ isPickingGuests: true })
        }
    }

    setIsPickingGuests = () => {
        let { isPickingGuests } = this.state
        isPickingGuests = false
        this.setState({ isPickingGuests })
    }

    preventPropagation = event => {
        event.stopPropagation()
    }

    getTotalGuests = () => {
        let { adult, child, infant } = this.state.criteria.guests
        var guests = `Guests:${adult + child}`
        if(infant){
            guests += ` infant: ${infant}`
        }
        return guests
    }
    handleKeyPress = () => {
        return false
    }

    handleGuestsChanege = (field, value) => {
        let { criteria } = this.state
        let { guests } = criteria
        this.setState({ criteria: { ...criteria, guests: { ...guests, [field]: value } } })
    }

    onSubmit =(ev) =>{
        console.log(ev);
        console.log(ev.target.type === 'button');
        if(ev.target.type === 'button'){
            this.setState({isReserve:true})
            ev.target.type = 'submit'
        }
        else {
            

        }

    }
    render() {
        const { isPickingGuests } = this.state
        console.log('isPickingGuests', isPickingGuests);
        const { criteria } = this.state
        const {isReserve} = this.state
        return (
            <div className="order-modal">
                <div className="flex gap5">
                    {<FontAwesomeIcon className='star-icon' icon={faStar} />}
                    5
                    ({utilService.getRandomIntInclusive(30, 500)} reviews) <span> </span>
                </div>
                <div className="flex " >
                    <form className="flex column" onClick={this.preventPropagation}>
                        <div className="date-input flex column">
                            <span>Check in:</span>
                            <input
                                type="date"
                                placeholder="Add dates"
                                name="checkIn"
                                style={{ border: 'none' }}
                                onChange={this.handleChange}
                                onClick={this.closeInputs}
                            />
                        </div>
                        <div className="input-container flex column">
                            <span>Check out:</span>
                            <input
                                type="date"
                                placeholder="Add dates"
                                name="checkOut"
                                style={{ border: 'none' }}
                                onChange={this.handleChange}
                                onClick={this.closeInputs}
                            />
                        </div>
                        <div className="input-container flex column">
                            <span>Guests:</span>
                            <input
                                type="search"
                                placeholder="Add guests"
                                name="guests"
                                placeholder={'guests:' + this.getTotalGuests()}
                                style={{ border: 'none' }}
                                onKeyPress={this.handleKeyPress}
                                onChange={this.handleChange}
                                onClick={() => this.activeInput('guest')}
                            />
                        </div>
                        <div className="flex column">
                            <button type="button" onClick={() => this.activeInput('guest')}>{this.getTotalGuests()}</button>
                            {!isReserve&&<button  type="button" onClick={this.onSubmit}>Check availability</button>}
                            {isReserve&&<button  type="button" onClick={this.onSubmit}>Reserve</button>}
                        </div>
                    </form>
                    <div className={isPickingGuests ? "picking-guest-container" : "picking-guest-container none"}> {isPickingGuests && <GuestsPicking handleGuestsChanege={this.handleGuestsChanege} />} </div>
                </div>

            </div>
        )
    }
}