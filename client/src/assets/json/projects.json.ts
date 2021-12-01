import IProject from 'types/project';

const items: IProject[] = [
  {
    id: 'pedicab',
    tags: [
      'react',
      'nextjs',
      'tailwind',
      'typescript',
      'python',
      'fastapi',
      'postgres',
    ],
    title: 'Pedicab',
    description: 'Make urls shorter and more meaningful',
    banner: '/images/projects-showcase/pedicab/banner.jpeg',
    images: [
      '/images/projects-showcase/pedicab/1.jpeg',
      '/images/projects-showcase/pedicab/2.jpeg',
    ],
  },
  {
    id: 'recipes',
    tags: [],
    title: 'Recipes',
    description: 'Share or find awesome recipes',
    banner: '/images/projects-showcase/recipes.jpeg',
    images: [],
  },
  {
    id: 'gadgets',
    tags: [],
    title: 'Gadgets',
    description: 'Buy a gadget online',
    banner: '/images/projects-showcase/gadgets.jpeg',
    images: [],
  },
];

export default items;
