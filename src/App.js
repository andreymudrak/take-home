import React, { useEffect, useState, useRef } from "react";
import { useIntersection } from 'react-use';
import { useCatImages } from "./hooks/useCatImages";

import { Switch } from './components/Switch'; 
import "./App.css";

function App() {
  const { images, loading, loadNextPage } = useCatImages();
  const [showBread, setShowBread] = useState(false);
  const intersectionRef = useRef(null);
  const [searchName, setSearchName] = useState('');
  const [mobile, setMobile] = useState(false);

  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: '20px',
    threshold: 1,
  });

  useEffect(() => {
    console.log(intersection)
    if (intersection && (intersection.intersectionRatio === 1) && !loading && !showBread) {
      console.log(123)
      loadNextPage();
    }
  }, [intersection]);

  const onShowDescription = (e) => {
    const { checked } = e.target;
    setShowBread(checked);
    setSearchName('')
  };

  const onSearchChange = (e) => {
    const { value } = e.target;
    setSearchName(value.toLowerCase());
  };

  const onSetMobile = (e) => {
    const { checked } = e.target;
    setMobile(checked);
  };

  return (
    <div className={mobile ? "mobile" : ""}>
      <h1>Images of Cats</h1>
      <Switch label="Show bread information" checked={showBread} onChange={onShowDescription} />
      <Switch label="Mobile version" checked={mobile} onChange={onSetMobile} />

      {showBread && (
        <>
          <span>Search: </span>
          <input onChange={onSearchChange} data-testid="search"/>
        </>
      )}
      <ul>
        {images.map(({ id, height, url, width, breeds = []}) => {
          if (showBread && (!breeds.length || !breeds[0].name.toLowerCase().includes(searchName))) {
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
    </div>
  );
}

export default App;
