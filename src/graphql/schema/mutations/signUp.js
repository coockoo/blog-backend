const { GraphQLBoolean, GraphQLNonNull, GraphQLString } = require('graphql');
const _ = require('lodash');

const knex = require('../../../services/knex');
const { hashPassword } = require('../../../services/password');

const { ValidationError } = require('../../../errors');

const signUpArgs = {
  nickname: { type: new GraphQLNonNull(GraphQLString) },
  password: { type: new GraphQLNonNull(GraphQLString) },
};

module.exports = {
  name: 'SignUp',

  type: GraphQLBoolean,

  args: signUpArgs,

  resolve: async (r_, args, ctx_) => {
    // TODO: add proper sanitization

    let nickname = _.toLower(args.nickname);
    nickname = nickname.trim();

    // TODO: add validation

    const user = await knex('users').first().where('nickname', 'ilike', nickname);

    if (user) {
      throw new ValidationError({
        nickname: 'User with the given nickname exists',
      });
    }

    const password = await hashPassword(args.password);

    await knex('users').insert({
      nickname,
      password,
    });

    return true;
  },
};
