import React from "react";
import { useCatImages } from "./hooks/useCatImages";
import "./App.css";

function App() {
  const images = useCatImages();

  return (
    <>
      <h1>Images of Cats</h1>
      <ul>
        {images.map(({ id, height, url, width }) => (
          <li key={id}>
            <img src={url} alt={id} height={height} width={width} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
