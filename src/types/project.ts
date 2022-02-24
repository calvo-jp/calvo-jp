interface IProject {
  slug: string;
  name: string;
  description: string;
  repository: string;
  image?: string;
  hostedAt?: string;
}

export default IProject;
