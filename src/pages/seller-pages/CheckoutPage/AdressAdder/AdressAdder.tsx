import React, { JSX, useState } from 'react';

import { EditPencilIcon } from 'assets/icons';
import { Checkbox } from 'ui-kit';

import styles from './AdressAdder.module.scss';

interface Address {
  id: number;
  selected: boolean;
}

export const AddressAdder = (): JSX.Element => {
  const [addresses, setAddresses] = useState<Address[]>([]);

  const addAddressHandler = (): void => {
    setAddresses(prevAddresses => [
      ...prevAddresses,
      { id: prevAddresses.length + 1, selected: false },
    ]);
  };
  const selectAddressHandler = (id: number): void => {
    setAddresses(prevAddresses =>
      prevAddresses.map(address => {
        if (address.id === id) {
          return { ...address, selected: !address.selected };
        }

        return address;
      }),
    );
  };

  const isEven = addresses.length % 2 === 0;

  return (
    <div className={styles.address_adder_container}>
      <span className={styles.address_adder_title}>Delivery Address</span>
      <div className={styles.address_list}>
        {addresses.map(address => (
          <div
            key={address.id}
            className={`${styles.address_item} ${
              address.selected ? styles.selected : ''
            }`}
          >
            <div className={styles.address_item_title_container}>
              <span className={styles.address_item_title}>
                Olga Andreeva, +79158448547
              </span>
              <EditPencilIcon />
            </div>
            <span className={styles.address_item_text}>
              Jaroslava Gasheka 6, building 2, apartment 904, Moscow, Russian Federation,
              589964
            </span>
            <div className={styles.address_item_add_info_container}>
              <span className={styles.address_item_add_info}>Main Adress</span>
              <Checkbox
                onChange={() => selectAddressHandler(address.id)}
                variant="default"
              />
            </div>
          </div>
        ))}

        <button
          type="button"
          className={`${styles.add_address_button} ${isEven ? styles.fullwidth : ''}`}
          onClick={addAddressHandler}
        >
          +Add an address
        </button>
      </div>
    </div>
  );
};
