const { GraphQLString } = require('graphql');

module.exports = {
  name: 'Ping',

  type: GraphQLString,

  resolve: () => 'pong',
};
