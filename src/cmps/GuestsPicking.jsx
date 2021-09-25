import React from "react"

export class GuestsPicking extends React.Component {

    state = {
        adult: 0,
        child: 0,
        infant: 0
    }

    updateCount = (action) => {
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
        this.props.handleGuestsChanege(field,value)
    }

    render() {
        const { adult, child, infant } = this.state
        return (
            <section className="guests-container flex column">
                <div className="guest-card flex">
                    <div className="flex column">
                        <span>Adults:</span>
                        Aged 13 or above
                    </div>
                    <div className="counter-container flex">
                        <button onClick={() => this.updateCount('subtract adult')} className={adult === 0 ? "btn-counter fade" : "btn-counter"}>-</button>
                        <span>{adult}</span>
                        <button onClick={() => this.updateCount('add adult')} className="btn-counter">+</button>
                    </div>
                </div>
                <div className="guest-card flex">
                    <div className="flex column">
                        <span>Children:</span>
                        Ages 2-12
                    </div>
                    <div className="counter-container flex">
                        <button onClick={() => this.updateCount('subtract child')} className={child === 0 ? "btn-counter fade" : "btn-counter"}>-</button>
                        <span>{child}</span>
                        <button onClick={() => this.updateCount('add child')} className="btn-counter">+</button>
                    </div>
                </div>
                <div className="guest-card flex">
                    <div className="flex column">
                        <span>Infants:</span>
                        Under 2
                    </div>
                    <div className="counter-container flex">
                        <button onClick={() => this.updateCount('subtract infant')} className={infant === 0 ? "btn-counter fade" : "btn-counter"}>-</button>
                        <span>{infant}</span>
                        <button onClick={() => this.updateCount('add infant')} className="btn-counter">+</button>
                    </div>
                </div>
            </section>
        )
    }
}