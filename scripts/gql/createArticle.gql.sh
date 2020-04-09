curl \
  -XPOST \
  -H 'Content-Type: application/json' \
  -d '{"query":"mutation CreateArticle($title:String!, $body:String!) { createArticle(title: $title, body: $body) { id title body createdAt updatedAt  } }","variables":{"title":"My first article","body":"Content here"}}' \
  http://localhost:3000/graphql && echo

