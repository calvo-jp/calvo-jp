interface IProject {
  slug: string;
  name: string;
  description: string;
  keywords: string[];
  banner: string;
  screenshots: ImageInfo[];
  techstacks: string[];
}

type Orientation = "square" | "vertical" | "horizontal";

interface ImageInfo {
  path: string;
  orientation: Orientation;
}

export default IProject;
