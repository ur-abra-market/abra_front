import { useState } from 'react';

import type { Meta } from '@storybook/react';

import { Pagination } from './Pagination';

const meta = {
  component: Pagination,
  tags: ['autodocs'],
  title: 'Ui-kit/Pagination',
} satisfies Meta<typeof Pagination>;

export default meta;

export const Default = {
  render: () => {
    const [page, setPage] = useState(1);

    return <Pagination currentPage={page} onPageChanged={setPage} totalPages={24} />;
  },
};
