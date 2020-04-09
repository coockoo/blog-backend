const { GraphQLSchema, GraphQLObjectType } = require('graphql');

const articles = require('./queries/articles');
const ping = require('./queries/ping');

const createArticle = require('./mutations/createArticle');

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      articles,
      ping,
    },
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      createArticle,
    },
  }),
});
