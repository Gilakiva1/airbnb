import { GuestsPicking } from "../header/GuestsPicking"
export const MobileGuestsForm = ({ onChangeForm, onGoBack, onClearInputs, handleGuestsChanege }) => {
    return (
        <form action="" onSubmit={(ev) => onChangeForm(ev, 'order')}>
            <div className="margin40 flex gap10">
                <button onClick={() => onGoBack('home')}></button>
            </div>
            <GuestsPicking handleGuestsChanege={handleGuestsChanege} />
            <div className="btn flex space-between">
                <button onClick={onClearInputs}>clear</button>
                <button type="submit" onClick={onChangeForm}>next</button>
            </div>
        </form>
    )
}