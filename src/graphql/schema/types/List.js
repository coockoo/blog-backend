const { GraphQLInt, GraphQLNonNull, GraphQLObjectType } = require('graphql');

const List = require('../utils/list');

module.exports = function ListType(name, type) {
  return new GraphQLObjectType({
    name,
    fields: () => ({
      count: { type: new GraphQLNonNull(GraphQLInt) },
      rows: { type: List(type) },
    }),
  });
};
