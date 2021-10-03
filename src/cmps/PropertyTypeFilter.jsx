import { Component } from "react";
import { connect } from 'react-redux'

export class _PropertyTypeFilter extends Component {
    state = {
        types: []
    }

    componentDidMount() {
        this.checkTypeExists()
    }
    checkTypeExists = () => {
        let { types } = this.state
        const { stays } = this.props

        stays.map(stay => {
            if (!types.length)
                types.push(stay.type)
            for (let i = 0; i < types.length; i++) {

                if (types[i] === stay.type) return
                else {
                    if (i === types.length - 1) {
                        types.push(stay.type)
                    }
                }
            }
        })
        this.setState({ types })
    }

    saveChecked = (ev) => {
        const type = ev.target.value
        if(ev.target.checked){
            this.props.setCheckedPropertyType(type)
        }
        else {
            this.props.removePropertyType(type)
        }
    }

    render() {
        const { types } = this.state
        return (
            types.map((type,idx) => (
                <label key={idx}>
                    <input type="checkbox" value={type}
                        onChange={this.saveChecked}
                    />
                    {type}
                </label>

            ))
        )
    }
}

function mapStateToProps(state) {
    return {
        stays: state.stayReducer.stays,
    }
}

export const PropertyTypeFilter = connect(mapStateToProps)(_PropertyTypeFilter)