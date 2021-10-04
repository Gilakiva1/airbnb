import { Component } from "react";
import { HostStayPreview } from "./HostStayPreview";
export class HostList extends Component {


    render() {
        const { stays } = this.props
        return (
            <div className="host-list">
                <table>
                    <thead>
                        <tr>
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
            </div>
        )
    }
}
