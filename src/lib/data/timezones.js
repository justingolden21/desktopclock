import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';
dayjs.extend(utc);
dayjs.extend(timezone);

// github.com/kangabru/whats-the-time/blob/master/src/data/timezones.ts
const timezones = {
	Etc: [
		'GMT-14',
		'GMT-13',
		'GMT-12',
		'GMT-11',
		'GMT-10',
		'GMT-9',
		'GMT-8',
		'GMT-7',
		'GMT-6',
		'GMT-5',
		'GMT-4',
		'GMT-3',
		'GMT-2',
		'GMT-1',
		'GMT',
		'GMT+1',
		'GMT+2',
		'GMT+3',
		'GMT+4',
		'GMT+5',
		'GMT+6',
		'GMT+7',
		'GMT+8',
		'GMT+9',
		'GMT+10',
		'GMT+11',
		'GMT+12'
	],
	Africa: [
		'Abidjan',
		'Accra',
		'Algiers',
		'Bissau',
		'Cairo',
		'Casablanca',
		'Ceuta',
		'El_Aaiun',
		'Johannesburg',
		'Juba',
		'Khartoum',
		'Lagos',
		'Maputo',
		'Monrovia',
		'Nairobi',
		'Ndjamena',
		'Sao_Tome',
		'Tripoli',
		'Tunis',
		'Windhoek'
	],
	America: [
		'Adak',
		'Anchorage',
		'Araguaina',
		'Argentina/Buenos_Aires',
		'Argentina/Catamarca',
		'Argentina/Cordoba',
		'Argentina/Jujuy',
		'Argentina/La_Rioja',
		'Argentina/Mendoza',
		'Argentina/Rio_Gallegos',
		'Argentina/Salta',
		'Argentina/San_Juan',
		'Argentina/San_Luis',
		'Argentina/Tucuman',
		'Argentina/Ushuaia',
		'Asuncion',
		'Atikokan',
		'Bahia',
		'Bahia_Banderas',
		'Barbados',
		'Belem',
		'Belize',
		'Blanc-Sablon',
		'Boa_Vista',
		'Bogota',
		'Boise',
		'Cambridge_Bay',
		'Campo_Grande',
		'Cancun',
		'Caracas',
		'Cayenne',
		'Chicago',
		'Chihuahua',
		'Costa_Rica',
		'Creston',
		'Cuiaba',
		'Curacao',
		'Danmarkshavn',
		'Dawson',
		'Dawson_Creek',
		'Denver',
		'Detroit',
		'Edmonton',
		'Eirunepe',
		'El_Salvador',
		'Fort_Nelson',
		'Fortaleza',
		'Glace_Bay',
		'Goose_Bay',
		'Grand_Turk',
		'Guatemala',
		'Guayaquil',
		'Guyana',
		'Halifax',
		'Havana',
		'Hermosillo',
		'Indiana/Indianapolis',
		'Indiana/Knox',
		'Indiana/Marengo',
		'Indiana/Petersburg',
		'Indiana/Tell_City',
		'Indiana/Vevay',
		'Indiana/Vincennes',
		'Indiana/Winamac',
		'Inuvik',
		'Iqaluit',
		'Jamaica',
		'Juneau',
		'Kentucky/Louisville',
		'Kentucky/Monticello',
		'La_Paz',
		'Lima',
		'Los_Angeles',
		'Maceio',
		'Managua',
		'Manaus',
		'Martinique',
		'Matamoros',
		'Mazatlan',
		'Menominee',
		'Merida',
		'Metlakatla',
		'Mexico_City',
		'Miquelon',
		'Moncton',
		'Monterrey',
		'Montevideo',
		'Nassau',
		'New_York',
		'Nipigon',
		'Nome',
		'Noronha',
		'North_Dakota/Beulah',
		'North_Dakota/Center',
		'North_Dakota/New_Salem',
		'Nuuk',
		'Ojinaga',
		'Panama',
		'Pangnirtung',
		'Paramaribo',
		'Phoenix',
		'Port_of_Spain',
		'Port-au-Prince',
		'Porto_Velho',
		'Puerto_Rico',
		'Punta_Arenas',
		'Rainy_River',
		'Rankin_Inlet',
		'Recife',
		'Regina',
		'Resolute',
		'Rio_Branco',
		'Santarem',
		'Santiago',
		'Santo_Domingo',
		'Sao_Paulo',
		'Scoresbysund',
		'Sitka',
		'St_Johns',
		'Swift_Current',
		'Tegucigalpa',
		'Thule',
		'Thunder_Bay',
		'Tijuana',
		'Toronto',
		'Vancouver',
		'Whitehorse',
		'Winnipeg',
		'Yakutat',
		'Yellowknife'
	],
	Antarctica: [
		'Casey',
		'Davis',
		'DumontDUrville',
		'Macquarie',
		'Mawson',
		'Palmer',
		'Rothera',
		'Syowa',
		'Troll',
		'Vostok'
	],
	Asia: [
		'Almaty',
		'Amman',
		'Anadyr',
		'Aqtau',
		'Aqtobe',
		'Ashgabat',
		'Atyrau',
		'Baghdad',
		'Baku',
		'Bangkok',
		'Barnaul',
		'Beirut',
		'Bishkek',
		'Brunei',
		'Chita',
		'Choibalsan',
		'Colombo',
		'Damascus',
		'Dhaka',
		'Dili',
		'Dubai',
		'Dushanbe',
		'Famagusta',
		'Gaza',
		'Hebron',
		'Ho_Chi_Minh',
		'Hong_Kong',
		'Hovd',
		'Irkutsk',
		'Jakarta',
		'Jayapura',
		'Jerusalem',
		'Kabul',
		'Kamchatka',
		'Karachi',
		'Kathmandu',
		'Khandyga',
		'Kolkata',
		'Krasnoyarsk',
		'Kuala_Lumpur',
		'Kuching',
		'Macau',
		'Magadan',
		'Makassar',
		'Manila',
		'Nicosia',
		'Novokuznetsk',
		'Novosibirsk',
		'Omsk',
		'Oral',
		'Pontianak',
		'Pyongyang',
		'Qatar',
		'Qostanay',
		'Qyzylorda',
		'Riyadh',
		'Sakhalin',
		'Samarkand',
		'Seoul',
		'Shanghai',
		'Singapore',
		'Srednekolymsk',
		'Taipei',
		'Tashkent',
		'Tbilisi',
		'Tehran',
		'Thimphu',
		'Tokyo',
		'Tomsk',
		'Ulaanbaatar',
		'Urumqi',
		'Ust-Nera',
		'Vladivostok',
		'Yakutsk',
		'Yangon',
		'Yekaterinburg',
		'Yerevan'
	],
	Atlantic: [
		'Azores',
		'Bermuda',
		'Canary',
		'Cape_Verde',
		'Faroe',
		'Madeira',
		'Reykjavik',
		'South_Georgia',
		'Stanley'
	],
	Australia: [
		'Adelaide',
		'Brisbane',
		'Broken_Hill',
		'Darwin',
		'Eucla',
		'Hobart',
		'Lindeman',
		'Lord_Howe',
		'Melbourne',
		'Perth',
		'Sydney'
	],
	Europe: [
		'Amsterdam',
		'Andorra',
		'Astrakhan',
		'Athens',
		'Belgrade',
		'Berlin',
		'Brussels',
		'Bucharest',
		'Budapest',
		'Chisinau',
		'Copenhagen',
		'Dublin',
		'Gibraltar',
		'Helsinki',
		'Istanbul',
		'Kaliningrad',
		'Kiev',
		'Kirov',
		'Lisbon',
		'London',
		'Luxembourg',
		'Madrid',
		'Malta',
		'Minsk',
		'Monaco',
		'Moscow',
		'Oslo',
		'Paris',
		'Prague',
		'Riga',
		'Rome',
		'Samara',
		'Saratov',
		'Simferopol',
		'Sofia',
		'Stockholm',
		'Tallinn',
		'Tirane',
		'Ulyanovsk',
		'Uzhgorod',
		'Vienna',
		'Vilnius',
		'Volgograd',
		'Warsaw',
		'Zaporozhye',
		'Zurich'
	],
	Indian: ['Chagos', 'Christmas', 'Cocos', 'Kerguelen', 'Mahe', 'Maldives', 'Mauritius', 'Reunion'],
	Pacific: [
		'Apia',
		'Auckland',
		'Bougainville',
		'Chatham',
		'Chuuk',
		'Easter',
		'Efate',
		'Enderbury',
		'Fakaofo',
		'Fiji',
		'Funafuti',
		'Galapagos',
		'Gambier',
		'Guadalcanal',
		'Guam',
		'Honolulu',
		'Kiritimati',
		'Kosrae',
		'Kwajalein',
		'Majuro',
		'Marquesas',
		'Nauru',
		'Niue',
		'Norfolk',
		'Noumea',
		'Pago_Pago',
		'Palau',
		'Pitcairn',
		'Pohnpei',
		'Port_Moresby',
		'Rarotonga',
		'Tahiti',
		'Tarawa',
		'Tongatapu',
		'Wake',
		'Wallis'
	]
};

export default timezones;

export function testTimezones() {
	for (let area in timezones) {
		for (let timezone in timezones[area]) {
			const tz = area + '/' + timezones[area][timezone];
			try {
				new dayjs().tz(tz);
				console.log(tz, 'works dayjs');
			} catch (err) {
				console.error(tz, 'failed dayjs');
				console.error(err);
			}
		}
	}
}
