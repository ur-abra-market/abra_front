import { ICategoryResponse, ICountry } from 'services/common/common.serviceTypes';

export interface INumberEmployees {
  id: number;
  number: string;
}

export interface IInitialState {
  categories: null | ICategoryResponse[];
  countries: ICountry[] | null;
  numberEmployees: INumberEmployees[];
}
