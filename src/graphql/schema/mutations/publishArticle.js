const { GraphQLNonNull, GraphQLID, GraphQLString } = require('graphql');
const _ = require('lodash');

const { ForbiddenError, NotFoundError } = require('../../../errors');

const knex = require('../../../services/knex');
const { isAuthorized } = require('../../../policies');

const ArticleType = require('../types/Article');

const publishArticleArgs = {
  id: { type: new GraphQLNonNull(GraphQLID) },
  // TODO:
};

module.exports = {
  name: 'PublishArticle',

  args: publishArticleArgs,

  type: new GraphQLNonNull(ArticleType),

  resolve: async (root, args, ctx) => {
    await isAuthorized(ctx);

    const article = await knex('articles').where({ id: args.id }).first();
    if (!article) {
      throw new NotFoundError('Cannot find article by given id');
    }

    if (article.authorUserId !== ctx.user.id) {
      throw new ForbiddenError('User is not allowed to publish this article');
    }

    if (article.isPublished) {
      return article;
    }

    const updateData = {
      isPublished: true,
      lastPublishedAt: new Date(),
    };

    const [updatedArticle] = await knex('articles')
      .update(updateData)
      .where({ id: args.id })
      .returning('*');

    return updatedArticle;
  },
};
