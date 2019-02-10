import React from 'react';
import App from './Stock';
import {render, fireEvent, cleanup, waitForElement} from 'react-testing-library';

let getByTestId;

test('renders App', async () => {
  const temp = render(<App />);
  expect(temp).toBeTruthy();
});

// describe('When fetch is working:', () => {
//   beforeAll(() => {
//     cleanup();
//     fetch = jest.fn()
//       .mockImplementationOnce(() => new Promise(resolve => resolve({json: () => [
//         {
//           close: 100,
//           date: "20190208",
//           minute: "09:30",
//         },
//         {
//           close: 200,
//           date: "20190208",
//           minute: "09:31",
//         }
//       ]})))
//       .mockImplementationOnce(() => new Promise(resolve => resolve({json: () => [
//         {
//           close: 50,
//           date: "2019-02-08",
//         }
//       ]})));
//     const dateYesterday = new Date(Date.now() - 864e5).toISOString().split('T')[0].replace(/-/g,'');
//     const dateToday = new Date().getDate();
//     const temp = render(<Stock symbol={'APPL'} dateToday={dateToday} dateYesterday={dateYesterday} canvasSize={{height: 35, width: 100}}/>);
//     getByTestId = temp.getByTestId;
//   })
  
//   test('renders canvas', async () => {
//     const canvas = await waitForElement(() => getByTestId('canvas'));
//     expect(canvas).toBeTruthy();
//   });
  
//   test('renders price', async () => {
//     const price = await waitForElement(() => getByTestId('price'));
//     // console.log('%c⧭', 'color: #00a3cc', price.toHaveTextContent);
//     expect(price).toBeTruthy();
//   });
  
//   test('price is correct', async () => {
//     const price = await waitForElement(() => getByTestId('price'));
//     // console.log('%c⧭', 'color: #00a3cc', price.toHaveTextContent);
//     expect(price).toHaveTextContent('200');
//   });

//   test('renders change', async () => {
//     const change = await waitForElement(() => getByTestId('change'));
//     expect(change).toBeTruthy();
//   });

//   test('change is correct', async () => {
//     const change = await waitForElement(() => getByTestId('change'));
//     expect(change).toHaveTextContent('150 (300%)');
//   });
// })