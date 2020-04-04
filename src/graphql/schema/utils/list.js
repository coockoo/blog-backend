const { GraphQLNonNull, GraphQLList } = require('graphql');

const defaultParams = { nullable: false };

module.exports = function List(type, { nullable } = defaultParams) {
  if (nullable === 'itemsAndList') {
    return new GraphQLList(type);
  }
  if (nullable === true) {
    return new GraphQLList(new GraphQLNonNull(type));
  }
  if (nullable === 'items') {
    return new GraphQLNonNull(new GraphQLList(type));
  }
  return new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(type)));
};
