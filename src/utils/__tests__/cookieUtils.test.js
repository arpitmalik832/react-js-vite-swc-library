/**
 * Unit tests for cookieUtils.
 * @file This file is saved as `cookieUtils.test.js`.
 */
import '@testing-library/jest-dom';

import { deleteCookie, getCookie, setCookie } from '../cookieUtils';

describe('classNames unit test', () => {
  it('testing setCookie', () => {
    setCookie('abc', 'xyz', 1000);
    setCookie('z', 'b');
  });

  it('testing getCookie', () => {
    getCookie('abc');
    getCookie('z');
  });

  it('testing deleteCookie', () => {
    deleteCookie('abc');
    deleteCookie('z');
  });
});
