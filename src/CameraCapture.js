import React, { useState, useRef } from 'react';

function CameraCapture({ onImagesCapture }) {
  const [images, setImages] = useState([]);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Start the camera when the component loads
  React.useEffect(() => {
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

  // Capture a frame from the video
  const captureImage = () => {
    const context = canvasRef.current.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
    const imageData = canvasRef.current.toDataURL("image/png");

    // Add the captured image to the images array
    setImages((prevImages) => [...prevImages, imageData]);
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
        {images.length > 0 && (
          <div>
            <h3>Captured Images:</h3>
            {images.map((image, index) => (
              <img key={index} src={image} alt={`Captured ${index + 1}`} width="150" />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

export default CameraCapture;
