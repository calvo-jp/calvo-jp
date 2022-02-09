import hermes from '../assets/images/screenshots/hermes.png';
import pets from '../assets/images/screenshots/pets.png';
import recipes from '../assets/images/screenshots/recipes.png';
import IProject from '../types/project';

const useProjects = (): IProject[] => [
  {
    slug: 'recipes',
    name: 'Recipes',
    description: 'Search or find amazing recipes',
    screenshots: recipes,
    repository: 'https://github.com/calvo-jp/recipes',
    hostedAt: 'https://recipes.vercel.app',
  },
  {
    slug: 'hermes',
    name: 'Hermes',
    description: 'A light-weight fb messenger alternative',
    screenshots: hermes,
    repository: 'https://github.com/calvo-jp/hermes',
  },
  {
    slug: 'pets',
    name: 'Pets',
    description: 'Buy or sell a pet',
    screenshots: pets,
    repository: 'https://github.com/calvo-jp/pets',
  },
];

export default useProjects;
