curl \
  -XPOST \
  -H 'Content-Type: application/json' \
  -d '{"query":"query Articles { articles { count rows { id title body } } }"}' \
  http://localhost:3000/graphql && echo

