/**
 * Unit tests for the ComponentWithSuspense component.
 * @file The file is saved as `ComponentWithSuspense.test.jsx`.
 */
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

import ComponentWithSuspense from '../ComponentWithSuspense';

jest.mock('../../organisms/Loader', () => ({
  default: jest.fn(() => <div data-testid="mock-loader" />),
}));

describe('ComponentWithSuspense unit tests', () => {
  afterEach(() => {
    cleanup();
  });
  /**
   * Mock component for testing purposes.
   * @returns {import('react').JSX.Element} The rendered component.
   * @example
   * <Component />
   */
  function Component() {
    return <div data-testid="mock-component" />;
  }

  /**
   * Fallback component for testing purposes.
   * @returns {import('react').JSX.Element} The rendered fallback component.
   * @example
   * <Fallback />
   */
  function Fallback() {
    return <div data-testid="mock-fallback" />;
  }

  test('ComponentWithSuspense snapshot test', () => {
    const component = render(
      <ComponentWithSuspense component={<Component />} />,
    );

    expect(component).toMatchSnapshot();
  });

  test('ComponentWithSuspense with fallback', () => {
    const { getByTestId } = render(
      <ComponentWithSuspense
        component={<Component />}
        fallback={<Fallback />}
      />,
    );

    expect(getByTestId('mock-component')).toBeInTheDocument();
  });
});
