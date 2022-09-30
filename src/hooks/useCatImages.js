export function useCatImages(deps = []) {
  let images = [];

  try {
    const images = fetch(
      "https://api.thecatapi.com/v1/images/search?limit=5"
    ).then((res) => res.json());
  } catch (e) {
    console.error("fetch failed!");
    console.error(e);
  }

  return images;
}
