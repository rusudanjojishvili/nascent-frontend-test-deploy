# NASCENT TAKE HOME TEST

## Assignment
Please thoroughly review the provided Assignment requirements PDF for the description.

## Candidate Notes
This frontend crypto trading platform is built with React + TypeScript. Global state is managed using React useContext, which is sufficient for the project’s scale and keeps the implementation simple. Material UI (MUI) was chosen for UI components because it provides accessible, ready-made elements and leverages my expertise for consistency and maintainability. Axios handles HTTP requests due to its clear syntax and promise-based design, simplifying asynchronous code. The project emphasizes clarity, scalability, and reusable layout as well as ui components (CustomButton, CustomTextField), with careful handling of numeric precision in forms. 

--Order Placement & Execution Logic: 

Double-click confirmation:
Orders require a double click to execute, preventing accidental placements.

Order types:
Users can place both LIMIT and MARKET orders by selecting the desired type in the order form.

Total calculation:
The total cost/value is automatically calculated based on the entered price and quantity.

The total cost/value is displayed in a disabled (read-only) input, but the calculation differs depending on the order type:

LIMIT Orders:
The total is calculated directly from the user-entered values:
total = price × quantity.
Since both price and quantity are explicitly provided by the user, the total value reflects the exact intended cost of the LIMIT order.

MARKET Orders:
For MARKET orders, the user does not enter a price.
Instead, the system calculates the total based on the current market depth, using the weighted average price (VWAP) of the required quantity.
This ensures the total reflects the actual expected execution cost given real available liquidity.
The calculated average price and total are shown in disabled fields purely for user visibility and are not sent as inputs for order placement.

Market order behavior:
For MARKET orders, the price is not sent to the backend.
Instead, an average execution price (VWAP) is calculated and shown to the user in a disabled input for reference only.

-- OrderForm Price Behavior

The OrderForm component automatically manages the price field based on the selected order type and market data. The behavior follows these rules:

--Switching to MARKET orders

When the user changes the order type to MARKET, the price field is automatically filled with the current marketNotional.price.

If the marketNotional.price changes (e.g., due to quantity changes), the price updates automatically while the type is still MARKET.

--Switching to LIMIT orders

When the user changes the order type to LIMIT, the price field is cleared to allow manual entry.

The price is not cleared or overwritten when the user updates the quantity for a LIMIT order.

--Changing quantity

For MARKET orders, changing the quantity recalculates marketNotional and updates the price accordingly.

For LIMIT orders, changing the quantity does not affect the price; the user-entered value is preserved.

--Selected orders from the order book

If the trader selects an order from the order book (state.selectedOrder), the form respects the selected order values and does not automatically overwrite price when order.type or quantity changes.

--Interaction With Order Book Table:

When the user clicks on a row in the order book:

Order execution:
A LIMIT order is immediately created and executed using:

The quantity from the order form, and the price from the selected order book row.

Form auto-fill:
The order form inputs are automatically populated with the selected row’s values.

Side detection:
The order side is determined based on the source of the row:

If the user clicked on the asks, the side becomes BUY.

If they clicked on the bids, the side becomes SELL.

## About the Template

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode along with the mock server\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
The mock server is running on [http://localhost:3001](http://localhost:3001).

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
