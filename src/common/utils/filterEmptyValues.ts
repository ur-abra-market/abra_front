export const filterEmptyValues = (data: any): any => {
  const accountInfoForRequest = {};
  const array = Object.keys(data);

  for (let i = 0; i < array.length; i += 1)
    if (data[array[i]]) {
      // @ts-ignore
      accountInfoForRequest[array[i]] = data[array[i]];
    }

  return accountInfoForRequest;
};
