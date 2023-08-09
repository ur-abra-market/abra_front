interface IResponse {
  offset: number;
  limit: number;
}

export const calculateOffsetAndLimit = (
  currentPage: number,
  showBy: number,
): IResponse => {
  const itemsPerPage = showBy;
  const offset = (currentPage - 1) * itemsPerPage;
  const limit = itemsPerPage * currentPage;

  return { offset, limit };
};
