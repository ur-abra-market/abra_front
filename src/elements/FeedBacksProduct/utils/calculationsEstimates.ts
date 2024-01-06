import { IFeedbacks } from 'store/reducers/productSlice/types';

interface IEstimates {
  estimate: number;
  percentage: number;
  totalEstimates: number;
}

export const sumEstimates = (obj: IFeedbacks): number => {
  const estimates = Object.entries(obj);

  return estimates.reduce((sum, [key, value]) => sum + Number(key) * value, 0);
};

export const countEstimates = (obj: IFeedbacks): number => {
  const estimates = Object.values(obj);

  return estimates.reduce((sum, value) => sum + Number(value), 0);
};

export const calculationsEstimates = (obj: { [key: number]: number }): number => {
  const sum = sumEstimates(obj);
  const count = countEstimates(obj);

  return count === 0 ? 0 : Number((sum / count).toFixed(2));
};

// если в товаре нет оценок - создать с значением 0
// высчитать заполненность линии в процентах
export const calculatePercentageEstimates = (estimates: IFeedbacks): IEstimates[] => {
  const minRating = 1;
  const maxRating = 5;

  const totalEstimates = Object.values(estimates).reduce((sum, value) => sum + value, 0);

  const percentageEstimates: IEstimates[] = [];

  for (let rating = minRating; rating <= maxRating; rating += 1) {
    const value = estimates[rating] || 0;
    const percentage = (value / totalEstimates) * 100;

    percentageEstimates.unshift({
      estimate: rating,
      percentage: Number(percentage.toFixed(2)),
      totalEstimates: value,
    });
  }

  return percentageEstimates;
};
