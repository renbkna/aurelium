import { photos } from '#lib/data/photos.ts';
import type { Photo } from '#lib/image.ts';
import type { SeasonFit } from '#lib/season.ts';

export interface ItineraryStop {
	/** First day of the stop, counting the arrival day as 1. */
	from: number;
	/** Last day, when the stop spans more than one. */
	to?: number;
	title: string;
	text: string;
	photo: Photo;
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
			'Nine days based in one ryokan in Higashiyama, timed for the fortnight when the maples turn. Mornings start at gates that open at dawn; afternoons are left slow, with a tea master, a lacquer workshop and a day among the deer of Nara.',
		days: 9,
		maxGuests: 8,
		pace: 'Gentle',
		pricePerPerson: 6400,
		season: [1, 1, 2, 3, 2, 0, 0, 0, 1, 2, 3, 1],
		seasonNote:
			'Late November is when the maples peak and the air is clear; early April brings the cherry blossom. Both run with fewer than eight guests so the gardens stay quiet.',
		cover: photos.kiyomizuNight,
		itinerary: [
			{
				from: 1,
				to: 2,
				title: 'Arrive in Higashiyama',
				text: 'A private transfer from Kansai to a twelve-room ryokan. At first light the lanes below the Yasaka pagoda are empty except for the lanterns.',
				photo: photos.yasakaDawn
			},
			{
				from: 3,
				to: 4,
				title: 'Gardens at opening time',
				text: 'Eikan-dō at seven, when the low sun comes through the maples onto the pond. In the afternoon, tea with a master in a Daitoku-ji sub-temple.',
				photo: photos.eikandoMaples
			},
			{
				from: 5,
				title: 'Nara and the deer park',
				text: 'The sika deer of Nara Park, the great hall of Tōdai-ji, and a forest walk to Kasuga Taisha and its three thousand lanterns.',
				photo: photos.naraDeer
			},
			{
				from: 6,
				to: 7,
				title: 'Fushimi Inari before dawn',
				text: 'Up through the vermilion gates by headlamp, down as the city wakes. Then a morning with an urushi lacquer workshop in its family house.',
				photo: photos.fushimiTorii
			},
			{
				from: 8,
				to: 9,
				title: 'Kiyomizu, then home',
				text: 'The wooden stage of Kiyomizu-dera above a hillside of red, a last dinner by the Kamo river, and your transfer out.',
				photo: photos.kiyomizuAutumn
			}
		],
		included: [
			'Eight nights in one ryokan, half board',
			'Private transfers from and to Kansai',
			'A Kyoto-born guide for the whole journey',
			'Early-entry visits and all workshop fees',
			'Rail pass for Nara'
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
		region: 'Braies & the Sesto Dolomites, Italy',
		place: { label: 'Tre Cime', lat: 46.6186, lng: 12.3026, timeZone: 'Europe/Rome' },
		promise: 'Eight days walking between mountain huts, bags carried ahead.',
		summary:
			'A moderate high route from Lago di Braies to the Tre Cime, sleeping in family-run rifugi with proper kitchens. Your luggage travels by road; you carry a day pack and arrive each afternoon to a hot shower and a view.',
		days: 8,
		maxGuests: 10,
		pace: 'Active',
		pricePerPerson: 3900,
		season: [0, 0, 0, 0, 0, 2, 3, 3, 3, 1, 0, 0],
		seasonNote:
			'The huts open in late June and close in early October. July to September brings the stable weather and long evenings, and the high trails are free of snow.',
		cover: photos.sellaAlpenglow,
		itinerary: [
			{
				from: 1,
				title: 'Lago di Braies',
				text: 'Meet in Bruneck, a slow loop of the lake before the day crowds, and a first night in the old lakeside hotel.',
				photo: photos.braiesBoats
			},
			{
				from: 2,
				to: 3,
				title: 'The high meadows',
				text: 'A steady climb to the pastures of Prato Piazza, where horses graze below the Cristallo and the evening light lasts until nine.',
				photo: photos.meadowHorses
			},
			{
				from: 4,
				to: 5,
				title: 'Around the Tre Cime',
				text: 'The full circuit of the three peaks, with a night at Rifugio Locatelli facing their north walls as they turn red at sunset.',
				photo: photos.treCime
			},
			{
				from: 6,
				to: 7,
				title: 'The Cadini ridge',
				text: 'A balcony path along the Cadini di Misurina, the quietest walking of the route, and a farm hut known for its dumplings.',
				photo: photos.ridgePath
			},
			{
				from: 8,
				title: 'Over the passes, then home',
				text: 'A last morning walk below Sass Pordoi before the transfer to Bolzano for the train.',
				photo: photos.pordoiTrail
			}
		],
		included: [
			'Seven nights in rifugi and a lakeside hotel, half board',
			'Luggage transfers between every stop',
			'Two certified mountain leaders',
			'Lifts and local transfers on the route',
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
		region: 'Bratan & Sidemen, Indonesia',
		place: { label: 'Sidemen, Bali', lat: -8.4706, lng: 115.4372, timeZone: 'Asia/Makassar' },
		promise: 'The Bali of lake temples and rice terraces, far from the coast.',
		summary:
			'Two bases in the island’s cool interior: a lake-view house above Bratan and a villa in the Sidemen valley. Days follow the rhythm of the villages, with a temple ceremony, a dance by lamplight and walks through terraces still planted by hand.',
		days: 10,
		maxGuests: 8,
		pace: 'Gentle',
		pricePerPerson: 4200,
		season: [0, 0, 1, 2, 3, 3, 3, 3, 3, 2, 1, 0],
		seasonNote:
			'May to September is the dry season, with clear mornings over the terraces and the volcano. The rains of December to February close some of the paths.',
		cover: photos.riceSunrise,
		itinerary: [
			{
				from: 1,
				to: 2,
				title: 'Up into the hills',
				text: 'Met on arrival and driven past the coast into the forested interior, where the nights are cool enough for a blanket.',
				photo: photos.eastBaliForest
			},
			{
				from: 3,
				to: 4,
				title: 'The lake temple',
				text: 'Ulun Danu Bratan at first light, before the mist lifts off the lake, and dinner with a family who grow the coffee you drink.',
				photo: photos.ulunDanu
			},
			{
				from: 5,
				to: 7,
				title: 'The Sidemen valley',
				text: 'Terraces beneath Mount Agung, a morning with a songket weaving cooperative, and a village temple ceremony as guests.',
				photo: photos.sidemenTerraces
			},
			{
				from: 8,
				to: 9,
				title: 'Legong by lamplight',
				text: 'A sunrise walk on Batur for those who want it, and in the evening a legong performance in a village courtyard.',
				photo: photos.legongDancers
			},
			{
				from: 10,
				title: 'Sunset on the coast',
				text: 'Down to the sea at last, for a sunset swim on the way to the airport.',
				photo: photos.baliSunset
			}
		],
		included: [
			'Nine nights in two private houses, breakfast and five dinners',
			'Private driver and Balinese guide throughout',
			'Ceremony attire and temple offerings',
			'All walks, workshops and performances',
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
		place: { label: 'Naxos', lat: 37.1036, lng: 25.3768, timeZone: 'Europe/Athens' },
		promise: 'Eight days on a 24-metre schooner, anchoring where no ferry goes.',
		summary:
			'A crewed wooden schooner with six cabins, sailing short legs from Santorini to the coves and sandbars of Naxos. You swim before breakfast, eat what the cook bought on the quay, and moor where the only light at night is the moon.',
		days: 8,
		maxGuests: 12,
		pace: 'Moderate',
		pricePerPerson: 5600,
		season: [0, 0, 0, 0, 2, 3, 2, 1, 3, 2, 0, 0],
		seasonNote:
			'June and September have warm water, steady breezes and quiet harbours. In July and August the meltemi wind blows hard and the islands are full.',
		cover: photos.oiaMoon,
		itinerary: [
			{
				from: 1,
				title: 'Board below Oia',
				text: 'Welcome aboard at Vlychada, then into the caldera to anchor beneath the blue domes of Oia for sunset.',
				photo: photos.oiaDomes
			},
			{
				from: 2,
				to: 3,
				title: 'Shallows no ferry reaches',
				text: 'North to Naxos and its southern sandbars, where the water is clear enough to read the seabed from the deck.',
				photo: photos.naxosShallows
			},
			{
				from: 4,
				to: 5,
				title: 'Coves of the south coast',
				text: 'Tamarisk-shaded bays near Kastraki, a taverna lunch with the fishermen, and nothing else to do.',
				photo: photos.kastrakiSea
			},
			{
				from: 6,
				to: 7,
				title: 'Chora and the Portara',
				text: 'The marble gate of an unfinished temple of Apollo above the harbour, and a lunch in the mountain village of Apeiranthos.',
				photo: photos.portara
			},
			{
				from: 8,
				title: 'Last light, then ashore',
				text: 'A final swim at Agios Prokopios as the sun goes down, and breakfast on deck before the ferry or flight home.',
				photo: photos.prokopiosSunset
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
			'Eight days that give Petra the time it deserves: two full days starting at the gate at six, and the Monastery climb while the light is still soft. Then south to Wadi Rum for sandstone arches and a Bedouin camp with no light pollution at all.',
		days: 8,
		maxGuests: 10,
		pace: 'Moderate',
		pricePerPerson: 3700,
		season: [1, 1, 3, 3, 2, 1, 0, 0, 2, 3, 3, 1],
		seasonNote:
			'March, April, October and November have mild days for walking in Petra and nights that are cool, not cold, in the desert. Summer heat makes the long walks unsafe.',
		cover: photos.petraMonastery,
		itinerary: [
			{
				from: 1,
				to: 2,
				title: 'Into Petra at opening time',
				text: 'Fly into Amman and drive the King’s Highway south. The next morning, the first through the gate, past the djinn blocks and into the Siq.',
				photo: photos.djinnBlocks
			},
			{
				from: 3,
				to: 4,
				title: 'The Monastery climb',
				text: 'Eight hundred rock-cut steps to Ad Deir while the facade is still in shade, with an archaeologist who has worked here for twenty years.',
				photo: photos.petraFacade
			},
			{
				from: 5,
				title: 'Into the red sands',
				text: 'South to the protected area of Wadi Rum, its valleys of red sand between walls of sandstone.',
				photo: photos.wadiRumSands
			},
			{
				from: 6,
				to: 7,
				title: 'Two nights at camp',
				text: 'Days by jeep and camel, evenings in a small Bedouin camp, and a sky so dark the Milky Way casts a shadow.',
				photo: photos.wadiRumCamp
			},
			{
				from: 8,
				title: 'The arch, then the Red Sea',
				text: 'A scramble onto a natural arch at sunrise, then Aqaba for a swim before your transfer.',
				photo: photos.wadiRumArch
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
		region: 'Phi Phi, Phang Nga & Trang, Thailand',
		place: { label: 'Ko Phi Phi', lat: 7.7407, lng: 98.7784, timeZone: 'Asia/Bangkok' },
		promise: 'Limestone islands and empty beaches, one island at a time.',
		summary:
			'Ten days hopping through the Andaman Sea by longtail boat, with three small beach lodges and one night in a stilt village. Snorkel over reefs that day trips never reach, and kayak into lagoons hidden inside the cliffs.',
		days: 10,
		maxGuests: 8,
		pace: 'Moderate',
		pricePerPerson: 3500,
		season: [3, 3, 3, 2, 1, 0, 0, 0, 0, 1, 2, 3],
		seasonNote:
			'December to March has calm seas and clear water. From May the southwest monsoon arrives, and the boat crossings stop.',
		cover: photos.mayaLongtails,
		itinerary: [
			{
				from: 1,
				to: 2,
				title: 'Phi Phi before the day boats',
				text: 'A lodge on the quiet north shore of Phi Phi Don, and Maya Bay at seven, when the longtails are still moored.',
				photo: photos.lohMooDee
			},
			{
				from: 3,
				to: 4,
				title: 'Phang Nga by kayak',
				text: 'Paddling into the hidden lagoons of Phang Nga Bay and past the needle of Ko Tapu before the tour boats wake.',
				photo: photos.koTapu
			},
			{
				from: 5,
				to: 7,
				title: 'The Trang islands',
				text: 'House reefs a few strokes from the sand at Ko Ngai, and the Emerald Cave swum through at low tide.',
				photo: photos.koNgai
			},
			{
				from: 8,
				title: 'A village on stilts',
				text: 'A night in Koh Panyee, a fishing village built on stilts beneath a limestone cliff.',
				photo: photos.koPanyee
			},
			{
				from: 9,
				to: 10,
				title: 'Last swims, then home',
				text: 'A final morning among the islets of Ko Poda and a transfer to Krabi airport.',
				photo: photos.koPoda
			}
		],
		included: [
			'Nine nights in beach lodges and a stilt-village homestay, breakfast and dinner',
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
