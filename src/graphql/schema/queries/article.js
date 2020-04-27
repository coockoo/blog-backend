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

  resolve: async (root, args) => {
    const article = await knex('articles').first().where({ id: args.id });
    if (!article) {
      throw new NotFoundError('Cannot find article by given id');
    }
    return article;
  },
};
