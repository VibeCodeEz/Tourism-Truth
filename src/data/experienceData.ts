import type { Destination, DestinationKey, PlaceExperience, TravelTypeOption } from '@/types/models'

export const travelTypes: TravelTypeOption[] = [
  {
    id: 'Solo Traveler',
    title: 'Solo Traveler',
    description: 'Move at your own tempo with reflective prompts, cinematic facts, and confident solo challenges.',
    supportCopy: 'Best when you want a self-paced route with reflective reveals and independent photo moments.',
    toneLabel: 'Quietly cinematic',
    accent: 'from-azure/30 via-royal/20 to-transparent',
    iconKey: 'compass',
  },
  {
    id: 'With Companion',
    title: 'With Companion',
    description: 'Perfect for siblings or friends who want playful conversation starters while exploring.',
    supportCopy: 'Ideal for two-person days where the route should feel social, easy, and naturally conversational.',
    toneLabel: 'Light and social',
    accent: 'from-gold/30 via-blush/15 to-transparent',
    iconKey: 'sparkles',
  },
  {
    id: 'Group Traveler',
    title: 'Group Traveler',
    description: 'A social version of the experience with high-energy dares and shared moments to capture.',
    supportCopy: 'Built for a louder group rhythm with faster choices, more reactions, and crowd-friendly energy.',
    toneLabel: 'High-energy',
    accent: 'from-azure/30 via-blush/15 to-transparent',
    iconKey: 'users',
  },
  {
    id: 'Couple Traveler',
    title: 'Couple Traveler',
    description: 'Soft, intimate prompts designed for memorable travel stories and lighthearted chemistry.',
    supportCopy: 'Designed for softer pacing, shared perspective, and little moments that feel worth remembering.',
    toneLabel: 'Softly intimate',
    accent: 'from-blush/30 via-gold/15 to-transparent',
    iconKey: 'heart',
  },
]

export const destinations: Destination[] = [
  {
    key: 'intramuros',
    name: 'Intramuros',
    tagline: 'Stone walls, sunset walks, and centuries of layered history.',
    description: 'The signature free experience. Wander the old city and unlock truths, dares, and heritage details.',
    imagePath: '/asset/destinations/intramuros.jpg',
    location: 'Manila, Philippines',
    premiumOnly: false,
    accent: 'from-gold/35 via-royal/20 to-transparent',
    iconKey: 'castle',
    highlight: '12 curated places',
  },
  {
    key: 'binondo',
    name: 'Binondo',
    tagline: 'Flavor trails, heritage streets, and the pulse of the world’s oldest Chinatown.',
    description: 'Premium access opens food-forward dares and culture-rich facts across Manila’s most iconic district.',
    imagePath: '/asset/destinations/binondo.png',
    location: 'Manila, Philippines',
    premiumOnly: true,
    accent: 'from-blush/35 via-gold/15 to-transparent',
    iconKey: 'utensils',
    highlight: 'Premium destination',
  },
  {
    key: 'ilocos',
    name: 'Ilocos',
    tagline: 'Wind, stone, and northern coastlines that feel monumental.',
    description: 'Premium travelers get scenic prompts and heritage discoveries from one of the country’s most cinematic regions.',
    imagePath: '/asset/destinations/Ilocos.jpg',
    location: 'Northern Luzon, Philippines',
    premiumOnly: true,
    accent: 'from-azure/30 via-blush/15 to-transparent',
    iconKey: 'mountain',
    highlight: 'Premium destination',
  },
  {
    key: 'boracay',
    name: 'Boracay',
    tagline: 'Soft sand, bright water, and playful beach energy after dark.',
    description: 'Premium access unlocks postcard-perfect facts and social dares built for a coastal getaway mood.',
    imagePath: '/asset/destinations/boracay.jpg',
    location: 'Aklan, Philippines',
    premiumOnly: true,
    accent: 'from-azure/35 via-gold/15 to-transparent',
    iconKey: 'palmtree',
    highlight: 'Premium destination',
  },
]

export const placeExperiences: PlaceExperience[] = [
  {
    id: 'fort-santiago',
    destinationKey: 'intramuros',
    name: 'Fort Santiago',
    shortDescription: 'Spanish-era fortress with dramatic gates, gardens, and the Rizal Shrine.',
    detail: 'One of the most important historical sites in the Philippines and a former military stronghold during the Spanish colonial era.',
    truth:
      'Truth: Fort Santiago became one of the most symbolic sites in Philippine history because Jose Rizal spent his final days here before his execution.',
    funFact:
      'Fun fact: The footsteps embedded near the Rizal Shrine trace the path José Rizal is believed to have taken on his way to his final trial of fate.',
    dares: [
      'Pose like you are guarding the old walls and take one dramatic fortress photo.',
      'Describe Fort Santiago in exactly three powerful words and record it as a quick voice note.',
      'Find one stone detail or carving and point it out to your group like a tour host.',
    ],
    iconKey: 'fortress',
    accent: 'from-gold/30 via-royal/15 to-transparent',
  },
  {
    id: 'san-agustin-church',
    destinationKey: 'intramuros',
    name: 'San Agustin Church',
    shortDescription: 'A Baroque landmark and the oldest stone church in the Philippines.',
    detail: 'Built in 1607, this UNESCO-recognized church is known for ornate interiors and centuries of resilience.',
    truth:
      'Truth: San Agustin Church survived multiple earthquakes and wars, making it one of the rare colonial structures that still anchors Manila’s historic core.',
    funFact:
      'Fun fact: The church ceiling looks richly sculpted, but many of its grand architectural details are actually painted trompe-l’oeil illusions.',
    dares: [
      'Take a photo that frames the facade from the lowest angle you can manage safely.',
      'Whisper your best one-line movie trailer voice-over for the church entrance.',
      'Spot one decorative detail on the facade and explain why it feels timeless.',
    ],
    iconKey: 'church',
    accent: 'from-gold/25 via-blush/15 to-transparent',
  },
  {
    id: 'san-agustin-museum',
    destinationKey: 'intramuros',
    name: 'San Agustin Museum',
    shortDescription: 'A quiet collection of religious art, colonial objects, and old manuscripts.',
    detail: 'Located beside the church, the museum reveals layers of spiritual and colonial history through preserved artifacts.',
    truth:
      'Truth: The museum’s cloisters and collections help show how faith, art, and record-keeping shaped daily life during the Spanish period.',
    funFact:
      'Fun fact: Some of the museum’s exhibits include centuries-old choir books so large they could be read by an entire group during worship.',
    dares: [
      'Choose one object that feels mysterious and give it a cinematic title.',
      'Walk three slow steps like you are entering a sacred archive, then freeze for a photo.',
      'Tell your companion which artifact you would protect first if you were the museum curator.',
    ],
    iconKey: 'archive',
    accent: 'from-royal/25 via-azure/15 to-transparent',
  },
  {
    id: 'manila-cathedral',
    destinationKey: 'intramuros',
    name: 'Manila Cathedral',
    shortDescription: 'Grand Romanesque architecture with soaring arches and luminous interiors.',
    detail: 'Also known as the Minor Basilica of the Immaculate Conception, it stands as one of Intramuros’s most recognizable landmarks.',
    truth:
      'Truth: The cathedral has been rebuilt several times across the centuries, turning survival itself into part of its story.',
    funFact:
      'Fun fact: The bronze doors of Manila Cathedral feature relief panels that narrate major moments from its long religious history.',
    dares: [
      'Take one respectful wide shot that captures the cathedral’s scale and symmetry.',
      'Describe the facade as if you are pitching it as a film location in one sentence.',
      'Find one arch or line that guides the eye upward and point it out dramatically.',
    ],
    iconKey: 'landmark',
    accent: 'from-gold/25 via-royal/15 to-transparent',
  },
  {
    id: 'casa-manila',
    destinationKey: 'intramuros',
    name: 'Casa Manila',
    shortDescription: 'A recreated Spanish colonial residence showing elite domestic life.',
    detail: 'This carefully reconstructed house illustrates how affluent Filipinos lived during the Spanish colonial period.',
    truth:
      'Truth: Casa Manila is designed to feel lived-in, so its furniture and room layouts help visitors imagine the social rituals of a colonial household.',
    funFact:
      'Fun fact: Casa Manila’s interiors were arranged using period-appropriate furniture to recreate how a wealthy ilustrado family might have hosted guests.',
    dares: [
      'Strike your best old-world portrait pose and take a photo worthy of a heritage magazine.',
      'Pick one room detail and explain how it would change your house today.',
      'Introduce yourself like a 19th-century host welcoming guests into Casa Manila.',
    ],
    iconKey: 'building',
    accent: 'from-blush/25 via-gold/15 to-transparent',
  },
  {
    id: 'baluarte-de-san-diego',
    destinationKey: 'intramuros',
    name: 'Baluarte de San Diego',
    shortDescription: 'A circular fortification framed by gardens and historic stonework.',
    detail: 'Popular with photographers, this site blends military history with one of the most visually striking spaces in Intramuros.',
    truth:
      'Truth: Baluarte de San Diego’s unusual shape came from layers of reconstruction, making it both an archaeological and defensive landmark.',
    funFact:
      'Fun fact: The lush garden setting around the fort makes it one of the most unexpectedly romantic corners of old Manila.',
    dares: [
      'Find the most dramatic garden-to-stone contrast and capture it in one photo.',
      'Do a slow 360-degree turn and name the first word that matches the vibe.',
      'Challenge your group to vote whether the fort feels more regal, mysterious, or cinematic.',
    ],
    iconKey: 'fortress',
    accent: 'from-azure/25 via-blush/15 to-transparent',
  },
  {
    id: 'walls-of-intramuros',
    destinationKey: 'intramuros',
    name: 'Walls of Intramuros',
    shortDescription: 'Walkable stone ramparts with elevated views across the old city.',
    detail: 'The ramparts once formed part of the city’s defense system and now offer one of the best historical walks in Manila.',
    truth:
      'Truth: The walls were engineered for defense, but today their most powerful effect is emotional. They let visitors feel the scale of the old city.',
    funFact:
      'Fun fact: Sunset on the ramparts is a favorite for photographers because the warm light softens the heavy stone into something almost golden.',
    dares: [
      'Walk ten steady steps like you are on a historic watch patrol and film the view.',
      'Describe the sunset or skyline using only three poetic words.',
      'Point out one angle where the walls feel most massive and take a perspective shot.',
    ],
    iconKey: 'map',
    accent: 'from-gold/20 via-azure/15 to-transparent',
  },
  {
    id: 'puerta-real-gardens',
    destinationKey: 'intramuros',
    name: 'Puerta Real Gardens',
    shortDescription: 'A landscaped retreat near one of the old entrances to the walled city.',
    detail: 'Quiet, open, and easy on the eyes, the gardens create a softer counterpoint to Intramuros’s heavier stone architecture.',
    truth:
      'Truth: Puerta Real Gardens shows that historic districts are not only about monuments. They also rely on calm public spaces that invite pause.',
    funFact:
      'Fun fact: The garden’s name connects it to a royal gate, reinforcing how ceremonial and strategic entry points once shaped city life.',
    dares: [
      'Take your calmest postcard-style photo in the gardens.',
      'Name one song that would fit the mood of this space and explain why.',
      'Find one peaceful corner and give it a custom nickname like a secret travel spot.',
    ],
    iconKey: 'sparkles',
    accent: 'from-azure/20 via-gold/15 to-transparent',
  },
  {
    id: 'plaza-roma',
    destinationKey: 'intramuros',
    name: 'Plaza Roma',
    shortDescription: 'The central square where major civic and religious landmarks converge.',
    detail: 'Surrounded by Manila Cathedral, Ayuntamiento, and Palacio del Gobernador, this plaza has long been a symbolic urban center.',
    truth:
      'Truth: Plaza Roma worked as a social and civic heart of Intramuros, where the architecture around it reflected power, faith, and governance.',
    funFact:
      'Fun fact: The plaza’s central monument has changed over time, mirroring how public memory shifts with each generation.',
    dares: [
      'Stand at the center and spin once to choose which landmark gets your next photo.',
      'Pitch Plaza Roma as a perfect meeting point in one memorable line.',
      'Ask your travel partner which surrounding building feels most iconic and compare answers.',
    ],
    iconKey: 'landmark',
    accent: 'from-gold/20 via-blush/15 to-transparent',
  },
  {
    id: 'ayuntamiento-de-manila',
    destinationKey: 'intramuros',
    name: 'Ayuntamiento de Manila',
    shortDescription: 'A stately government building with refined colonial lines.',
    detail: 'Its symmetry and scale make it one of the most photogenic civic structures inside Intramuros.',
    truth:
      'Truth: Ayuntamiento de Manila represents how administrative architecture was designed to project order, authority, and permanence.',
    funFact:
      'Fun fact: The building’s elegant facade makes many visitors assume it is a palace before learning its governmental role.',
    dares: [
      'Take a perfectly centered shot that emphasizes the building’s symmetry.',
      'Deliver a one-sentence speech as if you are addressing the city from the front steps.',
      'Spot one architectural feature that makes the building feel official and explain it.',
    ],
    iconKey: 'building',
    accent: 'from-royal/20 via-gold/15 to-transparent',
  },
  {
    id: 'bahia-de-manila',
    destinationKey: 'intramuros',
    name: 'Bahia de Manila',
    shortDescription: 'A nearby Manila Bay detour famous for luminous sunset scenes.',
    detail: 'A short walk from Intramuros leads to one of the city’s most beloved waterfront moods.',
    truth:
      'Truth: Manila Bay sunsets are part weather, part geography, and part ritual. Locals return again and again because the light always feels slightly new.',
    funFact:
      'Fun fact: On the right evening, the bay turns into a mirror of orange, pink, and violet layers that change minute by minute.',
    dares: [
      'Capture the sky and water in one frame without using a zoom.',
      'Describe the sunset like a food critic describing a dessert.',
      'Record your first reaction the moment the sky starts glowing.',
    ],
    iconKey: 'sun',
    accent: 'from-gold/20 via-blush/15 to-transparent',
  },
  {
    id: 'kalesa-ride',
    destinationKey: 'intramuros',
    name: 'Kalesa Ride Experience',
    shortDescription: 'A traditional horse-drawn ride through one of the oldest districts in Manila.',
    detail: 'The kalesa remains one of the most recognizable ways to absorb the rhythm and romance of Intramuros.',
    truth:
      'Truth: The kalesa is more than a photo prop. It is a living reminder of older urban mobility and the layered heritage economy inside Intramuros.',
    funFact:
      'Fun fact: Riding a kalesa changes your pace completely, which makes the city’s textures feel more theatrical and immersive.',
    dares: [
      'Give your best elegant arrival wave as if the kalesa is taking you to a gala.',
      'Name your imaginary kalesa route like it is a luxury travel package.',
      'Tell your group one reason exploring slowly can reveal more than rushing.',
    ],
    iconKey: 'carriage',
    accent: 'from-gold/20 via-royal/15 to-transparent',
  },
  {
    id: 'ongpin-street',
    destinationKey: 'binondo',
    name: 'Ongpin Street',
    shortDescription: 'The buzzing food and commerce spine of Binondo.',
    detail: 'Ongpin is where old storefronts, snack stops, and everyday city energy combine into a sensory overload in the best way.',
    truth:
      'Truth: Ongpin Street reflects how Binondo’s identity is carried not just by monuments but by active trade, food rituals, and street movement.',
    funFact:
      'Fun fact: Many visitors measure their Binondo experience by how many snack stops they can squeeze into a single street walk.',
    dares: [
      'Choose one stall or shopfront and give it a travel-show style introduction.',
      'Name the street vibe in three words before taking your next step.',
      'Capture one photo that feels busy without looking chaotic.',
    ],
    iconKey: 'utensils',
    accent: 'from-blush/25 via-gold/15 to-transparent',
  },
  {
    id: 'binondo-church',
    destinationKey: 'binondo',
    name: 'Binondo Church',
    shortDescription: 'A historic church at the heart of the district.',
    detail: 'Officially Minor Basilica and National Shrine of Saint Lorenzo Ruiz, it stands as a spiritual anchor in Chinatown.',
    truth:
      'Truth: Binondo Church represents the overlap of faith, migration, and local identity in one of Manila’s oldest communities.',
    funFact:
      'Fun fact: The church is closely associated with Saint Lorenzo Ruiz, the first Filipino saint.',
    dares: [
      'Take a respectful front-facing photo that balances the church with surrounding city life.',
      'Say one thing that makes this church feel different from the others you have visited.',
      'Spot one detail that blends solemnity with the energy of Binondo outside.',
    ],
    iconKey: 'church',
    accent: 'from-gold/25 via-blush/15 to-transparent',
  },
  {
    id: 'jones-bridge',
    destinationKey: 'binondo',
    name: 'Jones Bridge',
    shortDescription: 'A revived bridge with lamps and river views that feel unexpectedly European.',
    detail: 'It connects Binondo to the rest of old Manila with one of the city’s most photogenic urban vistas.',
    truth:
      'Truth: Jones Bridge shows how infrastructure can become part of a city’s identity when design, river views, and memory meet in one place.',
    funFact:
      'Fun fact: The bridge’s ornate lamp posts and nighttime glow turned it into a frequent backdrop for portraits and reels.',
    dares: [
      'Take one photo that makes the bridge feel like a travel scene abroad.',
      'Do a slow walk for five seconds like you are in a city montage.',
      'Name the river-view mood in one dramatic adjective.',
    ],
    iconKey: 'bridge',
    accent: 'from-royal/25 via-azure/15 to-transparent',
  },
  {
    id: 'paoay-church',
    destinationKey: 'ilocos',
    name: 'Paoay Church',
    shortDescription: 'A UNESCO-recognized church famous for its massive buttresses.',
    detail: 'This landmark is one of the finest examples of Earthquake Baroque architecture in the Philippines.',
    truth:
      'Truth: Paoay Church was designed to endure seismic activity, which is why its side buttresses look so boldly sculptural.',
    funFact:
      'Fun fact: The church’s silhouette is so distinct that many travelers recognize it even before they remember its name.',
    dares: [
      'Take a side-angle photo that shows just how dramatic the buttresses are.',
      'Describe the church using one word that suggests strength.',
      'Pretend you are narrating a heritage documentary intro in one line.',
    ],
    iconKey: 'church',
    accent: 'from-gold/20 via-blush/15 to-transparent',
  },
  {
    id: 'calle-crisologo',
    destinationKey: 'ilocos',
    name: 'Calle Crisologo',
    shortDescription: 'A cobblestone street lined with preserved ancestral houses.',
    detail: 'One of the country’s most photographed heritage streets, especially when lit at dusk.',
    truth:
      'Truth: Calle Crisologo works because preservation here is immersive. The street lets visitors feel scale, texture, and atmosphere all at once.',
    funFact:
      'Fun fact: Evening light and horse-drawn carriages make the street feel like a live historical set.',
    dares: [
      'Take one walking video that captures the street from shoe level upward.',
      'Choose which shopfront or house would be your backdrop for a travel poster.',
      'Give the street a fictional movie title in under five words.',
    ],
    iconKey: 'camera',
    accent: 'from-gold/20 via-royal/15 to-transparent',
  },
  {
    id: 'bangui-windmills',
    destinationKey: 'ilocos',
    name: 'Bangui Windmills',
    shortDescription: 'A coastal stretch where giant turbines meet sea wind and horizon.',
    detail: 'This renewable-energy icon has become one of Ilocos’s most recognizable landscapes.',
    truth:
      'Truth: Bangui’s turbines turned a utilitarian energy project into a national scenic landmark through sheer scale and setting.',
    funFact:
      'Fun fact: The windmills are often photographed from low angles so they feel even larger against the sky.',
    dares: [
      'Stretch your arms wide and take a wind-powered hero shot.',
      'Describe the scene like a futuristic postcard in one sentence.',
      'Record the sound of the wind for five seconds and call it your Ilocos soundtrack.',
    ],
    iconKey: 'wind',
    accent: 'from-azure/20 via-blush/15 to-transparent',
  },
  {
    id: 'white-beach',
    destinationKey: 'boracay',
    name: 'White Beach',
    shortDescription: 'Boracay’s signature shoreline with powdery sand and golden-hour glow.',
    detail: 'This is the island’s social heart, where leisure, water, and nightlife meet in one long ribbon of beach.',
    truth:
      'Truth: White Beach feels iconic because it is both scenic and social. The shoreline changes character from serene mornings to energetic evenings.',
    funFact:
      'Fun fact: Boracay’s sand is famous for being so fine and bright that it reflects sunset light with a soft glow.',
    dares: [
      'Trace one quick shape on the sand and take a photo before the tide changes it.',
      'Describe the beach in three luxurious words.',
      'Record a five-second barefoot walk clip with the horizon in frame.',
    ],
    iconKey: 'waves',
    accent: 'from-azure/25 via-gold/15 to-transparent',
  },
  {
    id: 'puka-shell-beach',
    destinationKey: 'boracay',
    name: 'Puka Shell Beach',
    shortDescription: 'A quieter Boracay escape with a more natural, breezy character.',
    detail: 'Known for shell fragments and a calmer atmosphere, it offers a contrast to the main beach strip.',
    truth:
      'Truth: Puka Shell Beach reminds travelers that Boracay is not only nightlife and crowds. It also has pockets of stillness and texture.',
    funFact:
      'Fun fact: The beach got its name from puka shells, once commonly found mixed into the shoreline.',
    dares: [
      'Find the calmest angle you can and take your best minimalist beach shot.',
      'Say what this beach would smell like if it were a perfume.',
      'Challenge your companion to describe the water color without saying blue.',
    ],
    iconKey: 'shell',
    accent: 'from-gold/25 via-azure/15 to-transparent',
  },
  {
    id: 'willys-rock',
    destinationKey: 'boracay',
    name: "Willy's Rock",
    shortDescription: 'The island’s iconic volcanic rock formation just off White Beach.',
    detail: 'It is one of Boracay’s most recognizable photo spots, especially when the tide reveals an easy walkway.',
    truth:
      "Truth: Willy's Rock became iconic because it compresses Boracay's identity into one frame: shoreline, faith marker, and dramatic rock form.",
    funFact:
      'Fun fact: At low tide, visitors can get much closer to the rock, which completely changes the feel of the photo opportunity.',
    dares: [
      'Take one wide shot that includes both the rock and beach life around it.',
      'Pitch Willy’s Rock as the cover image for a travel magazine.',
      'Strike a tiny-versus-huge perspective pose with the formation in the background.',
    ],
    iconKey: 'star',
    accent: 'from-azure/25 via-gold/15 to-transparent',
  },
]

export function getDestinationByKey(destinationKey: DestinationKey) {
  return destinations.find((destination) => destination.key === destinationKey) ?? null
}

export function getPlacesByDestination(destinationKey: DestinationKey) {
  return placeExperiences.filter((place) => place.destinationKey === destinationKey)
}

export function getPlaceById(placeId: string | null) {
  if (!placeId) {
    return null
  }

  return placeExperiences.find((place) => place.id === placeId) ?? null
}
