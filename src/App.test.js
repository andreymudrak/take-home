import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import { act, renderHook } from "@testing-library/react-hooks";

import { useCatImages } from "./hooks/useCatImages";

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

describe('App', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it("renders learn react link", () => {
    const { getByText } = render(<App />);
    const heading = getByText(/images of cats/i);
    expect(heading).toBeInTheDocument();
  });

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

  it("make request when scroll down", async () => {

    const { getByTestId } = render(<App />);
    const { result } = renderHook(() => useCatImages());

    const mockFn = jest.fn();
    const useLoadNextPageSpy = jest.spyOn(result.current, 'loadNextPage');
    useLoadNextPageSpy.mockReturnValue(mockFn);

    const intersectionNode = getByTestId("intersection");
    intersectionNode.scroll(intersectionNode);
    await act(() => Promise.resolve());

    expect(mockFn).toHaveBeenCalled();
  });

  it("should show image without with match search", async () => {
    const { getByTestId, getByText } = render(<App />);

    await act(() => Promise.resolve());
    
    const switchNode = getByTestId('switch');
    fireEvent.click(switchNode); 
    
    const searchNode = getByTestId('search');
    fireEvent.change(searchNode, { target: { value: 'ori' } });

    expect(getByText("Name: Orion")).toBeInTheDocument();
  });

  it("should show image without with out match search", async () => {
    const { queryAllByRole, getByTestId } = render(<App />);

    await act(() => Promise.resolve());
    
    const switchNode = getByTestId('switch');
    fireEvent.click(switchNode); 
    
    const searchNode = getByTestId('search');
    fireEvent.change(searchNode, { target: { value: 'saturn' } });
   
    const triggerNodes = queryAllByRole('img');
    expect(triggerNodes.length).toEqual(0);
  });
});
