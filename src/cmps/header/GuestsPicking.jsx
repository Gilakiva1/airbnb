import React from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router"

export class _GuestsPicking extends React.Component {

    state = {
        adult: 0,
        child: 0,
        infant: 0
    }

    componentDidMount() {
        if (!this.props.order) return
        this.setState(this.props.order.guests)
    }


    updateCount = (ev, action) => {
        ev.stopPropagation()
        let { adult, child, infant } = this.state
        let field
        let value
        switch (action) {
            case 'add adult':
                if (adult < 16) {
                    field = 'adult'
                    value = adult + 1
                } else return
                break;
            case 'subtract adult':
                if (adult === 0) return
                else {
                    field = 'adult'
                    value = adult - 1
                }
                break;
            case 'add child':
                if (child < 5) {
                    field = 'child'
                    value = child + 1
                } else return
                break;
            case 'subtract child':
                if (child === 0) return
                else {
                    field = 'child'
                    value = child - 1
                }
                break;
            case 'add infant':
                if (infant < 5) {
                    field = 'infant'
                    value = infant + 1
                } else return
                break;
            case 'subtract infant':
                if (infant === 0) return
                else {
                    field = 'infant'
                    value = infant - 1
                }
                break;
        }
        this.setState({ [field]: value })
        this.props.handleGuestsChanege(field, value)
    }

    preventPropagation = event => {
        event.stopPropagation()
    }
    render() {
        const { adult, child, infant } = this.state
        return (
            <section className="guests-container flex column" onClick={this.preventPropagation} >
                <div className="guest-card flex">
                    <div className="flex column">
                        <span>Adults:</span>
                        Aged 13 or above
                    </div>
                    <div className="counter-container flex">
                        <button onClick={(event) => this.updateCount(event, 'subtract adult')} className={adult === 0 ? "btn-counter flex fade" : "btn-counter flex"}>-</button>
                        <span>{adult}</span>
                        <button onClick={(event) => this.updateCount(event, 'add adult')} className="btn-counter flex">+</button>
                    </div>
                </div>
                <div className="guest-card flex">
                    <div className="flex column">
                        <span>Children:</span>
                        Ages 2-12
                    </div>
                    <div className="counter-container flex">
                        <button onClick={(event) => this.updateCount(event, 'subtract child')} className={child === 0 ? "btn-counter flex fade" : "btn-counter flex"}>-</button>
                        <span>{child}</span>
                        <button onClick={(event) => this.updateCount(event, 'add child')} className="btn-counter flex">+</button>
                    </div>
                </div>
                <div className="guest-card flex">
                    <div className="flex column">
                        <span>Infants:</span>
                        Under 2
                    </div>
                    <div className="counter-container flex">
                        <button onClick={(event) => this.updateCount(event, 'subtract infant')} className={infant === 0 ? "btn-counter flex fade" : "btn-counter flex"}>-</button>
                        <span>{infant}</span>
                        <button onClick={(event) => this.updateCount(event, 'add infant')} className="btn-counter flex">+</button>
                    </div>
                </div>
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        order: state.orderReducer.order
    }
}
export const GuestsPicking = connect(mapStateToProps)(withRouter(_GuestsPicking))