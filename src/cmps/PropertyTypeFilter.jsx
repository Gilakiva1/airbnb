import { Component } from "react";

export class PropertyTypeFilter extends Component {
    state = {
        types: []
    }

    componentDidMount() {
        this.checkTypeExists()
    }
    checkTypeExists = () => {
        const { stays, property } = this.props
        let types
        if (property === 'type') {
            types = stays.reduce((acc, stay) => {
                const typeName = stay[property]
                if (!acc.some(currType => currType.name === typeName)) {
                    acc.push({ name: typeName, isChecked: false })
                }
                return acc
            }, [])
        } /* else if (property === 'amenties') */
        this.setState({ types })
    }

    saveChecked = (ev) => {
        const { name: value, checked } = ev.target
        const types = this.state.types.map(currType => {
            if (currType.name === value) {
                currType.isChecked = checked
            }
            return currType
        })
        this.setState({ types })
        // this.props.setCheckedPropertyType(type)

    }

    render() {
        const { types } = this.state
        return (
            <>
                {types.map((type, idx) => (
                    <label key={idx}>
                        <input type="checkbox" name={type.name} value={type.isChecked}
                            checked={type.isChecked}
                            onChange={this.saveChecked}
                        />
                        {type.name}
                    </label>

                ))}
                <button onClick={() =>
                    this.props.setCheckedPropertyType(this.state.types.reduce((acc, type) => {
                        if (type.isChecked) acc.push(type.name)
                        return acc
                    }, []))}>Save</button>
            </>
        )

    }
}

