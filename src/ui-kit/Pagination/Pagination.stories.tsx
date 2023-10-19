import { useState } from 'react';

import type { Meta } from '@storybook/react';

import { Pagination } from './Pagination';

const meta = {
  component: Pagination,
  tags: ['autodocs'],
  title: 'Components/Pagination',
} satisfies Meta<typeof Pagination>;

export default meta;

export const DefaultButton = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [page, setPage] = useState(1);
    const onPageChangedHandler = (pageNumber: number): void => {
      setPage(pageNumber);
    };

    return (
      <Pagination
        currentPage={page}
        onPageChanged={onPageChangedHandler}
        totalPages={24}
      />
    );
  },
};
