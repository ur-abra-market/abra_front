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

export const DefaultActiveButton: Story = {
  args: {
    children: 'Bundle',
    color: 'active',
  },
};

export const ButtonListStory = (): JSX.Element => {
  const [state, setState] = useState<stateType[]>([
    { id: 1, title: 'Bundle 1', status: 'active' },
    { id: 2, title: 'Bundle 2', status: 'default' },
    { id: 3, title: 'Bundle 3', status: 'default' },
  ]);
  const handler = (id: number): void => {
    const updatedState: stateType[] = state.map(item =>
      item.id === id
        ? {
            ...item,
            status: 'active',
          }
        : {
            ...item,
            status: 'default',
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
            color={item.status}
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
  status: 'active' | 'default';
};
