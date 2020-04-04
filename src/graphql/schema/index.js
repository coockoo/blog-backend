const { GraphQLSchema, GraphQLObjectType } = require('graphql');

const articles = require('./queries/articles');
const ping = require('./queries/ping');

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      articles,
      ping,
    },
  }),
  /*
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {
    },
  }),
  */
});
