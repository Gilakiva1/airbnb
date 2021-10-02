import React from "react"
import Media from 'react-media';

export function AppFooter() {
    if (window.innerWidth > 550) {


        return (

            <footer className="main-footer main-container-home">

                <div className="links-container">
                    <div className="top rated">
                    </div>
                    <div className="extra citis"> </div>
                    <div className="nearby"> </div>
                    <div className="about"> </div>
                </div>
            </footer>


        )
    } else {
        return (

            <footer className="main-footer-mobile main-container-home">
                <p>mini-fotter</p>
            </footer>
        )
    }
}

