const timezoneCities = [
	{
		timezone: 'Pacific/Midway',
		cities: ''
	},
	{
		timezone: 'Pacific/Niue',
		cities: 'Alofi'
	},
	{
		timezone: 'Pacific/Pago_Pago',
		cities: 'Pago Pago, Tāfuna, Ta`ū, Taulaga'
	},
	{
		timezone: 'America/Adak',
		cities: ''
	},
	{
		timezone: 'Pacific/Honolulu',
		cities: 'Honolulu, East Honolulu, Pearl City, Hilo, Kailua'
	},
	{
		timezone: 'Pacific/Rarotonga',
		cities: 'Avarua'
	},
	{
		timezone: 'Pacific/Tahiti',
		cities: 'Faaa, Papeete, Punaauia, Pirae, Mahina'
	},
	{
		timezone: 'Pacific/Marquesas',
		cities: 'Taiohae'
	},
	{
		timezone: 'America/Anchorage',
		cities: 'Anchorage, Fairbanks, Eagle River, Badger, Knik-Fairview'
	},
	{
		timezone: 'America/Juneau',
		cities: 'Juneau'
	},
	{
		timezone: 'America/Metlakatla',
		cities: ''
	},
	{
		timezone: 'America/Nome',
		cities: ''
	},
	{
		timezone: 'America/Sitka',
		cities: 'Sitka, Ketchikan'
	},
	{
		timezone: 'America/Yakutat',
		cities: ''
	},
	{
		timezone: 'Pacific/Gambier',
		cities: ''
	},
	{
		timezone: 'America/Los_Angeles',
		cities: 'Los Angeles, San Diego, San Jose, San Francisco, Seattle'
	},
	{
		timezone: 'America/Tijuana',
		cities: 'Tijuana, Mexicali, Ensenada, Rosarito, Tecate'
	},
	{
		timezone: 'America/Vancouver',
		cities: 'Vancouver, Surrey, Okanagan, Victoria, Burnaby'
	},
	{
		timezone: 'Pacific/Pitcairn',
		cities: 'Adamstown'
	},
	{
		timezone: 'America/Boise',
		cities: 'Boise, Meridian, Nampa, Idaho Falls, Pocatello'
	},
	{
		timezone: 'America/Cambridge_Bay',
		cities: ''
	},
	{
		timezone: 'America/Chihuahua',
		cities: 'Chihuahua, Ciudad Delicias, Cuauhtémoc, Parral, Nuevo Casas Grandes'
	},
	{
		timezone: 'America/Creston',
		cities: ''
	},
	{
		timezone: 'America/Dawson',
		cities: ''
	},
	{
		timezone: 'America/Dawson_Creek',
		cities: 'Fort St. John, Dawson Creek'
	},
	{
		timezone: 'America/Denver',
		cities: 'Denver, El Paso, Albuquerque, Colorado Springs, Aurora'
	},
	{
		timezone: 'America/Edmonton',
		cities: 'Calgary, Edmonton, Fort McMurray, Red Deer, Lethbridge'
	},
	{
		timezone: 'America/Fort_Nelson',
		cities: ''
	},
	{
		timezone: 'America/Hermosillo',
		cities: 'Hermosillo, Ciudad Obregón, Nogales, San Luis Río Colorado, Navojoa'
	},
	{
		timezone: 'America/Inuvik',
		cities: ''
	},
	{
		timezone: 'America/Mazatlan',
		cities: 'Culiacán, Mazatlán, Tepic, Los Mochis, La Paz'
	},
	{
		timezone: 'America/Ojinaga',
		cities: 'Ciudad Juárez, Manuel Ojinaga, Ojinaga'
	},
	{
		timezone: 'America/Phoenix',
		cities: 'Phoenix, Tucson, Mesa, Chandler, Gilbert'
	},
	{
		timezone: 'America/Whitehorse',
		cities: 'Whitehorse'
	},
	{
		timezone: 'America/Yellowknife',
		cities: 'Yellowknife'
	},
	{
		timezone: 'America/Bahia_Banderas',
		cities: 'Mezcales, San Vicente, Bucerías, Valle de Banderas'
	},
	{
		timezone: 'America/Belize',
		cities: 'Belize City, San Ignacio, Orange Walk, Belmopan, Dangriga'
	},
	{
		timezone: 'America/Chicago',
		cities: 'Chicago, Houston, San Antonio, Dallas, Austin'
	},
	{
		timezone: 'America/Costa_Rica',
		cities: 'San José, Limón, San Francisco, Alajuela, Liberia'
	},
	{
		timezone: 'America/El_Salvador',
		cities: 'San Salvador, Soyapango, Santa Ana, San Miguel, Mejicanos'
	},
	{
		timezone: 'America/Guatemala',
		cities: 'Guatemala City, Mixco, Villa Nueva, Petapa, San Juan Sacatepéquez'
	},
	{
		timezone: 'America/Indiana/Knox',
		cities: ''
	},
	{
		timezone: 'America/Indiana/Tell_City',
		cities: 'Tell City'
	},
	{
		timezone: 'America/Managua',
		cities: 'Managua, León, Masaya, Chinandega, Matagalpa'
	},
	{
		timezone: 'America/Matamoros',
		cities: 'Reynosa, Heroica Matamoros, Nuevo Laredo, Piedras Negras, Ciudad Acuña'
	},
	{
		timezone: 'America/Menominee',
		cities: 'Menominee, Iron Mountain, Kingsford, Ironwood, Iron River'
	},
	{
		timezone: 'America/Merida',
		cities: 'Mérida, Campeche, Ciudad del Carmen, Kanasín, Valladolid'
	},
	{
		timezone: 'America/Mexico_City',
		cities: 'Mexico City, Iztapalapa, Ecatepec de Morelos, Guadalajara, Puebla'
	},
	{
		timezone: 'America/Monterrey',
		cities: 'Monterrey, Saltillo, Guadalupe, Torreón, Victoria de Durango'
	},
	{
		timezone: 'America/North_Dakota/Beulah',
		cities: ''
	},
	{
		timezone: 'America/North_Dakota/Center',
		cities: ''
	},
	{
		timezone: 'America/North_Dakota/New_Salem',
		cities: 'Mandan'
	},
	{
		timezone: 'America/Rainy_River',
		cities: ''
	},
	{
		timezone: 'America/Rankin_Inlet',
		cities: ''
	},
	{
		timezone: 'America/Regina',
		cities: 'Saskatoon, Regina, Prince Albert, Moose Jaw, North Battleford'
	},
	{
		timezone: 'America/Resolute',
		cities: ''
	},
	{
		timezone: 'America/Swift_Current',
		cities: 'Swift Current'
	},
	{
		timezone: 'America/Tegucigalpa',
		cities: 'Tegucigalpa, San Pedro Sula, Choloma, La Ceiba, El Progreso'
	},
	{
		timezone: 'America/Winnipeg',
		cities: 'Winnipeg, Brandon, Kenora, Portage la Prairie, Thompson'
	},
	{
		timezone: 'Pacific/Easter',
		cities: ''
	},
	{
		timezone: 'Pacific/Galapagos',
		cities: 'Puerto Ayora, Puerto Baquerizo Moreno'
	},
	{
		timezone: 'America/Atikokan',
		cities: ''
	},
	{
		timezone: 'America/Bogota',
		cities: 'Bogotá, Cali, Medellín, Barranquilla, Cartagena'
	},
	{
		timezone: 'America/Cancun',
		cities: 'Cancún, Chetumal, Playa del Carmen, Cozumel, Felipe Carrillo Puerto'
	},
	{
		timezone: 'America/Cayman',
		cities: 'George Town, West Bay, Bodden Town, East End, North Side'
	},
	{
		timezone: 'America/Detroit',
		cities: 'Detroit, Grand Rapids, Warren, Sterling Heights, Ann Arbor'
	},
	{
		timezone: 'America/Eirunepe',
		cities: 'Eirunepé, Benjamin Constant, Envira'
	},
	{
		timezone: 'America/Grand_Turk',
		cities: 'Cockburn Town'
	},
	{
		timezone: 'America/Guayaquil',
		cities: 'Guayaquil, Quito, Cuenca, Santo Domingo de los Colorados, Machala'
	},
	{
		timezone: 'America/Havana',
		cities: 'Havana, Santiago de Cuba, Camagüey, Holguín, Guantánamo'
	},
	{
		timezone: 'America/Indiana/Indianapolis',
		cities: 'Indianapolis, Fort Wayne, South Bend, Carmel, Bloomington'
	},
	{
		timezone: 'America/Indiana/Marengo',
		cities: ''
	},
	{
		timezone: 'America/Indiana/Petersburg',
		cities: ''
	},
	{
		timezone: 'America/Indiana/Vevay',
		cities: ''
	},
	{
		timezone: 'America/Indiana/Vincennes',
		cities: 'Vincennes, Jasper, Washington, Huntingburg'
	},
	{
		timezone: 'America/Indiana/Winamac',
		cities: ''
	},
	{
		timezone: 'America/Iqaluit',
		cities: 'Iqaluit'
	},
	{
		timezone: 'America/Jamaica',
		cities: 'Kingston, New Kingston, Spanish Town, Portmore, Montego Bay'
	},
	{
		timezone: 'America/Kentucky/Louisville',
		cities: 'Louisville, Jeffersonville, New Albany, Jeffersontown, Pleasure Ridge Park'
	},
	{
		timezone: 'America/Kentucky/Monticello',
		cities: 'Monticello'
	},
	{
		timezone: 'America/Lima',
		cities: 'Lima, Arequipa, Callao, Trujillo, Chiclayo'
	},
	{
		timezone: 'America/Nassau',
		cities: 'Nassau, Lucaya, Freeport, West End, Cooper’s Town'
	},
	{
		timezone: 'America/New_York',
		cities: 'New York City, Brooklyn, Queens, Philadelphia, Manhattan'
	},
	{
		timezone: 'America/Nipigon',
		cities: ''
	},
	{
		timezone: 'America/Panama',
		cities: 'Panamá, San Miguelito, Juan Díaz, David, Arraiján'
	},
	{
		timezone: 'America/Pangnirtung',
		cities: ''
	},
	{
		timezone: 'America/Port-au-Prince',
		cities: 'Port-au-Prince, Carrefour, Delmas 73, Pétionville, Port-de-Paix'
	},
	{
		timezone: 'America/Rio_Branco',
		cities: 'Rio Branco, Cruzeiro do Sul, Sena Madureira, Tarauacá, Feijó'
	},
	{
		timezone: 'America/Thunder_Bay',
		cities: 'Thunder Bay'
	},
	{
		timezone: 'America/Toronto',
		cities: 'Toronto, Montréal, Ottawa, Mississauga, Québec'
	},
	{
		timezone: 'America/Anguilla',
		cities: 'The Valley, Blowing Point Village, Sandy Ground Village, The Quarter, Sandy Hill'
	},
	{
		timezone: 'America/Antigua',
		cities: 'Saint John’s, Piggotts, Bolands, Codrington, Parham'
	},
	{
		timezone: 'America/Aruba',
		cities: 'Oranjestad, Tanki Leendert, San Nicolas, Santa Cruz, Paradera'
	},
	{
		timezone: 'America/Asuncion',
		cities: 'Asunción, Ciudad del Este, San Lorenzo, Capiatá, Lambaré'
	},
	{
		timezone: 'America/Barbados',
		cities: 'Bridgetown, Speightstown, Oistins, Bathsheba, Holetown'
	},
	{
		timezone: 'America/Blanc-Sablon',
		cities: 'Lévis'
	},
	{
		timezone: 'America/Boa_Vista',
		cities: 'Boa Vista'
	},
	{
		timezone: 'America/Campo_Grande',
		cities: 'Campo Grande, Dourados, Corumbá, Três Lagoas, Ponta Porã'
	},
	{
		timezone: 'America/Caracas',
		cities: 'Caracas, Maracaibo, Maracay, Valencia, Barquisimeto'
	},
	{
		timezone: 'America/Cuiaba',
		cities: 'Cuiabá, Várzea Grande, Rondonópolis, Sinop, Barra do Garças'
	},
	{
		timezone: 'America/Curacao',
		cities: 'Willemstad, Sint Michiel Liber'
	},
	{
		timezone: 'America/Dominica',
		cities: 'Roseau, Portsmouth, Berekua, Saint Joseph, Wesley'
	},
	{
		timezone: 'America/Glace_Bay',
		cities: 'Sydney, Glace Bay, Sydney Mines'
	},
	{
		timezone: 'America/Goose_Bay',
		cities: 'Labrador City, Happy Valley-Goose Bay'
	},
	{
		timezone: 'America/Grenada',
		cities: "Saint George's, Gouyave, Grenville, Victoria, Saint David’s"
	},
	{
		timezone: 'America/Guadeloupe',
		cities: 'Les Abymes, Baie-Mahault, Le Gosier, Petit-Bourg, Sainte-Anne'
	},
	{
		timezone: 'America/Guyana',
		cities: 'Georgetown, Linden, New Amsterdam, Anna Regina, Bartica'
	},
	{
		timezone: 'America/Halifax',
		cities: 'Halifax, Dartmouth, Charlottetown, Lower Sackville, Truro'
	},
	{
		timezone: 'America/Kralendijk',
		cities: 'Kralendijk, Oranjestad, The Bottom'
	},
	{
		timezone: 'America/La_Paz',
		cities: 'Santa Cruz de la Sierra, Cochabamba, La Paz, Sucre, Oruro'
	},
	{
		timezone: 'America/Lower_Princes',
		cities: 'Cul de Sac, Lower Prince’s Quarter, Koolbaai, Philipsburg'
	},
	{
		timezone: 'America/Manaus',
		cities: 'Manaus, Itacoatiara, Parintins, Manacapuru, Coari'
	},
	{
		timezone: 'America/Marigot',
		cities: 'Marigot'
	},
	{
		timezone: 'America/Martinique',
		cities: 'Fort-de-France, Le Lamentin, Le Robert, Sainte-Marie, Le François'
	},
	{
		timezone: 'America/Moncton',
		cities: 'Moncton, Saint John, Fredericton, Dieppe, Miramichi'
	},
	{
		timezone: 'America/Montserrat',
		cities: 'Brades, Saint Peters, Plymouth'
	},
	{
		timezone: 'America/Porto_Velho',
		cities: 'Porto Velho, Ji Paraná, Vilhena, Ariquemes, Cacoal'
	},
	{
		timezone: 'America/Port_of_Spain',
		cities: 'Chaguanas, Mon Repos, San Fernando, Port of Spain, Rio Claro'
	},
	{
		timezone: 'America/Puerto_Rico',
		cities: 'San Juan, Bayamón, Carolina, Ponce, Caguas'
	},
	{
		timezone: 'America/Santiago',
		cities: 'Santiago, Puente Alto, Antofagasta, Viña del Mar, Valparaíso'
	},
	{
		timezone: 'America/Santo_Domingo',
		cities:
			'Santo Domingo, Santiago de los Caballeros, Santo Domingo Oeste, Santo Domingo Este, San Pedro de Macorís'
	},
	{
		timezone: 'America/St_Barthelemy',
		cities: 'Gustavia'
	},
	{
		timezone: 'America/St_Kitts',
		cities: 'Basseterre, Fig Tree, Market Shop, Saint Paul’s, Middle Island'
	},
	{
		timezone: 'America/St_Lucia',
		cities: 'Castries, Bisee, Vieux Fort, Micoud, Soufrière'
	},
	{
		timezone: 'America/St_Thomas',
		cities: 'Saint Croix, Charlotte Amalie, Cruz Bay'
	},
	{
		timezone: 'America/St_Vincent',
		cities: 'Kingstown, Kingstown Park, Georgetown, Barrouallie, Port Elizabeth'
	},
	{
		timezone: 'America/Thule',
		cities: ''
	},
	{
		timezone: 'America/Tortola',
		cities: 'Road Town'
	},
	{
		timezone: 'Atlantic/Bermuda',
		cities: 'Hamilton'
	},
	{
		timezone: 'America/St_Johns',
		cities: "St. John's, Mount Pearl, Corner Brook, Conception Bay South, Bay Roberts"
	},
	{
		timezone: 'America/Araguaina',
		cities: 'Palmas, Araguaína, Gurupi, Miracema do Tocantins, Porto Franco'
	},
	{
		timezone: 'America/Argentina/Buenos_Aires',
		cities: 'Buenos Aires, La Plata, Mar del Plata, Morón, Bahía Blanca'
	},
	{
		timezone: 'America/Argentina/Catamarca',
		cities: 'San Fernando del Valle de Catamarca, Trelew, Puerto Madryn, Esquel, Rawson'
	},
	{
		timezone: 'America/Argentina/Cordoba',
		cities: 'Córdoba, Rosario, Santa Fe, Resistencia, Santiago del Estero'
	},
	{
		timezone: 'America/Argentina/Jujuy',
		cities:
			'San Salvador de Jujuy, San Pedro de Jujuy, Libertador General San Martín, Palpalá, La Quiaca'
	},
	{
		timezone: 'America/Argentina/La_Rioja',
		cities: 'La Rioja, Chilecito, Arauco, Chamical'
	},
	{
		timezone: 'America/Argentina/Mendoza',
		cities: 'Mendoza, San Rafael, San Martín'
	},
	{
		timezone: 'America/Argentina/Rio_Gallegos',
		cities: 'Comodoro Rivadavia, Río Gallegos, Caleta Olivia, Pico Truncado, Puerto Deseado'
	},
	{
		timezone: 'America/Argentina/Salta',
		cities: 'Salta, Neuquén, Santa Rosa, San Carlos de Bariloche, Cipolletti'
	},
	{
		timezone: 'America/Argentina/San_Juan',
		cities: 'San Juan, Chimbas, Santa Lucía, Pocito, Caucete'
	},
	{
		timezone: 'America/Argentina/San_Luis',
		cities: 'San Luis, Villa Mercedes, La Punta, Merlo, Justo Daract'
	},
	{
		timezone: 'America/Argentina/Tucuman',
		cities: 'San Miguel de Tucumán, Yerba Buena, Tafí Viejo, Alderetes, Aguilares'
	},
	{
		timezone: 'America/Argentina/Ushuaia',
		cities: 'Ushuaia, Río Grande'
	},
	{
		timezone: 'America/Bahia',
		cities: 'Salvador, Feira de Santana, Vitória da Conquista, Itabuna, Camaçari'
	},
	{
		timezone: 'America/Belem',
		cities: 'Belém, Ananindeua, Macapá, Parauapebas, Marabá'
	},
	{
		timezone: 'America/Cayenne',
		cities: 'Cayenne, Matoury, Saint-Laurent-du-Maroni, Kourou, Rémire-Montjoly'
	},
	{
		timezone: 'America/Fortaleza',
		cities: 'Fortaleza, São Luís, Natal, Teresina, João Pessoa'
	},
	{
		timezone: 'America/Godthab',
		cities: 'Nuuk, Sisimiut, Ilulissat, Qaqortoq, Aasiaat'
	},
	{
		timezone: 'America/Maceio',
		cities: 'Maceió, Aracaju, Arapiraca, Nossa Senhora do Socorro, São Cristóvão'
	},
	{
		timezone: 'America/Miquelon',
		cities: 'Saint-Pierre, Miquelon'
	},
	{
		timezone: 'America/Montevideo',
		cities: 'Montevideo, Salto, Paysandú, Las Piedras, Rivera'
	},
	{
		timezone: 'America/Paramaribo',
		cities: 'Paramaribo, Lelydorp, Brokopondo, Nieuw Nickerie, Moengo'
	},
	{
		timezone: 'America/Punta_Arenas',
		cities: 'Punta Arenas, Puerto Natales'
	},
	{
		timezone: 'America/Recife',
		cities: 'Recife, Jaboatão, Jaboatão dos Guararapes, Olinda, Paulista'
	},
	{
		timezone: 'America/Santarem',
		cities: 'Santarém, Altamira, Itaituba, Oriximiná, Alenquer'
	},
	{
		timezone: 'America/Sao_Paulo',
		cities: 'São Paulo, Rio de Janeiro, Belo Horizonte, Brasília, Curitiba'
	},
	{
		timezone: 'Antarctica/Palmer',
		cities: ''
	},
	{
		timezone: 'Antarctica/Rothera',
		cities: ''
	},
	{
		timezone: 'Atlantic/Stanley',
		cities: 'Stanley'
	},
	{
		timezone: 'America/Noronha',
		cities: 'Itamaracá'
	},
	{
		timezone: 'Atlantic/South_Georgia',
		cities: 'Grytviken'
	},
	{
		timezone: 'America/Scoresbysund',
		cities: ''
	},
	{
		timezone: 'Atlantic/Azores',
		cities: 'Ponta Delgada, Lagoa, Angra do Heroísmo, Rosto de Cão, Rabo de Peixe'
	},
	{
		timezone: 'Atlantic/Cape_Verde',
		cities: 'Praia, Mindelo, Santa Maria, Cova Figueira, Santa Cruz'
	},
	{
		timezone: 'Africa/Abidjan',
		cities: 'Abidjan, Abobo, Bouaké, Daloa, San-Pédro'
	},
	{
		timezone: 'Africa/Accra',
		cities: 'Accra, Kumasi, Tamale, Takoradi, Atsiaman'
	},
	{
		timezone: 'Africa/Bamako',
		cities: 'Bamako, Sikasso, Mopti, Koutiala, Ségou'
	},
	{
		timezone: 'Africa/Banjul',
		cities: 'Serekunda, Brikama, Bakau, Banjul, Farafenni'
	},
	{
		timezone: 'Africa/Bissau',
		cities: 'Bissau, Bafatá, Gabú, Bissorã, Bolama'
	},
	{
		timezone: 'Africa/Casablanca',
		cities: 'Casablanca, Rabat, Fès, Sale, Marrakesh'
	},
	{
		timezone: 'Africa/Conakry',
		cities: 'Camayenne, Conakry, Nzérékoré, Kindia, Kankan'
	},
	{
		timezone: 'Africa/Dakar',
		cities: 'Dakar, Pikine, Touba, Thiès, Thiès Nones'
	},
	{
		timezone: 'Africa/El_Aaiun',
		cities: 'Laayoune, Dakhla, Laayoune Plage'
	},
	{
		timezone: 'Africa/Freetown',
		cities: 'Freetown, Bo, Kenema, Koidu, Makeni'
	},
	{
		timezone: 'Africa/Lome',
		cities: 'Lomé, Sokodé, Kara, Atakpamé, Kpalimé'
	},
	{
		timezone: 'Africa/Monrovia',
		cities: 'Monrovia, Gbarnga, Kakata, Bensonville, Harper'
	},
	{
		timezone: 'Africa/Nouakchott',
		cities: 'Nouakchott, Nouadhibou, Néma, Kaédi, Rosso'
	},
	{
		timezone: 'Africa/Ouagadougou',
		cities: 'Ouagadougou, Bobo-Dioulasso, Koudougou, Ouahigouya, Banfora'
	},
	{
		timezone: 'Africa/Sao_Tome',
		cities: 'São Tomé, Santo António'
	},
	{
		timezone: 'America/Danmarkshavn',
		cities: ''
	},
	{
		timezone: 'Antarctica/Troll',
		cities: ''
	},
	{
		timezone: 'Atlantic/Canary',
		cities: 'Las Palmas de Gran Canaria, Santa Cruz de Tenerife, La Laguna, Telde, Arona'
	},
	{
		timezone: 'Atlantic/Faroe',
		cities: 'Tórshavn, Klaksvík, Fuglafjørður, Tvøroyri, Miðvágur'
	},
	{
		timezone: 'Atlantic/Madeira',
		cities: 'Funchal, Câmara de Lobos, São Martinho, Caniço, Machico'
	},
	{
		timezone: 'Atlantic/Reykjavik',
		cities: 'Reykjavík, Kópavogur, Hafnarfjörður, Akureyri, Garðabær'
	},
	{
		timezone: 'Atlantic/St_Helena',
		cities: 'Jamestown, Georgetown, Edinburgh of the Seven Seas'
	},
	{
		timezone: 'Europe/Dublin',
		cities: 'Dublin, Cork, Luimneach, Gaillimh, Tallaght'
	},
	{
		timezone: 'Europe/Guernsey',
		cities: 'Saint Peter Port, St Martin, Saint Sampson, St Anne, Saint Saviour'
	},
	{
		timezone: 'Europe/Isle_of_Man',
		cities: 'Douglas, Ramsey, Peel, Port Erin, Castletown'
	},
	{
		timezone: 'Europe/Jersey',
		cities: 'Saint Helier, Le Hocq'
	},
	{
		timezone: 'Europe/Lisbon',
		cities: 'Lisbon, Porto, Amadora, Braga, Setúbal'
	},
	{
		timezone: 'Europe/London',
		cities: 'London, Birmingham, Liverpool, Sheffield, Bristol'
	},
	{
		timezone: 'Africa/Algiers',
		cities: 'Algiers, Boumerdas, Oran, Tébessa, Constantine'
	},
	{
		timezone: 'Africa/Bangui',
		cities: 'Bangui, Bimbo, Mbaïki, Berbérati, Kaga Bandoro'
	},
	{
		timezone: 'Africa/Brazzaville',
		cities: 'Brazzaville, Pointe-Noire, Dolisie, Kayes, Owando'
	},
	{
		timezone: 'Africa/Ceuta',
		cities: 'Ceuta, Melilla'
	},
	{
		timezone: 'Africa/Douala',
		cities: 'Douala, Yaoundé, Garoua, Kousséri, Bamenda'
	},
	{
		timezone: 'Africa/Kinshasa',
		cities: 'Kinshasa, Masina, Kikwit, Mbandaka, Matadi'
	},
	{
		timezone: 'Africa/Lagos',
		cities: 'Lagos, Kano, Ibadan, Kaduna, Port Harcourt'
	},
	{
		timezone: 'Africa/Libreville',
		cities: 'Libreville, Port-Gentil, Franceville, Oyem, Moanda'
	},
	{
		timezone: 'Africa/Luanda',
		cities: 'Luanda, N’dalatando, Huambo, Lobito, Benguela'
	},
	{
		timezone: 'Africa/Malabo',
		cities: 'Bata, Malabo, Ebebiyin, Aconibe, Añisoc'
	},
	{
		timezone: 'Africa/Ndjamena',
		cities: "N'Djamena, Moundou, Sarh, Abéché, Kelo"
	},
	{
		timezone: 'Africa/Niamey',
		cities: 'Niamey, Zinder, Maradi, Agadez, Alaghsas'
	},
	{
		timezone: 'Africa/Porto-Novo',
		cities: 'Cotonou, Abomey-Calavi, Djougou, Porto-Novo, Parakou'
	},
	{
		timezone: 'Africa/Tunis',
		cities: 'Tunis, Sfax, Sousse, Kairouan, Bizerte'
	},
	{
		timezone: 'Africa/Windhoek',
		cities: 'Windhoek, Rundu, Walvis Bay, Oshakati, Swakopmund'
	},
	{
		timezone: 'Arctic/Longyearbyen',
		cities: 'Longyearbyen, Olonkinbyen'
	},
	{
		timezone: 'Europe/Amsterdam',
		cities: 'Amsterdam, Rotterdam, The Hague, Utrecht, Eindhoven'
	},
	{
		timezone: 'Europe/Andorra',
		cities: 'Andorra la Vella, les Escaldes, Encamp, Sant Julià de Lòria, la Massana'
	},
	{
		timezone: 'Europe/Belgrade',
		cities: 'Belgrade, Pristina, Niš, Novi Sad, Prizren'
	},
	{
		timezone: 'Europe/Berlin',
		cities: 'Berlin, Hamburg, Munich, Köln, Frankfurt am Main'
	},
	{
		timezone: 'Europe/Bratislava',
		cities: 'Bratislava, Košice, Prešov, Nitra, Žilina'
	},
	{
		timezone: 'Europe/Brussels',
		cities: 'Brussels, Antwerpen, Gent, Charleroi, Liège'
	},
	{
		timezone: 'Europe/Budapest',
		cities: 'Budapest, Debrecen, Miskolc, Szeged, Pécs'
	},
	{
		timezone: 'Europe/Copenhagen',
		cities: 'Copenhagen, Århus, Odense, Aalborg, Frederiksberg'
	},
	{
		timezone: 'Europe/Gibraltar',
		cities: 'Gibraltar'
	},
	{
		timezone: 'Europe/Ljubljana',
		cities: 'Ljubljana, Maribor, Celje, Kranj, Velenje'
	},
	{
		timezone: 'Europe/Luxembourg',
		cities: 'Luxembourg, Esch-sur-Alzette, Dudelange, Schifflange, Bettembourg'
	},
	{
		timezone: 'Europe/Madrid',
		cities: 'Madrid, Barcelona, Valencia, Sevilla, Zaragoza'
	},
	{
		timezone: 'Europe/Malta',
		cities: 'Birkirkara, Qormi, Mosta, Żabbar, San Pawl il-Baħar'
	},
	{
		timezone: 'Europe/Monaco',
		cities: 'Monaco, Monte-Carlo, La Condamine'
	},
	{
		timezone: 'Europe/Oslo',
		cities: 'Oslo, Bergen, Trondheim, Stavanger, Drammen'
	},
	{
		timezone: 'Europe/Paris',
		cities: 'Paris, Marseille, Lyon, Toulouse, Nice'
	},
	{
		timezone: 'Europe/Podgorica',
		cities: 'Podgorica, Nikšić, Herceg Novi, Pljevlja, Budva'
	},
	{
		timezone: 'Europe/Prague',
		cities: 'Prague, Brno, Ostrava, Pilsen, Olomouc'
	},
	{
		timezone: 'Europe/Rome',
		cities: 'Rome, Milan, Naples, Turin, Palermo'
	},
	{
		timezone: 'Europe/San_Marino',
		cities: 'Serravalle, Borgo Maggiore, San Marino, Domagnano, Fiorentino'
	},
	{
		timezone: 'Europe/Sarajevo',
		cities: 'Sarajevo, Banja Luka, Zenica, Tuzla, Mostar'
	},
	{
		timezone: 'Europe/Skopje',
		cities: 'Skopje, Bitola, Kumanovo, Prilep, Tetovo'
	},
	{
		timezone: 'Europe/Stockholm',
		cities: 'Stockholm, Göteborg, Malmö, Uppsala, Sollentuna'
	},
	{
		timezone: 'Europe/Tirane',
		cities: 'Tirana, Durrës, Elbasan, Vlorë, Shkodër'
	},
	{
		timezone: 'Europe/Vaduz',
		cities: 'Schaan, Vaduz, Triesen, Balzers, Eschen'
	},
	{
		timezone: 'Europe/Vatican',
		cities: 'Vatican City'
	},
	{
		timezone: 'Europe/Vienna',
		cities: 'Vienna, Graz, Linz, Favoriten, Donaustadt'
	},
	{
		timezone: 'Europe/Warsaw',
		cities: 'Warsaw, Łódź, Kraków, Wrocław, Poznań'
	},
	{
		timezone: 'Europe/Zagreb',
		cities: 'Zagreb, Split, Rijeka, Osijek, Zadar'
	},
	{
		timezone: 'Europe/Zurich',
		cities: 'Zürich, Genève, Basel, Lausanne, Bern'
	},
	{
		timezone: 'Africa/Blantyre',
		cities: 'Lilongwe, Blantyre, Mzuzu, Zomba, Kasungu'
	},
	{
		timezone: 'Africa/Bujumbura',
		cities: 'Bujumbura, Muyinga, Gitega, Ruyigi, Ngozi'
	},
	{
		timezone: 'Africa/Cairo',
		cities: 'Cairo, Alexandria, Giza, Port Said, Suez'
	},
	{
		timezone: 'Africa/Gaborone',
		cities: 'Gaborone, Francistown, Molepolole, Selebi-Phikwe, Maun'
	},
	{
		timezone: 'Africa/Harare',
		cities: 'Harare, Bulawayo, Chitungwiza, Mutare, Gweru'
	},
	{
		timezone: 'Africa/Johannesburg',
		cities: 'Cape Town, Durban, Johannesburg, Soweto, Pretoria'
	},
	{
		timezone: 'Africa/Juba',
		cities: 'Juba, Winejok, Malakal, Wau, Kuacjok'
	},
	{
		timezone: 'Africa/Khartoum',
		cities: 'Khartoum, Omdurman, Nyala, Port Sudan, Kassala'
	},
	{
		timezone: 'Africa/Kigali',
		cities: 'Kigali, Butare, Gitarama, Musanze, Gisenyi'
	},
	{
		timezone: 'Africa/Lubumbashi',
		cities: 'Lubumbashi, Mbuji-Mayi, Kisangani, Kananga, Likasi'
	},
	{
		timezone: 'Africa/Lusaka',
		cities: 'Lusaka, Kitwe, Ndola, Kabwe, Chingola'
	},
	{
		timezone: 'Africa/Maputo',
		cities: 'Maputo, Matola, Beira, Nampula, Chimoio'
	},
	{
		timezone: 'Africa/Maseru',
		cities: 'Maseru, Mafeteng, Leribe, Maputsoe, Mohale’s Hoek'
	},
	{
		timezone: 'Africa/Mbabane',
		cities: 'Manzini, Mbabane, Big Bend, Malkerns, Nhlangano'
	},
	{
		timezone: 'Africa/Tripoli',
		cities: 'Tripoli, Benghazi, Mişrātah, Tarhuna, Al Khums'
	},
	{
		timezone: 'Asia/Amman',
		cities: 'Amman, Zarqa, Irbid, Russeifa, Wādī as Sīr'
	},
	{
		timezone: 'Asia/Beirut',
		cities: 'Beirut, Ra’s Bayrūt, Tripoli, Sidon, Tyre'
	},
	{
		timezone: 'Asia/Damascus',
		cities: 'Aleppo, Damascus, Homs, Ḩamāh, Latakia'
	},
	{
		timezone: 'Asia/Famagusta',
		cities: 'Famagusta, Kyrenia, Protaras, Paralímni, Lápithos'
	},
	{
		timezone: 'Asia/Gaza',
		cities: 'Gaza, Khān Yūnis, Jabālyā, Rafaḩ, Dayr al Balaḩ'
	},
	{
		timezone: 'Asia/Hebron',
		cities: 'East Jerusalem, Hebron, Nablus, Battir, Ţūlkarm'
	},
	{
		timezone: 'Asia/Jerusalem',
		cities: 'Jerusalem, Tel Aviv, West Jerusalem, Haifa, Ashdod'
	},
	{
		timezone: 'Asia/Nicosia',
		cities: 'Nicosia, Limassol, Larnaca, Stróvolos, Paphos'
	},
	{
		timezone: 'Europe/Athens',
		cities: 'Athens, Thessaloníki, Pátra, Piraeus, Lárisa'
	},
	{
		timezone: 'Europe/Bucharest',
		cities: 'Bucharest, Sector 3, Sector 6, Sector 2, Iaşi'
	},
	{
		timezone: 'Europe/Chisinau',
		cities: 'Chisinau, Tiraspol, Bălţi, Bender, Rîbniţa'
	},
	{
		timezone: 'Europe/Helsinki',
		cities: 'Helsinki, Espoo, Tampere, Vantaa, Turku'
	},
	{
		timezone: 'Europe/Kaliningrad',
		cities: 'Kaliningrad, Chernyakhovsk, Sovetsk, Baltiysk, Gusev'
	},
	{
		timezone: 'Europe/Kiev',
		cities: 'Kyiv, Kharkiv, Donetsk, Odessa, Dnipro'
	},
	{
		timezone: 'Europe/Mariehamn',
		cities: 'Mariehamn'
	},
	{
		timezone: 'Europe/Riga',
		cities: 'Riga, Daugavpils, Liepāja, Jelgava, Jūrmala'
	},
	{
		timezone: 'Europe/Sofia',
		cities: 'Sofia, Plovdiv, Varna, Burgas, Ruse'
	},
	{
		timezone: 'Europe/Tallinn',
		cities: 'Tallinn, Tartu, Narva, Kohtla-Järve, Pärnu'
	},
	{
		timezone: 'Europe/Uzhgorod',
		cities: 'Uzhgorod, Mukachevo, Khust, Berehove, Tyachiv'
	},
	{
		timezone: 'Europe/Vilnius',
		cities: 'Vilnius, Kaunas, Klaipėda, Šiauliai, Panevėžys'
	},
	{
		timezone: 'Europe/Zaporozhye',
		cities: 'Luhansk, Sevastopol, Sievierodonetsk, Alchevsk, Lysychansk'
	},
	{
		timezone: 'Africa/Addis_Ababa',
		cities: "Addis Ababa, Dire Dawa, Mek'ele, Nazrēt, Bahir Dar"
	},
	{
		timezone: 'Africa/Asmara',
		cities: 'Asmara, Keren, Massawa, Assab, Mendefera'
	},
	{
		timezone: 'Africa/Dar_es_Salaam',
		cities: 'Dar es Salaam, Mwanza, Zanzibar, Arusha, Mbeya'
	},
	{
		timezone: 'Africa/Djibouti',
		cities: "Djibouti, 'Ali Sabieh, Tadjourah, Obock, Dikhil"
	},
	{
		timezone: 'Africa/Kampala',
		cities: 'Kampala, Gulu, Lira, Mbarara, Jinja'
	},
	{
		timezone: 'Africa/Mogadishu',
		cities: 'Mogadishu, Hargeysa, Berbera, Kismayo, Marka'
	},
	{
		timezone: 'Africa/Nairobi',
		cities: 'Nairobi, Mombasa, Nakuru, Eldoret, Kisumu'
	},
	{
		timezone: 'Antarctica/Syowa',
		cities: ''
	},
	{
		timezone: 'Asia/Aden',
		cities: 'Sanaa, Al Ḩudaydah, Taiz, Aden, Mukalla'
	},
	{
		timezone: 'Asia/Baghdad',
		cities: 'Baghdad, Basrah, Al Mawşil al Jadīdah, Al Başrah al Qadīmah, Mosul'
	},
	{
		timezone: 'Asia/Bahrain',
		cities: 'Manama, Al Muharraq, Ar Rifā‘, Dār Kulayb, Madīnat Ḩamad'
	},
	{
		timezone: 'Asia/Kuwait',
		cities: 'Al Aḩmadī, Ḩawallī, As Sālimīyah, Şabāḩ as Sālim, Al Farwānīyah'
	},
	{
		timezone: 'Asia/Qatar',
		cities: 'Doha, Ar Rayyān, Umm Şalāl Muḩammad, Al Wakrah, Al Khawr'
	},
	{
		timezone: 'Asia/Riyadh',
		cities: 'Riyadh, Jeddah, Mecca, Medina, Sulţānah'
	},
	{
		timezone: 'Europe/Istanbul',
		cities: 'Istanbul, Ankara, İzmir, Bursa, Adana'
	},
	{
		timezone: 'Europe/Kirov',
		cities: 'Kirov, Kirovo-Chepetsk, Vyatskiye Polyany, Slobodskoy, Kotel’nich'
	},
	{
		timezone: 'Europe/Minsk',
		cities: "Minsk, Homyel', Mahilyow, Vitebsk, Hrodna"
	},
	{
		timezone: 'Europe/Moscow',
		cities: 'Moscow, Saint Petersburg, Nizhniy Novgorod, Kazan, Rostov-na-Donu'
	},
	{
		timezone: 'Europe/Simferopol',
		cities: 'Simferopol, Kerch, Yevpatoriya, Yalta, Feodosiya'
	},
	{
		timezone: 'Europe/Volgograd',
		cities: 'Volgograd, Volzhskiy, Kamyshin, Mikhaylovka, Uryupinsk'
	},
	{
		timezone: 'Indian/Antananarivo',
		cities: 'Antananarivo, Toamasina, Antsirabe, Fianarantsoa, Mahajanga'
	},
	{
		timezone: 'Indian/Comoro',
		cities: 'Moroni, Moutsamoudou, Fomboni, Domoni, Tsimbeo'
	},
	{
		timezone: 'Indian/Mayotte',
		cities: 'Mamoudzou, Koungou, Dzaoudzi, Dembeni, Sada'
	},
	{
		timezone: 'Asia/Tehran',
		cities: 'Tehran, Mashhad, Isfahan, Karaj, Tabriz'
	},
	{
		timezone: 'Asia/Baku',
		cities: 'Baku, Ganja, Sumqayıt, Lankaran, Yevlakh'
	},
	{
		timezone: 'Asia/Dubai',
		cities: 'Dubai, Sharjah, Abu Dhabi, Ajman City, Ras Al Khaimah City'
	},
	{
		timezone: 'Asia/Muscat',
		cities: 'Muscat, Seeb, Şalālah, Bawshar, Sohar'
	},
	{
		timezone: 'Asia/Tbilisi',
		cities: 'Tbilisi, Kutaisi, Batumi, Sokhumi, Zugdidi'
	},
	{
		timezone: 'Asia/Yerevan',
		cities: 'Yerevan, Gyumri, Vanadzor, Vagharshapat, Hrazdan'
	},
	{
		timezone: 'Europe/Astrakhan',
		cities: 'Astrakhan, Akhtubinsk, Znamensk, Kharabali, Kamyzyak'
	},
	{
		timezone: 'Europe/Samara',
		cities: 'Samara, Togliatti-on-the-Volga, Izhevsk, Syzran’, Novokuybyshevsk'
	},
	{
		timezone: 'Europe/Saratov',
		cities: 'Saratov, Balakovo, Engel’s, Balashov, Vol’sk'
	},
	{
		timezone: 'Europe/Ulyanovsk',
		cities: 'Ulyanovsk, Dimitrovgrad, Inza, Barysh, Novoul’yanovsk'
	},
	{
		timezone: 'Indian/Mahe',
		cities: 'Victoria, Anse Boileau, Bel Ombre, Beau Vallon, Cascade'
	},
	{
		timezone: 'Indian/Mauritius',
		cities: 'Port Louis, Beau Bassin-Rose Hill, Vacoas, Curepipe, Quatre Bornes'
	},
	{
		timezone: 'Indian/Reunion',
		cities: 'Saint-Denis, Saint-Paul, Saint-Pierre, Le Tampon, Saint-André'
	},
	{
		timezone: 'Asia/Kabul',
		cities: 'Kabul, Kandahār, Mazār-e Sharīf, Herāt, Jalālābād'
	},
	{
		timezone: 'Antarctica/Mawson',
		cities: ''
	},
	{
		timezone: 'Asia/Aqtau',
		cities: 'Shevchenko, Zhanaozen, Beyneu, Shetpe, Yeraliyev'
	},
	{
		timezone: 'Asia/Aqtobe',
		cities: 'Aktobe, Kandyagash, Shalqar, Khromtau, Embi'
	},
	{
		timezone: 'Asia/Ashgabat',
		cities: 'Ashgabat, Türkmenabat, Daşoguz, Mary, Balkanabat'
	},
	{
		timezone: 'Asia/Atyrau',
		cities: 'Atyrau, Qulsary, Shalkar, Balykshi, Maqat'
	},
	{
		timezone: 'Asia/Dushanbe',
		cities: 'Dushanbe, Khujand, Kŭlob, Bokhtar, Istaravshan'
	},
	{
		timezone: 'Asia/Karachi',
		cities: 'Karachi, Lahore, Faisalabad, Rawalpindi, Multan'
	},
	{
		timezone: 'Asia/Oral',
		cities: 'Oral, Aqsay, Zhänibek, Tasqala, Zhumysker'
	},
	{
		timezone: 'Asia/Qyzylorda',
		cities: 'Kyzylorda, Baikonur, Novokazalinsk, Aral, Chiili'
	},
	{
		timezone: 'Asia/Samarkand',
		cities: 'Samarkand, Bukhara, Nukus, Qarshi, Jizzax'
	},
	{
		timezone: 'Asia/Tashkent',
		cities: 'Tashkent, Namangan, Andijon, Qo‘qon, Chirchiq'
	},
	{
		timezone: 'Asia/Yekaterinburg',
		cities: 'Yekaterinburg, Chelyabinsk, Ufa, Perm, Orenburg'
	},
	{
		timezone: 'Indian/Kerguelen',
		cities: 'Port-aux-Français'
	},
	{
		timezone: 'Indian/Maldives',
		cities: 'Male, Fuvahmulah, Hithadhoo, Kulhudhuffushi, Thinadhoo'
	},
	{
		timezone: 'Asia/Colombo',
		cities: 'Colombo, Dehiwala-Mount Lavinia, Moratuwa, Jaffna, Negombo'
	},
	{
		timezone: 'Asia/Kolkata',
		cities: 'Mumbai, Delhi, Bengaluru, Kolkata, Chennai'
	},
	{
		timezone: 'Asia/Kathmandu',
		cities: 'Kathmandu, Pokhara, Pātan, Biratnagar, Birgañj'
	},
	{
		timezone: 'Antarctica/Vostok',
		cities: ''
	},
	{
		timezone: 'Asia/Almaty',
		cities: 'Almaty, Karagandy, Shymkent, Taraz, Nur-Sultan'
	},
	{
		timezone: 'Asia/Bishkek',
		cities: 'Bishkek, Osh, Jalal-Abad, Karakol, Tokmok'
	},
	{
		timezone: 'Asia/Dhaka',
		cities: 'Dhaka, Chattogram, Khulna, Rājshāhi, Comilla'
	},
	{
		timezone: 'Asia/Omsk',
		cities: 'Omsk, Tara, Kalachinsk, Znamenskoye, Tavricheskoye'
	},
	{
		timezone: 'Asia/Qostanay',
		cities: 'Kostanay, Rudnyy, Dzhetygara, Arkalyk, Lisakovsk'
	},
	{
		timezone: 'Asia/Thimphu',
		cities: 'Thimphu, Punākha, Tsirang, Phuntsholing, Pemagatshel'
	},
	{
		timezone: 'Asia/Urumqi',
		cities: 'Zhongshan, Ürümqi, Zhanjiang, Shihezi, Huocheng'
	},
	{
		timezone: 'Indian/Chagos',
		cities: ''
	},
	{
		timezone: 'Asia/Yangon',
		cities: 'Yangon, Mandalay, Nay Pyi Taw, Mawlamyine, Kyain Seikgyi Township'
	},
	{
		timezone: 'Indian/Cocos',
		cities: 'West Island'
	},
	{
		timezone: 'Antarctica/Davis',
		cities: ''
	},
	{
		timezone: 'Asia/Bangkok',
		cities: 'Bangkok, Hanoi, Haiphong, Samut Prakan, Mueang Nonthaburi'
	},
	{
		timezone: 'Asia/Barnaul',
		cities: 'Barnaul, Biysk, Rubtsovsk, Novoaltaysk, Gorno-Altaysk'
	},
	{
		timezone: 'Asia/Hovd',
		cities: 'Khovd, Ölgii, Ulaangom, Uliastay, Altai'
	},
	{
		timezone: 'Asia/Ho_Chi_Minh',
		cities: 'Ho Chi Minh City, Da Nang, Biên Hòa, Nha Trang, Cần Thơ'
	},
	{
		timezone: 'Asia/Jakarta',
		cities: 'Jakarta, Surabaya, Medan, Bandung, Bekasi'
	},
	{
		timezone: 'Asia/Krasnoyarsk',
		cities: 'Krasnoyarsk, Abakan, Norilsk, Achinsk, Kyzyl'
	},
	{
		timezone: 'Asia/Novokuznetsk',
		cities: 'Novokuznetsk, Kemerovo, Prokop’yevsk, Leninsk-Kuznetsky, Kiselëvsk'
	},
	{
		timezone: 'Asia/Novosibirsk',
		cities: 'Novosibirsk, Berdsk, Iskitim, Akademgorodok, Kuybyshev'
	},
	{
		timezone: 'Asia/Phnom_Penh',
		cities: 'Phnom Penh, Takeo, Sihanoukville, Battambang, Siem Reap'
	},
	{
		timezone: 'Asia/Pontianak',
		cities: 'Pontianak, Tanjung Pinang, Palangkaraya, Singkawang, Sampit'
	},
	{
		timezone: 'Asia/Tomsk',
		cities: 'Tomsk, Seversk, Strezhevoy, Kolpashevo, Asino'
	},
	{
		timezone: 'Asia/Vientiane',
		cities: 'Vientiane, Pakse, Thakhèk, Savannakhet, Luang Prabang'
	},
	{
		timezone: 'Indian/Christmas',
		cities: 'Flying Fish Cove'
	},
	{
		timezone: 'Asia/Brunei',
		cities: 'Bandar Seri Begawan, Kuala Belait, Seria, Tutong, Bangar'
	},
	{
		timezone: 'Asia/Choibalsan',
		cities: 'Baruun-Urt, Choibalsan'
	},
	{
		timezone: 'Asia/Hong_Kong',
		cities: 'Hong Kong, Kowloon, Tsuen Wan, Yuen Long Kau Hui, Tung Chung'
	},
	{
		timezone: 'Asia/Irkutsk',
		cities: 'Irkutsk, Ulan-Ude, Bratsk, Angarsk, Ust’-Ilimsk'
	},
	{
		timezone: 'Asia/Kuala_Lumpur',
		cities: 'Kota Bharu, Kuala Lumpur, Klang, Kampung Baru Subang, Johor Bahru'
	},
	{
		timezone: 'Asia/Kuching',
		cities: 'Kuching, Kota Kinabalu, Sandakan, Tawau, Miri'
	},
	{
		timezone: 'Asia/Macau',
		cities: 'Macau'
	},
	{
		timezone: 'Asia/Makassar',
		cities: 'Makassar, Denpasar, City of Balikpapan, Banjarmasin, Manado'
	},
	{
		timezone: 'Asia/Manila',
		cities: 'Quezon City, Manila, Caloocan City, Budta, Davao'
	},
	{
		timezone: 'Asia/Shanghai',
		cities: 'Shanghai, Beijing, Tianjin, Guangzhou, Shenzhen'
	},
	{
		timezone: 'Asia/Singapore',
		cities: 'Singapore, Woodlands'
	},
	{
		timezone: 'Asia/Taipei',
		cities: 'Taipei, Kaohsiung, Taichung, Tainan, Banqiao'
	},
	{
		timezone: 'Asia/Ulaanbaatar',
		cities: 'Ulan Bator, Erdenet, Darhan, Hovd, Mörön'
	},
	{
		timezone: 'Australia/Perth',
		cities: 'Perth, Rockingham, Mandurah, Bunbury, Albany'
	},
	{
		timezone: 'Australia/Eucla',
		cities: ''
	},
	{
		timezone: 'Asia/Chita',
		cities: 'Chita, Krasnokamensk, Borzya, Petrovsk-Zabaykal’skiy, Aginskoye'
	},
	{
		timezone: 'Asia/Dili',
		cities: 'Dili, Maliana, Suai, Likisá, Aileu'
	},
	{
		timezone: 'Asia/Jayapura',
		cities: 'Ambon, Jayapura, Sorong, Ternate, Abepura'
	},
	{
		timezone: 'Asia/Khandyga',
		cities: ''
	},
	{
		timezone: 'Asia/Pyongyang',
		cities: 'Pyongyang, Hamhŭng, Namp’o, Sunch’ŏn, Hŭngnam'
	},
	{
		timezone: 'Asia/Seoul',
		cities: 'Seoul, Busan, Incheon, Daegu, Daejeon'
	},
	{
		timezone: 'Asia/Tokyo',
		cities: 'Tokyo, Yokohama, Osaka, Nagoya, Sapporo'
	},
	{
		timezone: 'Asia/Yakutsk',
		cities: 'Yakutsk, Blagoveshchensk, Belogorsk, Neryungri, Svobodnyy'
	},
	{
		timezone: 'Pacific/Palau',
		cities: 'Koror, Koror Town, Kloulklubed, Ulimang, Mengellang'
	},
	{
		timezone: 'Australia/Adelaide',
		cities: 'Adelaide, Adelaide Hills, Mount Gambier, Morphett Vale, Gawler'
	},
	{
		timezone: 'Australia/Broken_Hill',
		cities: 'Broken Hill'
	},
	{
		timezone: 'Australia/Darwin',
		cities: 'Darwin, Alice Springs, Palmerston, Howard Springs'
	},
	{
		timezone: 'Antarctica/DumontDUrville',
		cities: ''
	},
	{
		timezone: 'Antarctica/Macquarie',
		cities: ''
	},
	{
		timezone: 'Asia/Ust-Nera',
		cities: ''
	},
	{
		timezone: 'Asia/Vladivostok',
		cities: 'Vladivostok, Khabarovsk, Khabarovsk Vtoroy, Komsomolsk-on-Amur, Ussuriysk'
	},
	{
		timezone: 'Australia/Brisbane',
		cities: 'Brisbane, Gold Coast, Logan City, Townsville, Cairns'
	},
	{
		timezone: 'Australia/Currie',
		cities: ''
	},
	{
		timezone: 'Australia/Hobart',
		cities: 'Hobart, Launceston, Burnie, Devonport, Sandy Bay'
	},
	{
		timezone: 'Australia/Lindeman',
		cities: ''
	},
	{
		timezone: 'Australia/Melbourne',
		cities: 'Melbourne, Geelong, Bendigo, Ballarat, Melbourne City Centre'
	},
	{
		timezone: 'Australia/Sydney',
		cities: 'Sydney, Canberra, Newcastle, Wollongong, Maitland'
	},
	{
		timezone: 'Pacific/Chuuk',
		cities: 'Weno, Colonia'
	},
	{
		timezone: 'Pacific/Guam',
		cities:
			'Dededo Village, Yigo Village, Tamuning, Tamuning-Tumon-Harmon Village, Mangilao Village'
	},
	{
		timezone: 'Pacific/Port_Moresby',
		cities: 'Port Moresby, Lae, Mount Hagen, Popondetta, Madang'
	},
	{
		timezone: 'Pacific/Saipan',
		cities: 'Saipan, San Jose Village'
	},
	{
		timezone: 'Australia/Lord_Howe',
		cities: ''
	},
	{
		timezone: 'Antarctica/Casey',
		cities: ''
	},
	{
		timezone: 'Asia/Magadan',
		cities: 'Magadan, Ust-Nera, Susuman, Ola'
	},
	{
		timezone: 'Asia/Sakhalin',
		cities: 'Yuzhno-Sakhalinsk, Korsakov, Kholmsk, Okha, Nevel’sk'
	},
	{
		timezone: 'Asia/Srednekolymsk',
		cities: ''
	},
	{
		timezone: 'Pacific/Bougainville',
		cities: 'Arawa, Buka'
	},
	{
		timezone: 'Pacific/Efate',
		cities: 'Port-Vila, Luganville, Isangel, Sola, Lakatoro'
	},
	{
		timezone: 'Pacific/Guadalcanal',
		cities: 'Honiara, Malango, Auki, Gizo, Buala'
	},
	{
		timezone: 'Pacific/Kosrae',
		cities: 'Tofol'
	},
	{
		timezone: 'Pacific/Norfolk',
		cities: 'Kingston'
	},
	{
		timezone: 'Pacific/Noumea',
		cities: 'Nouméa, Mont-Dore, Dumbéa, Païta, Wé'
	},
	{
		timezone: 'Pacific/Pohnpei',
		cities: 'Kolonia, Kolonia Town, Palikir - National Government Center'
	},
	{
		timezone: 'Antarctica/McMurdo',
		cities: ''
	},
	{
		timezone: 'Asia/Anadyr',
		cities: 'Anadyr, Bilibino'
	},
	{
		timezone: 'Asia/Kamchatka',
		cities: 'Petropavlovsk-Kamchatsky, Yelizovo, Vilyuchinsk, Klyuchi, Mil’kovo'
	},
	{
		timezone: 'Pacific/Auckland',
		cities: 'Auckland, Wellington, Christchurch, Manukau City, North Shore'
	},
	{
		timezone: 'Pacific/Fiji',
		cities: 'Suva, Lautoka, Nadi, Labasa, Ba'
	},
	{
		timezone: 'Pacific/Funafuti',
		cities: 'Funafuti, Savave Village, Tanrake Village, Toga Village, Asau Village'
	},
	{
		timezone: 'Pacific/Kwajalein',
		cities: 'Ebaye, Jabat'
	},
	{
		timezone: 'Pacific/Majuro',
		cities: 'Majuro, Arno, Jabor, Wotje, Mili'
	},
	{
		timezone: 'Pacific/Nauru',
		cities: 'Yaren, Baiti, Anabar, Uaboe, Ijuw'
	},
	{
		timezone: 'Pacific/Tarawa',
		cities: 'Tarawa, Betio Village, Bikenibeu Village'
	},
	{
		timezone: 'Pacific/Wake',
		cities: ''
	},
	{
		timezone: 'Pacific/Wallis',
		cities: 'Mata-Utu, Leava, Alo'
	},
	{
		timezone: 'Pacific/Chatham',
		cities: 'Waitangi'
	},
	{
		timezone: 'Pacific/Apia',
		cities: 'Apia, Asau, Mulifanua, Afega, Leulumoega'
	},
	{
		timezone: 'Pacific/Enderbury',
		cities: ''
	},
	{
		timezone: 'Pacific/Fakaofo',
		cities: 'Atafu Village, Nukunonu, Fale old settlement'
	},
	{
		timezone: 'Pacific/Tongatapu',
		cities: 'Nuku‘alofa, Lapaha, Neiafu, Pangai, ‘Ohonua'
	},
	{
		timezone: 'Pacific/Kiritimati',
		cities: ''
	}
];
