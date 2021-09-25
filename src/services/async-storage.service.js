export const storageService = {
    query,
    get,
    post,
    put,
    remove,
    postMany
}

function query(entityType, filterBy) {
    
    var entities = JSON.parse(localStorage.getItem(entityType)) || dummyData
    if (!filterBy.price) {
        return new Promise((resolve, reject) => {
            resolve(entities)
        })
    } else {
        const result = entities.filter(entitie => {
            return entitie.price >= filterBy.price.minPrice && entitie.price <= filterBy.price.maxPrice
        })
        return new Promise((resolve, reject) => {
            resolve(result)
        })
    }
    // re
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
    _id: 10006546,
    name: ' Ribeira Charming Duplex',
    imgUrls: ['https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large', 'otherImg.jpg'],
    price: 80.00,
    summary: ' Fantastic duplex apartment with three bedrooms, located in the historic area of Porto, Ribeira (Cube)...',
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
        'entire ($type of stay) to yourself',
        'enhanced clean',
        'self check-in',
        'free cancellation up to 48 hours before check-in',
    ],
    host: {
        _id: 51399391,
        fullname: ' Davit Pok',
        imgUrl: ' https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small',
    },
    avelability: [
        {
            _id: 'u101',
            'check-in': '21.04.2021',
            'check-out': ' 25.04.2021'
        }],
        loc: {
            country: 'Portugal',
            countryCode: 'PT',
            address: ' Porto, Portugal',
            lat: -8.61308,
            lng: 41.1413
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
        likedByUserIds: ['u101', 'u102']
    },
    {
        _id: 192838329,
        name: 'La villa - the best villa in Valencia',
        imgUrls: ['https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large', 'otherImg.jpg'],
        price: 70.00,
        summary: 'An amazing villa located right by the bitch',
        type: 'Villa',
        capacity: 12,
        amenities: [
            'TV',
            'Wifi',
            'Kitchen',
            'Smoking allowed',
            'Pets allowed',
            'Cooking basics',
            'pool',
        ],
        tags: [ // the tags will contain a key word which the front will use to render the full tags to the stay
            'entire place to yourself',
            'enhanced clean',
            'super host', 'free cancellation up to 48 hours before check-in',
        ],
        host: {
            _id: 51329391,
            fullname: ' Davit puka',
            imgUrl: ' https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small',
        },
        avelability: [{
            _id: 'u101',
            'check-in': '21.05.2021',
            'check-out': ' 25.05.2021'
        }],
        loc: {
            country: 'Spain',
            countryCode: 'ES',
            address: 'Valencia, Spain',
            lat: 39.466667,
            lng: -0.375000
        },
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
        _id: 10006236,
        name: 'New York super apartment',
        imgUrls: ['https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large', 'otherImg.jpg'],
        price: 80.00,
        summary: 'A big studio apartment, located right by the Times Saquare',
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
            'entire apartment to yourself',
            'enhanced clean',
            'self check-in',
            'free cancellation up to 48 hours before check-in',
        ],
        host: {
            _id: 51392291,
            fullname: ' Davidi Pok',
            imgUrl: ' https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small',
        },
        avelability: [{
            _id: 'u101',
            'check-in': '21.03.2021',
            'check-out': ' 25.03.2021'
        }],
        loc: {
            country: 'The United States',
            countryCode: 'USA',
            address: 'New York, USA',
            lat: 40.730610,
            lng: -73.935242
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
    likedByUserIds: ['u101', 'u102']
},
{
    _id: 10006100,
    name: 'New York super apartment',
    imgUrls: ['https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large', 'otherImg.jpg'],
    price: 80.00,
    summary: 'A big studio apartment, located right by the Times Saquare',
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
        'entire apartment to yourself',
        'enhanced clean',
        'self check-in',
        'free cancellation up to 48 hours before check-in',
    ],
    host: {
        _id: 51392291,
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
        lng: -73.935242
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
    likedByUserIds: ['u101', 'u102']

},
{
    _id: 10006212,
    name: 'New York super apartment',
    imgUrls: ['https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large', 'otherImg.jpg'],
    price: 80.00,
    summary: 'A big studio apartment, located right by the Times Saquare',
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
        'entire apartment to yourself',
        'enhanced clean',
        'self check-in',
        'free cancellation up to 48 hours before check-in',
    ],
    host: {
        _id: 51392291,
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
        lng: -73.935242
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
    likedByUserIds: ['u101', 'u102']

},
{
    _id: 10006219,
    name: 'New York super apartment',
    imgUrls: ['https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large', 'otherImg.jpg'],
    price: 80.00,
    summary: 'A big studio apartment, located right by the Times Saquare',
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
        'entire apartment to yourself',
        'enhanced clean',
        'self check-in',
        'free cancellation up to 48 hours before check-in',
    ],
    host: {
        _id: 51392291,
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
        lng: -73.935242
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
    likedByUserIds: ['u101', 'u102']
},
{
    _id: 10006528,
    name: ' Ribeira Charming Duplex',
    imgUrls: ['https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large', 'otherImg.jpg'],
    price: 80.00,
    summary: ' Fantastic duplex apartment with three bedrooms, located in the historic area of Porto, Ribeira (Cube)...',
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
        'entire ($type of stay) to yourself',
        'enhanced clean',
        'self check-in',
        'free cancellation up to 48 hours before check-in',
    ],
    host: {
        _id: 51399391,
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
        lng: 41.1413
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
    likedByUserIds: ['u101', 'u102']
},{
    _id: 100065299,
    name: ' Ribeira Charming Duplex',
    imgUrls: ['https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large', 'otherImg.jpg'],
    price: 80.00,
    summary: ' Fantastic duplex apartment with three bedrooms, located in the historic area of Porto, Ribeira (Cube)...',
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
        'entire ($type of stay) to yourself',
        'enhanced clean',
        'self check-in',
        'free cancellation up to 48 hours before check-in',
    ],
    host: {
        _id: 51399391,
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
        lng: 41.1413
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
    likedByUserIds: ['u101', 'u102']

}

]