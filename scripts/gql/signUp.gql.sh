curl \
  -XPOST \
  -H 'Content-Type: application/json' \
  -d '{"query":"mutation SignUp { signUp(nickname:\"nickname\" password:\"password\") }"}' \
  http://localhost:3000/graphql && echo
