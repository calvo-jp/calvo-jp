import items from "assets/json/projects.json";
import { NextApiHandler } from "next";
import IProject from "types/project";

const handler: NextApiHandler<IProject> = (request, response) => {
  switch (request.method) {
    case "GET":
      const item = items.find(({ slug }) => slug === request.query.slug);

      if (!item) response.status(404).end();
      else response.status(200).json(item);

      break;
    default:
      response.status(422).end();
      break;
  }
};

export default handler;
