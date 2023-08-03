//this file contains all types related to the api

export type t_Character = {
	id: number | string;
	name: string;
	status: 'Alive' | 'Dead' | 'unknown';
	species: string;
	/** The type or subspecies of the character */
	type: string;
	gender: 'Female' | 'Male' | 'Genderless' | 'unknown';
	/** Character's origin location */
	origin: {
		name: string;
		url: string;
	};
	/** Last known location */
	location: {
		name: string;
		url: string;
	};
	/**url to the image */
	image: string;
	/** List of episodes in which this character appeared */
	episode: string[];
	/** Character's own URL endpoint */
	url: string;
	/** Created in the database,e.g.: 2017-11-04T18:50:21.651Z */
	created: string;
};

export type t_Location = {
	id: number | string;
	name: string;
	type: string;
	dimension: string;
	/** List of characters who have been last seen in the location (URLs) */
	residents: string[];
	/** Link to the location's own endpoint */
	url: string;
	/** Time at which the location was created in the database */
	created: string;
};

export type t_Episode = {
	id: number | string;
	name: string;
	air_date: string;
	/** e.g.: S01E01 */
	episode: string;
	/** List of characters who have been seen in the episode (URLs) */
	characters: string[];
	/** Link to the episode's own endpoint */
	url: string;
	/** Time at which the episode was created in the database */
	created: string;
};

/**pagination info */
export type t_info = {
	count: number | string;
	pages: number | string;
	next: string;
	prev: null | string;
};

export type t_response = {
	info: t_info;
	results: t_Episode[] | t_Character[] | t_Location[];
};
