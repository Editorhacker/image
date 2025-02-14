import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import CSS file

function App() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [confidence, setConfidence] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult(null); // Reset result
  };

  // Upload image to backend
  const handleUpload = async () => {
    if (!image) {
      alert("Please select an image.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await axios.post('https://ai-1jrq.onrender.com/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setResult(response.data.result);
      setConfidence(response.data.confidence);
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="title">AI Image Detector</h1>

      <div className="upload-container">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="file-input"
        />
        <button
          onClick={handleUpload}
          className="upload-button"
        >
          Detect Image
        </button>
      </div>

      {preview && (
        <div className="image-preview-container">
          <img
            src={preview}
            alt="Preview"
            className="image-preview"
          />
        </div>
      )}

      {loading && <p className="loading-text">Processing...</p>}

      {result && (
        <div className="result-container">
          <h2 className="result-title">Result: {result}</h2>
          <h3 className="confidence">Confidence: {confidence}%</h3>
        </div>
      )}
    </div>
  );
}

export default App;
