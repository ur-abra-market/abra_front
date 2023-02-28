export const getPercentagesOfTotalCountReview = ({ totalCount, itemCount }: any): any => {
  return `${Math.round(itemCount / (totalCount / 100))}%`;
};
