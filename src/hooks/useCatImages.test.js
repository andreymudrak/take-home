import { act, renderHook } from "@testing-library/react-hooks";
import { useCatImages } from "./useCatImages";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        {
          breeds: [],
          id: "211",
          url: "https://cdn2.thecatapi.com/images/211.jpg",
          width: 500,
          height: 340,
        },
        {
          breeds: [],
          id: "212",
          url: "https://cdn2.thecatapi.com/images/212.jpg",
          width: 500,
          height: 340,
        },
        {
          breeds: [],
          id: "213",
          url: "https://cdn2.thecatapi.com/images/213.jpg",
          width: 500,
          height: 340,
        },
        {
          breeds: [],
          id: "214",
          url: "https://cdn2.thecatapi.com/images/214.jpg",
          width: 500,
          height: 340,
        },
        {
          breeds: [],
          id: "215",
          url: "https://cdn2.thecatapi.com/images/215.jpg",
          width: 500,
          height: 340,
        },
      ]),
  })
);

describe("useCatImages", () => {
  it("should return images", async () => {
    const { result } = renderHook(() => useCatImages());
    result.current.loadNextPage();

    // wait for async code in the hook to finish
    // See, e.g.: https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning#2-when-testing-custom-hooks
    await act(() => Promise.resolve());

    expect(result.current.images.length).toBe(5);
    expect(result.current.images[0].id).toBe("211");
    expect(result.current.images[1].url).toBe(
      "https://cdn2.thecatapi.com/images/212.jpg"
    );
  });

  it("should return no more than 20", async () => {
    const { result } = renderHook(() => useCatImages());

    result.current.loadNextPage();
    await act(() => Promise.resolve());
    expect(result.current.images.length).toBe(5);

    result.current.loadNextPage();
    await act(() => Promise.resolve());
    expect(result.current.images.length).toBe(10);

    result.current.loadNextPage();
    await act(() => Promise.resolve());
    expect(result.current.images.length).toBe(15);

    result.current.loadNextPage();
    await act(() => Promise.resolve());
    expect(result.current.images.length).toBe(20);

    result.current.loadNextPage();
    await act(() => Promise.resolve());
    expect(result.current.images.length).toBe(20);
  });
});
