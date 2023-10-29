import type { Meta, StoryObj } from '@storybook/react';

import { LoaderLinear } from './LoaderLinear';

const meta = {
  component: LoaderLinear,
  tags: ['autodocs'],
  title: 'ui-kit/LoaderLinear',
} satisfies Meta<typeof LoaderLinear>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultLoaderLinear: Story = {};
