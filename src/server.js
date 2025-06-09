import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { getEnvVar } from './utils/getEnvVar.js';
const port = Number(getEnvVar('PORT'));

export const setupServer = () => {
  const app = express();
  app.use(cors());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );
  app.use((request, response, next) => {
    response.status(404).json({
      message: 'Not found',
    });
  });
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};
