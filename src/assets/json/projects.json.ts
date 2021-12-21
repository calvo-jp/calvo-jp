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
    screenshots: [
      { path: "/images/", orientation: "square" },
      { path: "/images/", orientation: "vertical" },
      { path: "/images/", orientation: "horizontal" },
      { path: "/images/", orientation: "horizontal" },
      { path: "/images/", orientation: "square" },
      { path: "/images/", orientation: "vertical" },
    ],
    banner: "/images/",
  },
];

export default items;
