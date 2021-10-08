import React from "react"
import { Link } from "react-router-dom"
import { utilService } from "../../services/util.service"

export function AppFooter() {

    const makeQueryParams = (city) => {
        const order = { address: city }
        return utilService.makeQueryParams(order)

    }

    if (window.innerWidth > 550) {
        return (
<div className="footer-container full">
            <footer className="main-footer main-container-home">
                <h2 className="footer-header fs30 fh40 bold">Explore the world</h2>
                <div className="links-container flex ">
                    <div className="flex column space-between">
                        <h3 className="footer-list-header fs22 fh26 book">Top rated</h3>
                        <div className="flex column gap5" >
                            <span>Stay name</span>
                            <span>Stay Address</span>
                        </div>
                        <div className="flex column gap5" >
                            <span>Stay name</span>
                            <span>Stay Address</span>
                        </div>
                        <div className="flex column gap5" >
                            <span>Stay name</span>
                            <span>Stay Address</span>
                        </div>
                        <div className="flex column gap5" >
                            <span>Stay name</span>
                            <span>Stay Address</span>
                        </div>
                        <div className="flex column gap5" >
                            <span>Stay name</span>
                            <span>Stay Address</span>
                        </div>
                        <div className="flex column gap5" >
                            <span>Stay name</span>
                            <span>Stay Address</span>
                        </div>
                    </div>
                    <div className="footer-links-container flex column space-between">
                    <h3 className="footer-list-header fs22 fh26 book">Most visited cities</h3>
                       <div><Link to={`/stay?${makeQueryParams('Bangkok')}`}>Bangkok</Link></div> 
                       <div><Link to={`/stay?${makeQueryParams('London')}`}>London</Link></div> 
                       <div><Link to={`/stay?${makeQueryParams('Barcelona')}`}>Barcelona</Link></div> 
                       <div><Link to={`/stay?${makeQueryParams('New York')}`}>New York</Link></div> 
                       <div> <Link to={`/stay?${makeQueryParams('Paris')}`}>Paris</Link></div>
                       <div><Link to={`/stay?${makeQueryParams('Bali')}`}>Bali</Link></div> 
                    </div>
                    <div className="flex column space-between">
                    <h3 className="footer-list-header fs22 fh26 book">Nearby</h3>
                        <div className="flex column gap5" >
                            <span>Stay name in Tel Aviv/Jerusalem</span>
                            <span>Tel Aviv/Jerusalem</span>
                        </div>
                        <div className="flex column gap5" >
                            <span>Stay name in Tel Aviv/Jerusalem</span>
                            <span>Tel Aviv/Jerusalem</span>
                        </div>
                        <div className="flex column gap5" >
                            <span>Stay name in Tel Aviv/Jerusalem</span>
                            <span>Tel Aviv/Jerusalem</span>
                        </div>
                        <div className="flex column gap5" >
                            <span>Stay name in Tel Aviv/Jerusalem</span>
                            <span>Tel Aviv/Jerusalem</span>
                        </div>
                        <div className="flex column gap5" >
                            <span>Stay name in Tel Aviv/Jerusalem</span>
                            <span>Tel Aviv/Jerusalem</span>
                        </div>
                        <div className="flex column gap5" >
                            <span>Stay name in Tel Aviv/Jerusalem</span>
                            <span>Tel Aviv/Jerusalem</span>
                        </div>
                    </div>
                </div>
                <div className="seperation-line"></div>
            </footer>
            </div>
        )
    } else {
        return (
            <footer className="main-footer-mobile main-container-home">
                <p>mini-fotter</p>
            </footer>
        )
    }
}

