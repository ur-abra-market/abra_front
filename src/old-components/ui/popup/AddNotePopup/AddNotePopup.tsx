import { FC } from 'react';

import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Button, Input } from '../../../../ui-kit';

import style from './AddNotePopup.module.scss';

import { CrossRedIcon } from 'assets/icons'; // 16px

interface AddNoteType {
  modal: boolean;
  setModal: (modal: boolean) => void;
}
const schema = yup
  .object({
    note: yup.string().required('Note is required'),
  })
  .required();

export const AddNotePopup: FC<AddNoteType> = ({ modal, setModal }) => {
  const styles = {
    scale: modal ? '1' : '0',
    zIndex: modal ? '20' : '0',
  };
  const onClickModalHandler = (): void => {
    setModal(false);
  };
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const onSubmit = (): void => {
    if (!isValid) return;
    setModal(false);
  };

  return (
    <div className={style.add_note} style={styles}>
      <div className={style.container}>
        <div className={style.header_container}>
          <h4 className={style.title}>Add a Note</h4>
          <CrossRedIcon
            className={style.add_note_modal_exit}
            onClick={onClickModalHandler}
          />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className={style.content_box}>
          <span className={style.text}>Notes for Supplier</span>
          <Input
            {...register('note')}
            classNameWrapper={style.input}
            className={style.input_note}
            type="textarea"
            placeholder="You can leave wishes on the configuration and characteristics of the order"
          />
          <Button label="Save" type="submit" disabled={!isValid} />
        </form>
      </div>
    </div>
  );
};
