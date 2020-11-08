import { initEvironement, env } from './env';

initEvironement();

env.httpServer.listen(8080);
console.log(`Server Listening on port ${8080}`);