import imgTelAviv from '../assets/img/home-page/tel-aviv-yafo.jpg'
import imgLondon from '../assets/img/home-page/london.jpg'
import imgParis from '../assets/img/home-page/paris.jpg'
import imgAmsterdam from '../assets/img/home-page/amsterdam.jpg'
import imgDubai from '../assets/img/home-page/dubai.jpg'
import imgNewYork from '../assets/img/home-page/new york.jpg'
import imgHongKong from '../assets/img/home-page/hong kong.jpg'
import imgBangkok from '../assets/img/home-page/bangkok.jpg'
import imgOutdoor from '../assets/img/home-page/outdoor.jpg'
import imgPets from '../assets/img/home-page/pets.jpg'
import imgUnique from '../assets/img/home-page/unique.jpg'
import imgHome from '../assets/img/home-page/home.jpg'


export const utilService = {
    makeId,
    makeLorem,
    getRandomIntInclusive,
    delay,
    makeQueryParams,
    HomePageImgPopular,
    HomePageImgLabels,
    getQueryParams
}
function HomePageImgPopular() {

    return [
        { city: 'Tel aviv', country: 'Israel', img: imgTelAviv, },
        { city: 'London', country: 'England', img: imgLondon },
        { city: 'Bangkok', country: 'Thailand', img: imgBangkok },
        { city: 'Paris', country: 'France', img: imgParis },
        { city: 'Dubai', country: 'United Arab Emirates', img: imgDubai },
        { city: 'new york', country: 'United States of America', img: imgNewYork },
        { city: 'Amsterdam', country: 'Netherlands', img: imgAmsterdam },
        { city: 'Hong-kong', country: 'China', img: imgHongKong }
    ]
}
function HomePageImgLabels() {
    return [
        { value: 'outdoor', label: 'Outdoor getaways', img: imgOutdoor },
        { value: 'unique', label: 'Unique Stays', img: imgUnique },
        { value: 'home', label: 'Entires homes', img: imgHome },
        { value: 'pets', label: 'Pets Allowd', img: imgPets }
    ]
}


function makeId(length = 6) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return txt;
}

function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn'];
    var txt = '';
    while (size > 0) {
        size--;
        txt += words[Math.floor(Math.random() * words.length)] + ' ';
    }
    return txt;
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

function delay(ms = 1500) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}
function makeQueryParams(criteria) {
    let queryString = Object.entries(criteria).reduce((acc, [key, value], idx, arr) => {
        if (typeof value === 'object') {
            acc += Object.entries(value).reduce((acc, [key, value], idx, arr) => {
                acc += key + '=' + value
                if (idx < arr.length - 1) acc += '&'
                return acc
            }, '')
        } else {
            acc += key + '=' + value
        }
        if (idx < arr.length - 1) acc += '&'
        return acc
    }, '');
    return queryString
}

function getQueryParams(params) {
    let newParams = {}
    for (let [key, value] of params) {
        if (key === 'adult') {
            newParams.guests = {}
        }
        if (key === 'adult' || key === 'child' || key === 'infant') {
            newParams.guests[key] = +value
        } else {
            newParams[key] = value
        }
    } 
    return newParams

}


