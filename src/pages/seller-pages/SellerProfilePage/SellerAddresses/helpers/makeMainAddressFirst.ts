import { ISellerAddressData } from 'services/seller/seller.serviceTypes';

export const makeMainAddressFirst = (
  addresses: ISellerAddressData[],
): ISellerAddressData[] | undefined => {
  return addresses?.reduce((acc: ISellerAddressData[], item: ISellerAddressData) => {
    if (item.is_main) {
      acc.unshift(item);
    } else {
      acc.push(item);
    }

    return acc;
  }, []);
};
