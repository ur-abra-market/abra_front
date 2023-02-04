export const filterEmptyValues = data => {
  const accountInfoForRequest = {};
  const array = Object.keys(data);

  for (let i = 0; i < array.length; i++)
    if (data[array[i]]) accountInfoForRequest[array[i]] = data[array[i]];

  return accountInfoForRequest;
};
