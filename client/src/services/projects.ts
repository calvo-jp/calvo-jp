import IProject from 'types/project';

const items: IProject[] = [
  {
    id: 'pedicab',
    title: 'Pedicab',
    description: 'Get a shorter, more meaningful url',
    image: '/images/pedicab.jpeg',
  },
  {
    id: 'recipes',
    title: 'Recipes',
    description: 'Share and find a recipe',
    image: '/images/recipes.jpeg',
  },
];

export const fetchAll = async () => {
  return items;
};

export const fetchOne = async (id: string) => {
  return items.find((item) => item.id === id);
};
