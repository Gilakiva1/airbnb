import React from "react";
import { LocationPicking } from "../header/LocationPicking"
export const MobileLocationForm = React.forwardRef(({ onChangeForm, onImgClick, links, value, onGoBack, onChange, onClearInputs }, ref) => {
    return (
        <form action="" onSubmit={(ev) => onChangeForm(ev,'date')}>
            <div className="margin40 flex gap10">
                <button onClick={() => onGoBack('home')}></button>
                <input className="wide" ref={ref} type="search" placeholder="Where are you going?" name="address" value={value} autoComplete="off" ref={ref} onChange={onChange} />
            </div>
            <LocationPicking onImgClick={onImgClick} links={links} />
            <div className="btn flex space-between">
                <button onClick={onClearInputs}>clear</button>
                <button type="submit" onClick={onChangeForm}>next</button>
            </div>
        </form>
    )

})