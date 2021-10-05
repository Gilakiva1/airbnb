import { Component } from "react";
import { HostStayPreview } from "./HostStayPreview";
export class HostList extends Component {

    state = {
        sortPrice: {
            isOnPrice: false,
            sortByPrice: 'up'
        },
        sortType: {
            isOnType: false,
            sortByType: 'up'
        }
    }

    TogglesortPrice = () => {
        const { sortPrice } = this.state
        let { sortByPrice, isOnPrice } = sortPrice
        if (isOnPrice) {
            if (sortByPrice === 'up') sortByPrice = 'down'
            else sortByPrice = 'up'
            this.setState({ sortPrice: { ...sortPrice, sortByPrice } })
        }
        else {
            this.setState({ sortPrice: { ...sortPrice, isOnPrice: !isOnPrice } })
        }
    }

    toggleSortType = () => {
        const { sortType } = this.state
        let { sortByType, isOnType } = sortType
        if (isOnType) {
            if (sortByType === 'up') sortByType = 'down'
            else sortByType = 'up'
            this.setState({ sortType: { ...sortType, sortByType } }, () => {
                console.log(this.state.sortType);
            })
        }
        else {
            this.setState({ sortType: { ...sortType, isOnType: !isOnType } })
        }
    }
    sortPrice = () => {
        const { stays } = this.props
        const { sortByPrice } = this.state.sortPrice

        return stays.sort((a, b) => sortByPrice === 'up' ? a.price - b.price : b.price - a.price)
    }
    sortType = () => {
        const { stays } = this.props
        const { sortByType } = this.state.sortType
        return stays.sort((a, b) => {
            if (sortByType === 'up') {
                if (a.type < b.type) return -1
                else if (a.type > b.type) return 1
                else return 0
            }
            else {
                if (a.type < b.type) return 1
                else if (a.type > b.type) return -1
                else return 0
            }
        })
    }

    getStaysForDisplay = () => {
        let { stays } = this.props
        const { isOnPrice } = this.state.sortPrice
        const { isOnType } = this.state.sortType
        if (isOnPrice) {
            stays = this.sortPrice()
        }
        if (isOnType) {
            stays = this.sortType()
        }
        return stays
    }

    render() {
        const { isOnPrice } = this.state.sortPrice
        const { isOnType } = this.state.sortType
        const stays = this.getStaysForDisplay()
        return (
            <table className="host-list">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th className={`sort ${isOnType ? 'black' : ''}`} onClick={this.toggleSortType}>Type</th>
                        <th>Address</th>
                        <th className={`sort ${isOnPrice ? 'black' : ''}`} onClick={this.TogglesortPrice}>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {stays.map((stay, idx) => {
                        return <HostStayPreview key={idx} stay={stay} />
                    })}
                </tbody>
            </table>
        )
    }
}
