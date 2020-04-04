curl \
  -XPOST \
  -H 'Content-Type: application/json' \
  -d '{"query":"query Articles { articles { count rows { id } } }"}' \
  http://localhost:3000/graphql && echo

