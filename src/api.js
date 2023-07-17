import axios from 'axios';

const BaseUrl = axios.create({
	baseURL: 'https://newsbe.onrender.com',
});

export const getArticles = () => {
	return BaseUrl.get('/api/articles').then((res) => {
		return res.data;
	});
};


export const getArticlesById = (id) => {
	return BaseUrl.get(`/api/articles/${id}`).then((res) => {
		return res.data;
	});
};