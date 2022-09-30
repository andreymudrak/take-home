import { act, renderHook } from "@testing-library/react-hooks";
import { useCatImages } from "./useCatImages";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        {
          breeds: [],
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

describe("useCatImages", () => {
  it("should return images", async () => {
    const { result } = renderHook(() => useCatImages());

    // wait for async code in the hook to finish
    // See, e.g.: https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning#2-when-testing-custom-hooks
    await act(() => Promise.resolve());

    expect(result.current.length).toBe(2);
    expect(result.current[0].id).toBe("15o");
    expect(result.current[1].url).toBe(
      "https://cdn2.thecatapi.com/images/217.jpg"
    );
  });
});
