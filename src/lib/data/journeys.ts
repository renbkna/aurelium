import type { Photo } from '#lib/image.ts';
import type { SeasonFit } from '#lib/season.ts';

export interface ItineraryStop {
	/** First day of the stop, counting the arrival day as 1. */
	from: number;
	/** Last day, when the stop spans more than one. */
	to?: number;
	title: string;
	text: string;
}

export interface Departure {
	/** ISO date of day one. */
	start: string;
	seatsLeft: number;
}

/** Where the journey's light is measured: its main base. */
export interface Place {
	label: string;
	lat: number;
	lng: number;
	timeZone: string;
}

export interface Journey {
	slug: string;
	name: string;
	region: string;
	place: Place;
	/** One line that says why to go. */
	promise: string;
	summary: string;
	days: number;
	maxGuests: number;
	pace: 'Gentle' | 'Moderate' | 'Active';
	pricePerPerson: number;
	season: SeasonFit;
	/** Why the finest months are the finest — the reason the journey runs when it does. */
	seasonNote: string;
	cover: Photo;
	/** A second view shown beside the itinerary, when one of the place exists. */
	detail?: Photo;
	itinerary: ItineraryStop[];
	included: string[];
	departures: Departure[];
}

export const journeys: Journey[] = [
	{
		slug: 'kyoto-in-the-maple-weeks',
		name: 'Kyoto in the maple weeks',
		region: 'Kyoto & Nara, Japan',
		place: { label: 'Higashiyama, Kyoto', lat: 34.9985, lng: 135.7818, timeZone: 'Asia/Tokyo' },
		promise: 'Temple gardens at peak colour, before the first visitors arrive.',
		summary:
			'Nine days based in one ryokan in Higashiyama, timed for the fortnight when the maples turn. Mornings start at gates that open at dawn; afternoons are left slow, with a tea master, a lacquer workshop and a day among the deer and cedars of Nara.',
		days: 9,
		maxGuests: 8,
		pace: 'Gentle',
		pricePerPerson: 6400,
		season: [1, 1, 2, 3, 2, 0, 0, 0, 1, 2, 3, 1],
		seasonNote:
			'Late November is when the maples peak and the air is clear; early April brings the cherry blossom. Both run with fewer than eight guests so the gardens stay quiet.',
		cover: {
			id: 'photo-1493976040374-85c8e12f0c0e',
			alt: 'Evening on a stone lane in Higashiyama, Kyoto, with the Yasaka pagoda ahead',
			focus: '50% 60%'
		},
		detail: {
			id: 'photo-1528360983277-13d401cdc186',
			alt: 'Red paper lanterns glowing in a narrow Japanese alley at night'
		},
		itinerary: [
			{
				from: 1,
				to: 2,
				title: 'Arrive in Higashiyama',
				text: 'Private transfer from Kansai to a twelve-room ryokan. An evening walk through Gion once the day visitors have gone, then kaiseki in the room.'
			},
			{
				from: 3,
				to: 4,
				title: 'Gardens at opening time',
				text: 'Eikandō and Nanzen-ji at 7 a.m., when the light comes in low. An afternoon with a tea master in Daitoku-ji.'
			},
			{
				from: 5,
				title: 'Nara and the cedar path',
				text: 'The deer park, Tōdai-ji, and a forest walk to Kasuga Taisha, its paths lined with three thousand lanterns.'
			},
			{
				from: 6,
				to: 7,
				title: 'Makers of Kyoto',
				text: 'A morning with an urushi lacquer workshop and an afternoon at Nishiki market with a chef who buys there every day.'
			},
			{
				from: 8,
				to: 9,
				title: 'Arashiyama, then home',
				text: 'The bamboo grove before eight, a boat on the Hozu river, and a last dinner by the water before your transfer out.'
			}
		],
		included: [
			'Eight nights in one ryokan, half board',
			'Private transfers from and to Kansai',
			'A Kyoto-born guide for the whole journey',
			'Early-entry visits and all workshop fees',
			'Rail pass for Nara and Arashiyama'
		],
		departures: [
			{ start: '2027-04-01', seatsLeft: 3 },
			{ start: '2027-11-18', seatsLeft: 6 },
			{ start: '2027-11-29', seatsLeft: 2 }
		]
	},
	{
		slug: 'dolomites-hut-to-hut',
		name: 'Dolomites, hut to hut',
		region: 'South Tyrol, Italy',
		place: { label: 'Fanes plateau', lat: 46.6012, lng: 12.0151, timeZone: 'Europe/Rome' },
		promise: 'Seven days walking between mountain huts, bags carried ahead.',
		summary:
			'A moderate high route through the Fanes, Sennes and Puez plateaus, sleeping in family-run rifugi with proper kitchens. Your luggage travels by road; you carry a day pack and arrive each afternoon to a hot shower and a view.',
		days: 8,
		maxGuests: 10,
		pace: 'Active',
		pricePerPerson: 3900,
		season: [0, 0, 0, 0, 0, 2, 3, 3, 3, 1, 0, 0],
		seasonNote:
			'The huts open in late June and close in early October. July to September brings the stable weather and long evenings, and the trails are free of snow.',
		cover: {
			id: 'photo-1476514525535-07fb3b4ae5f1',
			alt: 'The bow of a wooden boat on the green water of Lago di Braies, with Dolomite peaks behind',
			focus: '50% 70%'
		},
		detail: {
			id: 'photo-1539635278303-d4002c07eae3',
			alt: 'Four walkers laughing on a rocky trail beneath pale limestone spires'
		},
		itinerary: [
			{
				from: 1,
				title: 'Lago di Braies',
				text: 'Meet in Bruneck, a gentle loop of the lake before the crowds arrive, and a first night in a lakeside hotel.'
			},
			{
				from: 2,
				to: 3,
				title: 'Up to the Sennes plateau',
				text: 'A steady climb to high meadows and Rifugio Sennes, then a long balcony path to Fanes with the Tofane in view.'
			},
			{
				from: 4,
				to: 5,
				title: 'Lagazuoi and the war tunnels',
				text: 'The highest night of the route, at 2,752 m. Optional headlamp walk through the First World War tunnels at dawn.'
			},
			{
				from: 6,
				to: 7,
				title: 'Puez–Odle',
				text: 'Karst plateaus and the Odle needles, finishing at a farm hut known for its dumplings.'
			},
			{
				from: 8,
				title: 'Down to Val Gardena',
				text: 'Cable car into Ortisei and a transfer back to Bruneck or to the Bolzano train.'
			}
		],
		included: [
			'Seven nights in rifugi and a lakeside hotel, half board',
			'Luggage transfers between every stop',
			'Two certified mountain leaders',
			'Cable cars and lift passes on the route',
			'Packed lunches on walking days'
		],
		departures: [
			{ start: '2027-07-04', seatsLeft: 4 },
			{ start: '2027-08-08', seatsLeft: 7 },
			{ start: '2027-09-05', seatsLeft: 9 }
		]
	},
	{
		slug: 'bali-the-quiet-highlands',
		name: 'Bali, the quiet highlands',
		region: 'Munduk & Sidemen, Indonesia',
		place: { label: 'Munduk, Bali', lat: -8.2655, lng: 115.0739, timeZone: 'Asia/Makassar' },
		promise: 'The Bali of lake temples and rice terraces, far from the coast.',
		summary:
			'Two bases in the island’s cool interior: a lake-view house above Bratan and a villa in the Sidemen valley. Days follow the rhythm of the villages, with a temple ceremony, a weaving cooperative and walks through terraces still farmed by hand.',
		days: 10,
		maxGuests: 8,
		pace: 'Gentle',
		pricePerPerson: 4200,
		season: [0, 0, 1, 2, 3, 3, 3, 3, 3, 2, 1, 0],
		seasonNote:
			'May to September is the dry season, with clear mornings for the crater views. The rains of December to February close some of the terrace paths.',
		cover: {
			id: 'photo-1537996194471-e657df975ab4',
			alt: 'Pura Ulun Danu Bratan, a tiered shrine standing in Lake Bratan in soft morning light',
			focus: '50% 55%'
		},
		detail: {
			id: 'photo-1518548419970-58e3b4079ab2',
			alt: 'Tanah Lot sea temple silhouetted against a low sunset'
		},
		itinerary: [
			{
				from: 1,
				to: 2,
				title: 'Up into the hills',
				text: 'Met on arrival and driven past the coast to Munduk, where nights are cool enough for a blanket.'
			},
			{
				from: 3,
				to: 4,
				title: 'Lake temples and waterfalls',
				text: 'Ulun Danu at first light, a forest walk to the Munduk falls, and dinner with a family who grow the coffee you drink.'
			},
			{
				from: 5,
				to: 7,
				title: 'The Sidemen valley',
				text: 'Rice terraces beneath Mount Agung, a morning with a songket weaving cooperative, and a village temple ceremony as guests.'
			},
			{
				from: 8,
				to: 9,
				title: 'Sunrise on Batur',
				text: 'An early climb for those who want it, hot springs for those who do not, then a free day by the villa pool.'
			},
			{
				from: 10,
				title: 'Tanah Lot at dusk',
				text: 'The sea temple at sunset on the way to the airport.'
			}
		],
		included: [
			'Nine nights in two private houses, breakfast and five dinners',
			'Private driver and Balinese guide throughout',
			'Ceremony attire and temple offerings',
			'All walks, workshops and entrance fees',
			'Airport transfers'
		],
		departures: [
			{ start: '2027-05-15', seatsLeft: 5 },
			{ start: '2027-07-10', seatsLeft: 3 },
			{ start: '2027-09-11', seatsLeft: 8 }
		]
	},
	{
		slug: 'cyclades-under-sail',
		name: 'The Cyclades under sail',
		region: 'Santorini to Naxos, Greece',
		place: { label: 'Koufonisia', lat: 36.9333, lng: 25.6, timeZone: 'Europe/Athens' },
		promise: 'Eight islands from the deck of a 24-metre schooner.',
		summary:
			'A crewed wooden schooner with six cabins, sailing short legs between Santorini, Ios, the small Cyclades and Naxos. You swim before breakfast, eat what the cook bought on the quay, and moor in coves no ferry reaches.',
		days: 8,
		maxGuests: 12,
		pace: 'Moderate',
		pricePerPerson: 5600,
		season: [0, 0, 0, 0, 2, 3, 2, 1, 3, 2, 0, 0],
		seasonNote:
			'June and September have warm water, steady breezes and quiet harbours. In July and August the meltemi wind blows hard and the islands are full.',
		cover: {
			id: 'photo-1613395877344-13d4a8e0d49e',
			alt: 'Blue domes of Oia, Santorini, above the Aegean',
			focus: '50% 50%'
		},
		detail: {
			id: 'photo-1533105079780-92b9be482077',
			alt: 'A whitewashed stair framing the deep blue caldera of Santorini'
		},
		itinerary: [
			{
				from: 1,
				title: 'Board in Santorini',
				text: 'Welcome aboard at Vlychada, then sail into the caldera for sunset at anchor below Oia.'
			},
			{
				from: 2,
				to: 3,
				title: 'Ios and the empty bays',
				text: 'The quiet south coast of Ios, with a beach only reachable by boat and dinner in the hora.'
			},
			{
				from: 4,
				to: 5,
				title: 'The small Cyclades',
				text: 'Schinoussa and Koufonisia: limestone coves, two tavernas and nothing else to do.'
			},
			{
				from: 6,
				to: 7,
				title: 'Naxos',
				text: 'A walk to the Temple of Apollo’s marble gate and a lunch in the mountain village of Apeiranthos.'
			},
			{
				from: 8,
				title: 'Disembark',
				text: 'Breakfast on deck in Naxos harbour before the ferry or flight home.'
			}
		],
		included: [
			'Seven nights in a private-bath cabin',
			'Captain, cook and two crew',
			'All meals on board, with local wine',
			'Paddleboards, snorkel gear and a tender',
			'Harbour fees and fuel'
		],
		departures: [
			{ start: '2027-06-05', seatsLeft: 4 },
			{ start: '2027-06-19', seatsLeft: 10 },
			{ start: '2027-09-11', seatsLeft: 6 }
		]
	},
	{
		slug: 'jordan-petra-and-wadi-rum',
		name: 'Petra & Wadi Rum',
		region: 'Jordan',
		place: { label: 'Petra', lat: 30.3285, lng: 35.4444, timeZone: 'Asia/Amman' },
		promise: 'Petra at opening time and two nights under a desert sky.',
		summary:
			'Eight days that give Petra the time it deserves: two full days, starting at the gate at six, and the Monastery climb while the light is still soft. Then south to Wadi Rum for camel tracks, sandstone arches and a Bedouin camp with no light pollution at all.',
		days: 8,
		maxGuests: 10,
		pace: 'Moderate',
		pricePerPerson: 3700,
		season: [1, 1, 3, 3, 2, 1, 0, 0, 2, 3, 3, 1],
		seasonNote:
			'March, April, October and November have mild days for walking in Petra and nights that are cool, not cold, in the desert. Summer heat makes the long walks unsafe.',
		cover: {
			id: 'photo-1682685797742-42c9987a2c34',
			alt: 'A traveller in red standing among the rose-coloured sandstone walls of a Jordanian canyon',
			focus: '50% 45%'
		},
		itinerary: [
			{
				from: 1,
				to: 2,
				title: 'Amman and the King’s Highway',
				text: 'A night in Amman, then south past Madaba’s mosaics and the crusader castle at Kerak.'
			},
			{
				from: 3,
				to: 4,
				title: 'Petra, unhurried',
				text: 'Through the Siq at opening time to the Treasury, the Monastery climb on day two, and Petra by Night with candles.'
			},
			{
				from: 5,
				title: 'Little Petra and Feynan',
				text: 'A quieter Nabataean site, then the Feynan ecolodge, lit entirely by candle.'
			},
			{
				from: 6,
				to: 7,
				title: 'Wadi Rum',
				text: 'Jeep and camel through the protected area, a sunset from the dunes and two nights in a small Bedouin camp.'
			},
			{
				from: 8,
				title: 'Aqaba',
				text: 'A swim in the Red Sea before your transfer to Aqaba or back to Amman.'
			}
		],
		included: [
			'Seven nights, from boutique hotel to desert camp, half board',
			'Jordan Pass covering visa and site entries',
			'An archaeologist guide in Petra',
			'Private vehicle and driver',
			'Jeep and camel excursions in Wadi Rum'
		],
		departures: [
			{ start: '2027-03-20', seatsLeft: 7 },
			{ start: '2027-04-10', seatsLeft: 2 },
			{ start: '2027-10-23', seatsLeft: 8 },
			{ start: '2027-11-06', seatsLeft: 5 }
		]
	},
	{
		slug: 'andaman-islands-by-longtail',
		name: 'The Andaman by longtail',
		region: 'Krabi & Trang islands, Thailand',
		place: { label: 'Koh Mook', lat: 7.3667, lng: 99.3, timeZone: 'Asia/Bangkok' },
		promise: 'Limestone islands and empty beaches, one island at a time.',
		summary:
			'Ten days hopping south through the Trang islands by longtail boat, with three small beach lodges and one night in a stilt village. Snorkel over reefs that day trips never reach, and kayak into hongs: lagoons hidden inside the cliffs.',
		days: 10,
		maxGuests: 8,
		pace: 'Moderate',
		pricePerPerson: 3500,
		season: [3, 3, 3, 2, 1, 0, 0, 0, 0, 1, 2, 3],
		seasonNote:
			'December to March has calm seas and clear water. From May the southwest monsoon arrives, and the boat crossings stop.',
		cover: {
			id: 'photo-1552465011-b4e21bf6e79a',
			alt: 'Wooden longtail boats with garlands moored on a beach below a limestone karst',
			focus: '50% 55%'
		},
		detail: {
			id: 'photo-1540541338287-41700207dee6',
			alt: 'A pool and palms on a cliff above a turquoise bay'
		},
		itinerary: [
			{
				from: 1,
				to: 2,
				title: 'Railay',
				text: 'Arrive by boat to a peninsula with no roads. Climbing, or just watching the climbers, from a beach bar.'
			},
			{
				from: 3,
				to: 4,
				title: 'Kayaks among the hongs',
				text: 'Paddle into the hidden lagoons of Phang Nga before the tour boats wake up.'
			},
			{
				from: 5,
				to: 7,
				title: 'Koh Kradan and Koh Mook',
				text: 'House reefs a few strokes from the sand, and the Emerald Cave swum through at low tide.'
			},
			{
				from: 8,
				title: 'A stilt village',
				text: 'A night with a Moken fishing family on Koh Libong, where dugongs graze the seagrass.'
			},
			{
				from: 9,
				to: 10,
				title: 'Back to Trang',
				text: 'A last morning swim and a transfer to Trang airport.'
			}
		],
		included: [
			'Nine nights in beach lodges and a homestay, breakfast and dinner',
			'Private longtail boat and boatman for every crossing',
			'A naturalist guide',
			'Kayaks and snorkel equipment',
			'National park fees'
		],
		departures: [
			{ start: '2027-01-09', seatsLeft: 6 },
			{ start: '2027-02-13', seatsLeft: 3 },
			{ start: '2027-12-11', seatsLeft: 8 }
		]
	}
];

export const journeyBySlug = (slug: string) => journeys.find((journey) => journey.slug === slug);
