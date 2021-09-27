
import React, { Component } from "react";
import Slider from "react-slick";


export default class SimpleSlider extends Component {
    render() {
        const { stay } = this.props
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        return (
            <Slider {...settings}>
                {stay.imgUrls.map((stayImg, idx) => (
                    <div key={idx}>
                        <img src={stayImg} />
                    </div>
                ))}
            </Slider>
        );
    }
}
