import { initEvironement, env } from './env';

const port = 8080;

initEvironement();

env.httpServer.listen(port);
console.log(`Server Listening on port ${port}`);