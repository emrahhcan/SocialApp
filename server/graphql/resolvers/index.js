const postResolvers = require('./posts');
const userResolvers = require('./users');
const commentsResolver = require('./comments');

module.exports = {
    Post: {
        likeCount: (parent) => parent.likes.length,
        commentCount: (parent) => parent.comments.length
    },
    Query: {
        ...postResolvers.Query
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...postResolvers.Mutation,
        ...commentsResolver.Mutation
    },
    Subscription: {
        ...postResolvers.Subscription
    }
};