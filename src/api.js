import axios from "axios";

const baseUrl = axios.create({
  baseURL: "https://newsbe.onrender.com",
});

export const getArticles = (topics, sort, order, limit, p) => {
  const params = {
    topic: topics || undefined,
    sort_by: sort || undefined,
    order: order || undefined,
    limit: limit || "",
    p: p || 1
  };

  if(!topics) params.limit = 6

  return baseUrl.get("/api/articles", { params }).then((res) => {
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

export const getTopics = () => {
  return baseUrl.get("/api/topics").then((res) => {
    return res.data;
  });
};

export const getUserByUsername = (username) => {
  return baseUrl.get(`/api/users/${username}`).then((res) => {
    return res.data.user;
  });
};

export const deleteComment = (id) => {
  return baseUrl.delete(`/api/comments/${id}`).then((res) => {
    return;
  });
};

export const postUser = (user) => {
  const body = {
    username: user.username,
    name: user.name,
    avatar_url: user.avatar_url,
  };

  return baseUrl.post("/api/users", body).then((res) => {
    return res.data;
  });
};

export const getUsers = () => {
  return baseUrl.get("/api/users").then((res) => {
    return res.data;
  });
};

export const postArticle = (newArticle) => {
  const body = {
    title: newArticle.title,
    topic: newArticle.topic,
    body: newArticle.body,
    article_img_url: newArticle.article_img_url,
    author: newArticle.author,
  };

  return baseUrl.post("/api/articles", body).then((res) => {
    return res.data;
  });
};

export const postTopic = (newTopic) => {
  const body = {
    slug: newTopic,
    description: newTopic,
  };

  return baseUrl.post("/api/topics", body).then((res) => {
    return res.data.article_posted;
  });
};

export const deleteArticleById = (id) => {
  return baseUrl.delete(`/api/articles/${id}`).then((res) => {
    return;
  });
};

export const updateCommentVotesById = (comments_id, vote) => {
  const body = {
    inc_votes: vote,
  };

  return baseUrl.patch(`/api/comments/${comments_id}`, body);
};
