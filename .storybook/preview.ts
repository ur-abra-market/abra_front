import type { Preview } from '@storybook/react';
import '../src/index.css';
import { withRouter } from 'storybook-addon-react-router-v6';
import { themes } from '@storybook/theming';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export const decorators = [withRouter];
export default preview;
