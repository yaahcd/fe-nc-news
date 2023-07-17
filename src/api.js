import axios from 'axios';

const BaseUrl = axios.create({
	baseURL: 'https://newsbe.onrender.com',
});

export const getArticles = () => {
	return BaseUrl.get('/api/articles').then((res) => {
		return res.data;
	});
};
