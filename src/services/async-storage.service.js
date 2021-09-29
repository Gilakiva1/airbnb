

export const storageService = {
    query,
    get,
    post,
    put,
    remove,
    postMany
}

function query(entityType, params = {}) {

    var entities = JSON.parse(localStorage.getItem(entityType)) || dummyData
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
    console.log('entities?', entities);
    return new Promise((resolve, reject) => {
        resolve(entities)
    })  
}


function get(entityType, entityId) {
    console.log('entityType', entityType, 'entityId', entityId);
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
    imgUrls: ['https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large', 'https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large', 'https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large', 'https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large', 'https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large'],
    price: 80.00,
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
    tags: [ // the tags will contain a key word which the front will use to render the full tags to the stay
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
    imgUrls: ['https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large', 'https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large', 'https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large', 'https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large', 'https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large'],
    price: 70.00,
    summary: 'An amazing villa located right by the bitch',
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
    tags: [ // the tags will contain a key word which the front will use to render the full tags to the stay
        'entire to yourself',
        'enhanced clean',
        'super host',
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
    imgUrls: ['https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large', 'https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large'],
    price: 120.00,
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
    tags: [ // the tags will contain a key word which the front will use to render the full tags to the stay
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
    name: 'New York super apartment',
    imgUrls: ['https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large', 'https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large'],
    price: 80.00,
    summary: 'A big studio apartment, located right by the Times Saquare',
    description: 'The apartment is literally on TOP of the river as the photos can show. It\'s really comfortable, perfectly located and with the most perfect view. It is in a recently rebuilt building, with new construction materials and with is disposal on top of the river and its great windows you will have all the quiet you will need, near the most historic zone of the city.',
    type: 'apratment',
    capacity: 8,
    amenities: [
        'Unique',
        'TV',
        'Wifi',
        'Kitchen',
        'Smoking allowed',
        'Pets allowed',
        'Cooking basics'
    ],
    tags: [ // the tags will contain a key word which the front will use to render the full tags to the stay
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
    name: 'New York super apartment',
    imgUrls: ['https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large', 'https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large'],
    price: 80.00,
    summary: 'A big studio apartment, located right by the Times Saquare',
    description: 'The apartment is literally on TOP of the river as the photos can show. It\'s really comfortable, perfectly located and with the most perfect view. It is in a recently rebuilt building, with new construction materials and with is disposal on top of the river and its great windows you will have all the quiet you will need, near the most historic zone of the city.',
    type: 'apratment',
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
    tags: [ // the tags will contain a key word which the front will use to render the full tags to the stay
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
    rating: '4.4',
    likedByUserIds: ['u101', 'u102']

},
{
    _id: '10006219',
    name: 'New York super apartment',
    imgUrls: ['https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large', 'https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large'],
    price: 80.00,
    summary: 'A big studio apartment, located right by the Times Saquare',
    description: 'The apartment is literally on TOP of the river as the photos can show. It\'s really comfortable, perfectly located and with the most perfect view. It is in a recently rebuilt building, with new construction materials and with is disposal on top of the river and its great windows you will have all the quiet you will need, near the most historic zone of the city.',
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
    tags: [ // the tags will contain a key word which the front will use to render the full tags to the stay
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
    tags: [ // the tags will contain a key word which the front will use to render the full tags to the stay
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
    tags: [ // the tags will contain a key word which the front will use to render the full tags to the stay
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