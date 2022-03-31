import IProject from "../types/project";

const items: IProject[] = [
  {
    slug: "money-tor",
    name: "Money-tor",
    description: "Expense tracker app",
    image:
      "https://raw.githubusercontent.com/calvo-jp/react-collections/main/expense-tracker/docs/screenshot.png",
    repository:
      "https://github.com/calvo-jp/react-collections/tree/main/expense-tracker",
  },
  {
    slug: "todo",
    name: "Todo app",
    description: "A typical todo app",
    image:
      "https://raw.githubusercontent.com/calvo-jp/react-collections/main/todo/docs/screenshot-1.png",
    repository: "https://github.com/calvo-jp/react-collections/tree/main/todo",
  },
  {
    slug: "pokemon",
    name: "Pokemon",
    description: "Get info about your favorite pokemon",
    image:
      "https://raw.githubusercontent.com/calvo-jp/react-collections/main/pokemon/docs/screenshot.png",
    repository:
      "https://github.com/calvo-jp/react-collections/tree/main/pokemon",
  },
  {
    slug: "amazing-recipes",
    name: "Recipes",
    description: "Search or find amazing recipes",
    image:
      "https://raw.githubusercontent.com/calvo-jp/react-collections/main/amazing-recipes/docs/screenshot.png",
    repository:
      "https://github.com/calvo-jp/react-collections/tree/main/amazing-recipes",
  },
];

const useProjects = () => items;
export default useProjects;
