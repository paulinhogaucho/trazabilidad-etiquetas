import React from 'react';

function ImageUploader({ serialNumber, images }) {

  const uploadImages = async () => {
    if (images.length === 0) {
        alert('No images to upload');
        return;
    }

    const formData = new FormData();
    formData.append('serialNumber', serialNumber);

    images.forEach((image, index) => {
        const blob = dataURItoBlob(image);
        formData.append('images', blob, `image_${index + 1}.png`);
    });

    try {
        const response = await fetch('http://localhost:5000/api/upload', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            alert('✅ Images uploaded to S3 successfully');
        } else {
            const errorText = await response.text();
            alert(`❌ Image upload failed: ${errorText}`);
        }
    } catch (error) {
        console.error('Upload error:', error);
        alert('❌ Upload error (check console)');
    }
};



  // Helper to convert base64 to Blob
  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }
    return new Blob([uint8Array], { type: mimeString });
  };

  return (
    <div>
      <h3>Serial Number: {serialNumber}</h3>
      <button onClick={uploadImages} disabled={images.length === 0}>
        Upload Images
      </button>
      {images.length > 0 && (
        <div>
          {images.map((img, idx) => (
            <img key={idx} src={img} alt={`Preview ${idx + 1}`} width="100" />
          ))}
        </div>
      )}
    </div>
  );
}

export default ImageUploader;
