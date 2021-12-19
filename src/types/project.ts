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
  url: string;
  orientation: Orientation;
}

export default IProject;
