import { LoadingStatusEnum } from 'common/types';
import {
  CountriesArrayType,
  ICategoryResponse,
} from 'services/common/common.serviceTypes';

export interface INumberEmployees {
  id: number;
  number: string;
}

export interface IInitialState {
  loading: {
    categoriesLoading: LoadingStatusEnum;
  };
  categories: [] | ICategoryResponse[];
  selectedCategoryId: number | null;
  countries: CountriesArrayType;
  numberEmployees: INumberEmployees[];
}
