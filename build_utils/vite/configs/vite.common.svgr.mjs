/**
 * This is the Vite configuration file.
 * @file This file is saved as `vite.config.js`.
 */
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';
import compression from 'vite-plugin-compression';
import postcssPresetEnvPlugin from 'postcss-preset-env';
import autoprefixerPlugin from 'autoprefixer';

import icons_list from '../../../static/enums/icons_list.mjs';
import svgrConfig from '../../../svgr.config.mjs';
import { ENVS } from '../../config/index.mjs';

const config = {
  plugins: [
    svgr({
      svgrOptions: svgrConfig,
      include: '**/*.svg',
    }),
    react(),
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
      entry: [...icons_list.map(i => `src/assets/icons/${i}`)],
    },
    rollupOptions: {
      external: [/node_modules/],
      output: [
        {
          format: 'esm',
          preserveModules: true,
          preserveModulesRoot: 'src',
          entryFileNames: `esm/[name].js`,
          chunkFileNames: `esm/[name].js`,
          assetFileNames: assetInfo => {
            if (assetInfo.name.endsWith('.css')) {
              return `index.css`;
            }
            return `esm/assets/[name].[ext]`;
          },
        },
        {
          format: 'cjs',
          preserveModules: true,
          preserveModulesRoot: 'src',
          entryFileNames: `cjs/[name].js`,
          chunkFileNames: `cjs/[name].js`,
          assetFileNames: assetInfo => {
            if (assetInfo.name.endsWith('.css')) {
              return `index.css`;
            }
            return `cjs/assets/[name].[ext]`;
          },
        },
      ],
    },
  },
};

export default config;
