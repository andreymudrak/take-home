import { useEffect, useState } from 'react';

export function useCatImages(deps = []) {
  const [images, setImages] = useState([])

  const fetchData = async () => {
    try {
      const result = await fetch(
        "https://api.thecatapi.com/v1/images/search?limit=5"
      ).then((res) => res.json());
      setImages(result);
    } catch (e) {
      console.error("fetch failed!");
      console.error(e);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  return images;
}
