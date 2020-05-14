const { GraphQLNonNull, GraphQLID } = require('graphql');

const { NotFoundError } = require('../../../errors');
const knex = require('../../../services/knex');

const ArticleType = require('../types/Article');

const articleArgs = {
  id: { type: GraphQLID },
  slug: { type: GraphQLID },
};

module.exports = {
  name: 'Article',

  args: articleArgs,

  type: new GraphQLNonNull(ArticleType),

  resolve: async (root, args, ctx) => {
    const builder = knex('articles').first();

    if (!args.id && !args.slug) {
      throw new NotFoundError('Cannot find article');
    }
    if (args.id) {
      builder.where({ id: args.id });
    } else {
      builder.where({ slug: args.slug });
    }

    if (!ctx.user) {
      builder.where({ isPublished: true });
    }
    const article = await builder;
    if (!article) {
      throw new NotFoundError('Cannot find article');
    }
    return article;
  },
};
