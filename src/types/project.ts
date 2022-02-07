interface IProject {
  slug: string;
  name: string;
  description: string;
  screenshots: string;
  repository: string;

  /**
   *
   * The url where the project is currently hosted
   *
   */
  hostedAt?: string;
}

export default IProject;
