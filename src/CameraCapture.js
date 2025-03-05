import React, { useState, useRef, useEffect } from 'react';

function CameraCapture({ onImagesCapture }) {
  const [images, setImages] = useState([]);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
      } catch (err) {
        console.error("Error accessing the camera:", err);
      }
    }
    startCamera();
  }, []);

  const captureImage = () => {
    if (images.length >= 6) {
      alert("Max 6 images allowed!");
      return;
    }

    const context = canvasRef.current.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
    const imageData = canvasRef.current.toDataURL("image/png");

    const updatedImages = [...images, imageData];
    setImages(updatedImages);
    onImagesCapture(updatedImages); // Sync with parent
  };

  const deleteImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    onImagesCapture(updatedImages);
  };

  const resetImages = () => {
    setImages([]);
    onImagesCapture([]);
  };

  return (
    <div>
      <h2>Capture Images of the Tags</h2>
      <video ref={videoRef} width="500" autoPlay></video>
      <canvas ref={canvasRef} width="300" height="200" style={{ display: 'none' }}></canvas>

      <div>
        <button 
          onClick={captureImage} 
          style={{ width: "150px", height: "50px" }}
        >
          Capture Image
        </button>
      </div>

      <div>
        <button 
          onClick={resetImages} 
          disabled={images.length === 0}
        >
          Reset All Images
        </button>
      </div>

      {images.length > 0 && (
        <div>
          <h3>Captured Images:</h3>
          <div>
            {images.map((image, index) => (
              <div key={index} style={{ position: 'relative', display: 'inline-block', margin: '5px' }}>
                <img src={image} alt={`Captured ${index + 1}`} width="150" />
                <button 
                  onClick={() => deleteImage(index)} 
                  style={{ position: 'absolute', top: 0, right: 0, backgroundColor: 'red', color: 'white' }}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CameraCapture;
