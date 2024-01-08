import { IFeedbacks } from 'store/reducers/productSlice/types';

export interface IRating {
  rating: number;
  percent: number;
  totalRating: number;
}

export const sumRatings = (obj: IFeedbacks): number => {
  const ratings = Object.entries(obj);

  return ratings.reduce((sum, [key, value]) => sum + Number(key) * value, 0);
};

export const countRatings = (obj: IFeedbacks): number => {
  const ratings = Object.values(obj);

  return ratings.reduce((sum, value) => sum + Number(value), 0);
};

export const calculationsRatings = (obj: { [key: number]: number }): number => {
  const sum = sumRatings(obj);

  const count = countRatings(obj);

  return count === 0 ? 0 : Number((sum / count).toFixed(2));
};

// if there are no grades in the product - create with value 0
// calculate line occupancy in percentage
export const calculatePercentRatings = (estimates: IFeedbacks): IRating[] => {
  const minRating = 1;
  const maxRating = 5;

  const totalRating = Object.values(estimates).reduce((sum, value) => sum + value, 0);

  const percentRatings: IRating[] = [];

  for (let rating = minRating; rating <= maxRating; rating += 1) {
    const value = estimates[rating] || 0;
    const percentage = (value / totalRating) * 100;

    percentRatings.unshift({
      rating,
      percent: Number(percentage.toFixed(2)),
      totalRating: value,
    });
  }

  return percentRatings;
};
