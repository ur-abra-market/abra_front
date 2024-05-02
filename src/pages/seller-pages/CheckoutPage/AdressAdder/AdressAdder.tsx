import React, { JSX, useState } from 'react';

import cn from 'classnames';

import { EditPencilIcon } from 'assets/icons';
import { Button, Checkbox } from 'ui-kit';

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

  const buttonClass = cn({
    [styles.fullwidth]: isEven,
  });

  return (
    // TODO: use real data instead of mock
    <div className={styles.container}>
      <p className={styles.title}>Delivery Address</p>
      <div className={styles.list}>
        {addresses.map(address => (
          <div
            key={address.id}
            className={cn(styles.item, {
              [styles.selected]: address.selected,
            })}
          >
            <div className={styles.title_container}>
              <p className={styles.item_title}>Olga Andreeva, +79158448547</p>
              <EditPencilIcon className={styles.edit_icon} />
            </div>
            <p className={styles.item_text}>
              Jaroslava Gasheka 6, building 2, apartment 904, Moscow, Russian Federation,
              589964
            </p>
            <div className={styles.info_container}>
              <p className={styles.item_info}>Main Address</p>
              <Checkbox
                onChange={() => selectAddressHandler(address.id)}
                variant="default"
              />
            </div>
          </div>
        ))}

        <Button
          type="button"
          color="outline"
          className={buttonClass}
          onClick={addAddressHandler}
        >
          +Add an address
        </Button>
      </div>
    </div>
  );
};
