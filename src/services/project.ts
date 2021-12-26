import type IProject from "types/project";
import request from "utils/request";

export const read = {
  async one(slug: string): Promise<IProject | null> {
    try {
      const response = await request.get("/projects/" + slug);
      return await response.json();
    } catch {
      return null;
    }
  },
  async all(): Promise<IProject[]> {
    try {
      const response = await request.get("/projects");
      return await response.json();
    } catch {
      return [];
    }
  },
};
