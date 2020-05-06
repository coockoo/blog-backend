const { GraphQLNonNull, GraphQLInt, GraphQLBoolean } = require('graphql');
const _ = require('lodash');

const knex = require('../../../services/knex');

const ArticlesListType = require('../types/ArticlesList');

const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 1000;

const articlesArgs = {
  limit: { type: GraphQLInt },
  isPublished: { type: GraphQLBoolean },
};

module.exports = {
  name: 'Articles',

  args: articlesArgs,

  type: new GraphQLNonNull(ArticlesListType),

  resolve: async (root, args, ctx) => {
    const limit = Math.min(MAX_LIMIT, Math.max(+args.limit || DEFAULT_LIMIT, 0));

    const builder = knex('articles');

    if (!ctx.user) {
      builder.where({ isPublished: true });
    }

    if (_.isBoolean(args.isPublished)) {
      builder.where({ isPublished: args.isPublished });
    }

    const { count } = await builder.clone().count().first();
    const rows = await builder.select().limit(limit).orderBy('createdAt', 'desc');

    return { count, rows };
  },
};
