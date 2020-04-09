const { GraphQLNonNull, GraphQLString } = require('graphql');

const knex = require('../../../services/knex');
const { isAuthorized } = require('../../../policies');

const ArticleType = require('../types/Article');

const createArticleArgs = {
  title: { type: new GraphQLNonNull(GraphQLString) },
  body: { type: new GraphQLNonNull(GraphQLString) },
};

module.exports = {
  name: 'CreateArticle',

  args: createArticleArgs,

  type: new GraphQLNonNull(ArticleType),

  resolve: async (root, args, ctx) => {
    await isAuthorized(ctx);

    const [article] = await knex('articles')
      .insert({
        authorUserId: ctx.user.id,
        title: args.title,
        body: args.body,
      })
      .returning('*');

    return article;
  },
};
