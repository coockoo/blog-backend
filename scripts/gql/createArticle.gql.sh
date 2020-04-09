curl \
  -XPOST \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwia2V5IjoiLXZoTy1lbElEMHFxIiwiaWF0IjoxNTg2NDM0NTk1LCJleHAiOjE1ODY1MjA5OTV9._9ftk4qGzVErdOZQ5X6wblg2SH-oBofgL39XjH8-MB0' \
  -d '{"query":"mutation CreateArticle($title:String!, $body:String!) { createArticle(title: $title, body: $body) { id title body createdAt updatedAt  } }","variables":{"title":"My first article","body":"Content here"}}' \
  http://localhost:3000/graphql && echo

