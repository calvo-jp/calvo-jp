import items from "assets/json/projects.json";
import { NextApiHandler } from "next";
import IProject from "types/project";

const handler: NextApiHandler<IProject> = (request, response) => {
  switch (request.method) {
    case "GET":
      const slug = request.query.slug as string;
      const item = items.find((item) => item.slug === slug);

      if (!item) return response.status(404).end();

      return response.status(200).json(item);
    default:
      return response.status(422).end();
  }
};

export default handler;
