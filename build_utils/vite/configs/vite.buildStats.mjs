/**
 * This is the Vite visualizer configuration file.
 * @file This file is saved as `vite.visualizer.js`.
 */
import { BUILD_TYPE } from '../../config/index.mjs';
import buildStats from '../customPlugins/buildStatsPlugin.mjs';

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

  const path = `distInfo/${buildType}/${process.env.LIB_ENV}/buildStats`;

  return {
    plugins: [buildStats(`${path}/${timestamp}.json`)],
  };
};

export default getConfig;
