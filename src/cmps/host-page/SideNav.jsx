

export function SideNav({ toggleComponent, isAddAsset, isMyAsset, isOrders, isRates }) {
    return (
        <div className="side-nav flex ">
            <button className={`${isAddAsset ? 'active' : ''} btn-nav fs14 book clr2 pointer`} onClick={() => { toggleComponent({ isAddAsset: true, isMyAsset: false, isOrders: false, isRates: false }) }}><span>Add Asset</span></button>
            <button className={`${isMyAsset ? 'active' : ''} btn-nav fs14 book clr2 pointer`} onClick={() => { toggleComponent({ isAddAsset: false, isMyAsset: true, isOrders: false, isRates: false }) }}><span>My Asset</span></button>
            <button className={`${isOrders ? 'active' : ''} btn-nav fs14 book clr2 pointer`} onClick={() => { toggleComponent({ isAddAsset: false, isMyAsset: false, isOrders: true, isRates: false }) }}><span>Orders</span></button>
            <button className={`${isRates ? 'active' : ''} btn-nav fs14 book clr2 pointer`} onClick={() => { toggleComponent({ isAddAsset: false, isMyAsset: false, isOrders: false, isRates: true }) }}><span>Rates</span></button>
        </div>
    )
}
