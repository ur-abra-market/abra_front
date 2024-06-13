import React from 'react';

import cn from 'classnames';

import { CrossWhiteIcon } from 'assets/icons';
import { ButtonIcon } from 'ui-kit';

import s from './BundleAdder.module.scss';

interface IBundleAdder {
  bundles: { name: string; id: number; selected: boolean }[];
  handleDeleteBundle: (id: number) => void;
  handleSelectBundle: (id: number) => void;
  handleChangeName: (id: number, name: string) => void;
  handleAddBundle: () => void;
}
const MAX_LENGTH = 30;

export const BundleAdder = ({
  bundles,
  handleDeleteBundle,
  handleSelectBundle,
  handleChangeName,
  handleAddBundle,
}: IBundleAdder): JSX.Element => {
  const [editBundleId, setEditBundleId] = React.useState<number | null>(null);
  const [newName, setNewName] = React.useState('');
  const [error, setError] = React.useState('');

  const handleDoubleClick = (bundle: { id: number; name: string }): void => {
    setEditBundleId(bundle.id);
    setNewName(bundle.name);
  };

  const handleBlur = (bundleId: number): void => {
    if (editBundleId !== null) {
      handleChangeName(bundleId, newName);
    }

    if (newName.length > MAX_LENGTH) {
      setError('Max length is 30');

      return;
    }
    if (newName === '') {
      setError('Enter name of bundle');

      return;
    }
    setEditBundleId(null);
  };
  const handleEnterPress = (event: React.KeyboardEvent, bundleId: number): void => {
    if (event.key === 'Enter') {
      handleBlur(bundleId);
    }
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setNewName(event.target.value);
    if (event.target.value !== '') {
      setError('');
    }
  };

  return (
    <div className={s.container}>
      {bundles.map(bundle => (
        <div key={bundle.id} className={cn(s.bundle, { [s.selected]: bundle.selected })}>
          {editBundleId === bundle.id ? (
            <input
              className={s.input}
              type="text"
              onBlur={() => handleBlur(bundle.id)}
              onKeyDown={event => handleEnterPress(event, bundle.id)}
              onChange={handleInputChange}
              value={newName}
              autoFocus
            />
          ) : (
            <button
              type="button"
              onClick={() => handleSelectBundle(bundle.id)}
              onDoubleClick={() => handleDoubleClick(bundle)}
            >
              <span className={s.bundle_name}>{bundle.name}</span>
            </button>
          )}
          {editBundleId !== bundle.id && (
            <CrossWhiteIcon
              onClick={() => handleDeleteBundle(bundle.id)}
              className={s.cross}
            />
          )}
          {editBundleId === bundle.id && error && <div className={s.error}>{error}</div>}
        </div>
      ))}
      <ButtonIcon onClick={handleAddBundle} className={s.button_plus}>
        +
      </ButtonIcon>
    </div>
  );
};
