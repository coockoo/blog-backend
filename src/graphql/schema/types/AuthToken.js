const { GraphQLNonNull, GraphQLObjectType, GraphQLString } = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'AuthToken',
  fields: () => ({
    accessToken: { type: new GraphQLNonNull(GraphQLString) },
    refreshToken: { type: GraphQLString },
  }),
});
