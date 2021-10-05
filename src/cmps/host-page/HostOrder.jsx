import { Component } from "react";
import { HostStayPreview } from "./HostStayPreview";
export class HostOrder extends Component {

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

    

    

  

    render() {
        const { isOnPrice } = this.state.sortPrice
        const { isOnType } = this.state.sortType
        const stays = this.props
        return (
            <table className="host-list">
                <thead>
                    <tr>
                        <th>Guest Name</th>
                        <th>Check in</th>
                        <th>Check out</th>
                        <th>Status</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    
                </tbody>
            </table>
        )
    }
}
