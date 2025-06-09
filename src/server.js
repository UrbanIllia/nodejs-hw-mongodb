import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { getAllContacts, getContactById } from './services/contacts.js';
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
  // ...........................................................................
  app.get('/contacts/contacts', async (request, response) => {
    const contacts = await getAllContacts();
    response.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  });

  app.get('/contacts/contacts/:contactId', async (request, response, next) => {
    const { contactId } = request.params;
    const contact = await getContactById(contactId);

    if (!contact) {
      response.status(404).json({
        message: 'Contact not found',
      });
      return;
    }
    response.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  });

  //  .............................................................................
  app.use((error, req, res, next) => {
    const { status = 500, message = 'Something went wrong' } = error;
    res.status(status).json({
      status,
      message,
    });
  });

  app.use((request, response) => {
    response.status(404).json({
      message: 'Not found',
    });
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};
