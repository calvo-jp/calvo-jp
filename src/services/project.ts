import config from "config";
import IProject from "types/project";

const urlPrefix = config.APIPrefix + "/projects/";

export const read = {
  async one(slug: string): Promise<IProject> {
    const response = await fetch(urlPrefix + slug);
    return await response.json();
  },
  async all(): Promise<IProject[]> {
    const response = await fetch(urlPrefix);
    return await response.json();
  },
};
