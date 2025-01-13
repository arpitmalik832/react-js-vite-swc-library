/**
 * This is the Vite configuration file.
 * @file This file is saved as `vite.config.js`.
 */
import { defineConfig, mergeConfig } from 'vite';

import commonConfig from './build_utils/vite/configs/vite.common.svgr.mjs';
import buildStatsConfig from './build_utils/vite/configs/vite.buildStats.mjs';
import visualizerConfig from './build_utils/vite/configs/vite.visualizer.mjs';
import {
  ERR_NO_APP_ENV_FLAG,
  ERR_NO_LIB_ENV_FLAG,
} from './build_utils/config/logs.mjs';
import { BUILD_TYPE } from './build_utils/config/index.mjs';

/**
 * Get additional Vite configurations based on command line arguments.
 * @returns {Array} An array of additional Vite configurations.
 * @example
 * // To add visualizer configuration
 * const addons = getAddons();
 */
function getAddons() {
  const addVisualizer = process.env.INCLUDE_VISUALIZER === 'true';
  const addBuildStats = process.env.INCLUDE_BUILD_STATS === 'true';

  const configs = [];
  if (addVisualizer) configs.push(visualizerConfig(BUILD_TYPE.SVGR));
  if (addBuildStats) configs.push(buildStatsConfig(BUILD_TYPE.SVGR));

  let result = {};
  if (configs.length > 1) {
    result = configs.reduce((acc, config) => mergeConfig(acc, config));
  } else if (configs.length === 1) {
    [result] = configs;
  }

  return result;
}

/**
 * Get the Vite configuration based on the environment.
 * @returns {object} The Vite configuration object.
 * @throws {Error} Throws an error if LIB_ENV is not defined.
 * @example
 * // To get the configuration
 * const config = getConfig();
 */
function getConfig() {
  if (!process.env.LIB_ENV) {
    throw new Error(ERR_NO_LIB_ENV_FLAG);
  }
  if (!process.env.APP_ENV) {
    throw new Error(ERR_NO_APP_ENV_FLAG);
  }

  return defineConfig(mergeConfig(commonConfig, getAddons()));
}

export default getConfig;
