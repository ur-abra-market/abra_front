import React from 'react';

import { Grades } from 'elements';

export const ProductPageHeader = (): JSX.Element => {
  return (
    <div>
      <Grades grade="4.4" count={1900} />
    </div>
  );
};
