import { GuestsPicking } from "../header/GuestsPicking"
import { MobileGoBack } from "../svgs/MobileGoBack"
export const MobileGuestsForm = ({ onChangeForm, onClearInputs, handleGuestsChanege }) => {
    return (
        <>
            <div className="margin40 flex gap10">
                <div onClick={() => onChangeForm('date')}><MobileGoBack /></div>
            </div>
            <GuestsPicking handleGuestsChanege={handleGuestsChanege} onClearInputs={onClearInputs} />
            <div className="btn flex justify-end">
                <button type="submit" onClick={() => onChangeForm('order')}>Search</button>
            </div>
        </>
    )
}