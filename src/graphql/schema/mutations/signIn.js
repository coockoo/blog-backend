const { GraphQLBoolean, GraphQLNonNull, GraphQLString } = require('graphql');
const _ = require('lodash');
const { nanoid } = require('nanoid');

const { signJWT, TOKEN_KIND } = require('../../../services/jwt');
const knex = require('../../../services/knex');
const { comparePassword } = require('../../../services/password');

const { UnauthorizedError } = require('../../../errors');

const AuthTokenType = require('../types/AuthToken');

const signInArgs = {
  nickname: { type: new GraphQLNonNull(GraphQLString) },
  password: { type: new GraphQLNonNull(GraphQLString) },
  withRefresh: { type: GraphQLBoolean },
};

module.exports = {
  name: 'SignIn',

  type: new GraphQLNonNull(AuthTokenType),

  args: signInArgs,

  resolve: async (r_, args, ctx) => {
    // TODO: add proper sanitization

    let nickname = _.toLower(args.nickname);
    nickname = nickname.trim();

    const user = await knex('users')
      .first(['id', 'nickname', 'password'])
      .where('nickname', 'ilike', nickname);

    if (!user) {
      throw new UnauthorizedError('User with given nickname does not exist');
    }

    const passwordsMatch = await comparePassword(args.password, user.password);

    if (!passwordsMatch) {
      throw new UnauthorizedError('Password is wrong');
    }

    const payload = { sub: user.id };

    const accessPayload = { ...payload, key: nanoid(12) };
    const accessToken = await signJWT(accessPayload, TOKEN_KIND.ACCESS);

    let refreshToken = null;
    const refreshPayload = { ...payload, key: nanoid(40) };
    if (args.withRefresh) {
      refreshToken = await signJWT(refreshPayload, TOKEN_KIND.ACCESS);
    }

    const headers = _.get(ctx, 'headers');
    await knex('auth_tokens').insert({
      userId: user.id,
      origin: _.pick(headers, ['host', 'user-agent']),

      accessKey: accessPayload.key,
      accessExpiresAt: new Date(), // TODO: Add date

      refreshKey: args.withRefresh ? refreshPayload.key : null,
      refreshExpiresAt: new Date(), // TODO: Add date
    });

    return { accessToken, refreshToken };
  },
};
