/**
 * Storybook configuration.
 * @file This file is saved as `.storybook/main.js`.
 */
import { mergeConfig } from 'vite';

import { ENVS } from '../build_utils/config/index.mjs';
import { ERR_NO_BE_ENV_FLAG } from '../build_utils/config/logs.mjs';

export default {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)', '../src/**/*.mdx'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-links',
    '@storybook/addon-a11y',
    '@storybook/addon-interactions',
    '@storybook/addon-storysource',
    'storybook-addon-render-modes',
  ],
  framework: '@storybook/react-vite',
  viteFinal: config => {
    if (!process.env.BE_ENV) {
      throw new Error(ERR_NO_BE_ENV_FLAG);
    }

    return mergeConfig(config, {
      mode: process.env.BE_ENV || ENVS.PROD,
      optimizeDeps: {
        include: ['@storybook/addon-essentials', '@storybook/addon-links'],
      },
    });
  },
};
