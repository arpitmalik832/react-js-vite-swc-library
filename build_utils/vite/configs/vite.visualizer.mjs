/**
 * This is the Vite visualizer configuration file.
 * @file This file is saved as `vite.visualizer.js`.
 */
import { visualizer } from 'rollup-plugin-visualizer';
import { distInfoPath } from '../../config/commonPaths.mjs';
import { BUILD_TYPE } from '../../config/index.mjs';

const getConfig = type => {
  const timestamp = new Date().toISOString().replace(/:/g, '-');
  let buildType;

  if (process.env.IS_STORYBOOK === 'true') {
    buildType = BUILD_TYPE.STORYBOOK;
  } else if (type === BUILD_TYPE.SVGR) {
    buildType = BUILD_TYPE.SVGR;
  } else {
    buildType = BUILD_TYPE.MAIN;
  }

  const path = `${distInfoPath}/${buildType}/${process.env.LIB_ENV}/visualizers/${timestamp}`;

  return {
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
};

export default getConfig;
