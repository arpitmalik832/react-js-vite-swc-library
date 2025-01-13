/**
 * Unit tests for components/organisms/index.js file.
 * @file This file is saved as `index.test.js`.
 */
import '@testing-library/jest-dom';

import * as e from '../index';

describe('index.ts exports', () => {
  it('snapshot test', () => {
    expect(e).toMatchSnapshot();
  });

  it('should export Loader', () => {
    expect(e).toHaveProperty('Loader');
  });
});
