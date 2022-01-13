import items from 'assets/json/projects.json';
import type { NextApiHandler } from 'next';
import IProject from 'types/project';

const handler: NextApiHandler<IProject[]> = (request, response) => {
  switch (request.method) {
    case 'GET':
      response.status(200).json(items);
      break;
    default:
      response.status(422).end();
      break;
  }
};

export default handler;
