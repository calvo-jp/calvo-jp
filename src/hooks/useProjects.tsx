import hermes from '../assets/images/screenshots/hermes/1.png';
import recipes from '../assets/images/screenshots/recipes/1.png';
import IProject from '../types/project';

const useProjects = (): IProject[] => [
  {
    slug: 'recipes',
    name: 'Recipes',
    description: 'Search or find amazing recipes',
    screenshots: recipes,
    repository: 'https://github.com/calvo-jp/recipes',
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
    screenshots: hermes,
    repository: 'https://github.com/calvo-jp/pets',
  },
];

export default useProjects;
