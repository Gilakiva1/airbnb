
import React, { Component } from "react";
import Slider from "react-slick";


export default class SimpleSlider extends Component {
    render() {
        const {stay} = this.props 
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        return (
            <div>
                <h2> Single Item</h2>
                <Slider {...settings}>
                   {stay.imgUrls.map((stayImg,idx) => {
                       console.log('stayImg',stayImg);
                       <div key={idx}>
                       <img src={stayImg}/>
                       </div>
                   })}
                </Slider>
            </div>
        );
    }
}
