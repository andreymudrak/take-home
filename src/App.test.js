import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import { act } from "@testing-library/react-hooks";

import App from "./App";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        {
          breeds: [{
            name: "Orion",
            temperament: "Active, Energetic, Independent, Intelligent, Gentle",
          }],
          categories: [
            {
              id: 4,
              name: "sunglasses",
            },
          ],
          id: "15o",
          url: "https://cdn2.thecatapi.com/images/15o.jpg",
          width: 500,
          height: 400,
        },
        {
          breeds: [],
          id: "217",
          url: "https://cdn2.thecatapi.com/images/217.jpg",
          width: 500,
          height: 340,
        },
      ]),
  })
);

test("renders learn react link", () => {
  const { getByText } = render(<App />);
  const heading = getByText(/images of cats/i);
  expect(heading).toBeInTheDocument();
});

describe('Container "Notification Bell"', () => {
  afterEach(cleanup);

  it("should show all images without description", async () => {
    const { getAllByRole, queryByText } = render(<App />);

    await act(() => Promise.resolve());

    const triggerNodes = getAllByRole('img');

    expect(triggerNodes.length).toBe(2);
    expect(queryByText("Name: Orion")).not.toBeInTheDocument();
    expect(queryByText("Description: Active, Energetic, Independent, Intelligent, Gentle")).not.toBeInTheDocument();
  });

  it("should show only images with bread", async () => {
    const { getAllByRole, getByTestId, getByText } = render(<App />);

    await act(() => Promise.resolve());
    
    const switchNode = getByTestId('switch');
    fireEvent.click(switchNode); 
    
    const triggerNodes = getAllByRole('img');

    expect(triggerNodes.length).toBe(1);
    expect(getByText("Name: Orion")).toBeInTheDocument();
    expect(getByText("Description: Active, Energetic, Independent, Intelligent, Gentle")).toBeInTheDocument();
  });
});
