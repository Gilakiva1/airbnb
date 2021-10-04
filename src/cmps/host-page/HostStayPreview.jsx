

export function HostStayPreview({ stay }) {
    return (
        <tr>
            <td> <input type="checkbox"
                // checked={type.isChecked}
                // onChange={this.saveChecked}
            /></td>
            <td className="bold flex"><img src={stay.imgUrls[0]} />{stay.name}</td>

            <td>{stay.type}</td>

            <td>{stay.loc.address}</td>

            <td>${stay.price}</td>

            <td>Actions</td>
        </tr>

    )
}