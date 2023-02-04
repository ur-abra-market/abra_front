export const getPercentagesOfTotalCountReview = ({ totalCount, itemCount }) => {
  return `${Math.round(itemCount / (totalCount / 100))}%`;
};
