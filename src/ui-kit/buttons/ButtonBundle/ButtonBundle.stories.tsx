import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { ButtonBundle } from './ButtonBundle';

const meta = {
  component: ButtonBundle,
  tags: ['autodocs'],
  title: 'Components/ButtonBundle',
} satisfies Meta<typeof ButtonBundle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultButton: Story = {
  args: {
    children: 'Bundle',
  },
};

export const DefaultSelectedButton: Story = {
  args: {
    children: 'Bundle',
    isSelected: true,
  },
};

export const ButtonListStory = (): JSX.Element => {
  const [state, setState] = useState<stateType[]>([
    { id: 1, title: 'Bundle 1', isSelected: true },
    { id: 2, title: 'Bundle 2', isSelected: false },
    { id: 3, title: 'Bundle 3', isSelected: false },
  ]);
  const handler = (id: number): void => {
    const updatedState: stateType[] = state.map(item =>
      item.id === id
        ? {
            ...item,
            isSelected: true,
          }
        : {
            ...item,
            isSelected: false,
          },
    );

    setState(updatedState);
  };

  return (
    <>
      {state.map(item => {
        return (
          <ButtonBundle
            key={item.id}
            onClick={() => handler(item.id)}
            isSelected={item.isSelected}
            style={{ marginRight: '5px' }}
          >
            {item.title}
          </ButtonBundle>
        );
      })}
    </>
  );
};

type stateType = {
  id: number;
  title: string;
  isSelected: boolean;
};
