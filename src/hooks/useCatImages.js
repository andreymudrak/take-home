import { useState, useCallback, useEffect } from 'react';

export function useCatImages() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      const result = await fetch(
        "https://api.thecatapi.com/v1/images/search?limit=5"
      ).then((res) => res.json());
      setImages([...images, ...result]);

      setLoading(false);
    } catch (e) {
      setLoading(false);

      console.error("fetch failed!");
      console.error(e);
    }
  }, [images])

  useEffect(() => {
    fetchData();
  }, [])

  const loadNextPage = useCallback(() => {
    if(images.length >= 20) {
      return;
    }

    fetchData();
  }, [fetchData, images.length]);

  return { images, loading, loadNextPage };
}
