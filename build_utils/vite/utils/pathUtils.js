/**
 * This file contains the path checks for the Vite build.
 * @file The file is saved as `build_utils/vite/utils/pathUtils.js`.
 */
import { SPECIAL_IMPORTS } from '../../config/index.mjs';

export const pathChecks = id => {
  // Convert absolute paths to package names
  if (id.includes('node_modules')) {
    const parts = id.split('node_modules/');
    const packagePath = parts[parts.length - 1];

    // Handle special imports first
    if (
      SPECIAL_IMPORTS.some(specialPath => packagePath.includes(specialPath))
    ) {
      return packagePath.replace(/\.js$/, '');
    }

    // Handle scoped packages and regular packages
    const matches = packagePath.match(/@[^/]+\/[^/]+|[^/]+/);
    return matches ? matches[0] : packagePath;
  }
  return id;
};
