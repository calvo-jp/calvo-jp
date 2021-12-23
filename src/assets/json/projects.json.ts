import IProject from "types/project";

const items: IProject[] = [
  {
    slug: "recipes",
    name: "Recipes",
    description: "Find or search amazing recipes",
    keywords: [
      "cooking",
      "ingredients",
      "instructions",
      "recipes",
      "delicious",
      "tasty",
      "chef",
      "food",
      "yummy",
    ],
    techstacks: [
      "nextjs",
      "tailwind",
      "python",
      "fastapi",
      "sqlmodel",
      "postgres",
    ],
    banner: "/images/showcase/banners/recipes.jpg",
    screenshots: [
      {
        path: "/images/showcase/screenshots/recipes/1.jpg",
        orientation: "horizontal",
      },
      {
        path: "/images/showcase/screenshots/recipes/2.jpg",
        orientation: "vertical",
      },
      {
        path: "/images/showcase/screenshots/recipes/3.jpg",
        orientation: "horizontal",
      },
      {
        path: "/images/showcase/screenshots/recipes/4.jpg",
        orientation: "vertical",
      },
      {
        path: "/images/showcase/screenshots/recipes/5.jpg",
        orientation: "horizontal",
      },
      {
        path: "/images/showcase/screenshots/recipes/6.jpg",
        orientation: "square",
      },
      {
        path: "/images/showcase/screenshots/recipes/7.jpg",
        orientation: "horizontal",
      },
    ],
  },
];

export default items;
