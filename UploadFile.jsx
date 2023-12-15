import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { file_store_backend } from "../../../declarations/file_store_backend/index";
import "./UploadFile.css";

const UploadFile = () => {
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);

  // Separate state variables for each section's uploaded files
  const [uploadedFilesPdf, setUploadedFilesPdf] = useState([]);
  const [uploadedFilesImg, setUploadedFilesImg] = useState([]);
  const [uploadedFilesDocs, setUploadedFilesDocs] = useState([]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    let idCardBase64 = "";
    getBase64(selectedFile, (result) => {
      idCardBase64 = result;
      console.log("idCardBase64", idCardBase64);
      handleSaveFile(idCardBase64);
      setData(idCardBase64);
    });
  };

  function getBase64(file, cb) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    console.log("reader", reader);
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  }

  const handleUpload = () => {
    if (file) {
      let idCardBase64 = "";
      getBase64(file, (result) => {
        idCardBase64 = result;
      });
    }
  };

  function handleSaveFile(idCardBase64) {
    try {
      let response = file_store_backend.saveFile(uuidv4(), idCardBase64);
      if (response) {
        alert("Upload Successfully");
      }
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className="dasboard">
      <div className="dashboard-container">
        <div className="dashboard-content">
          <h1>Upload pdfs</h1>
          <div className="upload-section">
            <input
              type="file"
              onChange={handleFileChange}
            />
            <button onClick={handleUpload}>Upload</button>
          </div>
          {uploadedFilesPdf.length > 0 && (
            <div className="uploaded-files">
              <h2>Uploaded Files:</h2>
              <ul>
                {uploadedFilesPdf.map((uploadedFile, index) => (
                  <li key={index}>{uploadedFile.name}</li>
                ))}
              </ul>
            </div>
          )}
          <embed src={data} />
        </div>
      </div>

      <div className="dashboard-container">
        <div className="dashboard-content">
          <h1>Upload imgs</h1>
          <div className="upload-section">
            <input
              type="file"
              onChange={handleFileChange}
            />
            <button onClick={handleUpload}>Upload</button>
          </div>
          {uploadedFilesImg.length > 0 && (
            <div className="uploaded-files">
              <h2>Uploaded Files:</h2>
              <ul>
                {uploadedFilesImg.map((uploadedFile, index) => (
                  <li key={index}>{uploadedFile.name}</li>
                ))}
              </ul>
            </div>
          )}
          <embed src={data} />
        </div>
      </div>

      <div className="dashboard-container">
        <div className="dashboard-content">
          <h1>Upload Docs</h1>
          <div className="upload-section">
            <input
              type="file"
              onChange={handleFileChange}
            />
            <button onClick={handleUpload}>Upload</button>
          </div>
          {uploadedFilesDocs.length > 0 && (
            <div className="uploaded-files">
              <h2>Uploaded Files:</h2>
              <ul>
                {uploadedFilesDocs.map((uploadedFile, index) => (
                  <li key={index}>{uploadedFile.name}</li>
                ))}
              </ul>
            </div>
          )}
          <embed src={data} />
        </div>
      </div>
    </div>
  );
};

export default UploadFile;

