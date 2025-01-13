/**
 * This file contains all the configuration for the build of the project.
 * @file The file is saved as `build_utils/config/index.js`.
 */
const ENVS = {
  PROD: 'production',
  BETA: 'beta',
  STG: 'staging',
  DEV: 'development',
};

const BUILD_TYPE = {
  SVGR: 'svgr',
  MAIN: 'main',
  STORYBOOK: 'storybook',
};

export { ENVS, BUILD_TYPE };
