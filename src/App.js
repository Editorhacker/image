import React, { useState } from "react";
import axios from "axios";
import "./App.css"; // Import the unique CSS file

function App() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [result, setResult] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert("Please select an image first!");
            return;
        }

        const formData = new FormData();
        formData.append("image", selectedFile);

        try {
            const response = await axios.post("https://ai-1jrq.onrender.com/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            setResult(response.data);
        } catch (error) {
            console.error("Error uploading image:", error);
            alert("Failed to analyze image.");
        }
    };

    return (
        <div className="container">
            <h2>🔍 AI Image Detector</h2>

            <label htmlFor="file-upload" className="custom-file-upload">
                📸 Choose Image
            </label>
            <input id="file-upload" type="file" onChange={handleFileChange} accept="image/*" />

            <button onClick={handleUpload}>🚀 Upload</button>

            {result && (
                <div className="result-container">
                    <h3>✅ Result: {result.isOriginal}</h3>
                    {result.metadata && (
                        <pre>{JSON.stringify(result.metadata, null, 2)}</pre>
                    )}
                </div>
            )}
        </div>
    );
}

export default App;
