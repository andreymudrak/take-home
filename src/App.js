import React, { useEffect, useState, useRef } from "react";
import { useIntersection } from 'react-use';
import { useCatImages } from "./hooks/useCatImages";

import { Switch } from './components/Switch'; 
import "./App.css";

function App() {
  const { images, loading, loadNextPage } = useCatImages();
  const [showBread, setShowBread] = useState(false);
  const intersectionRef = useRef(null);

  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: '20px',
    threshold: 1,
  });

  useEffect(() => {
    console.log(intersection)
    if (intersection && (intersection.intersectionRatio === 1) && !loading) {
      console.log(123)
      loadNextPage();
    }
  }, [intersection]);

  const onShowDescription = (e) => {
    const { checked } = e.target;
    setShowBread(checked);
  };
  
  return (
    <>
      <h1>Images of Cats</h1>
      <Switch label="Show bread information" checked={showBread} onChange={onShowDescription} />
      <ul>
        {images.map(({ id, height, url, width, breeds = []}) => {
          if (showBread && !breeds.length) {
            return null;
          }

          return (
            <li key={id}>
              {showBread && (
                <div className="breeds">
                  <span>Name: {breeds?.[0].name}</span>
                  <span>Description: {breeds?.[0].temperament}</span>
                </div>
              )}
              <img src={url} alt={id} height={height} width={width} />
            </li>
          );
        })}
      </ul>
      <div ref={intersectionRef} data-testid="intersection" />
    </>
  );
}

export default App;
