import {
  CountriesArrayType,
  ICategoryResponse,
} from 'services/common/common.serviceTypes';

export interface INumberEmployees {
  id: number;
  number: string;
}

export interface IInitialState {
  categories: [] | ICategoryResponse[];
  selectedCategoryId: number | null;
  countries: CountriesArrayType;
  numberEmployees: INumberEmployees[];
}
