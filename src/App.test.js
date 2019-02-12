import React from 'react';
import App from './App';
import {render, fireEvent, cleanup, waitForElement} from 'react-testing-library';

let app;

beforeAll(() => {
  app = render(<App />);
});

test('renders <App/>', async () => {
  expect(app).toMatchSnapshot();
});