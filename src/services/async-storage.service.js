

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

        entities = JSON.parse(localStorage.getItem(entityType)) || dummyData
        if (params.address) {
            const regex = new RegExp(params.address, 'i');
            entities = entities.filter(entitie => {
                return regex.test(entitie.loc.address)
            })
        }

        if (params.guests) {
            entities = entities.filter(entitie => {
                return entitie.capacity >= params.guests.adult + params.guests.child + params.guests.infant
            })
        }  
        if (params.guests) {
            entities = entities.filter(entitie => {
                return entitie.capacity >= params.guests.adult + params.guests.child + params.guests.infant
            })
        }
    } else {
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
// if (filterBy.checkIn) {
//     entities = entities.filter(entitie => {
//        if (entitie.avelability.forEach(order=>{
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

const dummyData = [{
    _id: '10006546',
    name: 'Ribeira Charming Duplex',
    imgUrls: ['https://a0.muscache.com/im/pictures/19699192/1db389e2_original.jpg?im_w=1200', 'https://a0.muscache.com/im/pictures/19699115/da835cad_original.jpg?im_w=720', 'https://a0.muscache.com/im/pictures/19699172/fcdea060_original.jpg?im_w=720', 'https://a0.muscache.com/im/pictures/19699165/665a1533_original.jpg?im_w=720', 'https://a0.muscache.com/im/pictures/19699218/ea3a4033_original.jpg?im_w=720'],
    price: 70,
    summary: 'Fantastic duplex apartment with three bedrooms, located in the historic area of Porto, Ribeira (Cube)...',
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
        imgUrl: ' https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small',
    },
    avelability: [
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
        city: 'Porto'
    },
    reviews: [{
        id: 'madeId',
        txt: ' Very helpful hosts. Cooked traditional...',
        rate: 4,
        by: {
            _id: 'u102',
            fullname: 'user2',
            imgUrl: ' /img/img2.jpg'
        },
        date: ' May 2015'
    }],
    rating: '4.8',
    likedByUserIds: ['u101', 'u102']
},
{
    _id: '192838329',
    name: 'La villa - the best villa in Valencia',
    imgUrls: ['https://a0.muscache.com/im/pictures/59d90623-93d2-4397-b00e-c154b81863e0.jpg?im_w=1200', 'https://a0.muscache.com/im/pictures/4c777b12-0d84-4dea-b9fc-8b254156df7a.jpg?im_w=720', 'https://a0.muscache.com/im/pictures/86fff8ad-d4bd-4541-9e7d-35198ebc8a21.jpg?im_w=720', 'https://a0.muscache.com/im/pictures/11ea6006-b72b-4ccf-904a-f372a4e4c1fe.jpg?im_w=720', 'https://a0.muscache.com/im/pictures/337ee9b1-c85c-41cf-b35a-7dee477c7980.jpg?im_w=720'],
    price: 75,
    summary: 'An amazing villa located right at the city center',
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
    avelability: [{
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
    imgUrls: ['https://a0.muscache.com/im/pictures/f31f4456-689b-484c-9921-d17d11cbba03.jpg?im_w=1200', 'https://a0.muscache.com/im/pictures/7ed58939-0f5a-4b95-9007-488b874f9bbf.jpg?im_w=720','https://a0.muscache.com/im/pictures/0c953537-c8dc-4af8-950c-f6eee116e766.jpg?im_w=720','https://a0.muscache.com/im/pictures/ca78ea26-4e61-4f2c-8842-d47469e79d88.jpg?im_w=720','https://a0.muscache.com/im/pictures/c2ab60d8-cb47-4c93-b2d0-bb1d04b709fd.jpg?im_w=720'],
    price: 120,
    summary: 'A big studio apartment, located right by the Times Saquare',
    description: 'The apartment is literally on TOP of the river as the photos can show. It\'s really comfortable, perfectly located and with the most perfect view. It is in a recently rebuilt building, with new construction materials and with is disposal on top of the river and its great windows you will have all the quiet you will need, near the most historic zone of the city.',
    type: 'apratment',
    capacity: 8,
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
        'self check-in',
        'free cancellation',
    ],
    host: {
        _id: '51392291',
        fullname: ' Davidi Pok',
        imgUrl: ' https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small',
    },
    avelability: [{
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
    imgUrls: ['https://a0.muscache.com/im/pictures/cbdb590e-03be-4538-a07d-16156dd810df.jpg?im_w=1200', 'https://a0.muscache.com/im/pictures/2c182ba4-1ad0-4aeb-9deb-b76aaa4ebaeb.jpg?im_w=720','https://a0.muscache.com/im/pictures/06d5536d-5522-481c-93b5-68993ed93a1c.jpg?im_w=720','https://a0.muscache.com/im/pictures/e7e0ffa8-8216-4154-b9b0-d49f0ef3c799.jpg?im_w=720','https://a0.muscache.com/im/pictures/da0a5877-6291-492e-8240-6fa9be865974.jpg?im_w=720'],
    price: 120,
    summary: 'Enjoy the beautiful Hudson River View from 20th Floor and above!',
    description: 'Our newly renovated 280 sqft room can offer unparalleled comfort, and special touches make all the difference. Relax, get some work done, and take full advantage of your stay.Your room charge and taxes has been taken prior to your arrival as a deposit. The remaining balance destination fee $40.17 per night will be charged upon arrival.',
    type: 'Room in an hotel',
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
    avelability: [
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
    imgUrls: ['https://a0.muscache.com/im/pictures/b781328f-3c39-4b46-a51f-0c4d8e30a7e5.jpg?im_w=1200', 'https://a0.muscache.com/im/pictures/ba33bf6a-0193-44e5-8f8e-236281ce79a0.jpg?im_w=720','https://a0.muscache.com/im/pictures/6f0716cb-68d0-4b94-a71e-c3140b84dfe5.jpg?im_w=720','https://a0.muscache.com/im/pictures/03dd1176-a4eb-4ee5-a48e-1d9d92df5f40.jpg?im_w=720','https://a0.muscache.com/im/pictures/5f8527e6-5ac9-4b22-a500-e7f9760e44ed.jpg?im_w=720'],
    price: 100,
    summary: 'Luxurious Bauhaus Suite - Carmel Market View!',
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
    avelability: [
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
    rating: '4.4',
    likedByUserIds: ['u101', 'u102']

},
{
    _id: '10006219',
    name: 'Margutta Luxury Loft',
    imgUrls: ['https://a0.muscache.com/im/pictures/prohost-api/Hosting-52502823/original/64662fc4-c2a9-4e40-a20e-9650c39f231c.jpeg?im_w=1200', 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-52502823/original/6bff3c69-9a11-4ff5-91b2-3c0d11ec8e62.jpeg?im_w=720','https://a0.muscache.com/im/pictures/prohost-api/Hosting-52502823/original/2921e0f2-e82a-4641-afbc-772b152f94f8.jpeg?im_w=720','https://a0.muscache.com/im/pictures/prohost-api/Hosting-52502823/original/2ddd0548-dd93-4993-b9da-aaa0b54c4023.jpeg?im_w=720','https://a0.muscache.com/im/pictures/prohost-api/Hosting-52502823/original/c505b9cc-6d90-4fd5-8975-ae5b9996b450.jpeg?im_w=720'],
    price: 80.00,
    summary: 'An amazing and very romantic loft at the heart of Rome',
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
    avelability: [
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
        lat:  41.902782,
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
    summary: ' Fantastic duplex apartment with three bedrooms, located in the historic area of Porto, Ribeira (Cube)...',
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
    avelability: [
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
        city: 'Porto'
    },
    reviews: [
        {
            id: 'madeId',
            txt: ' Very helpful hosts. Cooked traditional...',
            rate: 4,
            by: {
                _id: 'u102',
                fullname: 'user2',
                imgUrl: ' /img/img2.jpg'
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
    summary: ' Fantastic duplex apartment with three bedrooms, located in the historic area of Porto, Ribeira (Cube)...',
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
    avelability: [
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
        city: 'Porto'
    },
    reviews: [
        {
            id: 'madeId',
            txt: ' Very helpful hosts. Cooked traditional...',
            rate: 4,
            by: {
                _id: 'u102',
                fullname: 'user2',
                imgUrl: ' /img/img2.jpg'
            },
            date: ' May 2015'
        }
    ],
    rating: '4',
    likedByUserIds: ['u101', 'u102']

}
]
