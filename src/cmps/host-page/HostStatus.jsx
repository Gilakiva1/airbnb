import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faDollarSign, faInfo, faHome } from '@fortawesome/free-solid-svg-icons';

export function HostStatus({ price, rate, status, activeGuests }) {
    return (
        <div className="cards-container flex space-between ">
            <div className="card-container guests round-edge">
                <div className=" high justify-end " >
                    <div className="space-between column">
                        <h1 className="wide book fw-unset clr1 justify-end">Active Guests</h1>
                    </div>
                    <div className="img-guest-container relative flex justify-end">
                        {activeGuests.map((guest, idx) => (
                            <div key={idx} className={`img guest-${idx} ${idx > 0 ? 'absolute ' : ''}flex justify-center`}>
                                <img src={guest} className="border-circle" />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="icon-container flex align-center justify-center guests">
                    <FontAwesomeIcon className="icon" icon={faHome} />
                </div>
            </div>
            <div className="card-container rate round-edge">
                <div className="flex high justify-end">
                    <div className="flex space-between column">
                        <h1 className="wide book fw-unset clr1 ">Avg Rate</h1>
                        <div className="flex align-center gap10 justify-center align-center">
                            <FontAwesomeIcon className="icon star-red" icon={faStar} />
                            <span className="fs32 flex justify-center clr2">{rate || 0}</span>
                        </div>
                    </div>
                </div>
                <div className="icon-container flex align-center justify-center star">
                    <FontAwesomeIcon className="icon" icon={faStar} />
                </div>
            </div>
            <div className="card-container price round-edge">
                <div className="flex high justify-end " >
                    <div className="flex space-between column">
                        <h1 className="wide book fw-unset clr1 ">Month Revenue</h1>
                        <span className="fs32 flex justify-end clr2">${price}</span>
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
                    <div className="status-info flex space-between gap5">
                        <div className="flex align-center bcg green ">
                            <h3 className="fs14">Approved {status.Approved}</h3>
                        </div>
                        <div className="flex align-center bcg yellow">
                            <h3 className="fs14">Pending {status.Pending}</h3>
                        </div>
                        <div className="flex align-center bcg red">
                            <h3 className="fs14">Declined {status.Declined}</h3>
                        </div>
                    </div>
                </div>
                <div className="icon-container flex align-center justify-center info">
                    <FontAwesomeIcon className="icon" icon={faInfo} />
                </div>
            </div>

        </div>

    )

}