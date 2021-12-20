import items from "assets/json/projects.json";
import { NextApiHandler } from "next";
import IProject from "types/project";

const handler: NextApiHandler<IProject[]> = (request, response) => {
  switch (request.method) {
    case "GET":
      return response.status(200).json(items);
    default:
      return response.status(422).end();
  }
};

export default handler;
