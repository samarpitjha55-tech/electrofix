import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../App';

jest.mock('../src/AppNavigator', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return () => <Text>Hello, world!</Text>;
});
jest.mock('react-native-gesture-handler', () => {
  const View = require('react-native/Libraries/Components/View/View');
  return {
    GestureHandlerRootView: View,
    RectButton: View,
    PanGestureHandler: View,
    State: {},
  };
});
jest.mock('react-native-reanimated', () => ({
  ...require('react-native-reanimated/mock'),
  useSharedValue: jest.fn,
  useAnimatedStyle: jest.fn,
  withTiming: jest.fn,
  withSpring: jest.fn,
}));
jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  getDocs: jest.fn(),
}));

describe('App', () => {
  it('renders the correct text', () => {
    const { getByText } = render(<App />);
    expect(getByText('Hello, world!')).toBeTruthy();
  });
});
