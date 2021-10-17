import { GuestsPicking } from "../header/GuestsPicking"
import { MobileGoBack } from "../svgs/MobileGoBack"
export const MobileGuestsForm = ({ onChangeForm, onClearInputs, handleGuestsChanege, order, getDateValue }) => {
    const guests = order.guests.child + order.guests.infant + order.guests.adult
    const checkIn = getDateValue(order.checkIn)
    const checkOut = getDateValue(order.checkOut)
    return (
        <>
            <div className="margin40 flex gap10">
                <div onClick={() => onChangeForm('date')}><MobileGoBack /></div>
                <div className="order-container wide fh22">
                    {order.address &&
                        <div className="address flex justify-center">
                            <h1>{order.address[0].toUpperCase() + order.address.substring(1)}</h1>
                        </div>}
                    {checkOut &&
                        <div className="dates flex justify-center align-center">
                            <span className="fs12 clr1">{checkIn}</span>-
                            <span className="fs12 clr1">{checkOut}</span>
                        </div>}
                    <div className="guests flex justify-center gap10">
                        <h1 className="fw-unset">Guests:</h1>
                        <span>{guests}</span>
                    </div>
                </div>
            </div>
            <GuestsPicking handleGuestsChanege={handleGuestsChanege} onClearInputs={onClearInputs} />
            <div className="btn flex justify-end">
                <button className="btn-search book" type="submit" onClick={() => onChangeForm('order')}>Search</button>
            </div>
        </>
    )
}