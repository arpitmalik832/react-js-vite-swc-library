/**
 * This is the Vite visualizer configuration file.
 * @file This file is saved as `vite.visualizer.js`.
 */
import { visualizer } from 'rollup-plugin-visualizer';

const timestamp = new Date().toISOString().replace(/:/g, '-');
const path = `distInfo/${process.env.IS_STORYBOOK === 'true' ? 'storybook' : 'main'}/${process.env.LIB_ENV}/visualizers/${timestamp}`;

const config = {
  plugins: [
    visualizer({
      filename: `${path}/sunburst.html`,
      template: 'sunburst',
    }),
    visualizer({
      filename: `${path}/list.html`,
      template: 'list',
    }),
    visualizer({
      filename: `${path}/flamegraph.html`,
      template: 'flamegraph',
    }),
    visualizer({
      filename: `${path}/network.html`,
      template: 'network',
    }),
    visualizer({
      filename: `${path}/raw-data.html`,
      template: 'raw-data',
    }),
    visualizer({
      filename: `${path}/treemap.html`,
      template: 'treemap',
    }),
  ],
};

export default config;
