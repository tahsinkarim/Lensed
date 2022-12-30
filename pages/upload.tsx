import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import useAuthStore from "../store/authStore";

const Upload = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageAsset, setImageAsset] = useState();
  const [wrongFileType, setWrongFileType] = useState(false);
  const [imageFile, setImageFile] = useState("");

  //Image BB API
  const imageHostKey = process.env.NEXT_PUBLIC_IMGBB;
  const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;

  const uploadImage = async (e: any) => {
    const selectedFile = e.target.files[0];
    const fileTypes = ["image/png", "image/jpeg"];
    if (fileTypes.includes(selectedFile.type)) {
      //Upload file to image BB
      const formData = new FormData();
      formData.append("image", selectedFile);

      const response = await axios.post(url, formData).then((response) => {
        setIsLoading(false);
        setImageAsset(response.data.data);
        const newImage = response.data.data.url;
        setImageFile(newImage);
        console.log(imageFile);
        console.log(response.data.data.url);
      });
    } else {
      setIsLoading(false);
      setWrongFileType(true);
    }
    console.log("image", imageAsset);
  };
  return (
    <div className='flex w-full h-full'>
      <div className='bg-white rounded-lg'>
        <div>
          <div>
            <p className='text-2xl font-bold'>Upload Image</p>
            <p className='text-md text-gray-400 mt-1'>
              Post a Image to your account
            </p>
          </div>
          <div className='border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center outline-none mt-10 w-[360px] h-[260px] cursor-pointer hover:border-blue-400 hover:bg-gray-100'>
            {isLoading ? (
              <p>Uploading...</p>
            ) : (
              <div>
                {imageAsset ? (
                  <div></div>
                ) : (
                  <label className='curser-pointer'>
                    <div className='flex flex-col items-center justify-center h-full curser-pointer'>
                      <div className='flex flex-col justify-center items-center'>
                        <p className='font-bold text-xl'>
                          <FaCloudUploadAlt className='text-gray-300 text-6xl' />
                        </p>
                        <p className='text-xl font-semibold'>
                          Select image to upload
                        </p>
                      </div>
                      <p className='bg-gradient-to-r from-cyan-500 to-blue-500  curser-pointer text-center mt-8 rounded text-white text-md font-medium p-2 w-52 outline-none'>
                        Select file
                      </p>
                    </div>
                    <input
                      type='file'
                      name='upload-image'
                      onChange={uploadImage}
                      className='w-0 h-0'
                    />
                  </label>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
