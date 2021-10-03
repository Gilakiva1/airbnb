import { Component } from "react";

export class AmenitiesFilter extends Component {
    state = {
        amenities: []
    }

    componentDidMount() {
        this.checkTypeExists()
    }
    checkTypeExists = () => {
        let { amenities } = this.state
        const { stays } = this.props
        stays.map(stay => {
            stay.amenities.map(amenitie => {
                amenitie =  amenitie[0].toUpperCase() + amenitie.substring(1)
                console.log(amenitie);
                if (!amenities.length)
                    amenities.push(amenitie)
                if (!amenities.includes(amenitie))
                    amenities.push(amenitie)
                // for (let i = 0; i < amenities.length; i++) {
                //     console.log('amenities',amenities,'amenitie',amenitie);

                // }
            })
        })
        // console.log('amenities', amenities);
        this.setState({ amenities })
    }

    saveChecked = (ev) => {
        const type = ev.target.value
        if (ev.target.checked) {
            this.props.setCheckedPropertyType(type)
        }
        else {
            this.props.removePropertyType(type)
        }
    }

    render() {
        const { amenities } = this.state
        return (
            amenities.map((amenitie, idx) => (
                <label key={idx}>
                    <input type="checkbox" value={amenitie}
                        onChange={this.saveChecked}
                    />
                    {amenitie}
                </label>

            ))
        )
    }
}

