import axios from 'axios';

const baseUrl = axios.create({
	baseURL: 'https://newsbe.onrender.com',
});

export const getArticles = () => {
	return baseUrl.get('/api/articles').then((res) => {
		return res.data;
	});
};

export const getArticlesById = (id) => {
	return baseUrl.get(`/api/articles/${id}`).then((res) => {
		return res.data;
	});
};

export const getCommentsByArticleId = (id) => {
	return baseUrl.get(`/api/articles/${id}/comments`).then((res) => {
		return res.data;
	});
};

export const updateVotesByArticleId = (id) => {
	const body = {
		inc_votes: 1,
	};
	return baseUrl.patch(`/api/articles/${id}/`, body).then((res) => {
		return res.data;
	});
};

export const postCommentsByArticleId = (id, newComment) => {
	const body = {
		username: newComment.username,
		body: newComment.body,
	};

	return baseUrl.post(`/api/articles/${id}/comments`, body).then((res) => {
		return res.data;
	});
};
