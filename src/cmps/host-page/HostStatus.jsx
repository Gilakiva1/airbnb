import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faDollarSign, faInfo, faHome } from '@fortawesome/free-solid-svg-icons';

export function HostStatus({ price, rate, status, guests }) {
    console.log('guesus', guests);
    return (
        <div className="cards-container flex space-between ">
            <div className="card-container guests round-edge">
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
            <div className="card-container rate round-edge">
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
            <div className="card-container price round-edge">
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
            <div className="card-container status round-edge">
                <div className="flex high column space-between  " >
                    <div className="flex space-between column">
                        <h1 className="wide book flex  justify-end fw-unset clr1 ">Status</h1>
                    </div>
                    <div className="status-info flex gap5">
                        <div className="circle approved">{status.Approved}</div>
                        <div className="circle pending">{status.Pending}</div>
                        <div className="circle declined">{status.Declined}</div>
                    </div>
                </div>
                <div className="icon-container flex align-center justify-center info">
                    <FontAwesomeIcon className="icon" icon={faInfo} />
                </div>
            </div>

        </div>

    )

}