import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import contactsRouter from './routers/contacts.js';
import { getEnvVar } from './utils/getEnvVar.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
const port = Number(getEnvVar('PORT'));

export const setupServer = () => {
  const app = express();
  app.use(
    express.json({
      type: ['application/json', 'application/vnd.api+json'],
      limit: '100kb',
    }),
  );
  app.use(cors());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );
  // ...........................................................................
  app.use(contactsRouter);
  //  .............................................................................
  app.use(notFoundHandler);

  app.use(errorHandler);
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};
