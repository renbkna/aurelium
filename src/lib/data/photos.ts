import type { Photo } from '#lib/image.ts';

/**
 * Every photograph on the site, from Wikimedia Commons. Credits and licences are shown with each
 * photo and on /credits, as their licences require.
 */
export const photos = {
	kiyomizuNight: {
		path: '1/10/Kiyomizu-dera%2C_Kyoto%2C_November_2016_-06.jpg',
		width: 5756,
		alt: 'Kiyomizu-dera lit at night, its wooden stage above a hillside of autumn maples',
		focus: '50% 55%',
		credit: {
			author: 'Martin Falbisoner',
			license: 'CC BY-SA 4.0',
			source: 'https://commons.wikimedia.org/wiki/File:Kiyomizu-dera,_Kyoto,_November_2016_-06.jpg'
		}
	},
	yasakaDawn: {
		path: 'e/ed/Yasaka-dori_early_morning_with_street_lanterns_and_the_Tower_of_Yasaka_%28Hokan-ji_Temple%29%2C_Kyoto%2C_Japan.jpg',
		width: 5550,
		alt: 'Yasaka-dori at first light, lanterns along the lane and the Yasaka pagoda ahead',
		focus: '50% 60%',
		credit: {
			author: 'Basile Morin',
			license: 'CC BY-SA 4.0',
			source:
				'https://commons.wikimedia.org/wiki/File:Yasaka-dori_early_morning_with_street_lanterns_and_the_Tower_of_Yasaka_(Hokan-ji_Temple),_Kyoto,_Japan.jpg'
		}
	},
	eikandoMaples: {
		path: '4/4a/Eikan-do_Zenrin-ji%2C_November_2016_-03.jpg',
		width: 5816,
		alt: 'Red maples over the pond and bridge at Eikan-dō Zenrin-ji',
		focus: '50% 50%',
		credit: {
			author: 'Martin Falbisoner',
			license: 'CC BY-SA 4.0',
			source: 'https://commons.wikimedia.org/wiki/File:Eikan-do_Zenrin-ji,_November_2016_-03.jpg'
		}
	},
	naraDeer: {
		path: '3/36/Sika_deer_doe_and_fawn_Nara_2026_dllu.jpg',
		width: 9907,
		alt: 'A sika deer doe and her fawn on a path in Nara Park',
		focus: '55% 60%',
		credit: {
			author: 'Daniel Lu (User:dllu)',
			license: 'CC BY-SA 4.0',
			source: 'https://commons.wikimedia.org/wiki/File:Sika_deer_doe_and_fawn_Nara_2026_dllu.jpg'
		}
	},
	fushimiTorii: {
		path: '1/16/KyotoFushimiInariLarge.jpg',
		width: 3072,
		alt: 'A tunnel of vermilion torii gates at Fushimi Inari',
		focus: '50% 50%',
		credit: {
			author: 'Paul Vlaar',
			license: 'CC BY-SA 3.0',
			source: 'https://commons.wikimedia.org/wiki/File:KyotoFushimiInariLarge.jpg'
		}
	},
	kiyomizuAutumn: {
		path: 'a/ae/Kiyomizu-dera%2C_Kyoto%2C_November_2016_-02.jpg',
		width: 5659,
		alt: 'Kiyomizu-dera and its pagoda above a slope of autumn colour',
		focus: '50% 50%',
		credit: {
			author: 'Martin Falbisoner',
			license: 'CC BY-SA 4.0',
			source: 'https://commons.wikimedia.org/wiki/File:Kiyomizu-dera,_Kyoto,_November_2016_-02.jpg'
		}
	},
	sellaAlpenglow: {
		path: '1/14/Gruppo_del_Sella.jpg',
		width: 4752,
		alt: 'The Sella massif glowing red at sunset above snowy slopes',
		focus: '50% 40%',
		credit: {
			author: 'Dmitry A. Mottl',
			license: 'CC BY-SA 3.0',
			source: 'https://commons.wikimedia.org/wiki/File:Gruppo_del_Sella.jpg'
		}
	},
	braiesBoats: {
		path: '5/58/Lago_di_Braies_South_Tyrol_6.jpg',
		width: 5020,
		alt: 'Rowing boats on the green water of Lago di Braies beneath steep forested cliffs',
		focus: '50% 60%',
		credit: {
			author: 'kallerna',
			license: 'CC BY-SA 4.0',
			source: 'https://commons.wikimedia.org/wiki/File:Lago_di_Braies_South_Tyrol_6.jpg'
		}
	},
	meadowHorses: {
		path: '7/76/Parco_Naturale_Tre_Cime_horses_3.jpg',
		width: 4200,
		alt: 'Horses grazing a high meadow in evening light below jagged Dolomite peaks',
		focus: '50% 55%',
		credit: {
			author: 'kallerna',
			license: 'CC BY-SA 4.0',
			source: 'https://commons.wikimedia.org/wiki/File:Parco_Naturale_Tre_Cime_horses_3.jpg'
		}
	},
	treCime: {
		path: '7/77/Croda_dei_Toni_and_Tre_Cime_di_Lavaredo_from_Monte_Specie%2C_Val_Pusteria%2C_Trentino-Alto_Adige%2C_Italy%2C_2025_October.jpg',
		width: 5500,
		alt: 'The three north faces of the Tre Cime di Lavaredo under a blue sky',
		focus: '50% 45%',
		credit: {
			author: 'Ximonic (Simo Räsänen)',
			license: 'CC BY-SA 4.0',
			source:
				'https://commons.wikimedia.org/wiki/File:Croda_dei_Toni_and_Tre_Cime_di_Lavaredo_from_Monte_Specie,_Val_Pusteria,_Trentino-Alto_Adige,_Italy,_2025_October.jpg'
		}
	},
	ridgePath: {
		path: '4/4a/Parco_naturale_Tre_Cime_2.jpg',
		width: 4560,
		alt: 'A grassy ridge path beneath a wall of pale Dolomite spires',
		focus: '50% 55%',
		credit: {
			author: 'kallerna',
			license: 'CC BY-SA 4.0',
			source: 'https://commons.wikimedia.org/wiki/File:Parco_naturale_Tre_Cime_2.jpg'
		}
	},
	pordoiTrail: {
		path: 'd/df/Passo_Pordoi-bops_01.jpg',
		width: 6000,
		alt: 'A walking trail climbing towards a limestone tower near Passo Pordoi',
		focus: '50% 55%',
		credit: {
			author: 'Bops92',
			license: 'CC BY-SA 4.0',
			source: 'https://commons.wikimedia.org/wiki/File:Passo_Pordoi-bops_01.jpg'
		}
	},
	riceSunrise: {
		path: '8/82/Petani_padi.jpg',
		width: 4928,
		alt: 'Farmers planting rice in flooded terraces at sunrise, a volcano beyond',
		focus: '50% 55%',
		credit: {
			author: 'Imadedana',
			license: 'CC BY-SA 4.0',
			source: 'https://commons.wikimedia.org/wiki/File:Petani_padi.jpg'
		}
	},
	eastBaliForest: {
		path: '3/30/Bali%2C_Forest%2C_Trees%2C_East_Bali%2C_Indonesia.jpg',
		width: 4032,
		alt: 'Forested hills and terraces in the cool interior of East Bali',
		focus: '50% 50%',
		credit: {
			author: 'Vyacheslav Argenberg',
			license: 'CC BY 4.0',
			source:
				'https://commons.wikimedia.org/wiki/File:Bali,_Forest,_Trees,_East_Bali,_Indonesia.jpg'
		}
	},
	ulunDanu: {
		path: 'c/c0/Brantan_Bali_Pura-Ulun-Danu-Bratan-01.jpg',
		width: 5097,
		alt: 'Pura Ulun Danu Bratan, its tiered shrine standing in Lake Bratan',
		focus: '50% 55%',
		credit: {
			author: 'CEphoto, Uwe Aranas',
			license: 'CC BY-SA 3.0',
			source: 'https://commons.wikimedia.org/wiki/File:Brantan_Bali_Pura-Ulun-Danu-Bratan-01.jpg'
		}
	},
	sidemenTerraces: {
		path: '8/88/Bali%2C_Rice_fields%2C_Rice_terraces_in_East_Bali%2C_Indonesia.jpg',
		width: 4032,
		alt: 'Rice terraces and field huts in a valley of East Bali',
		focus: '50% 55%',
		credit: {
			author: 'Vyacheslav Argenberg',
			license: 'CC BY 4.0',
			source:
				'https://commons.wikimedia.org/wiki/File:Bali,_Rice_fields,_Rice_terraces_in_East_Bali,_Indonesia.jpg'
		}
	},
	legongDancers: {
		path: 'd/d3/17_Years_of_Sekar_Jepun_2014-11-01_05.jpg',
		width: 3712,
		alt: 'Balinese dancers in gold and crimson performing at night',
		focus: '50% 40%',
		credit: {
			author: 'Crisco 1492',
			license: 'CC BY-SA 4.0',
			source: 'https://commons.wikimedia.org/wiki/File:17_Years_of_Sekar_Jepun_2014-11-01_05.jpg'
		}
	},
	baliSunset: {
		path: 'e/e0/Sunset%2C_Kuta%2C_Bali%2C_Indonesia%2C_20220825_1755_0879.jpg',
		width: 5253,
		alt: 'The sun setting over a calm sea on the Bali coast',
		focus: '50% 55%',
		credit: {
			author: 'Jakub Hałun',
			license: 'CC BY-SA 4.0',
			source:
				'https://commons.wikimedia.org/wiki/File:Sunset,_Kuta,_Bali,_Indonesia,_20220825_1755_0879.jpg'
		}
	},
	oiaMoon: {
		path: '5/50/%CE%9F%CE%AF%CE%B1_1121.jpg',
		width: 4547,
		alt: 'Oia at night, its white houses lit above the caldera under a rising moon',
		focus: '50% 50%',
		credit: {
			author: 'C messier',
			license: 'CC BY-SA 4.0',
			source: 'https://commons.wikimedia.org/wiki/File:%CE%9F%CE%AF%CE%B1_1121.jpg'
		}
	},
	oiaDomes: {
		path: '2/27/1000_Three_domes_of_Oia_in_Santorini_Photo_by_Giles_Laurent.jpg',
		width: 8640,
		alt: 'Three blue domes of Oia above the deep blue Aegean',
		focus: '50% 45%',
		credit: {
			author: 'Giles Laurent',
			license: 'CC BY-SA 4.0',
			source:
				'https://commons.wikimedia.org/wiki/File:1000_Three_domes_of_Oia_in_Santorini_Photo_by_Giles_Laurent.jpg'
		}
	},
	naxosShallows: {
		path: '5/5e/Coastal_and_Submarine_Geomorphological_Formations._Naxos_isl._%281%29.JPG',
		width: 4608,
		alt: 'Turquoise shallows and a sandbar off Naxos, seen from above',
		focus: '50% 50%',
		credit: {
			author: 'En Agris LLC',
			license: 'CC BY-SA 4.0',
			source:
				'https://commons.wikimedia.org/wiki/File:Coastal_and_Submarine_Geomorphological_Formations._Naxos_isl._(1).JPG'
		}
	},
	kastrakiSea: {
		path: 'a/a9/Naxos_Kastraki_2025-06-25_1399.jpg',
		width: 8100,
		alt: 'The sea at Kastraki, Naxos, framed by tamarisk trees',
		focus: '50% 55%',
		credit: {
			author: 'Tsui',
			license: 'CC BY-SA 4.0',
			source: 'https://commons.wikimedia.org/wiki/File:Naxos_Kastraki_2025-06-25_1399.jpg'
		}
	},
	portara: {
		path: '1/1e/Naxos_%CE%9D%CE%AC%CE%BE%CE%BF%CF%82_Chora_2020-08-20_34_Portara_%CE%A0%CE%BF%CF%81%CF%84%CE%AC%CF%81%CE%B1_Blues_Star_Ferry_Delos.jpg',
		width: 5400,
		alt: 'The marble Portara gate of Naxos above the harbour',
		focus: '50% 50%',
		credit: {
			author: 'Manfred Werner (Tsui)',
			license: 'CC BY-SA 4.0',
			source:
				'https://commons.wikimedia.org/wiki/File:Naxos_%CE%9D%CE%AC%CE%BE%CE%BF%CF%82_Chora_2020-08-20_34_Portara_%CE%A0%CE%BF%CF%81%CF%84%CE%AC%CF%81%CE%B1_Blues_Star_Ferry_Delos.jpg'
		}
	},
	prokopiosSunset: {
		path: '3/31/Agios_Prokopios_Beach_at_sunset%2C_Naxos%2C_Greece_julesvernex2.jpg',
		width: 4833,
		alt: 'Agios Prokopios beach on Naxos at sunset',
		focus: '50% 60%',
		credit: {
			author: 'Jules Verne Times Two',
			license: 'CC BY-SA 4.0',
			source:
				'https://commons.wikimedia.org/wiki/File:Agios_Prokopios_Beach_at_sunset,_Naxos,_Greece_julesvernex2.jpg'
		}
	},
	petraMonastery: {
		path: 'd/d7/Petra_Jordan_BW_43.JPG',
		width: 3175,
		alt: 'The Monastery, Ad Deir, carved into the rose-coloured rock of Petra',
		focus: '50% 45%',
		credit: {
			author: 'Berthold Werner',
			license: 'CC BY-SA 3.0',
			source: 'https://commons.wikimedia.org/wiki/File:Petra_Jordan_BW_43.JPG'
		}
	},
	petraFacade: {
		path: 'b/b7/The_Monastery%2C_Petra%2C_Jordan8.jpg',
		width: 3142,
		alt: 'The facade of the Monastery at Petra in full sun',
		focus: '50% 50%',
		credit: {
			author: 'Diego Delso',
			license: 'CC BY-SA 3.0',
			source: 'https://commons.wikimedia.org/wiki/File:The_Monastery,_Petra,_Jordan8.jpg'
		}
	},
	djinnBlocks: {
		path: '4/46/Petra_Jordan_BW_2.JPG',
		width: 3872,
		alt: 'Carved djinn blocks beside the path into Petra',
		focus: '50% 55%',
		credit: {
			author: 'Berthold Werner',
			license: 'CC BY 3.0',
			source: 'https://commons.wikimedia.org/wiki/File:Petra_Jordan_BW_2.JPG'
		}
	},
	wadiRumSands: {
		path: '7/7a/Wadi_Rum_BW_19.JPG',
		width: 3872,
		alt: 'Red sand and sandstone mountains in Wadi Rum',
		focus: '50% 55%',
		credit: {
			author: 'Berthold Werner',
			license: 'CC BY-SA 3.0',
			source: 'https://commons.wikimedia.org/wiki/File:Wadi_Rum_BW_19.JPG'
		}
	},
	wadiRumArch: {
		path: 'd/d3/Wadi_Rum_02.jpg',
		width: 3456,
		alt: 'A natural sandstone arch in Wadi Rum',
		focus: '50% 50%',
		credit: {
			author: 'Bernard Gagnon',
			license: 'CC BY-SA 3.0',
			source: 'https://commons.wikimedia.org/wiki/File:Wadi_Rum_02.jpg'
		}
	},
	wadiRumCamp: {
		path: 'c/cd/Wadi_Rum_BW_20.JPG',
		width: 3872,
		alt: 'A desert camp and jeep beneath the cliffs of Wadi Rum at dusk',
		focus: '50% 55%',
		credit: {
			author: 'Berthold Werner',
			license: 'CC BY-SA 3.0',
			source: 'https://commons.wikimedia.org/wiki/File:Wadi_Rum_BW_20.JPG'
		}
	},
	mayaLongtails: {
		path: '9/97/Playa_Maya%2C_Ko_Phi_Phi%2C_Tailandia%2C_2013-08-19%2C_DD_13.JPG',
		width: 5364,
		alt: 'Longtail boats with garlands on the turquoise water of Maya Bay',
		focus: '44% 62%',
		credit: {
			author: 'Diego Delso',
			license: 'CC BY-SA 3.0',
			source:
				'https://commons.wikimedia.org/wiki/File:Playa_Maya,_Ko_Phi_Phi,_Tailandia,_2013-08-19,_DD_13.JPG'
		}
	},
	koTapu: {
		path: 'e/e3/Isla_Tapu%2C_Phuket%2C_Tailandia%2C_2013-08-20%2C_DD_36.JPG',
		width: 4976,
		alt: 'The limestone needle of Ko Tapu in Phang Nga Bay, a longtail passing',
		focus: '50% 50%',
		credit: {
			author: 'Diego Delso',
			license: 'CC BY-SA 3.0',
			source:
				'https://commons.wikimedia.org/wiki/File:Isla_Tapu,_Phuket,_Tailandia,_2013-08-20,_DD_36.JPG'
		}
	},
	koNgai: {
		path: 'e/e6/2016_Prowincja_Krabi%2C_Ko_Ngai_%2812%29.jpg',
		width: 4776,
		alt: 'Clear shallows and a forested island at Ko Ngai',
		focus: '50% 55%',
		credit: {
			author: 'Marcin Konsek',
			license: 'CC BY-SA 4.0',
			source: 'https://commons.wikimedia.org/wiki/File:2016_Prowincja_Krabi,_Ko_Ngai_(12).jpg'
		}
	},
	koPanyee: {
		path: '4/4e/Isla_Panyee%2C_Phuket%2C_Tailandia%2C_2013-08-20%2C_DD_08.JPG',
		width: 4808,
		alt: 'The stilt village of Koh Panyee beneath a limestone cliff',
		focus: '50% 50%',
		credit: {
			author: 'Diego Delso',
			license: 'CC BY-SA 3.0',
			source:
				'https://commons.wikimedia.org/wiki/File:Isla_Panyee,_Phuket,_Tailandia,_2013-08-20,_DD_08.JPG'
		}
	},
	lohMooDee: {
		path: '2/2a/2016_Prowincja_Krabi%2C_Ko_Phi_Phi_Don%2C_Pla%C5%BCa_Loh_Moo_Dee%2C_%C5%81odzie_d%C5%82ugoogonowe_%2801%29.jpg',
		width: 4463,
		alt: 'Longtail boats moored off the beach at Loh Moo Dee, Ko Phi Phi',
		focus: '50% 55%',
		credit: {
			author: 'Marcin Konsek',
			license: 'CC BY-SA 4.0',
			source:
				'https://commons.wikimedia.org/wiki/File:2016_Prowincja_Krabi,_Ko_Phi_Phi_Don,_Pla%C5%BCa_Loh_Moo_Dee,_%C5%81odzie_d%C5%82ugoogonowe_(01).jpg'
		}
	},
	koPoda: {
		path: '9/92/2016_Prowincja_Krabi%2C_Ko_Po_Da_Nok_%2804%29.jpg',
		width: 5096,
		alt: 'The limestone islets of Ko Poda rising from a calm sea',
		focus: '50% 55%',
		credit: {
			author: 'Marcin Konsek',
			license: 'CC BY-SA 4.0',
			source: 'https://commons.wikimedia.org/wiki/File:2016_Prowincja_Krabi,_Ko_Po_Da_Nok_(04).jpg'
		}
	}
} satisfies Record<string, Photo>;
