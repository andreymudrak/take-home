import React, { useState } from "react";
import { useCatImages } from "./hooks/useCatImages";

import { Switch } from './components/Switch'; 
import "./App.css";

function App() {
  const images = useCatImages();
  const [showBread, setShowBread] = useState(false);
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
    </>
  );
}

export default App;
