import { NextApiHandler } from "next";
import { createClient } from "redis";
import * as yup from "yup";

const handler: NextApiHandler = async (request, response) => {
  switch (request.method) {
    case "POST":
      const schema = yup.object().shape({
        sender: yup
          .string()
          .trim()
          .email("invalid email format")
          .required("email is required"),
        subject: yup
          .string()
          .trim()
          .min(15, "subject must be 15 or characters more")
          .max(50, "subject must be 50 or characters less"),
        body: yup
          .string()
          .trim()
          .min(25, "body must be 25 or characters more")
          .max(255, "body must be 255 or characters less")
          .required("body is required"),
      });

      try {
        const postfields = await schema.validate(request.body);

        if (await hasSent3EmailsIn24Hrs(postfields.sender))
          return response.status(429).json({ message: "Too many emails sent" });

        await incrementTotalSentEmails(postfields.sender);
        return response.status(202).json(postfields);
      } catch (e) {
        return response.status(400).json(e);
      }

    default:
      return response.status(422).end();
  }
};

const getRedisConfig = () => ({});

const getSentEmailsCounter = async () => {
  const config = getRedisConfig();
  const counter = createClient(config);

  await counter.connect();

  return counter;
};

const hasSent3EmailsIn24Hrs = async (email: string) => {
  const counter = await getSentEmailsCounter();
  const total = await counter.get(email);

  return total && parseInt(total) >= 3;
};

const incrementTotalSentEmails = async (email: string) => {
  const counter = await getSentEmailsCounter();

  if (!(await counter.exists(email)))
    await counter.setEx(email, 60 * 60 * 24, (0).toString());
  await counter.incr(email);
};

export default handler;
