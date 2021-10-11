

export function HostAssetPreview(props) {
    return (
        <tr>
            <td className="bold flex"><img src={props.asset.imgUrls[0]} />{props.asset.name}</td>
            <td>{props.asset.type}</td>
            <td>{props.asset.loc.address}</td>
            <td><span className="fs18">${props.asset.price.toLocaleString('en-IL')}</span></td>
            <td className='action-edit'><button onClick={()=>{props.toggleComponent({ isAddAsset: true, isMyAsset: false, isOrders: false, isRates: false },props.asset)}}>Edit</button></td>
        </tr>

    )
}