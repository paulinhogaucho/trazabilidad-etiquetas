import React, { useState } from 'react';
import './App.css';
import SerialNumberInput from './SerialNumberInput';
import CameraCapture from './CameraCapture';
import ImageUploader from './ImageUploader';

function App() {
  const [serialNumber, setSerialNumber] = useState('');
  const [images, setImages] = useState([]);

  const handleSerialNumberSubmit = (serial) => {
    setSerialNumber(serial);
  };

  const handleImagesUpload = (newImages) => {
    setImages(newImages);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Trazabilidad de etiquetas</h1>
        {!serialNumber ? (
          <SerialNumberInput onSubmit={handleSerialNumberSubmit} />
        ) : (
          <>
            <CameraCapture onImagesCapture={handleImagesUpload} />
            <ImageUploader serialNumber={serialNumber} images={images} />
          </>
        )}
      </header>
    </div>
  );
}

export default App;
