const { GraphQLNonNull, GraphQLString } = require('graphql');

const { ValidationError } = require('../../../errors');
const knex = require('../../../services/knex');
const { isAuthorized } = require('../../../policies');

const ArticleType = require('../types/Article');

const createArticleArgs = {
  title: { type: new GraphQLNonNull(GraphQLString) },
  outline: { type: new GraphQLNonNull(GraphQLString) },
  slug: { type: new GraphQLNonNull(GraphQLString) },
  body: { type: new GraphQLNonNull(GraphQLString) },
};

module.exports = {
  name: 'CreateArticle',

  args: createArticleArgs,

  type: new GraphQLNonNull(ArticleType),

  resolve: async (root, args, ctx) => {
    await isAuthorized(ctx);

    // TODO: Replace this with dataloaders
    const sameSlugArticle = await knex('articles').first().where({ slug: args.slug });
    if (sameSlugArticle) {
      throw new ValidationError(
        {
          slug: 'Article with this slug exists',
        },
        'Article with this slug exists'
      );
    }

    const [article] = await knex('articles')
      .insert({
        authorUserId: ctx.user.id,
        title: args.title,
        outline: args.outline,
        slug: args.slug,
        body: args.body,
      })
      .returning('*');

    return article;
  },
};
