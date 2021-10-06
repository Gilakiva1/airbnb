

export function HostStayPreview({ stay }) {
    return (
        <tr>
            <td className="bold flex"><img src={stay.imgUrls[0]} />{stay.name}</td>
            <td>{stay.type}</td>
            <td>{stay.loc.address}</td>
            <td>${stay.price}</td>
            <td>Actions</td>
        </tr>

    )
}