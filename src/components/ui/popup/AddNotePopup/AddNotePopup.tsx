import React, { FC } from 'react';

import { ReactComponent as Exit } from '../../../../assets/img/icons/exit-modal.svg';
import { Button, Input } from '../../../ui-kit';

import style from './AddNotePopup.module.css';

interface AddNoteType {
  modal: boolean;
  setModal: (modal: boolean) => void;
}
export const AddNotePopup: FC<AddNoteType> = ({ modal, setModal }) => {
  const styles = {
    scale: modal ? '1' : '0',
    zIndex: modal ? '20' : '0',
  };
  const onClickModalHandler = (): void => {
    setModal(false);
  };

  return (
    <div className={style.add_note} style={styles}>
      <div className={style.container}>
        <div className={style.header_container}>
          <h4 className={style.title}>Add a Note</h4>
          <Exit className={style.add_note_modal_exit} onClick={onClickModalHandler} />
        </div>
        <div className={style.content_box}>
          <span className={style.text}>Notes for Supplier</span>
          <Input
            classNameWrapper={style.input}
            className={style.input_note}
            type="textarea"
            placeholder="You can leave wishes on the configuration and characteristics of the order"
          />
          <Button label="Save" />
        </div>
      </div>
    </div>
  );
};
