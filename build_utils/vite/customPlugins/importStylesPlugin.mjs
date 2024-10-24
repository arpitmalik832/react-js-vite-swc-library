/**
 * Add styles import statement to the main index file.
 * @file This file is saved as `importStyles.js`.
 */
import { ENVS } from '../../config/index.mjs';

/**
 * A Rollup plugin to import styles.
 * @returns {object} The Rollup plugin object.
 * @example
 * // Example usage:
 * importStyles();
 */
export default function importStylesPlugin() {
  return {
    name: 'import-styles-plugin',
    generateBundle(options, bundle) {
      const importPath = '../index.css';
      for (const [fileName, fileMeta] of Object.entries(bundle)) {
        if (fileName === 'esm/index.js') {
          fileMeta.code = `import "${importPath}";${![ENVS.PROD, ENVS.BETA].includes(process.env.LIB_ENV) ? '\n' : ''}${fileMeta.code}`;
        } else if (fileName === 'cjs/index.js') {
          fileMeta.code = `require("${importPath}");${![ENVS.PROD, ENVS.BETA].includes(process.env.LIB_ENV) ? '\n' : ''}${fileMeta.code}`;
        }
      }
    },
  };
}
