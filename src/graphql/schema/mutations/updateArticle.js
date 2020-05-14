const { GraphQLNonNull, GraphQLID, GraphQLString } = require('graphql');
const _ = require('lodash');

const { ForbiddenError, NotFoundError } = require('../../../errors');

const knex = require('../../../services/knex');
const { isAuthorized } = require('../../../policies');

const ArticleType = require('../types/Article');

const updateArticleArgs = {
  id: { type: new GraphQLNonNull(GraphQLID) },
  title: { type: GraphQLString },
  outline: { type: GraphQLString },
  slug: { type: GraphQLString },
  body: { type: GraphQLString },
};

const UPDATE_FIELDS = ['title', 'outline', 'body', 'slug'];

module.exports = {
  name: 'UpdateArticle',

  args: updateArticleArgs,

  type: new GraphQLNonNull(ArticleType),

  resolve: async (root, args, ctx) => {
    await isAuthorized(ctx);

    const article = await knex('articles').where({ id: args.id }).first();
    if (!article) {
      throw new NotFoundError('Cannot find article by given id');
    }

    if (article.authorUserId !== ctx.user.id) {
      throw new ForbiddenError('User is not allowed to update this article');
    }

    const updateData = _.pick(args, UPDATE_FIELDS);

    const [updatedArticle] = await knex('articles')
      .update(updateData)
      .where({ id: args.id })
      .returning('*');

    return updatedArticle;
  },
};
