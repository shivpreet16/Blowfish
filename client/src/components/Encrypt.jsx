import React, { useState } from 'react';
import axios from 'axios';

const Encrypt = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [key, setKey] = useState('');
  const [enc,setEnc]=useState(null)

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleKeyChange = (event) => {
    setKey(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('key', key);
    const url = 'http://127.0.0.1:5000/encrypt';
    
    try {
        const response = await axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        const data=await response
        // setEnc(data.data)
        console.log('Image and key uploaded successfully:', data.data);
    } catch (error) {
        console.error('Error uploading image and key:', error);
    }
  };

  return (
    <div>
      <h2>Image and Key Upload</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <input type="text" placeholder="Enter key" onChange={handleKeyChange} />
        <button type="submit">Upload</button>
      </form>

      {/* <p>{enc}</p> */}
    </div>
  );
};

export default Encrypt;