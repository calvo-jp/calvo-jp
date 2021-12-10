import IProject from 'types/project';
import getServerBaseUrl from 'utils/getServerBaseUrl';

const baseUrl = getServerBaseUrl();
const endpoint = baseUrl + '/projects/';

interface Paginated {
  rows: IProject[];
  totalRows: number;
  page: number;
  pageSize: number;
  hasNext: boolean;
  search?: string;
}

interface Query {
  page?: number;
  pageSize?: number;
  search?: string;
}

const fetchAll = async (query?: Query): Promise<Paginated> => {
  const defaultQuery = {
    page: 1,
    pageSize: 25,
  };

  query = {
    ...defaultQuery,
    ...query,
  };

  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) params.append(key, value);

  try {
    const response = await fetch(`${endpoint}?${params.toString()}`);
    if (response.ok) return await response.json();
  } catch (e) {}

  return {
    ...defaultQuery,
    hasNext: false,
    totalRows: 0,
    rows: [],
  };
};

const fetchOne = async (slug: string): Promise<IProject | null> => {
  try {
    const response = await fetch(endpoint + slug);
    if (response.ok) return await response.json();
  } catch (e) {}

  return null;
};

const services = {
  fetchAll,
  fetchOne,
};

export default services;
