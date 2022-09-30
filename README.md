# FIGS Frontend Take-home Exercise

This exercise should take 3-6 hours to complete, but if you want to spend more time then knock yourself out.  Please feel free to use any packages and tools you deem useful or necessary

## Prequisites

A basic knowledge of JavaScript, React 16, CSS, and the Fetch API. Brush up if you need to.

## The Problem

Today we're going to be messing around with fetching data and layouts.

There are five parts to this test:

1. Fixing a bug in this application's existing code.
2. Implement a new feature request for additional information
3. Implement a new feature pagination on scroll 
4. Implement a new feature for search
5. Implementing a layout for the application.

The application fetches pictures of cats from [TheCatAPI](https://thecatapi.com/) and displays pictures for the user.

### Part 1: The Bug

The existing code does not successfully fetch any images. Please fix this!

Requirements:
  - Application displays images
  - Existing unit test file (`useCatImages.test.js`) should pass when you have fixed the problem. There is no need to modify this file.

### Part 2: Feature request - Cat breed information

Currently the application only displays images of cats, in addition to this we would like to have the breed name and description of each cat displayed above the image when a toggle has been switched on, this information should also be hidden when toggled off.  In order to complete this task additional information must be retrieved, please refer to the [TheCatAPI](https://thecatapi.com/) documenation.

Requirements:
 - Add appropriate unit tests to verify your implementation. 
 - Updated feed should only display images of cats which have breed information
 - Display name and description above the cat image, the name should be above the description on seperate lines

### Part 3: Feature request - Implement pagination on scroll

Currently the application only makes a single request for 5 images of cats.  We want to add the ability to fetch and display more images when a user has scrolled to the bottom of the current set of images.

Requirements:
  - Add appropriate unit tests to verify your implementation.
  - Each additional request should only fetch 5 images
  - Limit the total number of fetched images to 20
  - If the breed information toggle has been switched on, newly fetched images should display the breed information

### Part 4: Feature request - Search bar

Implement a search bar at the top of the page which is only displayed when the display breed toggle is switched on.  This should allow a user to search the the currently displayed cats by breed 

Requirements:
  - Add appropriate unit tests to verify your implementation.
  - Search by breed name only
  - Disable infinite scroll upon search
  - Only displayed when breed toggle is switched on

### Part 5: The Layout

We need to implement a layout for this app to display images sanely on devices.

The layout rules are as follows:

| Device  | Breakpoint                     | Columns | Layout Width                                                                                                         |
| ------- | ------------------------------ | ------- | -------------------------------------------------------------------------------------------------------------------- |
| Phone   | max width of `812px`           | 1       | images must maintain a 1:1 aspect ratio, be horizontally centered and take up a width of `90vw`                             |
| Desktop | min width greater than `812px` | 3       | images must maintain a 1:1 aspect ratio, take up 3 columns and have equal whitespace on each side and in-between each image |

Requirements:
  - Build the layout according to the provided rules.
  - Build a toggle button to let the user toggle between the two layouts regardless of viewport.
  - Add appropriate unit tests to verify your implementation.

There is a sample test which tests the basic one column layout as currently implemented.

### Bonus Points

If you are so inclined:

1. Add loading and error states so the users has some indication if the API still has not responded or responded with an error.
2. Add a basic transition animation for the images so that they don't just suddenly appear on the page.

## Submittal 
Please create a detailed PR when submitting these changes

## Development

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
