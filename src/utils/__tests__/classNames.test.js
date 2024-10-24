/**
 * Unit test for classNames function.
 * @file This file is saved as `classNames.test.js`.
 */
import '@testing-library/jest-dom';

import classNames from '../classNames';
import { log } from '../logsUtils';

describe('classNames unit test', () => {
  it('testing classNames in case of single class', () => {
    const classes = ['a'];
    log('classes', classes);
    const res = classNames(...classes);
    log('res', res);
  });

  it('testing classNames in case of multiple classes', () => {
    const classes = ['a', 'a', 'b', {}];
    log('classes', classes);
    const res = classNames(...classes);
    log('res', res);
  });

  it('testing classNames in case of multiple classes', () => {
    const classes = ['a', 'a', 'b'];
    log('classes', classes);
    const res = classNames(classes);
    log('res', res);
  });

  it('testing classNames in case of multiple classes when one class has true condition', () => {
    const classes = ['a', { b: true }];
    log('classes', classes);
    const res = classNames(...classes);
    log('res', res);
  });

  it('testing classNames in case of multiple classes when one class has true condition', () => {
    const classes = ['a', { b: false }];
    log('classes', classes);
    const res = classNames(...classes);
    log('res', res);
  });
});
