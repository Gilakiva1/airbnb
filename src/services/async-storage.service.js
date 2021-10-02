import { de } from "date-fns/locale";
import user1 from '../assets/img/profiles/user1.png'

export const storageService = {
    query,
    get,
    post,
    put,
    remove,
    postMany

}

function query(entityType, params = {}) {
    let entities;

    if (entityType === 'stayDB') {

        entities = JSON.parse(localStorage.getItem(entityType)) || stays
        if (params.address) {
            params.address = params.address.split('-').join(' ')
            const regex = new RegExp(params.address, 'i');

            entities = entities.filter(entitie => {
                entitie.loc.address = entitie.loc.address.split('-').join(' ')
                return regex.test(entitie.loc.address)
            })
        }

        if (params.guests) {
            entities = entities.filter(entitie => {
                return entitie.capacity >= params.guests.adult + params.guests.child + params.guests.infant
            })
        }
    } 
    
   else if (entityType === 'orderDB') {
    entities = JSON.parse(localStorage.getItem(entityType)) || orders

   }
    else {
        entities = JSON.parse(localStorage.getItem(entityType)) || []

    }
    return new Promise((resolve, reject) => {
        resolve(entities)
    })

}


function get(entityType, entityId) {
    return query(entityType)
        .then(entities => entities.find(entity => entity._id === entityId))
}


function post(entityType, newEntity) {
    newEntity._id = _makeId()
    return query(entityType)
        .then(entities => {
            entities.push(newEntity)
            _save(entityType, entities)
            return newEntity
        })
}

function put(entityType, updatedEntity) {

    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity._id === updatedEntity._id)
            entities.splice(idx, 1, updatedEntity)
            _save(entityType, entities)
            return updatedEntity
        })
}



function remove(entityType, entityId) {
    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity._id === entityId)
            entities.splice(idx, 1)
            _save(entityType, entities)
        })
}


function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}




function _makeId(length = 5) {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}
// if (!filterBy) {
//     return new Promise((resolve, reject) => {
//         resolve(entities)
//     })
// }
// if (filterBy.checkin) {
//     entities = entities.filter(entitie => {
//        if (entitie.orders.forEach(order=>{
//         if (order)
//        })) return entitiy
//     })
// }
// if (params.price) {
//     entities = entities.filter(entitie => {
//         return entitie.price >= filterBy.price.minPrice && entitie.price <= filterBy.price.maxPrice
//     })
// }

function postMany(entityType, newEntities) {
    return query(entityType)
        .then(entities => {
            newEntities = newEntities.map(entity => ({
                ...entity,
                _id: _makeId()
            }))
            entities.push(...newEntities)
            _save(entityType, entities)
            return entities
        })
}

const stays = [{
    _id: '10006546',
    name: 'Ribeira Charming Duplex',
    imgUrls: ['https://a0.muscache.com/im/pictures/19699192/1db389e2_original.jpg?im_w=1200', 'https://a0.muscache.com/im/pictures/19699115/da835cad_original.jpg?im_w=720', 'https://a0.muscache.com/im/pictures/19699172/fcdea060_original.jpg?im_w=720', 'https://a0.muscache.com/im/pictures/19699165/665a1533_original.jpg?im_w=720', 'https://a0.muscache.com/im/pictures/19699218/ea3a4033_original.jpg?im_w=720'],
    price: 70,
    description: 'The apartment is literally on TOP of the river as the photos can show. It\'s really comfortable, perfectly located and with the most perfect view. It is in a recently rebuilt building, with new construction materials and with is disposal on top of the river and its great windows you will have all the quiet you will need, near the most historic zone of the city.',
    type: 'apretment',
    capacity: 8,
    amenities: [
        'TV',
        'Wifi',
        'Kitchen',
        'Smoking allowed',
        'Pets allowed',
        'Cooking basics'
    ],
    tags: [
        'entire to yourself',
        'enhanced clean',
        'self check-in',
        'free cancellation',
    ],
    host: {
        _id: '51399391',
        fullname: ' Davit Pok',
        imgUrl: user1,
    },
    orders: [
        {
            _id: 'u101',
            checkIn: '21.04.2021',
            checkOut: ' 25.04.2021'
        }],
    loc: {
        country: 'Portugal',
        countryCode: 'PT',
        address: ' Porto, Portugal',
        lat: -8.61308,
        lng: 41.1413,

    },
    reviews: [{
        id: '596587',
        txt: ' Very helpful hosts. Cooked traditional...',
        rate: 4,
        by: {
            _id: 'u101',
            fullname: 'gilli2',
            imgUrl: 'https://a0.muscache.com/defaults/user_pic-225x225.png?im_w=240',
            desc: 'Very central apartment, clean and quiet. Walking distance from anywhere, close to grocery stores and the beach, and the marketVery fast feedback from the host.We had a great time'
        },
        date: ' May 2015'
    },
    {
        id: '8gfj42',
        txt: ' Very helpful hosts. Cooked traditional...',
        rate: 4,
        by: {
            _id: 'u102',
            fullname: 'guy',
            imgUrl: 'https://a0.muscache.com/defaults/user_pic-225x225.png?im_w=240',
            desc: 'perfect for couples you are 5 minutesaway from everywherewe had a really good time!',
        },
        date: 'sep 2020',

    },
    {
        id: '8gkhjj',
        txt: ' Very helpful hosts. Cooked traditional...',
        rate: 5,
        by: {
            _id: 'u103',
            fullname: 'guy',
            imgUrl: 'https://a0.muscache.com/defaults/user_pic-225x225.png?im_w=240',
            desc: `The location is great!! Short walk to the beach, shopping center, restaurants etc.
            The host is super fast responding and can share tips about anything you would like to do in the city.
            The flat has all that one needs, including an espresso machine, big screen TV (for the kids) and a reliable WiFi connection.
            Recommended!`,
        },
        date: 'july 2020',

    }, {

        id: 'skdfj4',
        txt: ' Super nice location, very cosy room, Michael was very helpful. Fully recommended!',
        rate: 2,
        by: {
            _id: 'u104',
            fullname: 'omri',
            imgUrl: 'https://a0.muscache.com/defaults/user_pic-225x225.png?im_w=240',
            desc: 'Exactly what we looked for in a fair price. Clean easy and great Thanks a lot',
        },
        date: 'july 2020',


    }, {
        id: 'skdfj4',
        txt: 'great apartment in a great location.',
        rate: 3,
        by: {
            _id: 'u105',
            fullname: 'oded',
            imgUrl: 'https://a0.muscache.com/defaults/user_pic-225x225.png?im_w=240',
            desc: 'Amazing location with a great view from the balcony, sunset was beautiful. Walking distance to the market and beaches, apartment is a little basic but had everything I needed',
        },
        date: 'nov 2020',

    }, {
        id: 'skdfj4',
        txt: 'Perfect location, nice and clean. First time I get what I see in the photos, I asked the host if he sell the apartment... Lol',
        rate: 3,
        by: {
            _id: 'u105',
            fullname: 'shmulik',
            imgUrl: 'https://a0.muscache.com/defaults/user_pic-225x225.png?im_w=240',
            desc: `We enjoyed the cleanliness of the place. Excellent location. close to the beach and everything is within walking distance very convenient. Place was simple and we'll kept and Everything you need is in the room. We will definitely stay here again `,
        },
        date: 'nov 2020',
    }
    ],
    rating: '3.0',
    likedByUserIds: ['u101', 'u102']
},
{
    _id: '192838329',
    name: 'La villa - the best villa in Valencia',
    imgUrls: ['https://a0.muscache.com/im/pictures/59d90623-93d2-4397-b00e-c154b81863e0.jpg?im_w=1200', 'https://a0.muscache.com/im/pictures/4c777b12-0d84-4dea-b9fc-8b254156df7a.jpg?im_w=720', 'https://a0.muscache.com/im/pictures/86fff8ad-d4bd-4541-9e7d-35198ebc8a21.jpg?im_w=720', 'https://a0.muscache.com/im/pictures/11ea6006-b72b-4ccf-904a-f372a4e4c1fe.jpg?im_w=720', 'https://a0.muscache.com/im/pictures/337ee9b1-c85c-41cf-b35a-7dee477c7980.jpg?im_w=720'],
    price: 75,
    description: 'The apartment is literally on TOP of the river as the photos can show. It\'s really comfortable, perfectly located and with the most perfect view. It is in a recently rebuilt building, with new construction materials and with is disposal on top of the river and its great windows you will have all the quiet you will need, near the most historic zone of the city.',
    type: 'Villa',
    capacity: 12,
    amenities: [
        'Outdoor',
        'TV',
        'Wifi',
        'Kitchen',
        'Smoking allowed',
        'Pets allowed',
        'Cooking basics',
        'pool',
    ],
    tags: [
        'entire to yourself',
        'enhanced clean',
        'wifi',
        'free cancellation',
    ],
    host: {
        _id: '51329391',
        fullname: ' Davit puka',
        imgUrl: ' https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small',
    },
    orders: [{
        _id: 'u101',
        checkIn: '21.05.2021',
        checkOut: ' 25.05.2021'
    }],
    loc: {
        country: 'Spain',
        countryCode: 'ES',
        address: 'Valencia, Spain',
        lat: 39.466667,
        lng: -0.375000,
        city: 'Valencia'
    },
    rating: '4.6',
    reviews: [{
        id: 'madeId1',
        txt: ' Very helpful hosts. Cooked traditional...',
        rate: 4,
        by: {
            _id: 'u102',
            fullname: 'user2',
            imgUrl: '/img/img2.jpg'
        },
        date: 'May 2015'
    }],
    likedByUserIds: ['u101', 'u102']
},
{
    _id: '10006236',
    name: 'New York super apartment',
    imgUrls: ['https://a0.muscache.com/im/pictures/f31f4456-689b-484c-9921-d17d11cbba03.jpg?im_w=1200', 'https://a0.muscache.com/im/pictures/7ed58939-0f5a-4b95-9007-488b874f9bbf.jpg?im_w=720', 'https://a0.muscache.com/im/pictures/0c953537-c8dc-4af8-950c-f6eee116e766.jpg?im_w=720', 'https://a0.muscache.com/im/pictures/ca78ea26-4e61-4f2c-8842-d47469e79d88.jpg?im_w=720', 'https://a0.muscache.com/im/pictures/c2ab60d8-cb47-4c93-b2d0-bb1d04b709fd.jpg?im_w=720', 'https://a0.muscache.com/im/pictures/f31f4456-689b-484c-9921-d17d11cbba03.jpg?im_w=1200', 'https://a0.muscache.com/im/pictures/7ed58939-0f5a-4b95-9007-488b874f9bbf.jpg?im_w=720', 'https://a0.muscache.com/im/pictures/0c953537-c8dc-4af8-950c-f6eee116e766.jpg?im_w=720', 'https://a0.muscache.com/im/pictures/ca78ea26-4e61-4f2c-8842-d47469e79d88.jpg?im_w=720', 'https://a0.muscache.com/im/pictures/c2ab60d8-cb47-4c93-b2d0-bb1d04b709fd.jpg?im_w=720'],
    price: 120,
    description: 'The apartment is literally on TOP of the river as the photos can show. It\'s really comfortable, perfectly located and with the most perfect view. It is in a recently rebuilt building, with new construction materials and with is disposal on top of the river and its great windows you will have all the quiet you will need, near the most historic zone of the city.',
    type: 'apratment',
    capacity: 8,
    amenities: [
        'TV',
        'Wifi',
        'kitchen',
        'Smoke alarm',
        'long stay',
        'hangers'
    ],
    tags: [
        'entire to yourself',
        'enhanced clean',
        'self check-in',
        'free cancellation',
    ],
    host: {
        _id: '51392291',
        fullname: ' Davidi Pok',
        imgUrl: ' https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small',
    },
    orders: [{
        _id: 'u101',
        checkIn: '21.03.2021',
        checkOut: ' 25.03.2021'
    }],
    loc: {
        country: 'The United States',
        countryCode: 'USA',
        address: 'New York, USA',
        lat: 40.730610,
        lng: -73.935242,
        city: 'New York'
    },
    reviews: [{
        id: 'madeId3',
        txt: 'Very helpful hosts. Cooked traditional...',
        rate: 4,
        by: {
            _id: 'u102',
            fullname: 'user2',
            imgUrl: '/img/img2.jpg'
        },
        date: 'May 2015'
    }
    ],
    rating: '3.5',
    likedByUserIds: ['u101', 'u102']
},
{
    _id: '10126236',
    name: 'Steps from Times Square and Central Park',
    imgUrls: ['https://a0.muscache.com/im/pictures/38ddd214-a354-4484-9cde-b0edf8d71d50.jpg?im_w=1200', 'https://a0.muscache.com/im/pictures/9e6a3bc3-c16c-4883-9e19-26935366d9b9.jpg?im_w=720', 'https://a0.muscache.com/im/pictures/515e85d3-3319-4215-8461-c06d983180bf.jpg?im_w=720', 'https://a0.muscache.com/im/pictures/6d8a7e20-b17a-4229-9fd0-f43c167390d6.jpg?im_w=720', 'https://a0.muscache.com/im/pictures/37e4fa79-c9aa-4382-bd4b-c8850342c193.jpg?im_w=720'],
    price: 40,
    description: '280 square feet guest room with 37" Flat Screen TV, King Size Pillow-top Mattress with large Pillows and high thread count linens, spacious Work Desk with an Ergonomic Chair and a 2-Line Phone for your convenience.',
    type: 'room in the hotel',
    capacity: 4,
    amenities: [
        'Home',
        'TV',
        'Wifi',
        'Kitchen',
        'Smoking allowed',
        'Pets allowed',
        'Cooking basics'
    ],
    tags: [
        'entire to yourself',
        'enhanced clean',
        'great check-in',
        'free cancellation',
    ],
    host: {
        _id: '51392291',
        fullname: ' Davidi Pok',
        imgUrl: ' https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small',
    },
    orders: [{
        _id: 'u101',
        checkIn: '21.03.2021',
        checkOut: ' 25.03.2021'
    }],
    loc: {
        country: 'The United States',
        countryCode: 'USA',
        address: 'New York, USA',
        lat: 40.730610,
        lng: -73.935242,
        city: 'New York'
    },
    reviews: [{
        id: 'madeId3',
        txt: 'Very helpful hosts. Cooked traditional...',
        rate: 4,
        by: {
            _id: 'u102',
            fullname: 'user2',
            imgUrl: '/img/img2.jpg'
        },
        date: 'May 2015'
    }
    ],
    rating: '3.8',
    likedByUserIds: ['u101', 'u102']
},
{
    _id: '14916236',
    name: 'Beautiful Harlem loft off of Central Park',
    imgUrls: ['https://a0.muscache.com/im/pictures/ff1dbcf5-3f2b-4c2e-bd33-c3ce740be548.jpg?im_w=1200', 'https://a0.muscache.com/im/pictures/18c67c27-5c09-4bc1-9f18-5afa15e97075.jpg?im_w=720', 'https://a0.muscache.com/im/pictures/862a8457-5fe5-4c53-9567-15528f0590f1.jpg?im_w=720', 'https://a0.muscache.com/im/pictures/27919374-102b-47eb-ad2f-5f94ae670a79.jpg?im_w=720', 'https://a0.muscache.com/im/pictures/07aa5fe1-d411-4656-9b53-496cc80e0ebd.jpg?im_w=720'],
    price: 50,
    description: '280 square feet guest room with 37" Flat Screen TV, King Size Pillow-top Mattress with large Pillows and high thread count linens, spacious Work Desk with an Ergonomic Chair and a 2-Line Phone for your convenience.',
    type: 'room in the hotel',
    capacity: 4,
    amenities: [
        'Home',
        'TV',
        'Wifi',
        'Kitchen',
        'Smoking allowed',
        'Pets allowed',
        'Cooking basics'
    ],
    tags: [
        'entire to yourself',
        'enhanced clean',
        'great check-in',
        'free cancellation',
    ],
    host: {
        _id: '51392291',
        fullname: ' Davidi Pok',
        imgUrl: ' https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small',
    },
    orders: [{
        _id: 'u101',
        checkIn: '21.03.2021',
        checkOut: ' 25.03.2021'
    }],
    loc: {
        country: 'The United States',
        countryCode: 'USA',
        address: 'New York, USA',
        lat: 40.730610,
        lng: -73.935242,
        city: 'New York'
    },
    reviews: [{
        id: 'madeId3',
        txt: 'Very helpful hosts. Cooked traditional...',
        rate: 4,
        by: {
            _id: 'u102',
            fullname: 'user2',
            imgUrl: '/img/img2.jpg'
        },
        date: 'May 2015'
    }
    ],
    rating: '3',
    likedByUserIds: ['u101', 'u102']
},
{
    _id: '14990336',
    name: 'Cozy atrtist’s loft in prime Bed-stuy location',
    imgUrls: ['https://a0.muscache.com/im/pictures/1117e5c9-80b4-4d20-9f2f-5e96fdc1de4d.jpg?im_w=1200', 'https://a0.muscache.com/im/pictures/8549e2b0-fcc3-47f0-beee-cf11c82d8632.jpg?im_w=720', 'https://a0.muscache.com/im/pictures/e743ea39-01a8-402e-95e6-277dbe2104ed.jpg?im_w=720', 'https://a0.muscache.com/im/pictures/7694a084-4b94-4f5d-a5c5-de1cc69443d5.jpg?im_w=720', 'https://a0.muscache.com/im/pictures/b53e39db-912d-4ade-8ecc-51eae9d20e43.jpg?im_w=720'],
    price: 75,
    description: 'Spacious loft with unique tin walls and high ceilings in prime Brooklyn. The apartment has a single bedroom with attached bath, an open kitchen and living area with dedicated workspace. The apartment is a cozy landing place after a long day and centrally located for anyone looking for nightlife, art or great food. Blocks from transit and 10min to Manhattan.',
    type: 'room in the hotel',
    capacity: 5,
    amenities: [
        'Home',
        'TV',
        'Wifi',
        'Kitchen',
        'Smoking allowed',
        'Pets allowed',
        'Cooking basics'
    ],
    tags: [
        'entire to yourself',
        'enhanced clean',
        'great check-in',
        'free cancellation',
    ],
    host: {
        _id: '51392291',
        fullname: ' Davidi Pok',
        imgUrl: ' https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small',
    },
    orders: [{
        _id: 'u101',
        checkIn: '21.03.2021',
        checkOut: ' 25.03.2021'
    }],
    loc: {
        country: 'The United States',
        countryCode: 'USA',
        address: 'New York, USA',
        lat: 40.730610,
        lng: -73.935242,
        city: 'New York'
    },
    reviews: [{
        id: 'madeId3',
        txt: 'Very helpful hosts. Cooked traditional...',
        rate: 4,
        by: {
            _id: 'u102',
            fullname: 'user2',
            imgUrl: '/img/img2.jpg'
        },
        date: 'May 2015'
    }
    ],
    rating: '3.5',
    likedByUserIds: ['u101', 'u102']
},
{
    _id: '14990098',
    name: 'Bright, Private Bedroom in an NYC hot spot!',
    imgUrls: ['https://a0.muscache.com/im/pictures/fdb16273-fd94-4962-9f1e-b1223db56909.jpg?im_w=1200', 'https://a0.muscache.com/im/pictures/940a42f6-aed5-47e1-91ff-01061c3d2806.jpg?im_w=720', 'https://a0.muscache.com/im/pictures/0ecf976a-0888-479e-a5e6-944db889c85f.jpg?im_w=720', 'https://a0.muscache.com/im/pictures/d979348d-7d14-447a-8ac6-851ca3c3e672.jpg?im_w=720', 'https://a0.muscache.com/im/pictures/03b7954f-f5ad-41ce-812d-21de82969608.jpg?im_w=720'],
    price: 60,
    description: 'Bright, private bedroom in a 3 bedroom apartment in the Heart of Harlem. Besides the convenience of 2 different train lines on either side & the Metro North 2 blocks away, you’ll be downtown in minutes! Shake Shack is 30 seconds away, CVS, TJ Maxx, Victoria’s Secret, H&M, Bath & Bodyworks, Marshall’s, Starbucks and AMC are all within walking distance. Chipotle, Wing Stop, Whole Foods, Red Lobster, IHOP and local restaurants and bars are also in very close proximity.',
    type: 'privete room',
    capacity: 5,
    amenities: [
        'Home',
        'TV',
        'Wifi',
        'Kitchen',
        'Smoking allowed',
        'Pets allowed',
        'Cooking basics'
    ],
    tags: [
        'entire to yourself',
        'enhanced clean',
        'great check-in',
        'free cancellation',
    ],
    host: {
        _id: '51392291',
        fullname: ' Davidi Pok',
        imgUrl: ' https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small',
    },
    orders: [{
        _id: 'u101',
        checkIn: '21.03.2021',
        checkOut: ' 25.03.2021'
    }],
    loc: {
        country: 'The United States',
        countryCode: 'USA',
        address: 'New York, USA',
        lat: 40.730610,
        lng: -73.935242,
        city: 'New York'
    },
    reviews: [{
        id: 'madeId3',
        txt: 'Very helpful hosts. Cooked traditional...',
        rate: 4,
        by: {
            _id: 'u102',
            fullname: 'user2',
            imgUrl: '/img/img2.jpg'
        },
        date: 'May 2015'
    }
    ],
    rating: '3.5',
    likedByUserIds: ['u101', 'u102']
},
{

    _id: '10006100',
    name: 'Hudson River View King Bed at Higher Floor',
    imgUrls: ['https://a0.muscache.com/im/pictures/cbdb590e-03be-4538-a07d-16156dd810df.jpg?im_w=1200', 'https://a0.muscache.com/im/pictures/2c182ba4-1ad0-4aeb-9deb-b76aaa4ebaeb.jpg?im_w=720', 'https://a0.muscache.com/im/pictures/06d5536d-5522-481c-93b5-68993ed93a1c.jpg?im_w=720', 'https://a0.muscache.com/im/pictures/e7e0ffa8-8216-4154-b9b0-d49f0ef3c799.jpg?im_w=720', 'https://a0.muscache.com/im/pictures/da0a5877-6291-492e-8240-6fa9be865974.jpg?im_w=720'],
    price: 120,
    description: 'Our newly renovated 280 sqft room can offer unparalleled comfort, and special touches make all the difference. Relax, get some work done, and take full advantage of your stay.Your room charge and taxes has been taken prior to your arrival as a deposit. The remaining balance destination fee $40.17 per night will be charged upon arrival.',
    type: 'Room in the hotel',
    capacity: 4,
    amenities: [
        'Unique',
        'TV',
        'Wifi',
        'Kitchen',
        'Smoking allowed',
        'Pets allowed',
        'Cooking basics'
    ],
    tags: [
        'wifi',
        'enhanced clean',
        'great check-in',
        'free cancellation',
    ],
    host: {
        _id: '51392291',
        fullname: ' Davidi Pok',
        imgUrl: ' https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small',
    },
    orders: [
        {
            _id: 'u101',
            'check-in': '21.03.2021',
            'check-out': ' 25.03.2021'
        }
    ],
    loc: {
        country: 'The United States',
        countryCode: 'USA',
        address: 'New York, USA',
        lat: 40.730610,
        lng: -73.935242,
        city: 'New York'
    },
    reviews: [
        {
            id: 'madeId3',
            txt: 'Very helpful hosts. Cooked traditional...',
            rate: 4,
            by: {
                _id: 'u102',
                fullname: 'user2',
                imgUrl: '/img/img2.jpg'
            },
            date: 'May 2015'
        }
    ],
    rating: '3.9',
    likedByUserIds: ['u101', 'u102']

},
{
    _id: '10006212',
    name: 'Luxurious Bauhaus Suite - Carmel Market View!',
    imgUrls: ['https://a0.muscache.com/im/pictures/b781328f-3c39-4b46-a51f-0c4d8e30a7e5.jpg?im_w=1200', 'https://a0.muscache.com/im/pictures/ba33bf6a-0193-44e5-8f8e-236281ce79a0.jpg?im_w=720', 'https://a0.muscache.com/im/pictures/6f0716cb-68d0-4b94-a71e-c3140b84dfe5.jpg?im_w=720', 'https://a0.muscache.com/im/pictures/03dd1176-a4eb-4ee5-a48e-1d9d92df5f40.jpg?im_w=720', 'https://a0.muscache.com/im/pictures/5f8527e6-5ac9-4b22-a500-e7f9760e44ed.jpg?im_w=720'],
    price: 100,
    description: 'Welcome to one of the most special apartments in town – a stunning, super-chic Suite, with a private balcony and hot tub, both overlooking Carmel Market, Shenkin ST and Allenby ST – TLV\'s most iconic symbols, located at the heart of the city. This brand-new, fully-equipped Suite is just 5 minutes walk from the beach, and just next to the hottest restaurants, bars and nightclubs of TLV. Our Suite is the perfect starting point to an unforgettable, one-of-a-kind Tel Aviv experience The space',
    type: 'suite',
    capacity: 8,
    amenities: [
        'Outdoor',
        'Home',
        'TV',
        'Wifi',
        'Kitchen',
        'Smoking allowed',
        'Pets allowed',
        'Cooking basics'
    ],
    tags: [
        'entire to yourself',
        'enhanced clean',
        'self check-in',
        'free cancellation',
    ],
    host: {
        _id: '51392291',
        fullname: ' Davidi Pok',
        imgUrl: ' https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small',
    },
    orders: [
        {
            _id: 'u101',
            'check-in': '21.03.2021',
            'check-out': ' 25.03.2021'
        }
    ],
    loc: {
        country: 'Israel',
        countryCode: 'ISR',
        address: 'Tel-Aviv, Israel',
        lat: 32.109333,
        lng: 34.855499,
        city: 'Tel-Aviv'
    },
    reviews: [{
        id: '596587',
        txt: ' Very helpful hosts. Cooked traditional...',
        rate: {
            summery: 5,
            cleanliness: 3,
            communication: 5,
            checkin: 4,
            accuracy: 3,
            value: 5,
            location: 2


        },
        by: {
            _id: 'u101',
            fullname: 'gilli2',
            imgUrl: 'https://a0.muscache.com/defaults/user_pic-225x225.png?im_w=240',
            desc: 'Very central apartment, clean and quiet. Walking distance from anywhere, close to grocery stores and the beach, and the marketVery fast feedback from the host.We had a great time'
        },
        date: ' May 2015'
    },
    {
        id: '8gfj42',
        txt: ' Very helpful hosts. Cooked traditional...',
        rate: {
            summery: 5,
            cleanliness: 3,
            communication: 5,
            checkin: 4,
            accuracy: 3,
            value: 5,
            location: 2

        },
        by: {
            _id: 'u102',
            fullname: 'guy',
            imgUrl: 'https://a0.muscache.com/defaults/user_pic-225x225.png?im_w=240',
            desc: 'perfect for couples you are 5 minutesaway from everywherewe had a really good time!',
        },
        date: 'sep 2020',

    },
    {
        id: '8gkhjj',
        txt: ' Very helpful hosts. Cooked traditional...',
        rate: {
            summery: 5,
            cleanliness: 3,
            communication: 5,
            checkin: 4,
            accuracy: 3,
            value: 5,
            location: 2

        },
        by: {
            _id: 'u103',
            fullname: 'guy',
            imgUrl: 'https://a0.muscache.com/defaults/user_pic-225x225.png?im_w=240',
            desc: `The location is great!! Short walk to the beach, shopping center, restaurants etc.
            The host is super fast responding and can share tips about anything you would like to do in the city.
            The flat has all that one needs, including an espresso machine, big screen TV (for the kids) and a reliable WiFi connection.
            Recommended!`,
        },
        date: 'july 2020',

    }, {

        id: 'skdfj4',
        txt: ' Super nice location, very cosy room, Michael was very helpful. Fully recommended!',
        rate: {
            summery: 5,
            cleanliness: 3,
            communication: 5,
            checkin: 4,
            accuracy: 3,
            value: 5,
            location: 2

        },
        by: {
            _id: 'u104',
            fullname: 'omri',
            imgUrl: 'https://a0.muscache.com/defaults/user_pic-225x225.png?im_w=240',
            desc: 'Exactly what we looked for in a fair price. Clean easy and great Thanks a lot',
        },
        date: 'july 2020',


    }, {
        id: 'skdfj4',
        txt: 'great apartment in a great location.',
        rate: {
            summery: 5,
            cleanliness: 3,
            communication: 5,
            checkin: 4,
            accuracy: 3,
            value: 5,
            location: 2

        },
        by: {
            _id: 'u105',
            fullname: 'oded',
            imgUrl: 'https://a0.muscache.com/defaults/user_pic-225x225.png?im_w=240',
            desc: 'Amazing location with a great view from the balcony, sunset was beautiful. Walking distance to the market and beaches, apartment is a little basic but had everything I needed',
        },
        date: 'nov 2020',

    }, {
        id: 'skdfj4',
        txt: 'Perfect location, nice and clean. First time I get what I see in the photos, I asked the host if he sell the apartment... Lol',
        rate: {
            summery: 5,
            cleanliness: 3,
            communication: 5,
            checkin: 4,
            accuracy: 3,
            value: 5,
            location: 2

        },
        by: {
            _id: 'u105',
            fullname: 'shmulik',
            imgUrl: 'https://a0.muscache.com/defaults/user_pic-225x225.png?im_w=240',
            desc: `We enjoyed the cleanliness of the place. Excellent location. close to the beach and everything is within walking distance very convenient. Place was simple and we'll kept and Everything you need is in the room. We will definitely stay here again `,
        },
        date: 'nov 2020',
    }
    ],
    rating: '4.4',
    likedByUserIds: ['u101', 'u102']

},
{
    _id: '10006219',
    name: 'Margutta Luxury Loft',
    imgUrls: ['https://a0.muscache.com/im/pictures/prohost-api/Hosting-52502823/original/64662fc4-c2a9-4e40-a20e-9650c39f231c.jpeg?im_w=1200', 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-52502823/original/6bff3c69-9a11-4ff5-91b2-3c0d11ec8e62.jpeg?im_w=720', 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-52502823/original/2921e0f2-e82a-4641-afbc-772b152f94f8.jpeg?im_w=720', 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-52502823/original/2ddd0548-dd93-4993-b9da-aaa0b54c4023.jpeg?im_w=720', 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-52502823/original/c505b9cc-6d90-4fd5-8975-ae5b9996b450.jpeg?im_w=720'],
    price: 80.00,
    description: 'At the entrance, an intimate sitting area with armchairs and lush plants make up the scene for a relaxing break. You can also to enjoy spectacular view of the well-groomed gardens. This centrally located loft stands on 2 levels. The ground floor includes an open space living and dining room, as well as a fully equipped kitchen. You will also have access to a room with a single bed. On the upper level, you’ll find an open concept bedroom with a king size bed, a small bathroom, and a lovely terrace.',
    type: 'apratment',
    capacity: 8,
    amenities: [
        'TV',
        'Wifi',
        'Kitchen',
        'Smoking allowed',
        'Pets allowed',
        'Cooking basics'
    ],
    tags: [
        'entire to yourself',
        'enhanced clean',
        'great check-in',
        'free cancellation',
    ],
    host: {
        _id: '51392291',
        fullname: ' Davidi Pok',
        imgUrl: ' https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small',
    },
    orders: [
        {
            _id: 'u101',
            'check-in': '21.03.2021',
            'check-out': ' 25.03.2021'
        }
    ],
    loc: {
        country: 'Italy',
        countryCode: 'IT',
        address: 'Rome, Italy',
        lat: 41.902782,
        lng: 12.496366,
        city: 'Rome'
    },
    reviews: [
        {
            id: 'madeId3',
            txt: 'Very helpful hosts. Cooked traditional...',
            rate: 4,
            by: {
                _id: 'u102',
                fullname: 'user2',
                imgUrl: '/img/img2.jpg'
            },
            date: 'May 2015'
        }
    ],
    rating: '2',
    likedByUserIds: ['u101', 'u102']
},
{
    _id: '10006528',
    name: ' Ribeira Charming Duplex',
    imgUrls: ['https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large', 'https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large'],
    price: 80.00,
    description: 'The apartment is literally on TOP of the river as the photos can show. It\'s really comfortable, perfectly located and with the most perfect view. It is in a recently rebuilt building, with new construction materials and with is disposal on top of the river and its great windows you will have all the quiet you will need, near the most historic zone of the city.',
    type: 'apretment',
    capacity: 8,
    amenities: [
        'TV',
        'Wifi',
        'Kitchen',
        'Smoking allowed',
        'Pets allowed',
        'Cooking basics'
    ],
    tags: [
        'entire to yourself',
        'enhanced clean',
        'self check-in',
        'wifi',
    ],
    host: {
        _id: '51399391',
        fullname: ' Davit Pok',
        imgUrl: ' https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small',
    },
    orders: [
        {
            _id: 'u101',
            'check-in': '21.04.2021',
            'check-out': ' 25.04.2021'
        }
    ],
    loc: {
        country: 'Portugal',
        countryCode: 'PT',
        address: ' Porto, Portugal',
        lat: -8.61308,
        lng: 41.1413,

    },
    reviews: [
        {
            id: 'madeId',
            txt: ' Very helpful hosts. Cooked traditional...',
            rate: 4,
            by: {
                _id: 'u102',
                fullname: 'user2',
                imgUrl: 'https://a0.muscache.com/defaults/user_pic-225x225.png?im_w=240'
            },
            date: ' May 2015'
        }
    ],
    rating: '4',
    likedByUserIds: ['u101', 'u102']
}, {
    _id: '100065299',
    name: ' Ribeira Charming Duplex',
    imgUrls: ['https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large', 'https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large'],
    price: 80.00,
    description: 'The apartment is literally on TOP of the river as the photos can show. It\'s really comfortable, perfectly located and with the most perfect view. It is in a recently rebuilt building, with new construction materials and with is disposal on top of the river and its great windows you will have all the quiet you will need, near the most historic zone of the city.',
    type: 'apretment',
    capacity: 8,
    amenities: [
        'TV',
        'Wifi',
        'Kitchen',
        'Smoking allowed',
        'Pets allowed',
        'Cooking basics'
    ],
    tags: [
        'entire to yourself',
        'great check-in',
        'self check-in',
        'free cancellation',
    ],
    host: {
        _id: '51399391',
        fullname: ' Davit Pok',
        imgUrl: ' https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small',
    },
    orders: [
        {
            _id: 'u101',
            'check-in': '21.04.2021',
            'check-out': ' 25.04.2021'
        }
    ],
    loc: {
        country: 'Portugal',
        countryCode: 'PT',
        address: ' Porto, Portugal',
        lat: -8.61308,
        lng: 41.1413,

    },
    reviews: [
        {
            id: 'madeId',
            txt: ' Very helpful hosts. Cooked traditional...',
            rate: 4,
            by: {
                _id: 'u102',
                fullname: 'user2',
                imgUrl: 'https://a0.muscache.com/defaults/user_pic-225x225.png?im_w=240'
            },
            date: ' May 2015'
        }
    ],
    rating: '4',
    likedByUserIds: ['u101', 'u102']
},
{
    _id: '100065220',
    name: 'Dreamdien - walking distance to burj khalifa',
    imgUrls: ['https://a0.muscache.com/im/pictures/2d431b27-60b4-4c74-ade8-942947c41f94.jpg?im_w=1200', 'https://a0.muscache.com/im/pictures/4e626441-bba3-4665-bce0-f9dc82de8b86.jpg?im_w=720', 'https://a0.muscache.com/im/pictures/0beddb30-e674-44b5-bf21-4aa0e962cf23.jpg?im_w=720', 'https://a0.muscache.com/im/pictures/c73cd677-b139-419c-bad2-cb49f43ae36a.jpg?im_w=720', 'https://a0.muscache.com/im/pictures/15b2052c-cadb-470c-afd1-ef8353d1322a.jpg?im_w=720'],
    price: 120.00,
    description: 'Dreamdien - walking distance to burj khalifa',
    type: 'apretment',
    capacity: 8,
    amenities: [
        'TV',
        'Wifi',
        'Kitchen',
        'Smoking allowed',
        'Pets allowed',
        'Cooking basics'
    ],
    tags: [
        'entire to yourself',
        'great check-in',
        'self check-in',
        'free cancellation',
    ],
    host: {
        _id: '51399391',
        fullname: ' Davit Pok',
        imgUrl: ' https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small',
    },
    orders: [
        {
            _id: 'u101',
            'check-in': '21.04.2021',
            'check-out': ' 25.04.2021'
        }
    ],
    loc: {
        country: 'Dubai',
        countryCode: 'AE',
        address: 'Dubai, United Arab Emirates',
        lat: -8.61308,
        lng: 41.1413,

    },
    reviews: [
        {
            id: 'madeId',
            txt: ' Very helpful hosts. Cooked traditional...',
            rate: 4,
            by: {
                _id: 'u102',
                fullname: 'user2',
                imgUrl: 'https://a0.muscache.com/defaults/user_pic-225x225.png?im_w=240'
            },
            date: ' May 2015'
        }
    ],
    rating: '4',
    likedByUserIds: ['u101', 'u102']

},
{
    _id: '10006511231',
    name: 'Stylish Studio',
    imgUrls: ['https://a0.muscache.com/im/pictures/c56abcfe-412a-430e-b3f7-c5f987fb7cc8.jpg?im_w=960', 'https://a0.muscache.com/im/pictures/fc937112-48db-4467-addf-1b41cf53273b.jpg?im_w=720', 'https://a0.muscache.com/im/pictures/4d1c522f-1b1c-4890-95ae-b5234d403ad7.jpg?im_w=720', 'https://a0.muscache.com/im/pictures/ca51c1e4-0f51-40f0-8141-a29527b18d59.jpg?im_w=720', 'https://a0.muscache.com/im/pictures/8a8945ad-010e-475a-8f2e-9d192d7697e8.jpg?im_w=720'],
    price: 120.00,
    description: 'The Collective Canary Wharf is ideally located 10 minutes away from Canary Wharf with its cafes, pubs and bar and only a few stops away from The O2 arena. Historic Greenwich, ExCeL London, London City Airport and Central London are less than 20 minutes away via public transport.',
    type: 'Studio',
    capacity: 8,
    amenities: [
        'TV',
        'Wifi',
        'Kitchen',
        'Smoking allowed',
        'Pets allowed',
        'Cooking basics'
    ],
    tags: [
        'entire to yourself',
        'great check-in',
        'self check-in',
        'free cancellation',
    ],
    host: {
        _id: '51399391',
        fullname: ' The Collective Canary Wharf',
        imgUrl: ' https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small',
    },
    orders: [
        {
            _id: 'u101',
            'check-in': '21.04.2021',
            'check-out': ' 25.04.2021'
        }
    ],
    loc: {
        country: 'England',
        countryCode: 'PT',
        address: 'London, England',
        lat: -8.61308,
        lng: 41.1413,
    },
    reviews: [
        {
            id: 'madeId',
            txt: ' Very helpful hosts. Cooked traditional...',
            rate: 4,
            by: {
                _id: 'u102',
                fullname: 'user2',
                imgUrl: 'https://a0.muscache.com/defaults/user_pic-225x225.png?im_w=240'
            },
            date: ' May 2015'
        }
    ],
    rating: '4',
    likedByUserIds: ['u101', 'u102']

},
{
    _id: '100065112312',
    name: 'Beautiful room & private bathroom Alexandra Palace',
    imgUrls: ['https://a0.muscache.com/im/pictures/miso/Hosting-37173666/original/0a0899ec-c2a5-4386-8a0c-3ae7073ccf50.jpeg?im_w=720', 'https://a0.muscache.com/im/pictures/miso/Hosting-37173666/original/ba48f98f-feed-4a7a-8b96-55c5c232104b.jpeg?im_w=720', 'https://a0.muscache.com/im/pictures/miso/Hosting-37173666/original/48c75a7e-bba7-46cd-bdc0-ab64b2357a92.jpeg?im_w=720', 'https://a0.muscache.com/im/pictures/miso/Hosting-37173666/original/255fc283-ab2a-4320-ab95-840e5018c00b.jpeg?im_w=720', 'https://a0.muscache.com/im/pictures/miso/Hosting-37173666/original/f91308cc-5c46-4697-9dcd-f25910be34bc.jpeg?im_w=1200'],
    price: 50.00,
    description: 'Lovely light, spacious room in our split level apartment in a Victorian property. Kingsize bed, tea/coffee facilities in the room, 32inch Smart TV. Bathroom is adjacent to the room and for the exclusive use of guests. Perfect for Alexandra Palace which is only a 12 minute walk. Fantastic transport links - 7 minutes walk to Wood Green station, plus many shops.',
    type: 'Private room',
    capacity: 8,
    amenities: [
        'TV',
        'Wifi',
        'Kitchen',
        'Smoking allowed',
        'Pets allowed',
        'Cooking basics'
    ],
    tags: [
        'entire to yourself',
        'great check-in',
        'self check-in',
        'free cancellation',
    ],
    host: {
        _id: '51399391',
        fullname: 'Peta',
        imgUrl: ' https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small',
    },
    orders: [
        {
            _id: 'u101',
            'check-in': '21.04.2021',
            'check-out': ' 25.04.2021'
        }
    ],
    loc: {
        country: 'England',
        countryCode: 'PT',
        address: 'London, England',
        lat: -8.61308,
        lng: 41.1413,
    },
    reviews: [
        {
            id: 'madeId',
            txt: ' Very helpful hosts. Cooked traditional...',
            rate: 4,
            by: {
                _id: 'u102',
                fullname: 'user2',
                imgUrl: 'https://a0.muscache.com/defaults/user_pic-225x225.png?im_w=240'
            },
            date: ' May 2015'
        }
    ],
    rating: '4',
    likedByUserIds: ['u101', 'u102']

},
{
    _id: '1000651123132',
    name: 'Luxury Penthouse Suite with Heated Rooftop Pool',
    imgUrls: ['https://a0.muscache.com/im/pictures/b0fa86bd-45a2-442e-9cae-dd92e2861137.jpg?im_w=960', 'https://a0.muscache.com/im/pictures/28674585-af4f-4480-aefb-64781b33b1af.jpg?im_w=720', 'https://a0.muscache.com/im/pictures/5a71b408-da07-4fd5-b06c-9a021e911b34.jpg?im_w=720', 'https://a0.muscache.com/im/pictures/3468f0b4-3099-41d9-adb7-b98dbd757a40.jpg?im_w=720', 'https://a0.muscache.com/im/pictures/9380d531-d3b4-43e8-9079-d63d296fb588.jpg?im_w=720'],
    price: 300.00,
    description: 'Grab a drink from the trolley and head up to the heated glass bottom rooftop pool with a view in this exquisite London penthouse. Lounge around this chic open-plan space boasting skyline views, high-end designer furnishings, and floor-to-ceiling windows.',
    type: 'Condominium ',
    capacity: 8,
    amenities: [
        'TV',
        'Wifi',
        'Kitchen',
        'Smoking allowed',
        'Pets allowed',
        'Cooking basics'
    ],
    tags: [
        'entire to yourself',
        'great check-in',
        'self check-in',
        'free cancellation',
    ],
    host: {
        _id: '51399391',
        fullname: 'Chris & Jackie',
        imgUrl: ' https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small',
    },
    orders: [
        {
            _id: 'u101',
            'check-in': '21.04.2021',
            'check-out': ' 25.04.2021'
        }
    ],
    loc: {
        country: 'England',
        countryCode: 'PT',
        address: 'London, England',
        lat: -8.61308,
        lng: 41.1413,
    },
    reviews: [
        {
            id: 'madeId',
            txt: ' Very helpful hosts. Cooked traditional...',
            rate: 4,
            by: {
                _id: 'u102',
                fullname: 'user2',
                imgUrl: 'https://a0.muscache.com/defaults/user_pic-225x225.png?im_w=240'
            },
            date: ' May 2015'
        }
    ],
    rating: '4',
    likedByUserIds: ['u101', 'u102']

},
{
    _id: '1000651123122',
    name: 'Stunning Shoreditch Loft Conversion + Movie Screen',
    imgUrls: ['https://a0.muscache.com/im/pictures/7d2e0f9f-7f35-492d-80ce-0c8a0bac03d8.jpg?im_w=720', 'https://a0.muscache.com/im/pictures/monet/Select-19111137/original/c1f2e786-9732-4637-a76a-af754d427b13?im_w=720', 'https://a0.muscache.com/im/pictures/monet/Select-19111137/original/ed2f479b-e3da-4c7c-8faf-d4d1acd1a988?im_w=720', 'https://a0.muscache.com/im/pictures/monet/Select-19111137/original/9a35f440-deb6-48d5-afe8-e60fe88d10d5?im_w=720', 'https://a0.muscache.com/im/pictures/monet/Select-19111137/original/5a9b32f6-293f-4c8a-87a5-c493f01eb4d7?im_w=720'],
    price: 200.00,
    description: 'Lovely light, spacious room in our split level apartment in a Victorian property. Kingsize bed, tea/coffee facilities in the room, 32inch Smart TV. Bathroom is adjacent to the room and for the exclusive use of guests. Perfect for Alexandra Palace which is only a 12 minute walk. Fantastic transport links - 7 minutes walk to Wood Green station, plus many shops.',
    type: 'Condominium ',
    capacity: 8,
    amenities: [
        'TV',
        'Wifi',
        'Kitchen',
        'Smoking allowed',
        'Pets allowed',
        'Cooking basics'
    ],
    tags: [
        'entire to yourself',
        'great check-in',
        'self check-in',
        'free cancellation',
    ],
    host: {
        _id: '51399391',
        fullname: 'Peta',
        imgUrl: ' https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small',
    },
    orders: [
        {
            _id: 'u101',
            'check-in': '21.04.2021',
            'check-out': ' 25.04.2021'
        }
    ],
    loc: {
        country: 'England',
        countryCode: 'PT',
        address: 'London, England',
        lat: -8.61308,
        lng: 41.1413,
    },
    reviews: [
        {
            id: 'madeId',
            txt: ' Very helpful hosts. Cooked traditional...',
            rate: 4,
            by: {
                _id: 'u102',
                fullname: 'user2',
                imgUrl: 'https://a0.muscache.com/defaults/user_pic-225x225.png?im_w=240'
            },
            date: ' May 2015'
        }
    ],
    rating: '4',
    likedByUserIds: ['u101', 'u102']

}
]

const orders = [[
    {
      _id: "o1225",
      hostId: "u102",
      createdAt: '9898988989',
      buyer: {
        _id: "u101",
        fullname: "User 1"
      },
      totalPrice: 400,
      startDate: "2025/10/15",
      endDate: "2025/10/17",
      guests: {
        adult: 2,
        child: 1,
        infant: 0
      },
      stay: {
        _id: "1000651123122",
        name: "Stunning Shoreditch Loft Conversion + Movie Screen",
        price: 200
      },
      status: "pending"
    }    
  ],
]
