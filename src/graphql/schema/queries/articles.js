const { GraphQLNonNull } = require('graphql');

const knex = require('../../../services/knex');

const ArticlesListType = require('../types/ArticlesList');

const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 1000;

module.exports = {
  name: 'Articles',

  type: new GraphQLNonNull(ArticlesListType),

  resolve: async (root, args) => {
    const limit = Math.min(MAX_LIMIT, Math.max(+args.limit || DEFAULT_LIMIT, 0));

    const builder = knex('articles');

    const { count } = await builder.clone().count().first();
    const rows = await builder.select().limit(limit);

    return { count, rows };
  },
};
