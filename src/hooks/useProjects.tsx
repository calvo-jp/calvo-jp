import hermes from '../assets/images/screenshots/hermes.png';
import recipes from '../assets/images/screenshots/recipes.png';
import IProject from '../types/project';

const items: IProject[] = [
  {
    slug: 'recipes',
    name: 'Recipes',
    description: 'Search or find amazing recipes',
    image: recipes,
    repository: 'https://github.com/calvo-jp/recipes',
  },
  {
    slug: 'hermes',
    name: 'Hermes',
    description: 'A light-weight fb messenger alternative',
    image: hermes,
    repository: 'https://github.com/calvo-jp/hermes',
  },
  {
    slug: 'pets',
    name: 'Pets',
    description: 'Buy or sell a pet',
    repository: 'https://github.com/calvo-jp/pets',
  },
];

const useProjects = () => items;
export default useProjects;
