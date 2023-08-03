import axios from 'axios';

const rickAPI = axios.create({
	baseURL: 'https://rickandmortyapi.com/api/',
});

rickAPI.interceptors.response.use(
	function (res) {
		return res.data;
	},
	function (error) {
		return Promise.reject(error);
	}
);

export default rickAPI;
