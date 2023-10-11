import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Encrypt.css";

const Encrypt = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [key, setKey] = useState("");
  const [enc, setEnc] = useState([]);
  const [imgUrl, setImgUrl] = useState(null);

  const handleFileChange = function (e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setImgUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleKeyChange = (event) => {
    setKey(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("key", key);
    const url = "http://127.0.0.1:5000/encrypt";

    try {
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const data = await response;
      setEnc(data.data.data);
      console.log(enc);
    } catch (error) {
      console.error("Error uploading image and key:", error);
    }
  };

  const nav = useNavigate();

  return (
    <div className="bg-[#040b35] min-h-screen flex flex-col">
      <img
        src="/fish.png"
        alt="fish"
        className="h-28 w-28 cursor-pointer"
        onClick={() => {
          nav("/");
        }}
      />
      <div className="flex flex-col items-center gap-10">
        <h2 className="text-4xl text-[#cba094] font-medium">
          Image Encryption using Blowfish
        </h2>
        <form id="form-file-upload">
          <input
            type="file"
            id="input-file-upload"
            accept="image/jpeg, image/jpg, image/png"
            onChange={handleFileChange}
          />
          <label
            id="label-file-upload"
            htmlFor="input-file-upload"
            className="py-10"
          >
            {imgUrl ? (
              <div className="flex flex-col gap-5 items-center">
                <img src={imgUrl} className="h-32 w-32" />
                <button
                  className="border py-1 px-2 rounded-xl text-[#ea6969] border-[#ea6969] w-fit"
                  onClick={(e) => {
                    e.preventDefault();
                    setImgUrl(null);
                    setSelectedFile(null);
                    document.getElementById('input-file-upload').value = '';
                  }}
                >
                  Remove
                </button>
              </div>
            ) : (
              <p className="text-xl">Click here to upload</p>
            )}
          </label>
        </form>
      </div>
    </div>
  );

  // return (
  //   <div>
  //     <h2>Image and Key Upload</h2>
  //     <form onSubmit={handleSubmit}>
  //       <input type="file" onChange={handleFileChange} />
  //       <input type="text" placeholder="Enter key" onChange={handleKeyChange} />
  //       <button type="submit">Upload</button>
  //     </form>

  //     <pre>{JSON.stringify(enc, null, 2)}</pre>
  //   </div>
  // );
};

export default Encrypt;
