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

export const getCommentsByArticleId = (id) => {
	return BaseUrl.get(`/api/articles/${id}/comments`).then((res) => {
		return res.data;
	});
};

export const updateVotesByArticleId = (id) => {
	const body = {
		"inc_votes": 1
	}
	return BaseUrl.patch(`/api/articles/${id}/`, body).then((res) => {
		return res.data
	})
}