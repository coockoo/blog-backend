# Blog backend

![Deploy backend](https://github.com/coockoo/blog-backend/workflows/Deploy%20backend/badge.svg?branch=master)
![Apply migrations](https://github.com/coockoo/blog-backend/workflows/Apply%20migrations/badge.svg?branch=master)

## Development

- Ensure that `Docker` is installed and up and running.
- Ensure that port `5432` is free (for `Postgres` container)
- In separate window start `blog-postgres` container `./scripts/postgres.sh`
- Install dependencies `npm i`
- Start backend server `npm run dev`

## TODO

- Add `--add-cloudsql-instances` to deploy
  https://cloud.google.com/sdk/gcloud/reference/run/deploy
- Check if it's working
