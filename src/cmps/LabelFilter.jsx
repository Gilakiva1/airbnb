import { Component } from "react";

export class LabelFilter extends Component {
    state = {
        types: [],
        amenities: []
    }
    
    componentDidMount() {
        this.checkTypeExists()
    }
    checkTypeExists = () => {
        const { stays, property } = this.props
        let types
        let amenities
        if (property === 'type') {
            types = stays.reduce((acc, stay) => {
                const typeName = stay[property][0].toUpperCase() + stay[property].substring(1)
                if (!acc.some(currType => currType.name === typeName)) {
                    acc.push({ name: typeName, isChecked: false })
                }
                return acc
            }, [])
            this.setState({ types })

        } else if (property === 'amenities') {
            amenities = stays.reduce((acc, stay) => {
                for (const amenitie of stay[property]) {
                    const amenitieName = amenitie[0].toUpperCase() + amenitie.substring(1)
                    if (!acc.some(currAmenitie => currAmenitie.name === amenitieName)) {
                        acc.push({ name: amenitieName, isChecked: false })
                    }
                }
                return acc
            }, [])
            this.setState({ amenities }, () => {
            })
        }
    }
    saveChecked = (ev) => {
        const { property } = this.props
        const { name: value, checked } = ev.target
        let key = property==='type' ? 'types' : [property]
       
        const types = this.state[key].map(currType => {
            if (currType.name === value) currType.isChecked = checked
            return currType
        })
        this.setState({ [key]:types })
    }
    renderByProperty = () => {
        const { types, amenities } = this.state
        const { property } = this.props
        if (property === 'amenities') {
            {
                return (
                    amenities.map((type, idx) => (
                        <label key={idx}>
                        <input type="checkbox" name={type.name} value={type.isChecked}
                            checked={type.isChecked}
                            onChange={this.saveChecked}
                            />
                        {type.name}
                    </label>
                ))
                )
            }
        }else {
            return (
                types.map((type, idx) => (
                    <label key={idx}>
                    <input type="checkbox" name={type.name} value={type.isChecked}
                        checked={type.isChecked}
                        onChange={this.saveChecked}
                        />
                    {type.name}
                </label>
            ))
            )
        }
    }

    render() {
        const {property} = this.props
        let key = property==='type' ? 'types' : [property]
        return (
            <>
                {
                         this.state[key].map((type, idx) => (
                            <label key={idx}>
                            <input type="checkbox" name={type.name} value={type.isChecked}
                                checked={type.isChecked}
                                onChange={this.saveChecked}
                                />
                            {type.name}
                        </label>
                    ))
                    
                }
                <button onClick={() =>
                    this.props.setCheckedPropertyType(this.state[key].reduce((acc, type) => {
                        if (type.isChecked) acc.push(type.name)
                        return acc
                    }, []),key)}>Save</button>
            </>
        )

    }
}

