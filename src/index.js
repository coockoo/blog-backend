const http = require('http');
const httpShutdown = require('http-shutdown');

const { port } = require('./config');
const log = require('./log');
const app = require('./app');

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

process.on('uncaughtException', logErrorAndExit);
process.on('unhandledRejection', logErrorAndExit);

const server = httpShutdown(http.createServer(app));

log.info(`starting backend on port ${port}`);
server.listen(port, () => {
  log.info(`backend started on port ${port}`);
});

function shutdown() {
  server.shutdown(() => {
    log.info('backend stopped due to shutdown');
  });
}

function logErrorAndExit(error) {
  log.error(error);
  process.exit(75);
}
