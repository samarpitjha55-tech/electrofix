import React from 'react';
import { render } from '@testing-library/react-native';
import Login from '../src/screens/Login';

describe('Login', () => {
  it('renders the login screen', () => {
    const { getByText } = render(<Login />);
    expect(getByText('Login')).toBeTruthy();
  });
});
