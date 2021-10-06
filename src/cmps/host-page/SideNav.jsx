
import { Component } from "react";

export function SideNav({ toggleComponent }) {
    return (
        <div className="side-nav">
            <button onClick={() => { toggleComponent({ isAddAsset: true, isMyAsset: false, isOrders: false, isRates: false }) }}>Add Asset</button>
            <button onClick={() => { toggleComponent({ isAddAsset: false, isMyAsset: true, isOrders: false, isRates: false }) }}>My Asset</button>
            <button onClick={() => { toggleComponent({ isAddAsset: false, isMyAsset: false, isOrders: true, isRates: false }) }}>Orders</button>
            <button onClick={() => { toggleComponent({ isAddAsset: false, isMyAsset: false, isOrders: false, isRates: true }) }}>Rates</button>
        </div>
    )
}
