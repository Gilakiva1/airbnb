
import React, { Component } from "react";
import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// import "~slick-carousel/slick/slick.css"; 
// import "~slick-carousel/slick/slick-theme.css";

export class SimpleSlider extends Component {
    render() {
        const { stay } = this.props
        const settings = {
            dots: false,
            infinite: true,
            arrows:true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        return (
            <Slider className='slider-img' {...settings}>
                {stay.imgUrls.map((stayImg, idx) => (
                    <div key={idx}>
                        <img src={stayImg} alt="" />
                    </div>
                ))}
            </Slider>
        );
    }
}
