/**
 * This is the Vite configuration file.
 * @file This file is saved as `vite.config.js`.
 */
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';
import compression from 'vite-plugin-compression';
import postcssPresetEnvPlugin from 'postcss-preset-env';
import autoprefixerPlugin from 'autoprefixer';

import svgrConfig from '../../../svgr.config.mjs';
import stripCustomWindowVariablesPlugin from '../customPlugins/stripCustomWindowVariablesPlugin.mjs';
import { ENVS } from '../../config/index.mjs';
import copyPlugin from '../customPlugins/copyPlugin.mjs';
import importStylesPlugin from '../customPlugins/importStylesPlugin.mjs';
import { pathChecks } from '../utils/pathUtils';

const config = {
  plugins: [
    svgr({
      svgrOptions: svgrConfig,
      include: '**/*.svg',
    }),
    react(),
    [ENVS.PROD, ENVS.BETA].includes(process.env.LIB_ENV) &&
      stripCustomWindowVariablesPlugin({
        variables: ['abc'],
      }),
    importStylesPlugin(),
    copyPlugin(),
    compression({
      deleteOriginFile: false,
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
  ],
  define: {
    'process.env.APP_ENV': JSON.stringify(process.env.APP_ENV),
    'process.env.PUBLIC_URL': JSON.stringify(process.env.PUBLIC_URL),
  },
  esbuild: {
    drop: process.env.LIB_ENV === ENVS.PROD ? ['debugger'] : [],
  },
  css: {
    postcss: {
      plugins: [postcssPresetEnvPlugin, autoprefixerPlugin],
    },
  },
  build: {
    outDir: 'dist',
    minify: [ENVS.PROD, ENVS.BETA].includes(process.env.LIB_ENV),
    sourcemap: ![ENVS.PROD, ENVS.BETA].includes(process.env.LIB_ENV),
    lib: {
      entry: ['src/index.js'],
    },
    rollupOptions: {
      external: [/node_modules/],
      output: [
        {
          format: 'esm',
          entryFileNames: `esm/lib.js`,
          assetFileNames: assetInfo => {
            if (assetInfo.name.endsWith('.css')) {
              return `index.css`;
            }
            return `esm/assets/[name].[ext]`;
          },
          paths: id => pathChecks(id),
        },
        {
          format: 'cjs',
          entryFileNames: `cjs/lib.js`,
          assetFileNames: assetInfo => {
            if (assetInfo.name.endsWith('.css')) {
              return `index.css`;
            }
            return `cjs/assets/[name].[ext]`;
          },
          paths: id => pathChecks(id),
        },
      ],
    },
  },
};

export default config;
