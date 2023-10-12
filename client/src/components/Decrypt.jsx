import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Decrypt = () => {
  const [encryptedData, setEncryptedData] = useState("");
  const [key, setKey] = useState("");
  const nav = useNavigate();

  function parseStringToArray(inputString) {
    // Remove whitespace and convert single quotes to double quotes to match JSON format
    const cleanedString = inputString.replace(/'/g, '"').replace(/\s/g, "");

    // Parse the cleaned string as JSON
    try {
      const parsedArray = JSON.parse(cleanedString);
      return parsedArray;
    } catch (error) {
      console.error("Error parsing the input string:", error);
      return null;
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    let cleanedData = encryptedData.replace(/"/g, '');
    cleanedData = encryptedData.replace(/  /g, '');
    cleanedData = encryptedData.replace(/'/g, '');
    cleanedData = cleanedData.replace(/ /g, ',');
    // const encryptedArray = parseStringToArray(encryptedData);
    // console.log(typeof(encryptedArray));
    formData.append("data", cleanedData);
    formData.append("key", key);
    const url = "http://127.0.0.1:5000/decrypt";

    try {
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const data = await response;
      console.log(data)
    } catch (error) {
      console.error("Error uploading image and key:", error);
    }
  };

  return (
    <div className="bg-[#040b35] min-h-screen flex flex-col relative">
      <img
        src="/fish.png"
        alt="fish"
        className="h-28 w-28 cursor-pointer absolute"
        onClick={() => {
          nav("/");
        }}
      />
      <div className="flex flex-col items-center gap-10 min-w-screen mt-10">
        <h2 className="text-4xl text-[#cba094] font-medium">
          Image Decryption using Blowfish
        </h2>
        <form action="" onSubmit={handleSubmit} className="flex flex-col gap-5">
          <textarea
            name="encryptedMatrix"
            id=""
            cols="30"
            rows="10"
            className="focus:outline-none px-2 py-2 bg-[#051e54] border-2 text-[#1a9acc] border-dashed border-[#1a9acc]"
            onChange={(e) => {
              setEncryptedData(e.target.value);
            }}
            placeholder="Enter your encrypted array in place of this text"
          ></textarea>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Key"
              className="bg-transparent border focus:outline-none text-[#9bb7e4] border-[#9bb7e4] px-2 py-2 "
              onChange={(e) => {
                setKey(e.target.value);
              }}
            />
            <button
              className="w-fit bg-[#9bb7e4] px-2 py-2 text-[#592d20]"
              type="submit"
            >
              Encrypt
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Decrypt;
