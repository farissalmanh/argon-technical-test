import axios from 'axios';

export default axios.create({
	withCredentials: true,
	// baseURL: `${process.env.API_LOGIN_URL}/api/`,
	baseURL: `http://localhost:8080/api`,
	headers: {
		'Content-type': 'application/json'
	}
});