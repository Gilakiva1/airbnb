import React from 'react'
import { PopularImgPreview } from '../home-page/PopularImgPreview'

export function LocationPicking({ links, onImgClick,screenWidth}) {

        return (
            <div className="popular-location-list flex column gap10 round-edge">
                
                <h3>Popular destinations:</h3>
                {links.map((location, idx) => <PopularImgPreview onImgClick={onImgClick} key={idx} link={location} idx={idx} />)}
            </div>
        )
    } 
    // else {
        // return (

        //     <div className="mobile-popular-container">
        //         <h3>Popular destinations:</h3>
        //         <ul className="mobile-list flex column">
        //             {links.map((location, idx) => <PopularImgPreview onImgClick={onImgClick} key={idx} link={location} idx={idx} />)}
        //         </ul>
        //     </div>
        // )

    
