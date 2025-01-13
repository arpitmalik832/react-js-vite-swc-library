/**
 * Common paths for the project build.
 * @file The file is saved as `build_utils/config/commonPaths.js`.
 */
import { resolve, join } from 'path';

const PROJECT_ROOT = resolve();

const projectRootPath = PROJECT_ROOT;
const entryPath = join(PROJECT_ROOT, 'index.html');
const outputPath = join(PROJECT_ROOT, 'dist');
const storybookOutputPath = join(PROJECT_ROOT, 'storybook-static');
const chunkManifestPath = join(outputPath, 'chunk-manifest.json');
const storybookChunkManifestPath = join(
  storybookOutputPath,
  'chunk-manifest.json',
);
const iconsPath = join(PROJECT_ROOT, 'src', 'assets', 'icons');
const iconsListPath = join(PROJECT_ROOT, 'static', 'enums', 'icons_list.mjs');
const distInfoPath = join(PROJECT_ROOT, 'distInfo');

export {
  projectRootPath,
  entryPath,
  outputPath,
  chunkManifestPath,
  storybookChunkManifestPath,
  iconsPath,
  iconsListPath,
  distInfoPath,
};
