import { Component } from "react";
import { HostStayPreview } from "./HostStayPreview";
export class HostList extends Component {

    state = {
        
    }
    render() {
        const { stays } = this.props
        return (
            
                <table className="host-list">
                    <thead>
                        <tr>
                            <th> <input type="checkbox" 
                            // checked={type.isChecked}
                            onChange={this.saveChecked}
                            /></th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Address</th>
                            <th>Price</th>
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
