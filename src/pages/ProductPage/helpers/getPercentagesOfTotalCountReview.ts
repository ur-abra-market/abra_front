export const getPercentagesOfTotalCountReview = ({ totalCount, itemCount }: any) => {
  return `${Math.round(itemCount / (totalCount / 100))}%`;
};
