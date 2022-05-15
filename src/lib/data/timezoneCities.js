const timezoneCities = [
	{
		utc: 'UTC-11',
		timezone: 'Pacific/Midway',
		country: 'United States Minor Outlying Islands',
		cities: ''
	},
	{
		utc: 'UTC-11',
		timezone: 'Pacific/Niue',
		country: 'Niue',
		cities: 'Alofi'
	},
	{
		utc: 'UTC-11',
		timezone: 'Pacific/Pago_Pago',
		country: 'American Samoa',
		cities: 'Pago Pago, Tāfuna, Ta`ū, Taulaga'
	},
	{
		utc: 'UTC-10',
		timezone: 'America/Adak',
		country: 'United States',
		cities: ''
	},
	{
		utc: 'UTC-10',
		timezone: 'Pacific/Honolulu',
		country: 'United States',
		cities: 'Honolulu, East Honolulu, Pearl City, Hilo, Kailua'
	},
	{
		utc: 'UTC-10',
		timezone: 'Pacific/Rarotonga',
		country: 'Cook Islands',
		cities: 'Avarua'
	},
	{
		utc: 'UTC-10',
		timezone: 'Pacific/Tahiti',
		country: 'French Polynesia',
		cities: 'Faaa, Papeete, Punaauia, Pirae, Mahina'
	},
	{
		utc: 'UTC-9:30',
		timezone: 'Pacific/Marquesas',
		country: 'French Polynesia',
		cities: 'Taiohae'
	},
	{
		utc: 'UTC-9',
		timezone: 'America/Anchorage',
		country: 'United States',
		cities: 'Anchorage, Fairbanks, Eagle River, Badger, Knik-Fairview'
	},
	{
		utc: 'UTC-9',
		timezone: 'America/Juneau',
		country: 'United States',
		cities: 'Juneau'
	},
	{
		utc: 'UTC-9',
		timezone: 'America/Metlakatla',
		country: 'United States',
		cities: ''
	},
	{
		utc: 'UTC-9',
		timezone: 'America/Nome',
		country: 'United States',
		cities: ''
	},
	{
		utc: 'UTC-9',
		timezone: 'America/Sitka',
		country: 'United States',
		cities: 'Sitka, Ketchikan'
	},
	{
		utc: 'UTC-9',
		timezone: 'America/Yakutat',
		country: 'United States',
		cities: ''
	},
	{
		utc: 'UTC-9',
		timezone: 'Pacific/Gambier',
		country: 'French Polynesia',
		cities: ''
	},
	{
		utc: 'UTC-8',
		timezone: 'America/Los_Angeles',
		country: 'United States',
		cities: 'Los Angeles, San Diego, San Jose, San Francisco, Seattle'
	},
	{
		utc: 'UTC-8',
		timezone: 'America/Tijuana',
		country: 'Mexico',
		cities: 'Tijuana, Mexicali, Ensenada, Rosarito, Tecate'
	},
	{
		utc: 'UTC-8',
		timezone: 'America/Vancouver',
		country: 'Canada',
		cities: 'Vancouver, Surrey, Okanagan, Victoria, Burnaby'
	},
	{
		utc: 'UTC-8',
		timezone: 'Pacific/Pitcairn',
		country: 'Pitcairn',
		cities: 'Adamstown'
	},
	{
		utc: 'UTC-7',
		timezone: 'America/Boise',
		country: 'United States',
		cities: 'Boise, Meridian, Nampa, Idaho Falls, Pocatello'
	},
	{
		utc: 'UTC-7',
		timezone: 'America/Cambridge_Bay',
		country: 'Canada',
		cities: ''
	},
	{
		utc: 'UTC-7',
		timezone: 'America/Chihuahua',
		country: 'Mexico',
		cities: 'Chihuahua, Ciudad Delicias, Cuauhtémoc, Parral, Nuevo Casas Grandes'
	},
	{
		utc: 'UTC-7',
		timezone: 'America/Creston',
		country: 'Canada',
		cities: ''
	},
	{
		utc: 'UTC-7',
		timezone: 'America/Dawson',
		country: 'Canada',
		cities: ''
	},
	{
		utc: 'UTC-7',
		timezone: 'America/Dawson_Creek',
		country: 'Canada',
		cities: 'Fort St. John, Dawson Creek'
	},
	{
		utc: 'UTC-7',
		timezone: 'America/Denver',
		country: 'United States',
		cities: 'Denver, El Paso, Albuquerque, Colorado Springs, Aurora'
	},
	{
		utc: 'UTC-7',
		timezone: 'America/Edmonton',
		country: 'Canada',
		cities: 'Calgary, Edmonton, Fort McMurray, Red Deer, Lethbridge'
	},
	{
		utc: 'UTC-7',
		timezone: 'America/Fort_Nelson',
		country: 'Canada',
		cities: ''
	},
	{
		utc: 'UTC-7',
		timezone: 'America/Hermosillo',
		country: 'Mexico',
		cities: 'Hermosillo, Ciudad Obregón, Nogales, San Luis Río Colorado, Navojoa'
	},
	{
		utc: 'UTC-7',
		timezone: 'America/Inuvik',
		country: 'Canada',
		cities: ''
	},
	{
		utc: 'UTC-7',
		timezone: 'America/Mazatlan',
		country: 'Mexico',
		cities: 'Culiacán, Mazatlán, Tepic, Los Mochis, La Paz'
	},
	{
		utc: 'UTC-7',
		timezone: 'America/Ojinaga',
		country: 'Mexico',
		cities: 'Ciudad Juárez, Manuel Ojinaga, Ojinaga'
	},
	{
		utc: 'UTC-7',
		timezone: 'America/Phoenix',
		country: 'United States',
		cities: 'Phoenix, Tucson, Mesa, Chandler, Gilbert'
	},
	{
		utc: 'UTC-7',
		timezone: 'America/Whitehorse',
		country: 'Canada',
		cities: 'Whitehorse'
	},
	{
		utc: 'UTC-7',
		timezone: 'America/Yellowknife',
		country: 'Canada',
		cities: 'Yellowknife'
	},
	{
		utc: 'UTC-6',
		timezone: 'America/Bahia_Banderas',
		country: 'Mexico',
		cities: 'Mezcales, San Vicente, Bucerías, Valle de Banderas'
	},
	{
		utc: 'UTC-6',
		timezone: 'America/Belize',
		country: 'Belize',
		cities: 'Belize City, San Ignacio, Orange Walk, Belmopan, Dangriga'
	},
	{
		utc: 'UTC-6',
		timezone: 'America/Chicago',
		country: 'United States',
		cities: 'Chicago, Houston, San Antonio, Dallas, Austin'
	},
	{
		utc: 'UTC-6',
		timezone: 'America/Costa_Rica',
		country: 'Costa Rica',
		cities: 'San José, Limón, San Francisco, Alajuela, Liberia'
	},
	{
		utc: 'UTC-6',
		timezone: 'America/El_Salvador',
		country: 'El Salvador',
		cities: 'San Salvador, Soyapango, Santa Ana, San Miguel, Mejicanos'
	},
	{
		utc: 'UTC-6',
		timezone: 'America/Guatemala',
		country: 'Guatemala',
		cities: 'Guatemala City, Mixco, Villa Nueva, Petapa, San Juan Sacatepéquez'
	},
	{
		utc: 'UTC-6',
		timezone: 'America/Indiana/Knox',
		country: 'United States',
		cities: ''
	},
	{
		utc: 'UTC-6',
		timezone: 'America/Indiana/Tell_City',
		country: 'United States',
		cities: 'Tell City'
	},
	{
		utc: 'UTC-6',
		timezone: 'America/Managua',
		country: 'Nicaragua',
		cities: 'Managua, León, Masaya, Chinandega, Matagalpa'
	},
	{
		utc: 'UTC-6',
		timezone: 'America/Matamoros',
		country: 'Mexico',
		cities: 'Reynosa, Heroica Matamoros, Nuevo Laredo, Piedras Negras, Ciudad Acuña'
	},
	{
		utc: 'UTC-6',
		timezone: 'America/Menominee',
		country: 'United States',
		cities: 'Menominee, Iron Mountain, Kingsford, Ironwood, Iron River'
	},
	{
		utc: 'UTC-6',
		timezone: 'America/Merida',
		country: 'Mexico',
		cities: 'Mérida, Campeche, Ciudad del Carmen, Kanasín, Valladolid'
	},
	{
		utc: 'UTC-6',
		timezone: 'America/Mexico_City',
		country: 'Mexico',
		cities: 'Mexico City, Iztapalapa, Ecatepec de Morelos, Guadalajara, Puebla'
	},
	{
		utc: 'UTC-6',
		timezone: 'America/Monterrey',
		country: 'Mexico',
		cities: 'Monterrey, Saltillo, Guadalupe, Torreón, Victoria de Durango'
	},
	{
		utc: 'UTC-6',
		timezone: 'America/North_Dakota/Beulah',
		country: 'United States',
		cities: ''
	},
	{
		utc: 'UTC-6',
		timezone: 'America/North_Dakota/Center',
		country: 'United States',
		cities: ''
	},
	{
		utc: 'UTC-6',
		timezone: 'America/North_Dakota/New_Salem',
		country: 'United States',
		cities: 'Mandan'
	},
	{
		utc: 'UTC-6',
		timezone: 'America/Rainy_River',
		country: 'Canada',
		cities: ''
	},
	{
		utc: 'UTC-6',
		timezone: 'America/Rankin_Inlet',
		country: 'Canada',
		cities: ''
	},
	{
		utc: 'UTC-6',
		timezone: 'America/Regina',
		country: 'Canada',
		cities: 'Saskatoon, Regina, Prince Albert, Moose Jaw, North Battleford'
	},
	{
		utc: 'UTC-6',
		timezone: 'America/Resolute',
		country: 'Canada',
		cities: ''
	},
	{
		utc: 'UTC-6',
		timezone: 'America/Swift_Current',
		country: 'Canada',
		cities: 'Swift Current'
	},
	{
		utc: 'UTC-6',
		timezone: 'America/Tegucigalpa',
		country: 'Honduras',
		cities: 'Tegucigalpa, San Pedro Sula, Choloma, La Ceiba, El Progreso'
	},
	{
		utc: 'UTC-6',
		timezone: 'America/Winnipeg',
		country: 'Canada',
		cities: 'Winnipeg, Brandon, Kenora, Portage la Prairie, Thompson'
	},
	{
		utc: 'UTC-6',
		timezone: 'Pacific/Easter',
		country: 'Chile',
		cities: ''
	},
	{
		utc: 'UTC-6',
		timezone: 'Pacific/Galapagos',
		country: 'Ecuador',
		cities: 'Puerto Ayora, Puerto Baquerizo Moreno'
	},
	{
		utc: 'UTC-5',
		timezone: 'America/Atikokan',
		country: 'Canada',
		cities: ''
	},
	{
		utc: 'UTC-5',
		timezone: 'America/Bogota',
		country: 'Colombia',
		cities: 'Bogotá, Cali, Medellín, Barranquilla, Cartagena'
	},
	{
		utc: 'UTC-5',
		timezone: 'America/Cancun',
		country: 'Mexico',
		cities: 'Cancún, Chetumal, Playa del Carmen, Cozumel, Felipe Carrillo Puerto'
	},
	{
		utc: 'UTC-5',
		timezone: 'America/Cayman',
		country: 'Cayman Islands',
		cities: 'George Town, West Bay, Bodden Town, East End, North Side'
	},
	{
		utc: 'UTC-5',
		timezone: 'America/Detroit',
		country: 'United States',
		cities: 'Detroit, Grand Rapids, Warren, Sterling Heights, Ann Arbor'
	},
	{
		utc: 'UTC-5',
		timezone: 'America/Eirunepe',
		country: 'Brazil',
		cities: 'Eirunepé, Benjamin Constant, Envira'
	},
	{
		utc: 'UTC-5',
		timezone: 'America/Grand_Turk',
		country: 'Turks and Caicos Islands',
		cities: 'Cockburn Town'
	},
	{
		utc: 'UTC-5',
		timezone: 'America/Guayaquil',
		country: 'Ecuador',
		cities: 'Guayaquil, Quito, Cuenca, Santo Domingo de los Colorados, Machala'
	},
	{
		utc: 'UTC-5',
		timezone: 'America/Havana',
		country: 'Cuba',
		cities: 'Havana, Santiago de Cuba, Camagüey, Holguín, Guantánamo'
	},
	{
		utc: 'UTC-5',
		timezone: 'America/Indiana/Indianapolis',
		country: 'United States',
		cities: 'Indianapolis, Fort Wayne, South Bend, Carmel, Bloomington'
	},
	{
		utc: 'UTC-5',
		timezone: 'America/Indiana/Marengo',
		country: 'United States',
		cities: ''
	},
	{
		utc: 'UTC-5',
		timezone: 'America/Indiana/Petersburg',
		country: 'United States',
		cities: ''
	},
	{
		utc: 'UTC-5',
		timezone: 'America/Indiana/Vevay',
		country: 'United States',
		cities: ''
	},
	{
		utc: 'UTC-5',
		timezone: 'America/Indiana/Vincennes',
		country: 'United States',
		cities: 'Vincennes, Jasper, Washington, Huntingburg'
	},
	{
		utc: 'UTC-5',
		timezone: 'America/Indiana/Winamac',
		country: 'United States',
		cities: ''
	},
	{
		utc: 'UTC-5',
		timezone: 'America/Iqaluit',
		country: 'Canada',
		cities: 'Iqaluit'
	},
	{
		utc: 'UTC-5',
		timezone: 'America/Jamaica',
		country: 'Jamaica',
		cities: 'Kingston, New Kingston, Spanish Town, Portmore, Montego Bay'
	},
	{
		utc: 'UTC-5',
		timezone: 'America/Kentucky/Louisville',
		country: 'United States',
		cities: 'Louisville, Jeffersonville, New Albany, Jeffersontown, Pleasure Ridge Park'
	},
	{
		utc: 'UTC-5',
		timezone: 'America/Kentucky/Monticello',
		country: 'United States',
		cities: 'Monticello'
	},
	{
		utc: 'UTC-5',
		timezone: 'America/Lima',
		country: 'Peru',
		cities: 'Lima, Arequipa, Callao, Trujillo, Chiclayo'
	},
	{
		utc: 'UTC-5',
		timezone: 'America/Nassau',
		country: 'Bahamas',
		cities: 'Nassau, Lucaya, Freeport, West End, Cooper’s Town'
	},
	{
		utc: 'UTC-5',
		timezone: 'America/New_York',
		country: 'United States',
		cities: 'New York City, Brooklyn, Queens, Philadelphia, Manhattan'
	},
	{
		utc: 'UTC-5',
		timezone: 'America/Nipigon',
		country: 'Canada',
		cities: ''
	},
	{
		utc: 'UTC-5',
		timezone: 'America/Panama',
		country: 'Panama',
		cities: 'Panamá, San Miguelito, Juan Díaz, David, Arraiján'
	},
	{
		utc: 'UTC-5',
		timezone: 'America/Pangnirtung',
		country: 'Canada',
		cities: ''
	},
	{
		utc: 'UTC-5',
		timezone: 'America/Port-au-Prince',
		country: 'Haiti',
		cities: 'Port-au-Prince, Carrefour, Delmas 73, Pétionville, Port-de-Paix'
	},
	{
		utc: 'UTC-5',
		timezone: 'America/Rio_Branco',
		country: 'Brazil',
		cities: 'Rio Branco, Cruzeiro do Sul, Sena Madureira, Tarauacá, Feijó'
	},
	{
		utc: 'UTC-5',
		timezone: 'America/Thunder_Bay',
		country: 'Canada',
		cities: 'Thunder Bay'
	},
	{
		utc: 'UTC-5',
		timezone: 'America/Toronto',
		country: 'Canada',
		cities: 'Toronto, Montréal, Ottawa, Mississauga, Québec'
	},
	{
		utc: 'UTC-4',
		timezone: 'America/Anguilla',
		country: 'Anguilla',
		cities: 'The Valley, Blowing Point Village, Sandy Ground Village, The Quarter, Sandy Hill'
	},
	{
		utc: 'UTC-4',
		timezone: 'America/Antigua',
		country: 'Antigua and Barbuda',
		cities: 'Saint John’s, Piggotts, Bolands, Codrington, Parham'
	},
	{
		utc: 'UTC-4',
		timezone: 'America/Aruba',
		country: 'Aruba',
		cities: 'Oranjestad, Tanki Leendert, San Nicolas, Santa Cruz, Paradera'
	},
	{
		utc: 'UTC-4',
		timezone: 'America/Asuncion',
		country: 'Paraguay',
		cities: 'Asunción, Ciudad del Este, San Lorenzo, Capiatá, Lambaré'
	},
	{
		utc: 'UTC-4',
		timezone: 'America/Barbados',
		country: 'Barbados',
		cities: 'Bridgetown, Speightstown, Oistins, Bathsheba, Holetown'
	},
	{
		utc: 'UTC-4',
		timezone: 'America/Blanc-Sablon',
		country: 'Canada',
		cities: 'Lévis'
	},
	{
		utc: 'UTC-4',
		timezone: 'America/Boa_Vista',
		country: 'Brazil',
		cities: 'Boa Vista'
	},
	{
		utc: 'UTC-4',
		timezone: 'America/Campo_Grande',
		country: 'Brazil',
		cities: 'Campo Grande, Dourados, Corumbá, Três Lagoas, Ponta Porã'
	},
	{
		utc: 'UTC-4',
		timezone: 'America/Caracas',
		country: 'Venezuela',
		cities: 'Caracas, Maracaibo, Maracay, Valencia, Barquisimeto'
	},
	{
		utc: 'UTC-4',
		timezone: 'America/Cuiaba',
		country: 'Brazil',
		cities: 'Cuiabá, Várzea Grande, Rondonópolis, Sinop, Barra do Garças'
	},
	{
		utc: 'UTC-4',
		timezone: 'America/Curacao',
		country: 'Curacao',
		cities: 'Willemstad, Sint Michiel Liber'
	},
	{
		utc: 'UTC-4',
		timezone: 'America/Dominica',
		country: 'Dominica',
		cities: 'Roseau, Portsmouth, Berekua, Saint Joseph, Wesley'
	},
	{
		utc: 'UTC-4',
		timezone: 'America/Glace_Bay',
		country: 'Canada',
		cities: 'Sydney, Glace Bay, Sydney Mines'
	},
	{
		utc: 'UTC-4',
		timezone: 'America/Goose_Bay',
		country: 'Canada',
		cities: 'Labrador City, Happy Valley-Goose Bay'
	},
	{
		utc: 'UTC-4',
		timezone: 'America/Grenada',
		country: 'Grenada',
		cities: "Saint George's, Gouyave, Grenville, Victoria, Saint David’s"
	},
	{
		utc: 'UTC-4',
		timezone: 'America/Guadeloupe',
		country: 'Guadeloupe',
		cities: 'Les Abymes, Baie-Mahault, Le Gosier, Petit-Bourg, Sainte-Anne'
	},
	{
		utc: 'UTC-4',
		timezone: 'America/Guyana',
		country: 'Guyana',
		cities: 'Georgetown, Linden, New Amsterdam, Anna Regina, Bartica'
	},
	{
		utc: 'UTC-4',
		timezone: 'America/Halifax',
		country: 'Canada',
		cities: 'Halifax, Dartmouth, Charlottetown, Lower Sackville, Truro'
	},
	{
		utc: 'UTC-4',
		timezone: 'America/Kralendijk',
		country: 'Bonaire, Saint Eustatius and Saba',
		cities: 'Kralendijk, Oranjestad, The Bottom'
	},
	{
		utc: 'UTC-4',
		timezone: 'America/La_Paz',
		country: 'Bolivia',
		cities: 'Santa Cruz de la Sierra, Cochabamba, La Paz, Sucre, Oruro'
	},
	{
		utc: 'UTC-4',
		timezone: 'America/Lower_Princes',
		country: 'Sint Maarten',
		cities: 'Cul de Sac, Lower Prince’s Quarter, Koolbaai, Philipsburg'
	},
	{
		utc: 'UTC-4',
		timezone: 'America/Manaus',
		country: 'Brazil',
		cities: 'Manaus, Itacoatiara, Parintins, Manacapuru, Coari'
	},
	{
		utc: 'UTC-4',
		timezone: 'America/Marigot',
		country: 'Saint Martin',
		cities: 'Marigot'
	},
	{
		utc: 'UTC-4',
		timezone: 'America/Martinique',
		country: 'Martinique',
		cities: 'Fort-de-France, Le Lamentin, Le Robert, Sainte-Marie, Le François'
	},
	{
		utc: 'UTC-4',
		timezone: 'America/Moncton',
		country: 'Canada',
		cities: 'Moncton, Saint John, Fredericton, Dieppe, Miramichi'
	},
	{
		utc: 'UTC-4',
		timezone: 'America/Montserrat',
		country: 'Montserrat',
		cities: 'Brades, Saint Peters, Plymouth'
	},
	{
		utc: 'UTC-4',
		timezone: 'America/Porto_Velho',
		country: 'Brazil',
		cities: 'Porto Velho, Ji Paraná, Vilhena, Ariquemes, Cacoal'
	},
	{
		utc: 'UTC-4',
		timezone: 'America/Port_of_Spain',
		country: 'Trinidad and Tobago',
		cities: 'Chaguanas, Mon Repos, San Fernando, Port of Spain, Rio Claro'
	},
	{
		utc: 'UTC-4',
		timezone: 'America/Puerto_Rico',
		country: 'Puerto Rico',
		cities: 'San Juan, Bayamón, Carolina, Ponce, Caguas'
	},
	{
		utc: 'UTC-4',
		timezone: 'America/Santiago',
		country: 'Chile',
		cities: 'Santiago, Puente Alto, Antofagasta, Viña del Mar, Valparaíso'
	},
	{
		utc: 'UTC-4',
		timezone: 'America/Santo_Domingo',
		country: 'Dominican Republic',
		cities:
			'Santo Domingo, Santiago de los Caballeros, Santo Domingo Oeste, Santo Domingo Este, San Pedro de Macorís'
	},
	{
		utc: 'UTC-4',
		timezone: 'America/St_Barthelemy',
		country: 'Saint Barthelemy',
		cities: 'Gustavia'
	},
	{
		utc: 'UTC-4',
		timezone: 'America/St_Kitts',
		country: 'Saint Kitts and Nevis',
		cities: 'Basseterre, Fig Tree, Market Shop, Saint Paul’s, Middle Island'
	},
	{
		utc: 'UTC-4',
		timezone: 'America/St_Lucia',
		country: 'Saint Lucia',
		cities: 'Castries, Bisee, Vieux Fort, Micoud, Soufrière'
	},
	{
		utc: 'UTC-4',
		timezone: 'America/St_Thomas',
		country: 'U.S. Virgin Islands',
		cities: 'Saint Croix, Charlotte Amalie, Cruz Bay'
	},
	{
		utc: 'UTC-4',
		timezone: 'America/St_Vincent',
		country: 'Saint Vincent and the Grenadines',
		cities: 'Kingstown, Kingstown Park, Georgetown, Barrouallie, Port Elizabeth'
	},
	{
		utc: 'UTC-4',
		timezone: 'America/Thule',
		country: 'Greenland',
		cities: ''
	},
	{
		utc: 'UTC-4',
		timezone: 'America/Tortola',
		country: 'British Virgin Islands',
		cities: 'Road Town'
	},
	{
		utc: 'UTC-4',
		timezone: 'Atlantic/Bermuda',
		country: 'Bermuda',
		cities: 'Hamilton'
	},
	{
		utc: 'UTC-3:30',
		timezone: 'America/St_Johns',
		country: 'Canada',
		cities: "St. John's, Mount Pearl, Corner Brook, Conception Bay South, Bay Roberts"
	},
	{
		utc: 'UTC-3',
		timezone: 'America/Araguaina',
		country: 'Brazil',
		cities: 'Palmas, Araguaína, Gurupi, Miracema do Tocantins, Porto Franco'
	},
	{
		utc: 'UTC-3',
		timezone: 'America/Argentina/Buenos_Aires',
		country: 'Argentina',
		cities: 'Buenos Aires, La Plata, Mar del Plata, Morón, Bahía Blanca'
	},
	{
		utc: 'UTC-3',
		timezone: 'America/Argentina/Catamarca',
		country: 'Argentina',
		cities: 'San Fernando del Valle de Catamarca, Trelew, Puerto Madryn, Esquel, Rawson'
	},
	{
		utc: 'UTC-3',
		timezone: 'America/Argentina/Cordoba',
		country: 'Argentina',
		cities: 'Córdoba, Rosario, Santa Fe, Resistencia, Santiago del Estero'
	},
	{
		utc: 'UTC-3',
		timezone: 'America/Argentina/Jujuy',
		country: 'Argentina',
		cities:
			'San Salvador de Jujuy, San Pedro de Jujuy, Libertador General San Martín, Palpalá, La Quiaca'
	},
	{
		utc: 'UTC-3',
		timezone: 'America/Argentina/La_Rioja',
		country: 'Argentina',
		cities: 'La Rioja, Chilecito, Arauco, Chamical'
	},
	{
		utc: 'UTC-3',
		timezone: 'America/Argentina/Mendoza',
		country: 'Argentina',
		cities: 'Mendoza, San Rafael, San Martín'
	},
	{
		utc: 'UTC-3',
		timezone: 'America/Argentina/Rio_Gallegos',
		country: 'Argentina',
		cities: 'Comodoro Rivadavia, Río Gallegos, Caleta Olivia, Pico Truncado, Puerto Deseado'
	},
	{
		utc: 'UTC-3',
		timezone: 'America/Argentina/Salta',
		country: 'Argentina',
		cities: 'Salta, Neuquén, Santa Rosa, San Carlos de Bariloche, Cipolletti'
	},
	{
		utc: 'UTC-3',
		timezone: 'America/Argentina/San_Juan',
		country: 'Argentina',
		cities: 'San Juan, Chimbas, Santa Lucía, Pocito, Caucete'
	},
	{
		utc: 'UTC-3',
		timezone: 'America/Argentina/San_Luis',
		country: 'Argentina',
		cities: 'San Luis, Villa Mercedes, La Punta, Merlo, Justo Daract'
	},
	{
		utc: 'UTC-3',
		timezone: 'America/Argentina/Tucuman',
		country: 'Argentina',
		cities: 'San Miguel de Tucumán, Yerba Buena, Tafí Viejo, Alderetes, Aguilares'
	},
	{
		utc: 'UTC-3',
		timezone: 'America/Argentina/Ushuaia',
		country: 'Argentina',
		cities: 'Ushuaia, Río Grande'
	},
	{
		utc: 'UTC-3',
		timezone: 'America/Bahia',
		country: 'Brazil',
		cities: 'Salvador, Feira de Santana, Vitória da Conquista, Itabuna, Camaçari'
	},
	{
		utc: 'UTC-3',
		timezone: 'America/Belem',
		country: 'Brazil',
		cities: 'Belém, Ananindeua, Macapá, Parauapebas, Marabá'
	},
	{
		utc: 'UTC-3',
		timezone: 'America/Cayenne',
		country: 'French Guiana',
		cities: 'Cayenne, Matoury, Saint-Laurent-du-Maroni, Kourou, Rémire-Montjoly'
	},
	{
		utc: 'UTC-3',
		timezone: 'America/Fortaleza',
		country: 'Brazil',
		cities: 'Fortaleza, São Luís, Natal, Teresina, João Pessoa'
	},
	{
		utc: 'UTC-3',
		timezone: 'America/Godthab',
		country: 'Greenland',
		cities: 'Nuuk, Sisimiut, Ilulissat, Qaqortoq, Aasiaat'
	},
	{
		utc: 'UTC-3',
		timezone: 'America/Maceio',
		country: 'Brazil',
		cities: 'Maceió, Aracaju, Arapiraca, Nossa Senhora do Socorro, São Cristóvão'
	},
	{
		utc: 'UTC-3',
		timezone: 'America/Miquelon',
		country: 'Saint Pierre and Miquelon',
		cities: 'Saint-Pierre, Miquelon'
	},
	{
		utc: 'UTC-3',
		timezone: 'America/Montevideo',
		country: 'Uruguay',
		cities: 'Montevideo, Salto, Paysandú, Las Piedras, Rivera'
	},
	{
		utc: 'UTC-3',
		timezone: 'America/Paramaribo',
		country: 'Suriname',
		cities: 'Paramaribo, Lelydorp, Brokopondo, Nieuw Nickerie, Moengo'
	},
	{
		utc: 'UTC-3',
		timezone: 'America/Punta_Arenas',
		country: 'Chile',
		cities: 'Punta Arenas, Puerto Natales'
	},
	{
		utc: 'UTC-3',
		timezone: 'America/Recife',
		country: 'Brazil',
		cities: 'Recife, Jaboatão, Jaboatão dos Guararapes, Olinda, Paulista'
	},
	{
		utc: 'UTC-3',
		timezone: 'America/Santarem',
		country: 'Brazil',
		cities: 'Santarém, Altamira, Itaituba, Oriximiná, Alenquer'
	},
	{
		utc: 'UTC-3',
		timezone: 'America/Sao_Paulo',
		country: 'Brazil',
		cities: 'São Paulo, Rio de Janeiro, Belo Horizonte, Brasília, Curitiba'
	},
	{
		utc: 'UTC-3',
		timezone: 'Antarctica/Palmer',
		country: 'Antarctica',
		cities: ''
	},
	{
		utc: 'UTC-3',
		timezone: 'Antarctica/Rothera',
		country: 'Antarctica',
		cities: ''
	},
	{
		utc: 'UTC-3',
		timezone: 'Atlantic/Stanley',
		country: 'Falkland Islands',
		cities: 'Stanley'
	},
	{
		utc: 'UTC-2',
		timezone: 'America/Noronha',
		country: 'Brazil',
		cities: 'Itamaracá'
	},
	{
		utc: 'UTC-2',
		timezone: 'Atlantic/South_Georgia',
		country: 'South Georgia and the South Sandwich Islands',
		cities: 'Grytviken'
	},
	{
		utc: 'UTC-1',
		timezone: 'America/Scoresbysund',
		country: 'Greenland',
		cities: ''
	},
	{
		utc: 'UTC-1',
		timezone: 'Atlantic/Azores',
		country: 'Portugal',
		cities: 'Ponta Delgada, Lagoa, Angra do Heroísmo, Rosto de Cão, Rabo de Peixe'
	},
	{
		utc: 'UTC-1',
		timezone: 'Atlantic/Cape_Verde',
		country: 'Cabo Verde',
		cities: 'Praia, Mindelo, Santa Maria, Cova Figueira, Santa Cruz'
	},
	{
		utc: 'UTC+0',
		timezone: 'Africa/Abidjan',
		country: 'Ivory Coast',
		cities: 'Abidjan, Abobo, Bouaké, Daloa, San-Pédro'
	},
	{
		utc: 'UTC+0',
		timezone: 'Africa/Accra',
		country: 'Ghana',
		cities: 'Accra, Kumasi, Tamale, Takoradi, Atsiaman'
	},
	{
		utc: 'UTC+0',
		timezone: 'Africa/Bamako',
		country: 'Mali',
		cities: 'Bamako, Sikasso, Mopti, Koutiala, Ségou'
	},
	{
		utc: 'UTC+0',
		timezone: 'Africa/Banjul',
		country: 'Gambia',
		cities: 'Serekunda, Brikama, Bakau, Banjul, Farafenni'
	},
	{
		utc: 'UTC+0',
		timezone: 'Africa/Bissau',
		country: 'Guinea-Bissau',
		cities: 'Bissau, Bafatá, Gabú, Bissorã, Bolama'
	},
	{
		utc: 'UTC+0',
		timezone: 'Africa/Casablanca',
		country: 'Morocco',
		cities: 'Casablanca, Rabat, Fès, Sale, Marrakesh'
	},
	{
		utc: 'UTC+0',
		timezone: 'Africa/Conakry',
		country: 'Guinea',
		cities: 'Camayenne, Conakry, Nzérékoré, Kindia, Kankan'
	},
	{
		utc: 'UTC+0',
		timezone: 'Africa/Dakar',
		country: 'Senegal',
		cities: 'Dakar, Pikine, Touba, Thiès, Thiès Nones'
	},
	{
		utc: 'UTC+0',
		timezone: 'Africa/El_Aaiun',
		country: 'Western Sahara',
		cities: 'Laayoune, Dakhla, Laayoune Plage'
	},
	{
		utc: 'UTC+0',
		timezone: 'Africa/Freetown',
		country: 'Sierra Leone',
		cities: 'Freetown, Bo, Kenema, Koidu, Makeni'
	},
	{
		utc: 'UTC+0',
		timezone: 'Africa/Lome',
		country: 'Togo',
		cities: 'Lomé, Sokodé, Kara, Atakpamé, Kpalimé'
	},
	{
		utc: 'UTC+0',
		timezone: 'Africa/Monrovia',
		country: 'Liberia',
		cities: 'Monrovia, Gbarnga, Kakata, Bensonville, Harper'
	},
	{
		utc: 'UTC+0',
		timezone: 'Africa/Nouakchott',
		country: 'Mauritania',
		cities: 'Nouakchott, Nouadhibou, Néma, Kaédi, Rosso'
	},
	{
		utc: 'UTC+0',
		timezone: 'Africa/Ouagadougou',
		country: 'Burkina Faso',
		cities: 'Ouagadougou, Bobo-Dioulasso, Koudougou, Ouahigouya, Banfora'
	},
	{
		utc: 'UTC+0',
		timezone: 'Africa/Sao_Tome',
		country: 'Sao Tome and Principe',
		cities: 'São Tomé, Santo António'
	},
	{
		utc: 'UTC+0',
		timezone: 'America/Danmarkshavn',
		country: 'Greenland',
		cities: ''
	},
	{
		utc: 'UTC+0',
		timezone: 'Antarctica/Troll',
		country: 'Antarctica',
		cities: ''
	},
	{
		utc: 'UTC+0',
		timezone: 'Atlantic/Canary',
		country: 'Spain',
		cities: 'Las Palmas de Gran Canaria, Santa Cruz de Tenerife, La Laguna, Telde, Arona'
	},
	{
		utc: 'UTC+0',
		timezone: 'Atlantic/Faroe',
		country: 'Faroe Islands',
		cities: 'Tórshavn, Klaksvík, Fuglafjørður, Tvøroyri, Miðvágur'
	},
	{
		utc: 'UTC+0',
		timezone: 'Atlantic/Madeira',
		country: 'Portugal',
		cities: 'Funchal, Câmara de Lobos, São Martinho, Caniço, Machico'
	},
	{
		utc: 'UTC+0',
		timezone: 'Atlantic/Reykjavik',
		country: 'Iceland',
		cities: 'Reykjavík, Kópavogur, Hafnarfjörður, Akureyri, Garðabær'
	},
	{
		utc: 'UTC+0',
		timezone: 'Atlantic/St_Helena',
		country: 'Saint Helena',
		cities: 'Jamestown, Georgetown, Edinburgh of the Seven Seas'
	},
	{
		utc: 'UTC+0',
		timezone: 'Europe/Dublin',
		country: 'Ireland',
		cities: 'Dublin, Cork, Luimneach, Gaillimh, Tallaght'
	},
	{
		utc: 'UTC+0',
		timezone: 'Europe/Guernsey',
		country: 'Guernsey',
		cities: 'Saint Peter Port, St Martin, Saint Sampson, St Anne, Saint Saviour'
	},
	{
		utc: 'UTC+0',
		timezone: 'Europe/Isle_of_Man',
		country: 'Isle of Man',
		cities: 'Douglas, Ramsey, Peel, Port Erin, Castletown'
	},
	{
		utc: 'UTC+0',
		timezone: 'Europe/Jersey',
		country: 'Jersey',
		cities: 'Saint Helier, Le Hocq'
	},
	{
		utc: 'UTC+0',
		timezone: 'Europe/Lisbon',
		country: 'Portugal',
		cities: 'Lisbon, Porto, Amadora, Braga, Setúbal'
	},
	{
		utc: 'UTC+0',
		timezone: 'Europe/London',
		country: 'United Kingdom',
		cities: 'London, Birmingham, Liverpool, Sheffield, Bristol'
	},
	{
		utc: 'UTC+1',
		timezone: 'Africa/Algiers',
		country: 'Algeria',
		cities: 'Algiers, Boumerdas, Oran, Tébessa, Constantine'
	},
	{
		utc: 'UTC+1',
		timezone: 'Africa/Bangui',
		country: 'Central African Republic',
		cities: 'Bangui, Bimbo, Mbaïki, Berbérati, Kaga Bandoro'
	},
	{
		utc: 'UTC+1',
		timezone: 'Africa/Brazzaville',
		country: 'Republic of the Congo',
		cities: 'Brazzaville, Pointe-Noire, Dolisie, Kayes, Owando'
	},
	{
		utc: 'UTC+1',
		timezone: 'Africa/Ceuta',
		country: 'Spain',
		cities: 'Ceuta, Melilla'
	},
	{
		utc: 'UTC+1',
		timezone: 'Africa/Douala',
		country: 'Cameroon',
		cities: 'Douala, Yaoundé, Garoua, Kousséri, Bamenda'
	},
	{
		utc: 'UTC+1',
		timezone: 'Africa/Kinshasa',
		country: 'Democratic Republic of the Congo',
		cities: 'Kinshasa, Masina, Kikwit, Mbandaka, Matadi'
	},
	{
		utc: 'UTC+1',
		timezone: 'Africa/Lagos',
		country: 'Nigeria',
		cities: 'Lagos, Kano, Ibadan, Kaduna, Port Harcourt'
	},
	{
		utc: 'UTC+1',
		timezone: 'Africa/Libreville',
		country: 'Gabon',
		cities: 'Libreville, Port-Gentil, Franceville, Oyem, Moanda'
	},
	{
		utc: 'UTC+1',
		timezone: 'Africa/Luanda',
		country: 'Angola',
		cities: 'Luanda, N’dalatando, Huambo, Lobito, Benguela'
	},
	{
		utc: 'UTC+1',
		timezone: 'Africa/Malabo',
		country: 'Equatorial Guinea',
		cities: 'Bata, Malabo, Ebebiyin, Aconibe, Añisoc'
	},
	{
		utc: 'UTC+1',
		timezone: 'Africa/Ndjamena',
		country: 'Chad',
		cities: "N'Djamena, Moundou, Sarh, Abéché, Kelo"
	},
	{
		utc: 'UTC+1',
		timezone: 'Africa/Niamey',
		country: 'Niger',
		cities: 'Niamey, Zinder, Maradi, Agadez, Alaghsas'
	},
	{
		utc: 'UTC+1',
		timezone: 'Africa/Porto-Novo',
		country: 'Benin',
		cities: 'Cotonou, Abomey-Calavi, Djougou, Porto-Novo, Parakou'
	},
	{
		utc: 'UTC+1',
		timezone: 'Africa/Tunis',
		country: 'Tunisia',
		cities: 'Tunis, Sfax, Sousse, Kairouan, Bizerte'
	},
	{
		utc: 'UTC+1',
		timezone: 'Africa/Windhoek',
		country: 'Namibia',
		cities: 'Windhoek, Rundu, Walvis Bay, Oshakati, Swakopmund'
	},
	{
		utc: 'UTC+1',
		timezone: 'Arctic/Longyearbyen',
		country: 'Svalbard and Jan Mayen',
		cities: 'Longyearbyen, Olonkinbyen'
	},
	{
		utc: 'UTC+1',
		timezone: 'Europe/Amsterdam',
		country: 'Netherlands',
		cities: 'Amsterdam, Rotterdam, The Hague, Utrecht, Eindhoven'
	},
	{
		utc: 'UTC+1',
		timezone: 'Europe/Andorra',
		country: 'Andorra',
		cities: 'Andorra la Vella, les Escaldes, Encamp, Sant Julià de Lòria, la Massana'
	},
	{
		utc: 'UTC+1',
		timezone: 'Europe/Belgrade',
		country: 'Serbia',
		cities: 'Belgrade, Pristina, Niš, Novi Sad, Prizren'
	},
	{
		utc: 'UTC+1',
		timezone: 'Europe/Berlin',
		country: 'Germany',
		cities: 'Berlin, Hamburg, Munich, Köln, Frankfurt am Main'
	},
	{
		utc: 'UTC+1',
		timezone: 'Europe/Bratislava',
		country: 'Slovakia',
		cities: 'Bratislava, Košice, Prešov, Nitra, Žilina'
	},
	{
		utc: 'UTC+1',
		timezone: 'Europe/Brussels',
		country: 'Belgium',
		cities: 'Brussels, Antwerpen, Gent, Charleroi, Liège'
	},
	{
		utc: 'UTC+1',
		timezone: 'Europe/Budapest',
		country: 'Hungary',
		cities: 'Budapest, Debrecen, Miskolc, Szeged, Pécs'
	},
	{
		utc: 'UTC+1',
		timezone: 'Europe/Copenhagen',
		country: 'Denmark',
		cities: 'Copenhagen, Århus, Odense, Aalborg, Frederiksberg'
	},
	{
		utc: 'UTC+1',
		timezone: 'Europe/Gibraltar',
		country: 'Gibraltar',
		cities: 'Gibraltar'
	},
	{
		utc: 'UTC+1',
		timezone: 'Europe/Ljubljana',
		country: 'Slovenia',
		cities: 'Ljubljana, Maribor, Celje, Kranj, Velenje'
	},
	{
		utc: 'UTC+1',
		timezone: 'Europe/Luxembourg',
		country: 'Luxembourg',
		cities: 'Luxembourg, Esch-sur-Alzette, Dudelange, Schifflange, Bettembourg'
	},
	{
		utc: 'UTC+1',
		timezone: 'Europe/Madrid',
		country: 'Spain',
		cities: 'Madrid, Barcelona, Valencia, Sevilla, Zaragoza'
	},
	{
		utc: 'UTC+1',
		timezone: 'Europe/Malta',
		country: 'Malta',
		cities: 'Birkirkara, Qormi, Mosta, Żabbar, San Pawl il-Baħar'
	},
	{
		utc: 'UTC+1',
		timezone: 'Europe/Monaco',
		country: 'Monaco',
		cities: 'Monaco, Monte-Carlo, La Condamine'
	},
	{
		utc: 'UTC+1',
		timezone: 'Europe/Oslo',
		country: 'Norway',
		cities: 'Oslo, Bergen, Trondheim, Stavanger, Drammen'
	},
	{
		utc: 'UTC+1',
		timezone: 'Europe/Paris',
		country: 'France',
		cities: 'Paris, Marseille, Lyon, Toulouse, Nice'
	},
	{
		utc: 'UTC+1',
		timezone: 'Europe/Podgorica',
		country: 'Montenegro',
		cities: 'Podgorica, Nikšić, Herceg Novi, Pljevlja, Budva'
	},
	{
		utc: 'UTC+1',
		timezone: 'Europe/Prague',
		country: 'Czechia',
		cities: 'Prague, Brno, Ostrava, Pilsen, Olomouc'
	},
	{
		utc: 'UTC+1',
		timezone: 'Europe/Rome',
		country: 'Italy',
		cities: 'Rome, Milan, Naples, Turin, Palermo'
	},
	{
		utc: 'UTC+1',
		timezone: 'Europe/San_Marino',
		country: 'San Marino',
		cities: 'Serravalle, Borgo Maggiore, San Marino, Domagnano, Fiorentino'
	},
	{
		utc: 'UTC+1',
		timezone: 'Europe/Sarajevo',
		country: 'Bosnia and Herzegovina',
		cities: 'Sarajevo, Banja Luka, Zenica, Tuzla, Mostar'
	},
	{
		utc: 'UTC+1',
		timezone: 'Europe/Skopje',
		country: 'North Macedonia',
		cities: 'Skopje, Bitola, Kumanovo, Prilep, Tetovo'
	},
	{
		utc: 'UTC+1',
		timezone: 'Europe/Stockholm',
		country: 'Sweden',
		cities: 'Stockholm, Göteborg, Malmö, Uppsala, Sollentuna'
	},
	{
		utc: 'UTC+1',
		timezone: 'Europe/Tirane',
		country: 'Albania',
		cities: 'Tirana, Durrës, Elbasan, Vlorë, Shkodër'
	},
	{
		utc: 'UTC+1',
		timezone: 'Europe/Vaduz',
		country: 'Liechtenstein',
		cities: 'Schaan, Vaduz, Triesen, Balzers, Eschen'
	},
	{
		utc: 'UTC+1',
		timezone: 'Europe/Vatican',
		country: 'Vatican',
		cities: 'Vatican City'
	},
	{
		utc: 'UTC+1',
		timezone: 'Europe/Vienna',
		country: 'Austria',
		cities: 'Vienna, Graz, Linz, Favoriten, Donaustadt'
	},
	{
		utc: 'UTC+1',
		timezone: 'Europe/Warsaw',
		country: 'Poland',
		cities: 'Warsaw, Łódź, Kraków, Wrocław, Poznań'
	},
	{
		utc: 'UTC+1',
		timezone: 'Europe/Zagreb',
		country: 'Croatia',
		cities: 'Zagreb, Split, Rijeka, Osijek, Zadar'
	},
	{
		utc: 'UTC+1',
		timezone: 'Europe/Zurich',
		country: 'Switzerland',
		cities: 'Zürich, Genève, Basel, Lausanne, Bern'
	},
	{
		utc: 'UTC+2',
		timezone: 'Africa/Blantyre',
		country: 'Malawi',
		cities: 'Lilongwe, Blantyre, Mzuzu, Zomba, Kasungu'
	},
	{
		utc: 'UTC+2',
		timezone: 'Africa/Bujumbura',
		country: 'Burundi',
		cities: 'Bujumbura, Muyinga, Gitega, Ruyigi, Ngozi'
	},
	{
		utc: 'UTC+2',
		timezone: 'Africa/Cairo',
		country: 'Egypt',
		cities: 'Cairo, Alexandria, Giza, Port Said, Suez'
	},
	{
		utc: 'UTC+2',
		timezone: 'Africa/Gaborone',
		country: 'Botswana',
		cities: 'Gaborone, Francistown, Molepolole, Selebi-Phikwe, Maun'
	},
	{
		utc: 'UTC+2',
		timezone: 'Africa/Harare',
		country: 'Zimbabwe',
		cities: 'Harare, Bulawayo, Chitungwiza, Mutare, Gweru'
	},
	{
		utc: 'UTC+2',
		timezone: 'Africa/Johannesburg',
		country: 'South Africa',
		cities: 'Cape Town, Durban, Johannesburg, Soweto, Pretoria'
	},
	{
		utc: 'UTC+2',
		timezone: 'Africa/Juba',
		country: 'South Sudan',
		cities: 'Juba, Winejok, Malakal, Wau, Kuacjok'
	},
	{
		utc: 'UTC+2',
		timezone: 'Africa/Khartoum',
		country: 'Sudan',
		cities: 'Khartoum, Omdurman, Nyala, Port Sudan, Kassala'
	},
	{
		utc: 'UTC+2',
		timezone: 'Africa/Kigali',
		country: 'Rwanda',
		cities: 'Kigali, Butare, Gitarama, Musanze, Gisenyi'
	},
	{
		utc: 'UTC+2',
		timezone: 'Africa/Lubumbashi',
		country: 'Democratic Republic of the Congo',
		cities: 'Lubumbashi, Mbuji-Mayi, Kisangani, Kananga, Likasi'
	},
	{
		utc: 'UTC+2',
		timezone: 'Africa/Lusaka',
		country: 'Zambia',
		cities: 'Lusaka, Kitwe, Ndola, Kabwe, Chingola'
	},
	{
		utc: 'UTC+2',
		timezone: 'Africa/Maputo',
		country: 'Mozambique',
		cities: 'Maputo, Matola, Beira, Nampula, Chimoio'
	},
	{
		utc: 'UTC+2',
		timezone: 'Africa/Maseru',
		country: 'Lesotho',
		cities: 'Maseru, Mafeteng, Leribe, Maputsoe, Mohale’s Hoek'
	},
	{
		utc: 'UTC+2',
		timezone: 'Africa/Mbabane',
		country: 'Eswatini',
		cities: 'Manzini, Mbabane, Big Bend, Malkerns, Nhlangano'
	},
	{
		utc: 'UTC+2',
		timezone: 'Africa/Tripoli',
		country: 'Libya',
		cities: 'Tripoli, Benghazi, Mişrātah, Tarhuna, Al Khums'
	},
	{
		utc: 'UTC+2',
		timezone: 'Asia/Amman',
		country: 'Jordan',
		cities: 'Amman, Zarqa, Irbid, Russeifa, Wādī as Sīr'
	},
	{
		utc: 'UTC+2',
		timezone: 'Asia/Beirut',
		country: 'Lebanon',
		cities: 'Beirut, Ra’s Bayrūt, Tripoli, Sidon, Tyre'
	},
	{
		utc: 'UTC+2',
		timezone: 'Asia/Damascus',
		country: 'Syria',
		cities: 'Aleppo, Damascus, Homs, Ḩamāh, Latakia'
	},
	{
		utc: 'UTC+2',
		timezone: 'Asia/Famagusta',
		country: 'Cyprus',
		cities: 'Famagusta, Kyrenia, Protaras, Paralímni, Lápithos'
	},
	{
		utc: 'UTC+2',
		timezone: 'Asia/Gaza',
		country: 'Palestinian Territory',
		cities: 'Gaza, Khān Yūnis, Jabālyā, Rafaḩ, Dayr al Balaḩ'
	},
	{
		utc: 'UTC+2',
		timezone: 'Asia/Hebron',
		country: 'Palestinian Territory',
		cities: 'East Jerusalem, Hebron, Nablus, Battir, Ţūlkarm'
	},
	{
		utc: 'UTC+2',
		timezone: 'Asia/Jerusalem',
		country: 'Israel',
		cities: 'Jerusalem, Tel Aviv, West Jerusalem, Haifa, Ashdod'
	},
	{
		utc: 'UTC+2',
		timezone: 'Asia/Nicosia',
		country: 'Cyprus',
		cities: 'Nicosia, Limassol, Larnaca, Stróvolos, Paphos'
	},
	{
		utc: 'UTC+2',
		timezone: 'Europe/Athens',
		country: 'Greece',
		cities: 'Athens, Thessaloníki, Pátra, Piraeus, Lárisa'
	},
	{
		utc: 'UTC+2',
		timezone: 'Europe/Bucharest',
		country: 'Romania',
		cities: 'Bucharest, Sector 3, Sector 6, Sector 2, Iaşi'
	},
	{
		utc: 'UTC+2',
		timezone: 'Europe/Chisinau',
		country: 'Moldova',
		cities: 'Chisinau, Tiraspol, Bălţi, Bender, Rîbniţa'
	},
	{
		utc: 'UTC+2',
		timezone: 'Europe/Helsinki',
		country: 'Finland',
		cities: 'Helsinki, Espoo, Tampere, Vantaa, Turku'
	},
	{
		utc: 'UTC+2',
		timezone: 'Europe/Kaliningrad',
		country: 'Russia',
		cities: 'Kaliningrad, Chernyakhovsk, Sovetsk, Baltiysk, Gusev'
	},
	{
		utc: 'UTC+2',
		timezone: 'Europe/Kiev',
		country: 'Ukraine',
		cities: 'Kyiv, Kharkiv, Donetsk, Odessa, Dnipro'
	},
	{
		utc: 'UTC+2',
		timezone: 'Europe/Mariehamn',
		country: 'Aland Islands',
		cities: 'Mariehamn'
	},
	{
		utc: 'UTC+2',
		timezone: 'Europe/Riga',
		country: 'Latvia',
		cities: 'Riga, Daugavpils, Liepāja, Jelgava, Jūrmala'
	},
	{
		utc: 'UTC+2',
		timezone: 'Europe/Sofia',
		country: 'Bulgaria',
		cities: 'Sofia, Plovdiv, Varna, Burgas, Ruse'
	},
	{
		utc: 'UTC+2',
		timezone: 'Europe/Tallinn',
		country: 'Estonia',
		cities: 'Tallinn, Tartu, Narva, Kohtla-Järve, Pärnu'
	},
	{
		utc: 'UTC+2',
		timezone: 'Europe/Uzhgorod',
		country: 'Ukraine',
		cities: 'Uzhgorod, Mukachevo, Khust, Berehove, Tyachiv'
	},
	{
		utc: 'UTC+2',
		timezone: 'Europe/Vilnius',
		country: 'Lithuania',
		cities: 'Vilnius, Kaunas, Klaipėda, Šiauliai, Panevėžys'
	},
	{
		utc: 'UTC+2',
		timezone: 'Europe/Zaporozhye',
		country: 'Ukraine',
		cities: 'Luhansk, Sevastopol, Sievierodonetsk, Alchevsk, Lysychansk'
	},
	{
		utc: 'UTC+3',
		timezone: 'Africa/Addis_Ababa',
		country: 'Ethiopia',
		cities: "Addis Ababa, Dire Dawa, Mek'ele, Nazrēt, Bahir Dar"
	},
	{
		utc: 'UTC+3',
		timezone: 'Africa/Asmara',
		country: 'Eritrea',
		cities: 'Asmara, Keren, Massawa, Assab, Mendefera'
	},
	{
		utc: 'UTC+3',
		timezone: 'Africa/Dar_es_Salaam',
		country: 'Tanzania',
		cities: 'Dar es Salaam, Mwanza, Zanzibar, Arusha, Mbeya'
	},
	{
		utc: 'UTC+3',
		timezone: 'Africa/Djibouti',
		country: 'Djibouti',
		cities: "Djibouti, 'Ali Sabieh, Tadjourah, Obock, Dikhil"
	},
	{
		utc: 'UTC+3',
		timezone: 'Africa/Kampala',
		country: 'Uganda',
		cities: 'Kampala, Gulu, Lira, Mbarara, Jinja'
	},
	{
		utc: 'UTC+3',
		timezone: 'Africa/Mogadishu',
		country: 'Somalia',
		cities: 'Mogadishu, Hargeysa, Berbera, Kismayo, Marka'
	},
	{
		utc: 'UTC+3',
		timezone: 'Africa/Nairobi',
		country: 'Kenya',
		cities: 'Nairobi, Mombasa, Nakuru, Eldoret, Kisumu'
	},
	{
		utc: 'UTC+3',
		timezone: 'Antarctica/Syowa',
		country: 'Antarctica',
		cities: ''
	},
	{
		utc: 'UTC+3',
		timezone: 'Asia/Aden',
		country: 'Yemen',
		cities: 'Sanaa, Al Ḩudaydah, Taiz, Aden, Mukalla'
	},
	{
		utc: 'UTC+3',
		timezone: 'Asia/Baghdad',
		country: 'Iraq',
		cities: 'Baghdad, Basrah, Al Mawşil al Jadīdah, Al Başrah al Qadīmah, Mosul'
	},
	{
		utc: 'UTC+3',
		timezone: 'Asia/Bahrain',
		country: 'Bahrain',
		cities: 'Manama, Al Muharraq, Ar Rifā‘, Dār Kulayb, Madīnat Ḩamad'
	},
	{
		utc: 'UTC+3',
		timezone: 'Asia/Kuwait',
		country: 'Kuwait',
		cities: 'Al Aḩmadī, Ḩawallī, As Sālimīyah, Şabāḩ as Sālim, Al Farwānīyah'
	},
	{
		utc: 'UTC+3',
		timezone: 'Asia/Qatar',
		country: 'Qatar',
		cities: 'Doha, Ar Rayyān, Umm Şalāl Muḩammad, Al Wakrah, Al Khawr'
	},
	{
		utc: 'UTC+3',
		timezone: 'Asia/Riyadh',
		country: 'Saudi Arabia',
		cities: 'Riyadh, Jeddah, Mecca, Medina, Sulţānah'
	},
	{
		utc: 'UTC+3',
		timezone: 'Europe/Istanbul',
		country: 'Turkey',
		cities: 'Istanbul, Ankara, İzmir, Bursa, Adana'
	},
	{
		utc: 'UTC+3',
		timezone: 'Europe/Kirov',
		country: 'Russia',
		cities: 'Kirov, Kirovo-Chepetsk, Vyatskiye Polyany, Slobodskoy, Kotel’nich'
	},
	{
		utc: 'UTC+3',
		timezone: 'Europe/Minsk',
		country: 'Belarus',
		cities: "Minsk, Homyel', Mahilyow, Vitebsk, Hrodna"
	},
	{
		utc: 'UTC+3',
		timezone: 'Europe/Moscow',
		country: 'Russia',
		cities: 'Moscow, Saint Petersburg, Nizhniy Novgorod, Kazan, Rostov-na-Donu'
	},
	{
		utc: 'UTC+3',
		timezone: 'Europe/Simferopol',
		country: 'Russia',
		cities: 'Simferopol, Kerch, Yevpatoriya, Yalta, Feodosiya'
	},
	{
		utc: 'UTC+3',
		timezone: 'Europe/Volgograd',
		country: 'Russia',
		cities: 'Volgograd, Volzhskiy, Kamyshin, Mikhaylovka, Uryupinsk'
	},
	{
		utc: 'UTC+3',
		timezone: 'Indian/Antananarivo',
		country: 'Madagascar',
		cities: 'Antananarivo, Toamasina, Antsirabe, Fianarantsoa, Mahajanga'
	},
	{
		utc: 'UTC+3',
		timezone: 'Indian/Comoro',
		country: 'Comoros',
		cities: 'Moroni, Moutsamoudou, Fomboni, Domoni, Tsimbeo'
	},
	{
		utc: 'UTC+3',
		timezone: 'Indian/Mayotte',
		country: 'Mayotte',
		cities: 'Mamoudzou, Koungou, Dzaoudzi, Dembeni, Sada'
	},
	{
		utc: 'UTC+3:30',
		timezone: 'Asia/Tehran',
		country: 'Iran',
		cities: 'Tehran, Mashhad, Isfahan, Karaj, Tabriz'
	},
	{
		utc: 'UTC+4',
		timezone: 'Asia/Baku',
		country: 'Azerbaijan',
		cities: 'Baku, Ganja, Sumqayıt, Lankaran, Yevlakh'
	},
	{
		utc: 'UTC+4',
		timezone: 'Asia/Dubai',
		country: 'United Arab Emirates',
		cities: 'Dubai, Sharjah, Abu Dhabi, Ajman City, Ras Al Khaimah City'
	},
	{
		utc: 'UTC+4',
		timezone: 'Asia/Muscat',
		country: 'Oman',
		cities: 'Muscat, Seeb, Şalālah, Bawshar, Sohar'
	},
	{
		utc: 'UTC+4',
		timezone: 'Asia/Tbilisi',
		country: 'Georgia',
		cities: 'Tbilisi, Kutaisi, Batumi, Sokhumi, Zugdidi'
	},
	{
		utc: 'UTC+4',
		timezone: 'Asia/Yerevan',
		country: 'Armenia',
		cities: 'Yerevan, Gyumri, Vanadzor, Vagharshapat, Hrazdan'
	},
	{
		utc: 'UTC+4',
		timezone: 'Europe/Astrakhan',
		country: 'Russia',
		cities: 'Astrakhan, Akhtubinsk, Znamensk, Kharabali, Kamyzyak'
	},
	{
		utc: 'UTC+4',
		timezone: 'Europe/Samara',
		country: 'Russia',
		cities: 'Samara, Togliatti-on-the-Volga, Izhevsk, Syzran’, Novokuybyshevsk'
	},
	{
		utc: 'UTC+4',
		timezone: 'Europe/Saratov',
		country: 'Russia',
		cities: 'Saratov, Balakovo, Engel’s, Balashov, Vol’sk'
	},
	{
		utc: 'UTC+4',
		timezone: 'Europe/Ulyanovsk',
		country: 'Russia',
		cities: 'Ulyanovsk, Dimitrovgrad, Inza, Barysh, Novoul’yanovsk'
	},
	{
		utc: 'UTC+4',
		timezone: 'Indian/Mahe',
		country: 'Seychelles',
		cities: 'Victoria, Anse Boileau, Bel Ombre, Beau Vallon, Cascade'
	},
	{
		utc: 'UTC+4',
		timezone: 'Indian/Mauritius',
		country: 'Mauritius',
		cities: 'Port Louis, Beau Bassin-Rose Hill, Vacoas, Curepipe, Quatre Bornes'
	},
	{
		utc: 'UTC+4',
		timezone: 'Indian/Reunion',
		country: 'Reunion',
		cities: 'Saint-Denis, Saint-Paul, Saint-Pierre, Le Tampon, Saint-André'
	},
	{
		utc: 'UTC+4:30',
		timezone: 'Asia/Kabul',
		country: 'Afghanistan',
		cities: 'Kabul, Kandahār, Mazār-e Sharīf, Herāt, Jalālābād'
	},
	{
		utc: 'UTC+5',
		timezone: 'Antarctica/Mawson',
		country: 'Antarctica',
		cities: ''
	},
	{
		utc: 'UTC+5',
		timezone: 'Asia/Aqtau',
		country: 'Kazakhstan',
		cities: 'Shevchenko, Zhanaozen, Beyneu, Shetpe, Yeraliyev'
	},
	{
		utc: 'UTC+5',
		timezone: 'Asia/Aqtobe',
		country: 'Kazakhstan',
		cities: 'Aktobe, Kandyagash, Shalqar, Khromtau, Embi'
	},
	{
		utc: 'UTC+5',
		timezone: 'Asia/Ashgabat',
		country: 'Turkmenistan',
		cities: 'Ashgabat, Türkmenabat, Daşoguz, Mary, Balkanabat'
	},
	{
		utc: 'UTC+5',
		timezone: 'Asia/Atyrau',
		country: 'Kazakhstan',
		cities: 'Atyrau, Qulsary, Shalkar, Balykshi, Maqat'
	},
	{
		utc: 'UTC+5',
		timezone: 'Asia/Dushanbe',
		country: 'Tajikistan',
		cities: 'Dushanbe, Khujand, Kŭlob, Bokhtar, Istaravshan'
	},
	{
		utc: 'UTC+5',
		timezone: 'Asia/Karachi',
		country: 'Pakistan',
		cities: 'Karachi, Lahore, Faisalabad, Rawalpindi, Multan'
	},
	{
		utc: 'UTC+5',
		timezone: 'Asia/Oral',
		country: 'Kazakhstan',
		cities: 'Oral, Aqsay, Zhänibek, Tasqala, Zhumysker'
	},
	{
		utc: 'UTC+5',
		timezone: 'Asia/Qyzylorda',
		country: 'Kazakhstan',
		cities: 'Kyzylorda, Baikonur, Novokazalinsk, Aral, Chiili'
	},
	{
		utc: 'UTC+5',
		timezone: 'Asia/Samarkand',
		country: 'Uzbekistan',
		cities: 'Samarkand, Bukhara, Nukus, Qarshi, Jizzax'
	},
	{
		utc: 'UTC+5',
		timezone: 'Asia/Tashkent',
		country: 'Uzbekistan',
		cities: 'Tashkent, Namangan, Andijon, Qo‘qon, Chirchiq'
	},
	{
		utc: 'UTC+5',
		timezone: 'Asia/Yekaterinburg',
		country: 'Russia',
		cities: 'Yekaterinburg, Chelyabinsk, Ufa, Perm, Orenburg'
	},
	{
		utc: 'UTC+5',
		timezone: 'Indian/Kerguelen',
		country: 'French Southern Territories',
		cities: 'Port-aux-Français'
	},
	{
		utc: 'UTC+5',
		timezone: 'Indian/Maldives',
		country: 'Maldives',
		cities: 'Male, Fuvahmulah, Hithadhoo, Kulhudhuffushi, Thinadhoo'
	},
	{
		utc: 'UTC+5:30',
		timezone: 'Asia/Colombo',
		country: 'Sri Lanka',
		cities: 'Colombo, Dehiwala-Mount Lavinia, Moratuwa, Jaffna, Negombo'
	},
	{
		utc: 'UTC+5:30',
		timezone: 'Asia/Kolkata',
		country: 'India',
		cities: 'Mumbai, Delhi, Bengaluru, Kolkata, Chennai'
	},
	{
		utc: 'UTC+5:45',
		timezone: 'Asia/Kathmandu',
		country: 'Nepal',
		cities: 'Kathmandu, Pokhara, Pātan, Biratnagar, Birgañj'
	},
	{
		utc: 'UTC+6',
		timezone: 'Antarctica/Vostok',
		country: 'Antarctica',
		cities: ''
	},
	{
		utc: 'UTC+6',
		timezone: 'Asia/Almaty',
		country: 'Kazakhstan',
		cities: 'Almaty, Karagandy, Shymkent, Taraz, Nur-Sultan'
	},
	{
		utc: 'UTC+6',
		timezone: 'Asia/Bishkek',
		country: 'Kyrgyzstan',
		cities: 'Bishkek, Osh, Jalal-Abad, Karakol, Tokmok'
	},
	{
		utc: 'UTC+6',
		timezone: 'Asia/Dhaka',
		country: 'Bangladesh',
		cities: 'Dhaka, Chattogram, Khulna, Rājshāhi, Comilla'
	},
	{
		utc: 'UTC+6',
		timezone: 'Asia/Omsk',
		country: 'Russia',
		cities: 'Omsk, Tara, Kalachinsk, Znamenskoye, Tavricheskoye'
	},
	{
		utc: 'UTC+6',
		timezone: 'Asia/Qostanay',
		country: 'Kazakhstan',
		cities: 'Kostanay, Rudnyy, Dzhetygara, Arkalyk, Lisakovsk'
	},
	{
		utc: 'UTC+6',
		timezone: 'Asia/Thimphu',
		country: 'Bhutan',
		cities: 'Thimphu, Punākha, Tsirang, Phuntsholing, Pemagatshel'
	},
	{
		utc: 'UTC+6',
		timezone: 'Asia/Urumqi',
		country: 'China',
		cities: 'Zhongshan, Ürümqi, Zhanjiang, Shihezi, Huocheng'
	},
	{
		utc: 'UTC+6',
		timezone: 'Indian/Chagos',
		country: 'British Indian Ocean Territory',
		cities: ''
	},
	{
		utc: 'UTC+6:30',
		timezone: 'Asia/Yangon',
		country: 'Myanmar',
		cities: 'Yangon, Mandalay, Nay Pyi Taw, Mawlamyine, Kyain Seikgyi Township'
	},
	{
		utc: 'UTC+6:30',
		timezone: 'Indian/Cocos',
		country: 'Cocos Islands',
		cities: 'West Island'
	},
	{
		utc: 'UTC+7',
		timezone: 'Antarctica/Davis',
		country: 'Antarctica',
		cities: ''
	},
	{
		utc: 'UTC+7',
		timezone: 'Asia/Bangkok',
		country: 'Thailand',
		cities: 'Bangkok, Hanoi, Haiphong, Samut Prakan, Mueang Nonthaburi'
	},
	{
		utc: 'UTC+7',
		timezone: 'Asia/Barnaul',
		country: 'Russia',
		cities: 'Barnaul, Biysk, Rubtsovsk, Novoaltaysk, Gorno-Altaysk'
	},
	{
		utc: 'UTC+7',
		timezone: 'Asia/Hovd',
		country: 'Mongolia',
		cities: 'Khovd, Ölgii, Ulaangom, Uliastay, Altai'
	},
	{
		utc: 'UTC+7',
		timezone: 'Asia/Ho_Chi_Minh',
		country: 'Vietnam',
		cities: 'Ho Chi Minh City, Da Nang, Biên Hòa, Nha Trang, Cần Thơ'
	},
	{
		utc: 'UTC+7',
		timezone: 'Asia/Jakarta',
		country: 'Indonesia',
		cities: 'Jakarta, Surabaya, Medan, Bandung, Bekasi'
	},
	{
		utc: 'UTC+7',
		timezone: 'Asia/Krasnoyarsk',
		country: 'Russia',
		cities: 'Krasnoyarsk, Abakan, Norilsk, Achinsk, Kyzyl'
	},
	{
		utc: 'UTC+7',
		timezone: 'Asia/Novokuznetsk',
		country: 'Russia',
		cities: 'Novokuznetsk, Kemerovo, Prokop’yevsk, Leninsk-Kuznetsky, Kiselëvsk'
	},
	{
		utc: 'UTC+7',
		timezone: 'Asia/Novosibirsk',
		country: 'Russia',
		cities: 'Novosibirsk, Berdsk, Iskitim, Akademgorodok, Kuybyshev'
	},
	{
		utc: 'UTC+7',
		timezone: 'Asia/Phnom_Penh',
		country: 'Cambodia',
		cities: 'Phnom Penh, Takeo, Sihanoukville, Battambang, Siem Reap'
	},
	{
		utc: 'UTC+7',
		timezone: 'Asia/Pontianak',
		country: 'Indonesia',
		cities: 'Pontianak, Tanjung Pinang, Palangkaraya, Singkawang, Sampit'
	},
	{
		utc: 'UTC+7',
		timezone: 'Asia/Tomsk',
		country: 'Russia',
		cities: 'Tomsk, Seversk, Strezhevoy, Kolpashevo, Asino'
	},
	{
		utc: 'UTC+7',
		timezone: 'Asia/Vientiane',
		country: 'Laos',
		cities: 'Vientiane, Pakse, Thakhèk, Savannakhet, Luang Prabang'
	},
	{
		utc: 'UTC+7',
		timezone: 'Indian/Christmas',
		country: 'Christmas Island',
		cities: 'Flying Fish Cove'
	},
	{
		utc: 'UTC+8',
		timezone: 'Asia/Brunei',
		country: 'Brunei',
		cities: 'Bandar Seri Begawan, Kuala Belait, Seria, Tutong, Bangar'
	},
	{
		utc: 'UTC+8',
		timezone: 'Asia/Choibalsan',
		country: 'Mongolia',
		cities: 'Baruun-Urt, Choibalsan'
	},
	{
		utc: 'UTC+8',
		timezone: 'Asia/Hong_Kong',
		country: 'Hong Kong',
		cities: 'Hong Kong, Kowloon, Tsuen Wan, Yuen Long Kau Hui, Tung Chung'
	},
	{
		utc: 'UTC+8',
		timezone: 'Asia/Irkutsk',
		country: 'Russia',
		cities: 'Irkutsk, Ulan-Ude, Bratsk, Angarsk, Ust’-Ilimsk'
	},
	{
		utc: 'UTC+8',
		timezone: 'Asia/Kuala_Lumpur',
		country: 'Malaysia',
		cities: 'Kota Bharu, Kuala Lumpur, Klang, Kampung Baru Subang, Johor Bahru'
	},
	{
		utc: 'UTC+8',
		timezone: 'Asia/Kuching',
		country: 'Malaysia',
		cities: 'Kuching, Kota Kinabalu, Sandakan, Tawau, Miri'
	},
	{
		utc: 'UTC+8',
		timezone: 'Asia/Macau',
		country: 'Macao',
		cities: 'Macau'
	},
	{
		utc: 'UTC+8',
		timezone: 'Asia/Makassar',
		country: 'Indonesia',
		cities: 'Makassar, Denpasar, City of Balikpapan, Banjarmasin, Manado'
	},
	{
		utc: 'UTC+8',
		timezone: 'Asia/Manila',
		country: 'Philippines',
		cities: 'Quezon City, Manila, Caloocan City, Budta, Davao'
	},
	{
		utc: 'UTC+8',
		timezone: 'Asia/Shanghai',
		country: 'China',
		cities: 'Shanghai, Beijing, Tianjin, Guangzhou, Shenzhen'
	},
	{
		utc: 'UTC+8',
		timezone: 'Asia/Singapore',
		country: 'Singapore',
		cities: 'Singapore, Woodlands'
	},
	{
		utc: 'UTC+8',
		timezone: 'Asia/Taipei',
		country: 'Taiwan',
		cities: 'Taipei, Kaohsiung, Taichung, Tainan, Banqiao'
	},
	{
		utc: 'UTC+8',
		timezone: 'Asia/Ulaanbaatar',
		country: 'Mongolia',
		cities: 'Ulan Bator, Erdenet, Darhan, Hovd, Mörön'
	},
	{
		utc: 'UTC+8',
		timezone: 'Australia/Perth',
		country: 'Australia',
		cities: 'Perth, Rockingham, Mandurah, Bunbury, Albany'
	},
	{
		utc: 'UTC+8:45',
		timezone: 'Australia/Eucla',
		country: 'Australia',
		cities: ''
	},
	{
		utc: 'UTC+9',
		timezone: 'Asia/Chita',
		country: 'Russia',
		cities: 'Chita, Krasnokamensk, Borzya, Petrovsk-Zabaykal’skiy, Aginskoye'
	},
	{
		utc: 'UTC+9',
		timezone: 'Asia/Dili',
		country: 'Timor Leste',
		cities: 'Dili, Maliana, Suai, Likisá, Aileu'
	},
	{
		utc: 'UTC+9',
		timezone: 'Asia/Jayapura',
		country: 'Indonesia',
		cities: 'Ambon, Jayapura, Sorong, Ternate, Abepura'
	},
	{
		utc: 'UTC+9',
		timezone: 'Asia/Khandyga',
		country: 'Russia',
		cities: ''
	},
	{
		utc: 'UTC+9',
		timezone: 'Asia/Pyongyang',
		country: 'North Korea',
		cities: 'Pyongyang, Hamhŭng, Namp’o, Sunch’ŏn, Hŭngnam'
	},
	{
		utc: 'UTC+9',
		timezone: 'Asia/Seoul',
		country: 'South Korea',
		cities: 'Seoul, Busan, Incheon, Daegu, Daejeon'
	},
	{
		utc: 'UTC+9',
		timezone: 'Asia/Tokyo',
		country: 'Japan',
		cities: 'Tokyo, Yokohama, Osaka, Nagoya, Sapporo'
	},
	{
		utc: 'UTC+9',
		timezone: 'Asia/Yakutsk',
		country: 'Russia',
		cities: 'Yakutsk, Blagoveshchensk, Belogorsk, Neryungri, Svobodnyy'
	},
	{
		utc: 'UTC+9',
		timezone: 'Pacific/Palau',
		country: 'Palau',
		cities: 'Koror, Koror Town, Kloulklubed, Ulimang, Mengellang'
	},
	{
		utc: 'UTC+9:30',
		timezone: 'Australia/Adelaide',
		country: 'Australia',
		cities: 'Adelaide, Adelaide Hills, Mount Gambier, Morphett Vale, Gawler'
	},
	{
		utc: 'UTC+9:30',
		timezone: 'Australia/Broken_Hill',
		country: 'Australia',
		cities: 'Broken Hill'
	},
	{
		utc: 'UTC+9:30',
		timezone: 'Australia/Darwin',
		country: 'Australia',
		cities: 'Darwin, Alice Springs, Palmerston, Howard Springs'
	},
	{
		utc: 'UTC+10',
		timezone: 'Antarctica/DumontDUrville',
		country: 'Antarctica',
		cities: ''
	},
	{
		utc: 'UTC+10',
		timezone: 'Antarctica/Macquarie',
		country: 'Australia',
		cities: ''
	},
	{
		utc: 'UTC+10',
		timezone: 'Asia/Ust-Nera',
		country: 'Russia',
		cities: ''
	},
	{
		utc: 'UTC+10',
		timezone: 'Asia/Vladivostok',
		country: 'Russia',
		cities: 'Vladivostok, Khabarovsk, Khabarovsk Vtoroy, Komsomolsk-on-Amur, Ussuriysk'
	},
	{
		utc: 'UTC+10',
		timezone: 'Australia/Brisbane',
		country: 'Australia',
		cities: 'Brisbane, Gold Coast, Logan City, Townsville, Cairns'
	},
	{
		utc: 'UTC+10',
		timezone: 'Australia/Currie',
		country: 'Australia',
		cities: ''
	},
	{
		utc: 'UTC+10',
		timezone: 'Australia/Hobart',
		country: 'Australia',
		cities: 'Hobart, Launceston, Burnie, Devonport, Sandy Bay'
	},
	{
		utc: 'UTC+10',
		timezone: 'Australia/Lindeman',
		country: 'Australia',
		cities: ''
	},
	{
		utc: 'UTC+10',
		timezone: 'Australia/Melbourne',
		country: 'Australia',
		cities: 'Melbourne, Geelong, Bendigo, Ballarat, Melbourne City Centre'
	},
	{
		utc: 'UTC+10',
		timezone: 'Australia/Sydney',
		country: 'Australia',
		cities: 'Sydney, Canberra, Newcastle, Wollongong, Maitland'
	},
	{
		utc: 'UTC+10',
		timezone: 'Pacific/Chuuk',
		country: 'Micronesia',
		cities: 'Weno, Colonia'
	},
	{
		utc: 'UTC+10',
		timezone: 'Pacific/Guam',
		country: 'Guam',
		cities:
			'Dededo Village, Yigo Village, Tamuning, Tamuning-Tumon-Harmon Village, Mangilao Village'
	},
	{
		utc: 'UTC+10',
		timezone: 'Pacific/Port_Moresby',
		country: 'Papua New Guinea',
		cities: 'Port Moresby, Lae, Mount Hagen, Popondetta, Madang'
	},
	{
		utc: 'UTC+10',
		timezone: 'Pacific/Saipan',
		country: 'Northern Mariana Islands',
		cities: 'Saipan, San Jose Village'
	},
	{
		utc: 'UTC+10:30',
		timezone: 'Australia/Lord_Howe',
		country: 'Australia',
		cities: ''
	},
	{
		utc: 'UTC+11',
		timezone: 'Antarctica/Casey',
		country: 'Antarctica',
		cities: ''
	},
	{
		utc: 'UTC+11',
		timezone: 'Asia/Magadan',
		country: 'Russia',
		cities: 'Magadan, Ust-Nera, Susuman, Ola'
	},
	{
		utc: 'UTC+11',
		timezone: 'Asia/Sakhalin',
		country: 'Russia',
		cities: 'Yuzhno-Sakhalinsk, Korsakov, Kholmsk, Okha, Nevel’sk'
	},
	{
		utc: 'UTC+11',
		timezone: 'Asia/Srednekolymsk',
		country: 'Russia',
		cities: ''
	},
	{
		utc: 'UTC+11',
		timezone: 'Pacific/Bougainville',
		country: 'Papua New Guinea',
		cities: 'Arawa, Buka'
	},
	{
		utc: 'UTC+11',
		timezone: 'Pacific/Efate',
		country: 'Vanuatu',
		cities: 'Port-Vila, Luganville, Isangel, Sola, Lakatoro'
	},
	{
		utc: 'UTC+11',
		timezone: 'Pacific/Guadalcanal',
		country: 'Solomon Islands',
		cities: 'Honiara, Malango, Auki, Gizo, Buala'
	},
	{
		utc: 'UTC+11',
		timezone: 'Pacific/Kosrae',
		country: 'Micronesia',
		cities: 'Tofol'
	},
	{
		utc: 'UTC+11',
		timezone: 'Pacific/Norfolk',
		country: 'Norfolk Island',
		cities: 'Kingston'
	},
	{
		utc: 'UTC+11',
		timezone: 'Pacific/Noumea',
		country: 'New Caledonia',
		cities: 'Nouméa, Mont-Dore, Dumbéa, Païta, Wé'
	},
	{
		utc: 'UTC+11',
		timezone: 'Pacific/Pohnpei',
		country: 'Micronesia',
		cities: 'Kolonia, Kolonia Town, Palikir - National Government Center'
	},
	{
		utc: 'UTC+12',
		timezone: 'Antarctica/McMurdo',
		country: 'Antarctica',
		cities: ''
	},
	{
		utc: 'UTC+12',
		timezone: 'Asia/Anadyr',
		country: 'Russia',
		cities: 'Anadyr, Bilibino'
	},
	{
		utc: 'UTC+12',
		timezone: 'Asia/Kamchatka',
		country: 'Russia',
		cities: 'Petropavlovsk-Kamchatsky, Yelizovo, Vilyuchinsk, Klyuchi, Mil’kovo'
	},
	{
		utc: 'UTC+12',
		timezone: 'Pacific/Auckland',
		country: 'New Zealand',
		cities: 'Auckland, Wellington, Christchurch, Manukau City, North Shore'
	},
	{
		utc: 'UTC+12',
		timezone: 'Pacific/Fiji',
		country: 'Fiji',
		cities: 'Suva, Lautoka, Nadi, Labasa, Ba'
	},
	{
		utc: 'UTC+12',
		timezone: 'Pacific/Funafuti',
		country: 'Tuvalu',
		cities: 'Funafuti, Savave Village, Tanrake Village, Toga Village, Asau Village'
	},
	{
		utc: 'UTC+12',
		timezone: 'Pacific/Kwajalein',
		country: 'Marshall Islands',
		cities: 'Ebaye, Jabat'
	},
	{
		utc: 'UTC+12',
		timezone: 'Pacific/Majuro',
		country: 'Marshall Islands',
		cities: 'Majuro, Arno, Jabor, Wotje, Mili'
	},
	{
		utc: 'UTC+12',
		timezone: 'Pacific/Nauru',
		country: 'Nauru',
		cities: 'Yaren, Baiti, Anabar, Uaboe, Ijuw'
	},
	{
		utc: 'UTC+12',
		timezone: 'Pacific/Tarawa',
		country: 'Kiribati',
		cities: 'Tarawa, Betio Village, Bikenibeu Village'
	},
	{
		utc: 'UTC+12',
		timezone: 'Pacific/Wake',
		country: 'United States Minor Outlying Islands',
		cities: ''
	},
	{
		utc: 'UTC+12',
		timezone: 'Pacific/Wallis',
		country: 'Wallis and Futuna',
		cities: 'Mata-Utu, Leava, Alo'
	},
	{
		utc: 'UTC+12:45',
		timezone: 'Pacific/Chatham',
		country: 'New Zealand',
		cities: 'Waitangi'
	},
	{
		utc: 'UTC+13',
		timezone: 'Pacific/Apia',
		country: 'Samoa',
		cities: 'Apia, Asau, Mulifanua, Afega, Leulumoega'
	},
	{
		utc: 'UTC+13',
		timezone: 'Pacific/Enderbury',
		country: 'Kiribati',
		cities: ''
	},
	{
		utc: 'UTC+13',
		timezone: 'Pacific/Fakaofo',
		country: 'Tokelau',
		cities: 'Atafu Village, Nukunonu, Fale old settlement'
	},
	{
		utc: 'UTC+13',
		timezone: 'Pacific/Tongatapu',
		country: 'Tonga',
		cities: 'Nuku‘alofa, Lapaha, Neiafu, Pangai, ‘Ohonua'
	},
	{
		utc: 'UTC+14',
		timezone: 'Pacific/Kiritimati',
		country: 'Kiribati',
		cities: ''
	}
];
