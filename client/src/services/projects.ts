import IProject from 'types/project';

const fetchAll = async (): Promise<IProject[]> => {
  try {
    const response = await fetch('http://localhost:8000/projects');
    if (response.ok) return await response.json();
  } finally {
    return [];
  }
};

const fetchOne = async (id: string): Promise<IProject | null> => {
  try {
    const response = await fetch('http://localhost:8000/projects/' + id);
    if (response.ok) return await response.json();
  } finally {
    return null;
  }
};

const services = {
  fetchAll,
  fetchOne,
};

export default services;
