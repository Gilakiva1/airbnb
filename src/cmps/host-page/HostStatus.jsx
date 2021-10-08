import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faDollarSign, faInfo, faHome } from '@fortawesome/free-solid-svg-icons';

export function HostStatus({ price, rate, status, guests }) {
    return (

        <div className="cards-container flex space-between round-edge">
            <div className="card-container rate">
                <div className="flex high justify-end " >
                    <div className="flex space-between column">
                        <h1 className="wide book fw-unset clr1 ">Total Rate</h1>
                        <span className="fs32 flex justify-center clr2">{rate || 0}</span>
                    </div>
                </div>
                <div className="icon-container flex align-center justify-center star">
                    <FontAwesomeIcon className="icon" icon={faStar} />
                </div>
            </div>
            <div className="card-container price">
                <div className="flex high justify-end " >
                    <div className="flex space-between column">
                        <h1 className="wide book fw-unset clr1 ">Revenue</h1>
                        <span className="fs32 flex justify-center clr2">${price}</span>
                    </div>
                </div>
                <div className="icon-container flex align-center justify-center dollar">
                    <FontAwesomeIcon className="icon" icon={faDollarSign} />
                </div>
            </div>
            <div className="card-container status">
                <div className="flex high justify-end " >
                    <div className="flex space-between column">
                        <h1 className="wide book fw-unset clr1 ">Status</h1>
                        <div className="status-info">
                            <h3>Approved: {status.Approved}</h3>
                            <h3>Pending: {status.Pending}</h3>
                            <h3>Declined: {status.Declined}</h3>
                        </div>
                    </div>
                </div>
                <div className="icon-container flex align-center justify-center info">
                    <FontAwesomeIcon className="icon" icon={faInfo} />
                </div>
            </div>
            <div className="card-container guests">
                <div className="flex high justify-end " >
                    <div className="flex space-between column">
                        <h1 className="wide book fw-unset clr1 ">Guests</h1>
                        <span className="fs32 flex justify-center clr2">{guests}</span>
                    </div>
                </div>
                <div className="icon-container flex align-center justify-center guests">
                    <FontAwesomeIcon className="icon" icon={faHome} />
                </div>
            </div>
        </div>

    )

}