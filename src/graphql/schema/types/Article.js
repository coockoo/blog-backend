const { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString } = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'Article',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },

    title: { type: new GraphQLNonNull(GraphQLString) },
    outline: { type: new GraphQLNonNull(GraphQLString) },
    body: { type: new GraphQLNonNull(GraphQLString) },

    createdAt: { type: new GraphQLNonNull(GraphQLString) },
    updatedAt: { type: new GraphQLNonNull(GraphQLString) },
  }),
});
