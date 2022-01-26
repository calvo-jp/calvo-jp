import mail from '@sendgrid/mail';
import globalConfig from 'config';
import type { NextApiHandler } from 'next';
import { createClient } from 'redis';
import * as yup from 'yup';

mail.setApiKey(globalConfig.SENDGRID_API_KEY);

const handler: NextApiHandler = async (request, response) => {
  switch (request.method) {
    case 'POST':
      try {
        const postfields = await yup
          .object()
          .shape({
            sender: yup
              .string()
              .trim()
              .lowercase()
              .email('invalid email format')
              .required('email is required'),
            subject: yup
              .string()
              .trim()
              .min(15, 'subject must be 15 or characters more')
              .max(50, 'subject must be 50 or characters less'),
            body: yup
              .string()
              .trim()
              .min(25, 'body must be 25 or characters more')
              .max(255, 'body must be 255 or characters less')
              .required('body is required'),
          })
          .validate(request.body, {
            stripUnknown: true,
            abortEarly: true,
          });

        if (await hasSent3EmailsIn24Hrs(postfields.sender))
          return response.status(429).json({ message: 'Too many emails sent' });

        // TODO: secure this please
        const reciever = 'calvojp92@gmail.com';

        // FIXME:
        // as of now, every email is sent by me and routed to me
        // this should not be the normal behaviour
        // we will fix this as soon as we get a budget
        const result = await mail.send({
          to: reciever,
          from: reciever,
          replyTo: postfields.sender,
          subject: postfields.sender,
          text: postfields.body,
        });

        if (globalConfig.DEBUG) console.dir(result);

        await incrementTotalSentEmails(postfields.sender);
        response.status(202).json(postfields);
      } catch (error) {
        if (globalConfig.DEBUG) console.dir(error);

        if (error instanceof yup.ValidationError)
          return response.status(400).json(error);

        // most probably a redis error
        response.status(500).json({ message: 'Something went wrong' });
      }

      break;
    default:
      response.status(422).end();
      break;
  }
};

const getSentEmailsCounter = async () => {
  const client = createClient({
    url: globalConfig.REDIS_URL,
  });

  await client.connect();
  return client;
};

const hasSent3EmailsIn24Hrs = async (email: string) => {
  const counter = await getSentEmailsCounter();
  const total = await counter.get(email);

  return !!total && parseInt(total) > 3;
};

const incrementTotalSentEmails = async (email: string) => {
  const counter = await getSentEmailsCounter();

  if (!(await counter.exists(email)))
    await counter.setEx(email, 60 * 60 * 24, (0).toString());
  await counter.incr(email);
};

export default handler;
