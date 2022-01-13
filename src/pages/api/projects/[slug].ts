import items from 'assets/json/projects.json';
import type { NextApiHandler } from 'next';
import IProject from 'types/project';

const handler: NextApiHandler<IProject> = (request, response) => {
  switch (request.method) {
    case 'GET':
      const slug = request.query.slug as string;
      const item = items.find((item) => item.slug === slug);

      if (!item) response.status(404).end();
      else response.status(200).json(item);

      break;
    default:
      response.status(422).end();
      break;
  }
};

export default handler;
