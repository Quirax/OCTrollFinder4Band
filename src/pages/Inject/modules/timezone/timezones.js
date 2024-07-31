import _ from 'underscore';
import moment from 'moment-timezone';

const timezones = {
    'Europe/Andorra': {
        id: 'Europe/Andorra',
        cityName: 'Andorra la Vella',
    },
    'Asia/Dubai': {
        id: 'Asia/Dubai',
        cityName: 'Dubai',
    },
    'Asia/Kabul': {
        id: 'Asia/Kabul',
        cityName: 'Kabul',
    },
    'America/Antigua': {
        id: 'America/Antigua',
        cityName: "St. John's",
    },
    'America/Anguilla': {
        id: 'America/Anguilla',
        cityName: 'The Valley',
    },
    'Europe/Tirane': {
        id: 'Europe/Tirane',
        cityName: 'Tirana',
    },
    'Asia/Yerevan': {
        id: 'Asia/Yerevan',
        cityName: 'Yeravan',
    },
    'Africa/Luanda': {
        id: 'Africa/Luanda',
        cityName: 'Luanda',
    },
    'Antarctica/Casey': {
        id: 'Antarctica/Casey',
        cityName: 'Casey Station',
    },
    'Antarctica/Davis': {
        id: 'Antarctica/Davis',
        cityName: 'Davis Station',
    },
    'Antarctica/DumontDUrville': {
        id: 'Antarctica/DumontDUrville',
        cityName: "Dumont d'Urville Station",
    },
    'Antarctica/Mawson': {
        id: 'Antarctica/Mawson',
        cityName: 'Mawson Base',
    },
    'Antarctica/McMurdo': {
        id: 'Antarctica/McMurdo',
        cityName: 'McMurdo base',
    },
    'Antarctica/Palmer': {
        id: 'Antarctica/Palmer',
        cityName: 'Palmer Base',
    },
    'Antarctica/Rothera': {
        id: 'Antarctica/Rothera',
        cityName: 'Rothera Station',
    },
    'Antarctica/South_Pole': {
        id: 'Antarctica/South_Pole',
        cityName: 'Antarctic',
    },
    'Antarctica/Syowa': {
        id: 'Antarctica/Syowa',
        cityName: 'Syowa Station',
    },
    'Antarctica/Troll': {
        id: 'Antarctica/Troll',
        cityName: 'Troll',
    },
    'Antarctica/Vostok': {
        id: 'Antarctica/Vostok',
        cityName: 'Vostok Station',
    },
    'America/Argentina/Buenos_Aires': {
        id: 'America/Argentina/Buenos_Aires',
        cityName: 'Buenos Aires',
    },
    'America/Argentina/Catamarca': {
        id: 'America/Argentina/Catamarca',
        cityName: 'Catamarca',
    },
    'America/Argentina/Cordoba': {
        id: 'America/Argentina/Cordoba',
        cityName: 'Cordoba',
    },
    'America/Argentina/Jujuy': {
        id: 'America/Argentina/Jujuy',
        cityName: 'San Salvador de Jujuy',
    },
    'America/Argentina/La_Rioja': {
        id: 'America/Argentina/La_Rioja',
        cityName: 'La Rioja',
    },
    'America/Argentina/Mendoza': {
        id: 'America/Argentina/Mendoza',
        cityName: 'Mendoza',
    },
    'America/Argentina/Rio_Gallegos': {
        id: 'America/Argentina/Rio_Gallegos',
        cityName: 'Rio Gallegos',
    },
    'America/Argentina/Salta': {
        id: 'America/Argentina/Salta',
        cityName: 'Salta',
    },
    'America/Argentina/San_Juan': {
        id: 'America/Argentina/San_Juan',
        cityName: 'San Juan',
    },
    'America/Argentina/San_Luis': {
        id: 'America/Argentina/San_Luis',
        cityName: 'San Luis',
    },
    'America/Argentina/Tucuman': {
        id: 'America/Argentina/Tucuman',
        cityName: 'Tucuman',
    },
    'America/Argentina/Ushuaia': {
        id: 'America/Argentina/Ushuaia',
        cityName: 'Ushuaia',
    },
    'Pacific/Pago_Pago': {
        id: 'Pacific/Pago_Pago',
        cityName: 'Pago Pago',
    },
    'Europe/Vienna': {
        id: 'Europe/Vienna',
        cityName: 'Vienna',
    },
    'Antarctica/Macquarie': {
        id: 'Antarctica/Macquarie',
        cityName: 'Macquarie Island',
    },
    'Australia/Adelaide': {
        id: 'Australia/Adelaide',
        cityName: 'Adelaide',
    },
    'Australia/Brisbane': {
        id: 'Australia/Brisbane',
        cityName: 'Brisbane',
    },
    'Australia/Broken_Hill': {
        id: 'Australia/Broken_Hill',
        cityName: 'Broken Hill',
    },
    'Australia/Currie': {
        id: 'Australia/Currie',
        cityName: 'Currie',
    },
    'Australia/Darwin': {
        id: 'Australia/Darwin',
        cityName: 'Darwin',
    },
    'Australia/Eucla': {
        id: 'Australia/Eucla',
        cityName: 'Eucla',
    },
    'Australia/Hobart': {
        id: 'Australia/Hobart',
        cityName: 'Hobart',
    },
    'Australia/Lindeman': {
        id: 'Australia/Lindeman',
        cityName: 'Lindeman Island',
    },
    'Australia/Lord_Howe': {
        id: 'Australia/Lord_Howe',
        cityName: 'Lord Howe Island',
    },
    'Australia/Melbourne': {
        id: 'Australia/Melbourne',
        cityName: 'Melbourne',
    },
    'Australia/Perth': {
        id: 'Australia/Perth',
        cityName: 'Perth',
    },
    'Australia/Sydney': {
        id: 'Australia/Sydney',
        cityName: 'Sidney',
    },
    'America/Aruba': {
        id: 'America/Aruba',
        cityName: 'Oranjestad',
    },
    'Europe/Mariehamn': {
        id: 'Europe/Mariehamn',
        cityName: 'Mariehamn',
    },
    'Asia/Baku': {
        id: 'Asia/Baku',
        cityName: 'Baku',
    },
    'Europe/Sarajevo': {
        id: 'Europe/Sarajevo',
        cityName: 'Sarajevo',
    },
    'America/Barbados': {
        id: 'America/Barbados',
        cityName: 'Bridgetown',
    },
    'Asia/Dhaka': {
        id: 'Asia/Dhaka',
        cityName: 'Dhaka',
    },
    'Europe/Brussels': {
        id: 'Europe/Brussels',
        cityName: 'Brussels',
    },
    'Africa/Ouagadougou': {
        id: 'Africa/Ouagadougou',
        cityName: 'Ouagadougou',
    },
    'Europe/Sofia': {
        id: 'Europe/Sofia',
        cityName: 'Sofia',
    },
    'Asia/Bahrain': {
        id: 'Asia/Bahrain',
        cityName: 'Manama',
    },
    'Africa/Bujumbura': {
        id: 'Africa/Bujumbura',
        cityName: 'Bujumbura',
    },
    'Africa/Porto-Novo': {
        id: 'Africa/Porto-Novo',
        cityName: 'Porto-Novo',
    },
    'America/St_Barthelemy': {
        id: 'America/St_Barthelemy',
        cityName: 'St. Barthelemy',
    },
    'Atlantic/Bermuda': {
        id: 'Atlantic/Bermuda',
        cityName: 'Hamilton',
    },
    'Asia/Brunei': {
        id: 'Asia/Brunei',
        cityName: 'Bandar Seri Begawan',
    },
    'America/La_Paz': {
        id: 'America/La_Paz',
        cityName: 'La Paz',
    },
    'America/Kralendijk': {
        id: 'America/Kralendijk',
        cityName: 'Kralendijk',
    },
    'America/Araguaina': {
        id: 'America/Araguaina',
        cityName: 'Araguaína',
    },
    'America/Bahia': {
        id: 'America/Bahia',
        cityName: 'Bahia',
    },
    'America/Belem': {
        id: 'America/Belem',
        cityName: 'Belem',
    },
    'America/Boa_Vista': {
        id: 'America/Boa_Vista',
        cityName: 'Boa Vista',
    },
    'America/Campo_Grande': {
        id: 'America/Campo_Grande',
        cityName: 'Campo Grande',
    },
    'America/Cuiaba': {
        id: 'America/Cuiaba',
        cityName: 'Cuiaba',
    },
    'America/Eirunepe': {
        id: 'America/Eirunepe',
        cityName: 'Eirunepe',
    },
    'America/Fortaleza': {
        id: 'America/Fortaleza',
        cityName: 'Fortaleza',
    },
    'America/Maceio': {
        id: 'America/Maceio',
        cityName: 'Maceio',
    },
    'America/Manaus': {
        id: 'America/Manaus',
        cityName: 'Manaus',
    },
    'America/Noronha': {
        id: 'America/Noronha',
        cityName: 'Fernando de Noronha',
    },
    'America/Porto_Velho': {
        id: 'America/Porto_Velho',
        cityName: 'Porto Velho',
    },
    'America/Recife': {
        id: 'America/Recife',
        cityName: 'Recife',
    },
    'America/Rio_Branco': {
        id: 'America/Rio_Branco',
        cityName: 'Rio Blanco',
    },
    'America/Santarem': {
        id: 'America/Santarem',
        cityName: 'Santarem',
    },
    'America/Sao_Paulo': {
        id: 'America/Sao_Paulo',
        cityName: 'Sao Paulo',
    },
    'America/Nassau': {
        id: 'America/Nassau',
        cityName: 'Nassau',
    },
    'Asia/Thimphu': {
        id: 'Asia/Thimphu',
        cityName: 'Thimphu',
    },
    'Africa/Gaborone': {
        id: 'Africa/Gaborone',
        cityName: 'Gaborone',
    },
    'Europe/Minsk': {
        id: 'Europe/Minsk',
        cityName: 'Minsk',
    },
    'America/Belize': {
        id: 'America/Belize',
        cityName: 'Belize City',
    },
    'America/Atikokan': {
        id: 'America/Atikokan',
        cityName: 'Atikokan',
    },
    'America/Blanc-Sablon': {
        id: 'America/Blanc-Sablon',
        cityName: 'Blanc-Sablon',
    },
    'America/Cambridge_Bay': {
        id: 'America/Cambridge_Bay',
        cityName: 'Cambridge Bay',
    },
    'America/Creston': {
        id: 'America/Creston',
        cityName: 'Creston',
    },
    'America/Dawson': {
        id: 'America/Dawson',
        cityName: 'Dawson City',
    },
    'America/Dawson_Creek': {
        id: 'America/Dawson_Creek',
        cityName: 'Dawson Creek',
    },
    'America/Edmonton': {
        id: 'America/Edmonton',
        cityName: 'Edmonton',
    },
    'America/Fort_Nelson': {
        id: 'America/Fort_Nelson',
        cityName: 'Fort Nelson',
    },
    'America/Glace_Bay': {
        id: 'America/Glace_Bay',
        cityName: 'Glace Bay',
    },
    'America/Goose_Bay': {
        id: 'America/Goose_Bay',
        cityName: 'Happy Valley-Goose Bay',
    },
    'America/Halifax': {
        id: 'America/Halifax',
        cityName: 'Halifax',
    },
    'America/Inuvik': {
        id: 'America/Inuvik',
        cityName: 'Inuvik',
    },
    'America/Iqaluit': {
        id: 'America/Iqaluit',
        cityName: 'Iqaluit',
    },
    'America/Moncton': {
        id: 'America/Moncton',
        cityName: 'Moncton',
    },
    'America/Montreal': {
        id: 'America/Montreal',
        cityName: 'Montreal',
    },
    'America/Nipigon': {
        id: 'America/Nipigon',
        cityName: 'Nipigon',
    },
    'America/Pangnirtung': {
        id: 'America/Pangnirtung',
        cityName: 'Pangnirtung',
    },
    'America/Rainy_River': {
        id: 'America/Rainy_River',
        cityName: 'Rainy River',
    },
    'America/Rankin_Inlet': {
        id: 'America/Rankin_Inlet',
        cityName: 'Rankin Inlet',
    },
    'America/Regina': {
        id: 'America/Regina',
        cityName: 'Regina',
    },
    'America/Resolute': {
        id: 'America/Resolute',
        cityName: 'Resolute',
    },
    'America/St_Johns': {
        id: 'America/St_Johns',
        cityName: "St. John's",
    },
    'America/Swift_Current': {
        id: 'America/Swift_Current',
        cityName: 'Swift Current',
    },
    'America/Thunder_Bay': {
        id: 'America/Thunder_Bay',
        cityName: 'Thunder Bay',
    },
    'America/Toronto': {
        id: 'America/Toronto',
        cityName: 'Toronto',
    },
    'America/Vancouver': {
        id: 'America/Vancouver',
        cityName: 'Vancouver',
    },
    'America/Whitehorse': {
        id: 'America/Whitehorse',
        cityName: 'Whitehorse',
    },
    'America/Winnipeg': {
        id: 'America/Winnipeg',
        cityName: 'Winnipeg',
    },
    'America/Yellowknife': {
        id: 'America/Yellowknife',
        cityName: 'Yellowknife',
    },
    'Indian/Cocos': {
        id: 'Indian/Cocos',
        cityName: 'Bantam Village',
    },
    'Africa/Kinshasa': {
        id: 'Africa/Kinshasa',
        cityName: 'Kinshasa',
    },
    'Africa/Lubumbashi': {
        id: 'Africa/Lubumbashi',
        cityName: 'Lubumbashi',
    },
    'Africa/Bangui': {
        id: 'Africa/Bangui',
        cityName: 'Bangui',
    },
    'Africa/Brazzaville': {
        id: 'Africa/Brazzaville',
        cityName: 'Brazzaville',
    },
    'Europe/Zurich': {
        id: 'Europe/Zurich',
        cityName: 'Zurich',
    },
    'Africa/Abidjan': {
        id: 'Africa/Abidjan',
        cityName: 'Abidjan',
    },
    'Pacific/Rarotonga': {
        id: 'Pacific/Rarotonga',
        cityName: 'Rarotonga',
    },
    'America/Punta_Arenas': {
        id: 'America/Punta_Arenas',
        cityName: 'Punta Arenas',
    },
    'America/Santiago': {
        id: 'America/Santiago',
        cityName: 'Santiago',
    },
    'Pacific/Easter': {
        id: 'Pacific/Easter',
        cityName: 'Easter Island',
    },
    'Africa/Douala': {
        id: 'Africa/Douala',
        cityName: 'Douala',
    },
    'Asia/Chongqing': {
        id: 'Asia/Chongqing',
        cityName: 'Chongqing',
    },
    'Asia/Harbin': {
        id: 'Asia/Harbin',
        cityName: 'Harbin',
    },
    'Asia/Kashgar': {
        id: 'Asia/Kashgar',
        cityName: 'Kashgar',
    },
    'Asia/Shanghai': {
        id: 'Asia/Shanghai',
        cityName: 'Shanghai',
    },
    'Asia/Urumqi': {
        id: 'Asia/Urumqi',
        cityName: 'Urumqi',
    },
    'America/Bogota': {
        id: 'America/Bogota',
        cityName: 'Bogota',
    },
    'America/Costa_Rica': {
        id: 'America/Costa_Rica',
        cityName: 'San Jose',
    },
    'America/Havana': {
        id: 'America/Havana',
        cityName: 'Havana',
    },
    'Atlantic/Cape_Verde': {
        id: 'Atlantic/Cape_Verde',
        cityName: 'Praia',
    },
    'America/Curacao': {
        id: 'America/Curacao',
        cityName: 'Willemstad',
    },
    'Indian/Christmas': {
        id: 'Indian/Christmas',
        cityName: 'The Settlement',
    },
    'Asia/Nicosia': {
        id: 'Asia/Nicosia',
        cityName: 'Nicosia',
    },
    'Europe/Prague': {
        id: 'Europe/Prague',
        cityName: 'Prague',
    },
    'Europe/Berlin': {
        id: 'Europe/Berlin',
        cityName: 'Berlin',
    },
    'Africa/Djibouti': {
        id: 'Africa/Djibouti',
        cityName: 'Djibouti',
    },
    'Europe/Copenhagen': {
        id: 'Europe/Copenhagen',
        cityName: 'Copenhagen',
    },
    'America/Dominica': {
        id: 'America/Dominica',
        cityName: 'Rojo',
    },
    'America/Santo_Domingo': {
        id: 'America/Santo_Domingo',
        cityName: 'Santo Domingo',
    },
    'Africa/Algiers': {
        id: 'Africa/Algiers',
        cityName: 'Algiers',
    },
    'America/Guayaquil': {
        id: 'America/Guayaquil',
        cityName: 'Guayaquil',
    },
    'Pacific/Galapagos': {
        id: 'Pacific/Galapagos',
        cityName: 'Galápagos Islands',
    },
    'Europe/Tallinn': {
        id: 'Europe/Tallinn',
        cityName: 'Tallinn',
    },
    'Africa/Cairo': {
        id: 'Africa/Cairo',
        cityName: 'Cairo',
    },
    'Africa/El_Aaiun': {
        id: 'Africa/El_Aaiun',
        cityName: 'El Aaiun',
    },
    'Africa/Asmara': {
        id: 'Africa/Asmara',
        cityName: 'Asmara',
    },
    'Africa/Ceuta': {
        id: 'Africa/Ceuta',
        cityName: 'Ceuta',
    },
    'Atlantic/Canary': {
        id: 'Atlantic/Canary',
        cityName: 'Canary Islands',
    },
    'Europe/Madrid': {
        id: 'Europe/Madrid',
        cityName: 'Madrid',
    },
    'Africa/Addis_Ababa': {
        id: 'Africa/Addis_Ababa',
        cityName: 'Addis Ababa',
    },
    'Europe/Helsinki': {
        id: 'Europe/Helsinki',
        cityName: 'Helsinki',
    },
    'Pacific/Fiji': {
        id: 'Pacific/Fiji',
        cityName: 'Suva',
    },
    'Atlantic/Stanley': {
        id: 'Atlantic/Stanley',
        cityName: 'Stanley',
    },
    'Pacific/Kosrae': {
        id: 'Pacific/Kosrae',
        cityName: 'Kosrae',
    },
    'Pacific/Ponape': {
        id: 'Pacific/Ponape',
        cityName: 'Pohnpei',
    },
    'Pacific/Truk': {
        id: 'Pacific/Truk',
        cityName: 'Truk',
    },
    'Atlantic/Faroe': {
        id: 'Atlantic/Faroe',
        cityName: 'Torshavn',
    },
    'Europe/Paris': {
        id: 'Europe/Paris',
        cityName: 'Paris',
    },
    'Africa/Libreville': {
        id: 'Africa/Libreville',
        cityName: 'Libreville',
    },
    'Europe/London': {
        id: 'Europe/London',
        cityName: 'London',
    },
    'America/Grenada': {
        id: 'America/Grenada',
        cityName: "St. George's",
    },
    'Asia/Tbilisi': {
        id: 'Asia/Tbilisi',
        cityName: 'Tibilisi',
    },
    'America/Cayenne': {
        id: 'America/Cayenne',
        cityName: 'Cayenne',
    },
    'Europe/Guernsey': {
        id: 'Europe/Guernsey',
        cityName: 'St.Peter Port',
    },
    'Africa/Accra': {
        id: 'Africa/Accra',
        cityName: 'Accra',
    },
    'Europe/Gibraltar': {
        id: 'Europe/Gibraltar',
        cityName: 'Gibraltar',
    },
    'America/Danmarkshavn': {
        id: 'America/Danmarkshavn',
        cityName: 'Danmarkshavn',
    },
    'America/Godthab': {
        id: 'America/Godthab',
        cityName: 'Godthab',
    },
    'America/Scoresbysund': {
        id: 'America/Scoresbysund',
        cityName: 'Scoresbysund',
    },
    'America/Thule': {
        id: 'America/Thule',
        cityName: 'Thule',
    },
    'Africa/Banjul': {
        id: 'Africa/Banjul',
        cityName: 'Banjul',
    },
    'Africa/Conakry': {
        id: 'Africa/Conakry',
        cityName: 'Conakry',
    },
    'America/Guadeloupe': {
        id: 'America/Guadeloupe',
        cityName: 'Basse-Terre',
    },
    'Africa/Malabo': {
        id: 'Africa/Malabo',
        cityName: 'Malabo',
    },
    'Europe/Athens': {
        id: 'Europe/Athens',
        cityName: 'Athens',
    },
    'Atlantic/South_Georgia': {
        id: 'Atlantic/South_Georgia',
        cityName: 'Grytviken',
    },
    'America/Guatemala': {
        id: 'America/Guatemala',
        cityName: 'Guatemala City',
    },
    'Pacific/Guam': {
        id: 'Pacific/Guam',
        cityName: 'Guam',
    },
    'Africa/Bissau': {
        id: 'Africa/Bissau',
        cityName: 'Bissau',
    },
    'America/Guyana': {
        id: 'America/Guyana',
        cityName: 'Georgetown',
    },
    'Asia/Hong_Kong': {
        id: 'Asia/Hong_Kong',
        cityName: 'Hong Kong',
    },
    'America/Tegucigalpa': {
        id: 'America/Tegucigalpa',
        cityName: 'Tegucigalpa',
    },
    'Europe/Zagreb': {
        id: 'Europe/Zagreb',
        cityName: 'Zagreb',
    },
    'America/Port-au-Prince': {
        id: 'America/Port-au-Prince',
        cityName: 'Port-au-Prince',
    },
    'Europe/Budapest': {
        id: 'Europe/Budapest',
        cityName: 'Budapest',
    },
    'Asia/Jakarta': {
        id: 'Asia/Jakarta',
        cityName: 'Jakarta',
    },
    'Asia/Jayapura': {
        id: 'Asia/Jayapura',
        cityName: 'Jayapura',
    },
    'Asia/Makassar': {
        id: 'Asia/Makassar',
        cityName: 'Makassar',
    },
    'Asia/Pontianak': {
        id: 'Asia/Pontianak',
        cityName: 'Pontianak',
    },
    'Europe/Dublin': {
        id: 'Europe/Dublin',
        cityName: 'Dublin',
    },
    'Asia/Jerusalem': {
        id: 'Asia/Jerusalem',
        cityName: 'Jerusalem',
    },
    'Europe/Isle_of_Man': {
        id: 'Europe/Isle_of_Man',
        cityName: 'Douglas',
    },
    'Asia/Kolkata': {
        id: 'Asia/Kolkata',
        cityName: 'Kolkata',
    },
    'Indian/Chagos': {
        id: 'Indian/Chagos',
        cityName: 'Chagos',
    },
    'Asia/Baghdad': {
        id: 'Asia/Baghdad',
        cityName: 'Baghdad',
    },
    'Asia/Tehran': {
        id: 'Asia/Tehran',
        cityName: 'Tehran',
    },
    'Atlantic/Reykjavik': {
        id: 'Atlantic/Reykjavik',
        cityName: 'Reykjavík',
    },
    'Europe/Rome': {
        id: 'Europe/Rome',
        cityName: 'Rome',
    },
    'Europe/Jersey': {
        id: 'Europe/Jersey',
        cityName: 'Saint Helier',
    },
    'America/Jamaica': {
        id: 'America/Jamaica',
        cityName: 'Kingston',
    },
    'Asia/Amman': {
        id: 'Asia/Amman',
        cityName: 'Amman',
    },
    'Asia/Tokyo': {
        id: 'Asia/Tokyo',
        cityName: 'Tokyo',
    },
    'Africa/Nairobi': {
        id: 'Africa/Nairobi',
        cityName: 'Nairobi',
    },
    'Asia/Bishkek': {
        id: 'Asia/Bishkek',
        cityName: 'Bishkek',
    },
    'Asia/Phnom_Penh': {
        id: 'Asia/Phnom_Penh',
        cityName: 'Phnom Penh',
    },
    'Pacific/Enderbury': {
        id: 'Pacific/Enderbury',
        cityName: 'Enderbury Island',
    },
    'Pacific/Kiritimati': {
        id: 'Pacific/Kiritimati',
        cityName: 'Kiritimati',
    },
    'Pacific/Tarawa': {
        id: 'Pacific/Tarawa',
        cityName: 'Tarawa',
    },
    'Indian/Comoro': {
        id: 'Indian/Comoro',
        cityName: 'Moroni',
    },
    'America/St_Kitts': {
        id: 'America/St_Kitts',
        cityName: 'Basseterre',
    },
    'Asia/Pyongyang': {
        id: 'Asia/Pyongyang',
        cityName: 'Pyongyang',
    },
    'Asia/Seoul': {
        id: 'Asia/Seoul',
        cityName: 'Seoul',
    },
    'Asia/Kuwait': {
        id: 'Asia/Kuwait',
        cityName: 'Kuwait',
    },
    'America/Cayman': {
        id: 'America/Cayman',
        cityName: 'Georgetown',
    },
    'Asia/Almaty': {
        id: 'Asia/Almaty',
        cityName: 'Almaty',
    },
    'Asia/Aqtau': {
        id: 'Asia/Aqtau',
        cityName: 'Aktobe',
    },
    'Asia/Aqtobe': {
        id: 'Asia/Aqtobe',
        cityName: 'Aktobe',
    },
    'Asia/Atyrau': {
        id: 'Asia/Atyrau',
        cityName: 'Atyrau',
    },
    'Asia/Oral': {
        id: 'Asia/Oral',
        cityName: 'Oral',
    },
    'Asia/Qyzylorda': {
        id: 'Asia/Qyzylorda',
        cityName: 'Kyzylorda',
    },
    'Asia/Vientiane': {
        id: 'Asia/Vientiane',
        cityName: 'Vientiane',
    },
    'Asia/Beirut': {
        id: 'Asia/Beirut',
        cityName: 'Beirut',
    },
    'America/St_Lucia': {
        id: 'America/St_Lucia',
        cityName: 'Castries',
    },
    'Europe/Vaduz': {
        id: 'Europe/Vaduz',
        cityName: 'Vaduz',
    },
    'Asia/Colombo': {
        id: 'Asia/Colombo',
        cityName: 'Colombo',
    },
    'Africa/Monrovia': {
        id: 'Africa/Monrovia',
        cityName: 'Monrovia',
    },
    'Africa/Maseru': {
        id: 'Africa/Maseru',
        cityName: 'Maseru',
    },
    'Europe/Vilnius': {
        id: 'Europe/Vilnius',
        cityName: 'Vilnius',
    },
    'Europe/Luxembourg': {
        id: 'Europe/Luxembourg',
        cityName: 'Luxembourg',
    },
    'Europe/Riga': {
        id: 'Europe/Riga',
        cityName: 'Riga',
    },
    'Africa/Tripoli': {
        id: 'Africa/Tripoli',
        cityName: 'Tripoli',
    },
    'Africa/Casablanca': {
        id: 'Africa/Casablanca',
        cityName: 'Rabat',
    },
    'Europe/Monaco': {
        id: 'Europe/Monaco',
        cityName: 'Monaco',
    },
    'Europe/Chisinau': {
        id: 'Europe/Chisinau',
        cityName: 'Chisinau',
    },
    'Europe/Podgorica': {
        id: 'Europe/Podgorica',
        cityName: 'Podgorica',
    },
    'America/Marigot': {
        id: 'America/Marigot',
        cityName: 'Marigot',
    },
    'Indian/Antananarivo': {
        id: 'Indian/Antananarivo',
        cityName: 'Antananarivo',
    },
    'Pacific/Kwajalein': {
        id: 'Pacific/Kwajalein',
        cityName: 'Kwajalein Atoll',
    },
    'Pacific/Majuro': {
        id: 'Pacific/Majuro',
        cityName: 'Majuro',
    },
    'Europe/Skopje': {
        id: 'Europe/Skopje',
        cityName: 'Skopje',
    },
    'Africa/Bamako': {
        id: 'Africa/Bamako',
        cityName: 'Bamako',
    },
    'Asia/Rangoon': {
        id: 'Asia/Rangoon',
        cityName: 'Rangoon',
    },
    'Asia/Choibalsan': {
        id: 'Asia/Choibalsan',
        cityName: 'Choibalsan',
    },
    'Asia/Hovd': {
        id: 'Asia/Hovd',
        cityName: 'Khovd',
    },
    'Asia/Ulaanbaatar': {
        id: 'Asia/Ulaanbaatar',
        cityName: 'Ulaanbaatar',
    },
    'Asia/Macau': {
        id: 'Asia/Macau',
        cityName: 'Macau',
    },
    'Pacific/Saipan': {
        id: 'Pacific/Saipan',
        cityName: 'Saipan',
    },
    'America/Martinique': {
        id: 'America/Martinique',
        cityName: 'Fort-de-France',
    },
    'Africa/Nouakchott': {
        id: 'Africa/Nouakchott',
        cityName: 'Nouakchott',
    },
    'America/Montserrat': {
        id: 'America/Montserrat',
        cityName: 'Plymouth',
    },
    'Europe/Malta': {
        id: 'Europe/Malta',
        cityName: 'Valletta',
    },
    'Indian/Mauritius': {
        id: 'Indian/Mauritius',
        cityName: 'Port Louis',
    },
    'Indian/Maldives': {
        id: 'Indian/Maldives',
        cityName: 'Male',
    },
    'Africa/Blantyre': {
        id: 'Africa/Blantyre',
        cityName: 'Blantyre',
    },
    'America/Bahia_Banderas': {
        id: 'America/Bahia_Banderas',
        cityName: 'Bahía de Banderas',
    },
    'America/Cancun': {
        id: 'America/Cancun',
        cityName: 'Cancun',
    },
    'America/Chihuahua': {
        id: 'America/Chihuahua',
        cityName: 'Chihuahua',
    },
    'America/Hermosillo': {
        id: 'America/Hermosillo',
        cityName: 'Hermosillo',
    },
    'America/Matamoros': {
        id: 'America/Matamoros',
        cityName: 'Matamoros',
    },
    'America/Mazatlan': {
        id: 'America/Mazatlan',
        cityName: 'Mazatlan',
    },
    'America/Merida': {
        id: 'America/Merida',
        cityName: 'Merida',
    },
    'America/Mexico_City': {
        id: 'America/Mexico_City',
        cityName: 'Mexico City',
    },
    'America/Monterrey': {
        id: 'America/Monterrey',
        cityName: 'Monterrey',
    },
    'America/Ojinaga': {
        id: 'America/Ojinaga',
        cityName: 'Ojinaga',
    },
    'America/Tijuana': {
        id: 'America/Tijuana',
        cityName: 'Tijuana',
    },
    'Asia/Kuala_Lumpur': {
        id: 'Asia/Kuala_Lumpur',
        cityName: 'Kuala Lumpur',
    },
    'Asia/Kuching': {
        id: 'Asia/Kuching',
        cityName: 'Kuching',
    },
    'Africa/Maputo': {
        id: 'Africa/Maputo',
        cityName: 'Maputo',
    },
    'Africa/Windhoek': {
        id: 'Africa/Windhoek',
        cityName: 'Windhoek',
    },
    'Pacific/Noumea': {
        id: 'Pacific/Noumea',
        cityName: 'Noumea',
    },
    'Africa/Niamey': {
        id: 'Africa/Niamey',
        cityName: 'Niamey',
    },
    'Pacific/Norfolk': {
        id: 'Pacific/Norfolk',
        cityName: 'Kingston',
    },
    'Africa/Lagos': {
        id: 'Africa/Lagos',
        cityName: 'Lagos',
    },
    'America/Managua': {
        id: 'America/Managua',
        cityName: 'Managua',
    },
    'Europe/Amsterdam': {
        id: 'Europe/Amsterdam',
        cityName: 'Amsterdam',
    },
    'Arctic/Longyearbyen': {
        id: 'Arctic/Longyearbyen',
        cityName: 'Longyearbyen',
    },
    'Europe/Oslo': {
        id: 'Europe/Oslo',
        cityName: 'Oslo',
    },
    'Asia/Katmandu': {
        id: 'Asia/Katmandu',
        cityName: 'Katmandu',
    },
    'Pacific/Nauru': {
        id: 'Pacific/Nauru',
        cityName: 'Nauru',
    },
    'Pacific/Niue': {
        id: 'Pacific/Niue',
        cityName: 'Alofi Island',
    },
    'Pacific/Auckland': {
        id: 'Pacific/Auckland',
        cityName: 'Auckland',
    },
    'Pacific/Chatham': {
        id: 'Pacific/Chatham',
        cityName: 'Chatham Islands',
    },
    'Asia/Muscat': {
        id: 'Asia/Muscat',
        cityName: 'Muscat',
    },
    'America/Panama': {
        id: 'America/Panama',
        cityName: 'Panama City',
    },
    'America/Lima': {
        id: 'America/Lima',
        cityName: 'Lima',
    },
    'Pacific/Gambier': {
        id: 'Pacific/Gambier',
        cityName: 'Gambier',
    },
    'Pacific/Marquesas': {
        id: 'Pacific/Marquesas',
        cityName: 'Marquesas',
    },
    'Pacific/Tahiti': {
        id: 'Pacific/Tahiti',
        cityName: 'Tahiti',
    },
    'Pacific/Bougainville': {
        id: 'Pacific/Bougainville',
        cityName: 'Bougainville Island',
    },
    'Pacific/Port_Moresby': {
        id: 'Pacific/Port_Moresby',
        cityName: 'Port Moresby',
    },
    'Asia/Manila': {
        id: 'Asia/Manila',
        cityName: 'Manila',
    },
    'Asia/Karachi': {
        id: 'Asia/Karachi',
        cityName: 'Karachi',
    },
    'Europe/Warsaw': {
        id: 'Europe/Warsaw',
        cityName: 'Warsaw',
    },
    'America/Miquelon': {
        id: 'America/Miquelon',
        cityName: 'Saint-Pierre',
    },
    'Pacific/Pitcairn': {
        id: 'Pacific/Pitcairn',
        cityName: 'Adamstown',
    },
    'America/Puerto_Rico': {
        id: 'America/Puerto_Rico',
        cityName: 'San Juan',
    },
    'Asia/Gaza': {
        id: 'Asia/Gaza',
        cityName: 'Gaza',
    },
    'Asia/Hebron': {
        id: 'Asia/Hebron',
        cityName: 'Hebron',
    },
    'Atlantic/Azores': {
        id: 'Atlantic/Azores',
        cityName: 'Azores',
    },
    'Atlantic/Madeira': {
        id: 'Atlantic/Madeira',
        cityName: 'Madeira',
    },
    'Europe/Lisbon': {
        id: 'Europe/Lisbon',
        cityName: 'Lisbon',
    },
    'Pacific/Palau': {
        id: 'Pacific/Palau',
        cityName: 'Koror',
    },
    'America/Asuncion': {
        id: 'America/Asuncion',
        cityName: 'Asuncion',
    },
    'Asia/Qatar': {
        id: 'Asia/Qatar',
        cityName: 'Doha',
    },
    'Indian/Reunion': {
        id: 'Indian/Reunion',
        cityName: 'St. Denis',
    },
    'Europe/Bucharest': {
        id: 'Europe/Bucharest',
        cityName: 'Bucharest',
    },
    'Europe/Belgrade': {
        id: 'Europe/Belgrade',
        cityName: 'Belgrade',
    },
    'Asia/Anadyr': {
        id: 'Asia/Anadyr',
        cityName: 'Anadyr',
    },
    'Asia/Barnaul': {
        id: 'Asia/Barnaul',
        cityName: 'Barnaul',
    },
    'Asia/Chita': {
        id: 'Asia/Chita',
        cityName: 'Chita',
    },
    'Asia/Irkutsk': {
        id: 'Asia/Irkutsk',
        cityName: 'Irkutsk',
    },
    'Asia/Kamchatka': {
        id: 'Asia/Kamchatka',
        cityName: 'Petropavlovsk-Kamchatsky',
    },
    'Asia/Khandyga': {
        id: 'Asia/Khandyga',
        cityName: 'Khandyga',
    },
    'Asia/Krasnoyarsk': {
        id: 'Asia/Krasnoyarsk',
        cityName: 'Krasnoyarsk',
    },
    'Asia/Magadan': {
        id: 'Asia/Magadan',
        cityName: 'Magadan',
    },
    'Asia/Novokuznetsk': {
        id: 'Asia/Novokuznetsk',
        cityName: 'Novokuznetsk',
    },
    'Asia/Novosibirsk': {
        id: 'Asia/Novosibirsk',
        cityName: 'Novosibirsk',
    },
    'Asia/Omsk': {
        id: 'Asia/Omsk',
        cityName: 'Omsk',
    },
    'Asia/Sakhalin': {
        id: 'Asia/Sakhalin',
        cityName: 'Yuzhno-Sakhalinsk',
    },
    'Asia/Srednekolymsk': {
        id: 'Asia/Srednekolymsk',
        cityName: 'Srednekolymsk',
    },
    'Asia/Tomsk': {
        id: 'Asia/Tomsk',
        cityName: 'Tomsk',
    },
    'Asia/Ust-Nera': {
        id: 'Asia/Ust-Nera',
        cityName: 'Ust-Nera',
    },
    'Asia/Vladivostok': {
        id: 'Asia/Vladivostok',
        cityName: 'Vladivostok',
    },
    'Asia/Yakutsk': {
        id: 'Asia/Yakutsk',
        cityName: 'Yakutsk',
    },
    'Asia/Yekaterinburg': {
        id: 'Asia/Yekaterinburg',
        cityName: 'Yekaterinburg ',
    },
    'Europe/Astrakhan': {
        id: 'Europe/Astrakhan',
        cityName: 'Astrakhan',
    },
    'Europe/Kaliningrad': {
        id: 'Europe/Kaliningrad',
        cityName: 'Kaliningrad',
    },
    'Europe/Kirov': {
        id: 'Europe/Kirov',
        cityName: 'Kirov',
    },
    'Europe/Moscow': {
        id: 'Europe/Moscow',
        cityName: 'Moscow',
    },
    'Europe/Samara': {
        id: 'Europe/Samara',
        cityName: 'Samara',
    },
    'Europe/Saratov': {
        id: 'Europe/Saratov',
        cityName: 'Saratov',
    },
    'Europe/Simferopol': {
        id: 'Europe/Simferopol',
        cityName: 'Simferopol',
    },
    'Europe/Ulyanovsk': {
        id: 'Europe/Ulyanovsk',
        cityName: 'Ulyanovsk',
    },
    'Europe/Volgograd': {
        id: 'Europe/Volgograd',
        cityName: 'Volgograd',
    },
    'Africa/Kigali': {
        id: 'Africa/Kigali',
        cityName: 'Kigali',
    },
    'Asia/Riyadh': {
        id: 'Asia/Riyadh',
        cityName: 'Riyadh',
    },
    'Pacific/Guadalcanal': {
        id: 'Pacific/Guadalcanal',
        cityName: 'Guadalcanal',
    },
    'Indian/Mahe': {
        id: 'Indian/Mahe',
        cityName: 'Mahe',
    },
    'Africa/Khartoum': {
        id: 'Africa/Khartoum',
        cityName: 'Khartoum',
    },
    'Europe/Stockholm': {
        id: 'Europe/Stockholm',
        cityName: 'Stockholm',
    },
    'Asia/Singapore': {
        id: 'Asia/Singapore',
        cityName: 'Singapore',
    },
    'Atlantic/St_Helena': {
        id: 'Atlantic/St_Helena',
        cityName: 'James Town',
    },
    'Europe/Ljubljana': {
        id: 'Europe/Ljubljana',
        cityName: 'Ljubljana',
    },
    'Europe/Bratislava': {
        id: 'Europe/Bratislava',
        cityName: 'Bratislava',
    },
    'Africa/Freetown': {
        id: 'Africa/Freetown',
        cityName: 'Freetown',
    },
    'Europe/San_Marino': {
        id: 'Europe/San_Marino',
        cityName: 'San Marino',
    },
    'Africa/Dakar': {
        id: 'Africa/Dakar',
        cityName: 'Dakar',
    },
    'Africa/Mogadishu': {
        id: 'Africa/Mogadishu',
        cityName: 'Mogadishu',
    },
    'America/Paramaribo': {
        id: 'America/Paramaribo',
        cityName: 'Paramaribo',
    },
    'Africa/Sao_Tome': {
        id: 'Africa/Sao_Tome',
        cityName: 'Sao Tome',
    },
    'America/El_Salvador': {
        id: 'America/El_Salvador',
        cityName: 'San Salvador',
    },
    'America/Lower_Princes': {
        id: 'America/Lower_Princes',
        cityName: "Lower Prince's Quarter",
    },
    'Asia/Damascus': {
        id: 'Asia/Damascus',
        cityName: 'Damascus',
    },
    'Africa/Mbabane': {
        id: 'Africa/Mbabane',
        cityName: 'Mbabane',
    },
    'America/Grand_Turk': {
        id: 'America/Grand_Turk',
        cityName: 'Grand Turk',
    },
    'Africa/Ndjamena': {
        id: 'Africa/Ndjamena',
        cityName: "N'Djamena",
    },
    'Indian/Kerguelen': {
        id: 'Indian/Kerguelen',
        cityName: 'Kerguelen',
    },
    'Africa/Lome': {
        id: 'Africa/Lome',
        cityName: 'Lome',
    },
    'Asia/Bangkok': {
        id: 'Asia/Bangkok',
        cityName: 'Bangkok',
    },
    'Asia/Dushanbe': {
        id: 'Asia/Dushanbe',
        cityName: 'Dushanbe',
    },
    'Pacific/Fakaofo': {
        id: 'Pacific/Fakaofo',
        cityName: 'Fakaofo',
    },
    'Asia/Dili': {
        id: 'Asia/Dili',
        cityName: 'Dilli',
    },
    'Asia/Ashgabat': {
        id: 'Asia/Ashgabat',
        cityName: 'Ashgabat',
    },
    'Africa/Tunis': {
        id: 'Africa/Tunis',
        cityName: 'Tunis',
    },
    'Pacific/Tongatapu': {
        id: 'Pacific/Tongatapu',
        cityName: "Nuku'alofa",
    },
    'Europe/Istanbul': {
        id: 'Europe/Istanbul',
        cityName: 'Istanbul',
    },
    'America/Port_of_Spain': {
        id: 'America/Port_of_Spain',
        cityName: 'Port of Spain',
    },
    'Pacific/Funafuti': {
        id: 'Pacific/Funafuti',
        cityName: 'Funafuti',
    },
    'Asia/Taipei': {
        id: 'Asia/Taipei',
        cityName: 'Taipei',
    },
    'Africa/Dar_es_Salaam': {
        id: 'Africa/Dar_es_Salaam',
        cityName: 'Dar es Salaam',
    },
    'Europe/Kiev': {
        id: 'Europe/Kiev',
        cityName: 'Kiev',
    },
    'Europe/Uzhgorod': {
        id: 'Europe/Uzhgorod',
        cityName: 'Uzhgorod',
    },
    'Europe/Zaporozhye': {
        id: 'Europe/Zaporozhye',
        cityName: 'Zaporozhye',
    },
    'Africa/Kampala': {
        id: 'Africa/Kampala',
        cityName: 'Kampala',
    },
    'Pacific/Johnston': {
        id: 'Pacific/Johnston',
        cityName: 'Johnston',
    },
    'Pacific/Midway': {
        id: 'Pacific/Midway',
        cityName: 'Midway',
    },
    'Pacific/Wake': {
        id: 'Pacific/Wake',
        cityName: 'Wake Island',
    },
    'America/Adak': {
        id: 'America/Adak',
        cityName: 'Adak',
    },
    'America/Anchorage': {
        id: 'America/Anchorage',
        cityName: 'Anchorage',
    },
    'America/Boise': {
        id: 'America/Boise',
        cityName: 'Boise',
    },
    'America/Chicago': {
        id: 'America/Chicago',
        cityName: 'Chicago',
    },
    'America/Denver': {
        id: 'America/Denver',
        cityName: 'Denver',
    },
    'America/Detroit': {
        id: 'America/Detroit',
        cityName: 'Detroit',
    },
    'America/Indiana/Indianapolis': {
        id: 'America/Indiana/Indianapolis',
        cityName: 'Indianapolis',
    },
    'America/Indiana/Knox': {
        id: 'America/Indiana/Knox',
        cityName: 'Knox',
    },
    'America/Indiana/Marengo': {
        id: 'America/Indiana/Marengo',
        cityName: 'Marengo',
    },
    'America/Indiana/Petersburg': {
        id: 'America/Indiana/Petersburg',
        cityName: 'Petersburg',
    },
    'America/Indiana/Tell_City': {
        id: 'America/Indiana/Tell_City',
        cityName: 'Tell City',
    },
    'America/Indiana/Vevay': {
        id: 'America/Indiana/Vevay',
        cityName: 'Vevay',
    },
    'America/Indiana/Vincennes': {
        id: 'America/Indiana/Vincennes',
        cityName: 'Vincennes',
    },
    'America/Indiana/Winamac': {
        id: 'America/Indiana/Winamac',
        cityName: 'Winamac',
    },
    'America/Juneau': {
        id: 'America/Juneau',
        cityName: 'Juneau',
    },
    'America/Kentucky/Louisville': {
        id: 'America/Kentucky/Louisville',
        cityName: 'Louisville',
    },
    'America/Kentucky/Monticello': {
        id: 'America/Kentucky/Monticello',
        cityName: 'Monticello',
    },
    'America/Los_Angeles': {
        id: 'America/Los_Angeles',
        cityName: 'Los Angeles',
    },
    'America/Menominee': {
        id: 'America/Menominee',
        cityName: 'Menominee',
    },
    'America/Metlakatla': {
        id: 'America/Metlakatla',
        cityName: 'Metlakatla',
    },
    'America/New_York': {
        id: 'America/New_York',
        cityName: 'New York',
    },
    'America/Nome': {
        id: 'America/Nome',
        cityName: 'Nome',
    },
    'America/North_Dakota/Beulah': {
        id: 'America/North_Dakota/Beulah',
        cityName: 'Beulah',
    },
    'America/North_Dakota/Center': {
        id: 'America/North_Dakota/Center',
        cityName: 'Center',
    },
    'America/North_Dakota/New_Salem': {
        id: 'America/North_Dakota/New_Salem',
        cityName: 'New Salem',
    },
    'America/Phoenix': {
        id: 'America/Phoenix',
        cityName: 'Phoenix',
    },
    'America/Shiprock': {
        id: 'America/Shiprock',
        cityName: 'Shiprock',
    },
    'America/Sitka': {
        id: 'America/Sitka',
        cityName: 'Sitka',
    },
    'America/Yakutat': {
        id: 'America/Yakutat',
        cityName: 'Yakutat',
    },
    'Pacific/Honolulu': {
        id: 'Pacific/Honolulu',
        cityName: 'Honolulu',
    },
    'America/Montevideo': {
        id: 'America/Montevideo',
        cityName: 'Montevideo',
    },
    'Asia/Samarkand': {
        id: 'Asia/Samarkand',
        cityName: 'Samarkand',
    },
    'Asia/Tashkent': {
        id: 'Asia/Tashkent',
        cityName: 'Tashkent',
    },
    'Europe/Vatican': {
        id: 'Europe/Vatican',
        cityName: 'Vatican City',
    },
    'America/St_Vincent': {
        id: 'America/St_Vincent',
        cityName: 'Kingstown',
    },
    'America/Caracas': {
        id: 'America/Caracas',
        cityName: 'Caracas',
    },
    'America/Tortola': {
        id: 'America/Tortola',
        cityName: 'Vancouver',
    },
    'America/St_Thomas': {
        id: 'America/St_Thomas',
        cityName: 'Swift Current',
    },
    'Asia/Ho_Chi_Minh': {
        id: 'Asia/Ho_Chi_Minh',
        cityName: 'Ho Chi Minh City',
    },
    'Pacific/Efate': {
        id: 'Pacific/Efate',
        cityName: 'Efate',
    },
    'Pacific/Wallis': {
        id: 'Pacific/Wallis',
        cityName: 'Wallis',
    },
    'Pacific/Apia': {
        id: 'Pacific/Apia',
        cityName: 'Apia',
    },
    'Asia/Aden': {
        id: 'Asia/Aden',
        cityName: 'Aden',
    },
    'Indian/Mayotte': {
        id: 'Indian/Mayotte',
        cityName: 'Mamoudzou',
    },
    'Africa/Johannesburg': {
        id: 'Africa/Johannesburg',
        cityName: 'Johannesburg',
    },
    'Africa/Lusaka': {
        id: 'Africa/Lusaka',
        cityName: 'Lusaka',
    },
    'Africa/Harare': {
        id: 'Africa/Harare',
        cityName: 'Harare',
    },
};

export function initTimezones() {
    _.each(timezones, function (e) {
        let n = moment.tz(e.id);
        e.utcOffset = n.utcOffset();
    });

    return timezones;
}
