const { GraphQLNonNull } = require('graphql');

const knex = require('../../../services/knex');

const ArticlesListType = require('../types/ArticlesList');

module.exports = {
  name: 'Articles',

  type: new GraphQLNonNull(ArticlesListType),

  resolve: async () => {
    const builder = knex('articles');

    const count = await builder.count();
    const rows = await builder.select();

    return { count, rows };
  },
};
