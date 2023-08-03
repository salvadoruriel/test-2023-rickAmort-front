/**@returns the last number from a string, like the id's on the api URLS */
export default function getLastNumber(input: string) {
	const match = input.match(/\d+$/);
	return match ? parseInt(match[0]) : 0;
}
