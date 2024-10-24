/**
 * Unit tests for logsUtils.
 * @file This file is saved as `logsUtils.test.js`.
 */
import '@testing-library/jest-dom';

import {
  log,
  errorLog,
  warnLog,
  debugLog,
  traceLog,
  tableLog,
  infoLog,
} from '../logsUtils';
import { ENVS } from '../../enums/app';

describe('logUtils unit tests', () => {
  const originalNodeEnv = process.env.APP_ENV;

  beforeEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
  });

  afterEach(() => {
    process.env.APP_ENV = originalNodeEnv;
  });

  it('log unit test', () => {
    process.env.APP_ENV = ENVS.DEV;
    log('test');
    process.env.APP_ENV = ENVS.PROD;
    log('test');
  });

  it('errorLog unit test', () => {
    process.env.APP_ENV = ENVS.DEV;
    errorLog('test');
    process.env.APP_ENV = ENVS.PROD;
    errorLog('test');
  });

  it('warnLog unit test', () => {
    process.env.APP_ENV = ENVS.DEV;
    warnLog('test');
    process.env.APP_ENV = ENVS.PROD;
    warnLog('test');
  });

  it('debugLog unit test', () => {
    process.env.APP_ENV = ENVS.DEV;
    debugLog('test');
    process.env.APP_ENV = ENVS.PROD;
    debugLog('test');
  });

  it('traceLog unit test', () => {
    process.env.APP_ENV = ENVS.DEV;
    traceLog('test');
    process.env.APP_ENV = ENVS.PROD;
    traceLog('test');
  });

  it('tableLog unit test', () => {
    process.env.APP_ENV = ENVS.DEV;
    tableLog('test');
    process.env.APP_ENV = ENVS.PROD;
    tableLog('test');
  });

  it('infoLog unit test', () => {
    process.env.APP_ENV = ENVS.DEV;
    infoLog('test');
    process.env.APP_ENV = ENVS.PROD;
    infoLog('test');
  });
});
