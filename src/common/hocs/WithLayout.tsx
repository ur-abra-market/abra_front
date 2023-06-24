import { FunctionComponent } from 'react';

import { Layout } from 'layouts';

export const WithLayout = <T extends Record<string, unknown>>(
  Component: FunctionComponent<T>,
  headerVariant?: 'default' | 'supplier',
) => {
  return function withLayoutComponent({ ...props }: T): JSX.Element {
    return (
      <Layout headerVariant={headerVariant}>
        <Component {...props} />
      </Layout>
    );
  };
};
