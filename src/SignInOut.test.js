import React from 'react';
import SignInOut from './SignInOut';
import {render, fireEvent, cleanup, waitForElement} from 'react-testing-library';

let app;

beforeAll(() => {
  app = render(<SignInOut />);
});

test('renders <SignInOut/>', async () => {
  expect(app).toMatchSnapshot();
});