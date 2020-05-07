const { GraphQLNonNull, GraphQLID } = require('graphql');

const { ForbiddenError, NotFoundError } = require('../../../errors');

const knex = require('../../../services/knex');
const { isAuthorized } = require('../../../policies');

const ArticleType = require('../types/Article');

const unpublishArticleArgs = {
  id: { type: new GraphQLNonNull(GraphQLID) },
};

module.exports = {
  name: 'PublishArticle',

  args: unpublishArticleArgs,

  type: new GraphQLNonNull(ArticleType),

  resolve: async (root, args, ctx) => {
    await isAuthorized(ctx);

    const article = await knex('articles').where({ id: args.id }).first();
    if (!article) {
      throw new NotFoundError('Cannot find article by given id');
    }

    if (article.authorUserId !== ctx.user.id) {
      throw new ForbiddenError('User is not allowed to unpublish this article');
    }

    if (!article.isPublished) {
      return article;
    }

    const updateData = {
      isPublished: false,
    };

    const [updatedArticle] = await knex('articles')
      .update(updateData)
      .where({ id: args.id })
      .returning('*');

    return updatedArticle;
  },
};
