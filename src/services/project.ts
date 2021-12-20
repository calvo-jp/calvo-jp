import IProject from "types/project";

export const read = {
  async one(slug: string): Promise<IProject | null> {
    try {
      const response = await fetch("/api/projects/" + slug);
      return await response.json();
    } catch {
      return null;
    }
  },
  async all(): Promise<IProject[]> {
    try {
      const response = await fetch("/api/projects");
      return await response.json();
    } catch {
      return [];
    }
  },
};
