import type { Meta, StoryObj } from '@storybook/react';

import { Select } from './Select';

import { CountriesEnum } from 'common/types';
import { COUNTRY_FLAGS } from 'common/utils';

const meta = {
  component: Select,
  tags: ['autodocs'],
  title: 'Components/Select',
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultSelect: Story = {
  args: {
    options: [
      { label: { text: 'Russian / RUB' }, value: 'ru' },
      { label: { text: 'English / USD' }, value: 'usd' },
    ],
    width: '172px',
    placeholder: 'Currency',
  },
};

export const SelectShipTo: Story = {
  args: {
    options: [
      {
        label: { text: 'Russia', image_src: COUNTRY_FLAGS[CountriesEnum.RUSSIAN] },
        value: CountriesEnum.RUSSIAN,
      },
      {
        label: { text: 'Turkey', image_src: COUNTRY_FLAGS[CountriesEnum.TURKEY] },
        value: CountriesEnum.TURKEY,
      },
      {
        label: { text: 'Belarus', image_src: COUNTRY_FLAGS[CountriesEnum.BELARUS] },
        value: CountriesEnum.BELARUS,
      },
    ],
    width: '172px',
    placeholder: 'Ship To',
  },
};
