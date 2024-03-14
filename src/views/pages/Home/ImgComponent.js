import axios from 'axios';
import React, { useState } from 'react';
import config from 'src/config';
import PropTypes from 'prop-types';

function ImgComponent({ onFileUpload }) {
  const [preview, setPreview] = useState(null);
  const [fileId, setFileId] = useState(null);
  const token = localStorage.getItem('adminToken');

  const handleChange = async (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    setPreview(url);

    try {
      const formData = new FormData();
      formData.append('upload', file);
      const response = await axios.post(`${config.baseURL}/admin/media`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: token,
        },
      });
      
      setFileId(response.data._id); 
      onFileUpload(response.data._id);
      // console.log('File uploaded successfully. File ID:', response.data._id);
    } catch (error) {
      console.log('Error uploading file:', error);
    }
  };

  return (
    <>
      <div className="relative">
        <div className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-100">
          {preview ? (
            <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
          ) : (
            <div className="flex flex-col items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L19 7.107M19 14.758V19.558A2.25 2.25 0 0116.758 21H7.242A2.25 2.25 0 015 19.558V6.25"
                />
              </svg>
              <p className="text-sm text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
            </div>
          )}
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>
      </div>
    </>
  );
}

ImgComponent.propTypes = {
  onFileUpload: PropTypes.func.isRequired
};

export default ImgComponent;
