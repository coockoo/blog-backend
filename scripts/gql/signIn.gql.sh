curl \
  -XPOST \
  -H 'Content-Type: application/json' \
  -d '{"query":"mutation SignIn { signIn(nickname:\"nickname\" password:\"password\" withRefresh:true) { accessToken refreshToken } }"}' \
  http://localhost:3000/graphql && echo
