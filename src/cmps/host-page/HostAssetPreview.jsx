

export function HostAssetPreview({ asset }) {
    return (
        <tr>
            <td className="bold flex"><img src={asset.imgUrls[0]} />{asset.name}</td>
            <td>{asset.type}</td>
            <td>{asset.loc.address}</td>
            <td>${asset.price}</td>
            <td>Actions</td>
        </tr>

    )
}