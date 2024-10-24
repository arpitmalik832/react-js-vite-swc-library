/**
 * Unit test for arrayUtils.
 * @file This file is saved as `arrayUtils.test.js`.
 */
import '@testing-library/jest-dom';

import { deduplicate } from '../arrayUtils';
import { log } from '../logsUtils';

describe('arrayUtils unit test', () => {
  it('testing deduplicate unit tests', () => {
    const arr = ['a', 'a', 'b'];
    log('old arr', arr);
    const newArr = deduplicate(arr);
    log('new arr', newArr);
  });
});
