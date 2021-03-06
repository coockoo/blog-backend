const { GraphQLSchema, GraphQLObjectType } = require('graphql');

const article = require('./queries/article');
const articles = require('./queries/articles');
const ping = require('./queries/ping');

const createArticle = require('./mutations/createArticle');
const publishArticle = require('./mutations/publishArticle');
const signIn = require('./mutations/signIn');
// const signUp = require('./mutations/signUp');
const unpublishArticle = require('./mutations/unpublishArticle');
const updateArticle = require('./mutations/updateArticle');

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      articles,
      article,
      ping,
    },
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      createArticle,
      publishArticle,
      signIn,
      // signUp,
      unpublishArticle,
      updateArticle,
    },
  }),
});
