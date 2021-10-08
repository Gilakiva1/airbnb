const names = {
    villa: [
        `Best villa in ${loc.city}`,
        `Villa Delarosa`,
        `Beautiful villa 5 minutes from the center of ${loc.city}`,
        `Villa El Amor - the most romentic villa in ${loc.city}`,
        `Villa Mi Casa - the biggest in all of ${loc.city}`,
        `Villa Camelia`,
        `Villa La Rossa`
    ],
    apartment: [
        `Beautiful apartment 5 minutes from the center of ${loc.city}`,
        `Big cozy apartment at the center of ${loc.city}`,
        `Well furnitured apartment 5 minitues from the action of ${loc.city}`,
        `Big apartment with a view to ${loc.city} skyline`,
        `Stunning apartment next to ${loc.city} main attractions`,
        `Cute & cozy at the heart of ${loc.city}`
    ],
    studio: [
        `Big studio apartment with a view to ${loc.city} skyline`,
        `Beautiful studio apartment at the center of  ${loc.city}`,
        `Cozy studio apartment 5 minitues from the action of ${loc.city}`,
        `Beautiful and well furnitured studio at the center of  ${loc.city}`,
        `Feel like home - cozy studio at beautiful ${loc.city}`,
        `Cute & cozy at the heart of ${loc.city}`
    ],
    roomInHotel: [
        `Luxury suite at the top of Daniel hotel`,
        `Big room at Hilton hotel at the center of  ${loc.city}`,
        `All included room at the Charleton hotel`,
        `Beautiful room at hotel Jhonson - the best hotel at ${loc.city}`,
        `Big private room at the Plaza hotel`
    ],
    home: [
        `Your very own home in ${loc.city}`,
        `Big house with a big graden a short walk from ${loc.city} center`,
        `Big and cozy 2 stores house at ${loc.city} center`,
        `Feel like a local with a big house with a great location at ${loc.city}`,
    ],
}

const descriptions = {
    villa: [
        `We are located near the center of ${loc.city}, the transportation is very convenient. The neighboring restaurants are great, if you love Asian food, definitely try it out :)`,
        `Big Villa with several bedrooms and guests rooms, located right next to the main attractions of the city at a quiet spot so you can enjoy both.Pets and small children are welcome but we would like a forhand notice. The villa has a nice pool and a big yard with a fully equipped grill that you are welcome to use.`,
        `Each room including the upstairs kitchen has a flat screen smart TV and the spacious main living room features a 65" flat screen TV. Both living rooms double as a luxury second bedrooms and the upstairs living room features its own private closet with plenty of shelf space for storing and hanging clothes and personal items. Some key features of the living rooms are a cozy sofa and love seat for ample seating, and last but not least the sofa-beds have been specifically selected for optimal comfort rivaling any good traditional bed. The master bedroom features a brand new queen bed with a memory foam mattress while the downstairs Queen bed offers a brand new ultra plush pillow-top mattress and all beds have been specially selected for your comfort, these rooms also feature ample storage space for your clothing and personal effects, as well as a work desk with Printer; perfect for catching up on your after-hours work. The brand new kitchens feature modern "high end" appliances including a gas ovens and ranges, convection microwave, whisper silent
        dishwashers, and large refrigerators; these are kitchens that a chef would envy. There is no comparison for a vacation rental anywhere in the city, this is simply "The Best"!`,
        `Our house and home where we live too is a spectacular and very large villa with a huge garden. It is perfect for families or groups of friends wanting to get away from the city yet visit Madrid easily and return to peace and nature. The biggest attractions are the private pool, the bbq and private parking. The area is affluent in a very quiet and leafy neighbourhood. It's important to come with a car. We have 2 pets, Pippa, our miniature dachsund and Phoebe, our practically invisible cat.`,
    ],
    apartment: [
        'The perfect Airbnb for any occasion. This is an entire compact basement studio to yourself. Its a self check in Airbnb through your own private entrance. Equipped with a 70” 4K TV with 4k Netflix, wireless 4.1 sound bar system with subwoofer, mini kitchen area, full size refrigerator and coffee maker. The entire above floor has been soundproofed via new floor underlayment for this Airbnb but keep it reasonable with the sound/woofer level.',
        'Find rest and relaxation in this beautiful, fully renovated 1-bedroom apartment located minutes away the Airport! Whether you are looking for a short layover or a long getaway, look no further. This humble abode has everything you need and more!',
        `Fill your ${loc.city} City experience with color at Battery Park. See a different view of the ever-changing city in every direction at every season. Catch a glimpse of green to golden to white-covered trees amidst the shimmering skyscrapers. Step from the terrace into the co-working space or either of the two lounges, where pops of sunflower, mint, and blood orange glass are grounded by warm wooden fittings. Work up a sweat on your very own Peloton bike in our select apartments or with free access to ${loc.city}  Sports Clubs FiDi. Take a moment to rest and refresh in your colorfully accented space. And then venture out to sample the city offerings up close`,
        ' Whole private apartment, PERFECT FOR STAYCATION OR LOVERS RETREAT, close to everything, but away from everything too, 55 inch HD TV, King size bed. Your own private entrance and own private kitchen. Your own Private backyard.',
        `Private studio apartment in house. Ideal for single or couple stay. Beautifully furnished studio apartment(sub level 6’4” ceiling) located in a safe residential neighborhood in ${loc.city}. Walkable to bus, supermarkets and a few cultural cuisines. Access to backyard and private entrance. Close to the airport. One block away from the center of the city.`,
        `This is a very cozy studio apartment in the heart of ${loc.city}. If you haven't visited ${loc.city} before, the local avenues are just around the corner! Bus staiton just 2 blocks away. Offering a cozy stay, the bed pulls out of the wall, so you can have the open space if you need. Heated floor for even a cozier stay!`
    ],
    studio: [
        'The perfect Airbnb for any occasion. This is an entire compact basement studio to yourself. Its a self check in Airbnb through your own private entrance. Equipped with a 70” 4K TV with 4k Netflix, wireless 4.1 sound bar system with subwoofer, mini kitchen area, full size refrigerator and coffee maker. The entire above floor has been soundproofed via new floor underlayment for this Airbnb but keep it reasonable with the sound/woofer level.',
        'Kick back and relax in this calm, stylish space. Studio with kitchen, space base a stove but no oven. There is a bedroom used for storage, it will be locked unoccupied so you’ll have it all to yourself.',
        `Kick back and relax in this calm, stylish space. Panoramic view from Rooftop to ${loc.city} Skyline. Best sunsets!`,
        'This bright, sunny “tiny home”-styled studio apartment is in the most convenient location for quick access to every borough while feeling like a cozy local in a cabin perched above the bustle.',
        `Spacious studio apartment with unique tin walls and high ceilings. The apartment has a bedroom with attached bath, an open kitchen and living area with dedicated workspace. The apartment is a cozy landing place after a long day and centrally located for anyone looking for nightlife, art or great food. Blocks from transit and 10min to ${loc.city} center.`,
       ' SERENE 3rd floor LOFT in BRICK TOWNHOUSE, ENTIRE APARTMENT, PRIVATE KITCHEN, PRIVATE BATHROOM, and SPACIOUS QUEEN SIZE BED. 65 inch 4K HD TV, LARGE SKYLIGHT for lots of natural light during the day. Great for a VACATION or STAYCATION.'
    ],
    roomInHotel: [
        `We are located near the center of ${loc.city}, the transportation is very convenient. All rooms are equipped with a mini-fridge, a kettle, a 50 inch 4k TV and a microwave. The hotel has 2 amazing restaurants but the neighboring restaurants are also great, if you love Asian food definitely try it out :)`,
        `Enjoy the beautiful ${loc.city} View from 20th Floor and above!
        Our newly renovated 280 sqft room can offer unparalleled comfort, and special touches make all the difference. Relax, get some work done, and take full advantage of your stay.`,
        `Relax in out Timeless European Designed Rooms made for the modern-day traveler seeking comfort and style.

        Located in the hub of bustling downtown ${loc.city} in the Financial District, our rooms feature breath-taken City Views!
        
        All rooms feature a large 55" TV and a mini fridge.
        
        We are easily accessible and walking distance to all the city has to offer.`,
        `- Must-visit shops, eateries & sights are right on your doorstep.
        - Smart design & refined style flow throughout this contemporary atmosphere.
        - Rendezvous at the hotel restaurant & bar & savor killer city views from the rooftop terrace.`,
        `Designed forthe modern-day traveler seeking comfort and style, The Hotel puts guests in the heart of the trend-setting Lower East Side. Overlooking the iconic ${loc.city} views, the buildingdraws its inspiration from the pioneering spirit of its engineer, Leon Moisseiff.`
    ],
    home: [
        `We are located near the center of ${loc.city}, the transportation is very convenient. The neighboring restaurants are great, if you love Asian food, definitely try it out :)`,
        'This unique place has a style all its own. Location! Location!! Location!!! Double Corner Lot (13,015 sq. ft. )!!! Step into this modern and spacious 4 Bedroom, 3.5 baths home. West of the Parkway on a private tree-lined cul-de-sac along the road to Wave Hill. This home was designed to offer the enjoyment of indoor and outdoor living and entertaining.',
        'Each room including the upstairs kitchen has a flat screen smart TV and the spacious main living room features a 65" flat screen TV. Both living rooms double as a luxury second bedrooms and the upstairs living room features its own private closet with plenty of shelf space for storing and hanging clothes and personal items. Some key features of the living rooms are a cozy sofa and love seat for ample seating, and last but not least the sofa-beds have been specifically selected for optimal comfort rivaling any good traditional bed. The master bedroom features a brand new queen bed with a memory foam mattress while the downstairs Queen bed offers a brand new ultra plush pillow-top mattress and all beds have been specially selected for your comfort, these rooms also feature ample storage space for your clothing and personal effects, as well as a work desk with Printer; perfect for catching up on your after-hours work. The brand new kitchens feature modern "high end" appliances including a gas ovens and ranges, convection microwave, whisper silent dishwashers, and large refrigerators; these are kitchens that a chef would envy. There is no comparison for a vacation rental anywhere in the city, this is simply "The Best"!',
        'Our house and home where we live too is spectacular and very large with a huge garden. It is perfect for families or groups of friends wanting to get away from the city yet visit Madrid easily and return to peace and nature. The biggest attractions are the private pool, the bbq and private parking. The area is affluent in a very quiet and leafy neighbourhood. It\'s important to come with a car. We have 2 pets, Pippa, our miniature dachsund and Phoebe, our practically invisible cat.'
    ],
}