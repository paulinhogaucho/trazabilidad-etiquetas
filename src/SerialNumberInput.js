import React, { useState } from 'react';

function SerialNumberInput({ onSubmit }) {
  const [serialNumber, setSerialNumber] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(serialNumber);
  };

  return (
    <div>
      <h2>Enter Serial Number</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={serialNumber}
          onChange={(e) => setSerialNumber(e.target.value)}
          placeholder="Enter Serial Number"
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default SerialNumberInput;
