const {
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
} = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'Article',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },

    title: { type: new GraphQLNonNull(GraphQLString) },
    outline: { type: new GraphQLNonNull(GraphQLString) },
    body: { type: new GraphQLNonNull(GraphQLString) },

    isPublished: { type: new GraphQLNonNull(GraphQLBoolean) },
    lastPublishedAt: { type: GraphQLString },

    createdAt: { type: new GraphQLNonNull(GraphQLString) },
    updatedAt: { type: new GraphQLNonNull(GraphQLString) },
  }),
});
