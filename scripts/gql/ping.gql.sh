curl \
  -XPOST \
  -H 'Content-Type: application/json' \
  -d '{"query":"query Ping { ping }"}' \
  http://localhost:3000/graphql && echo

