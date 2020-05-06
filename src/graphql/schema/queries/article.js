const { GraphQLNonNull, GraphQLID } = require('graphql');

const { NotFoundError } = require('../../../errors');
const knex = require('../../../services/knex');

const ArticleType = require('../types/Article');

const articleArgs = {
  id: { type: new GraphQLNonNull(GraphQLID) },
};

module.exports = {
  name: 'Article',

  args: articleArgs,

  type: new GraphQLNonNull(ArticleType),

  resolve: async (root, args, ctx) => {
    const builder = knex('articles').first().where({ id: args.id });
    if (!ctx.user) {
      builder.where({ isPublished: true });
    }
    const article = await builder;
    if (!article) {
      throw new NotFoundError('Cannot find article by given id');
    }
    return article;
  },
};
