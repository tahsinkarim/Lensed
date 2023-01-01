import React, { useState, useEffect, useLayoutEffect } from "react";
import { useRouter } from "next/router";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import useAuthStore from "../store/authStore";
import { topics } from "../utils/constants";
import { ImageType, User } from "../types";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";

const Upload = () => {
  const { userProfile }: { userProfile: any } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [imageAsset, setImageAsset] = useState();
  const [wrongFileType, setWrongFileType] = useState(false);
  const [imageFile, setImageFile] = useState("");
  const [caption, setCaption] = useState("");
  const [selectedFile, setSelectedFile] = useState<any>();
  const [category, setCategory] = useState(topics[0].name);
  const [savingPost, setSavingPost] = useState();

  //Image BB API
  const imageHostKey = process.env.NEXT_PUBLIC_IMGBB;
  const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;

  useEffect(() => {}, []);

  const uploadImage = async (e: any) => {
    setWrongFileType(false);
    const newFile = e.target.files[0];
    setSelectedFile(newFile);
  };

  console.log(selectedFile);

  const handlePost = () => {
    const fileTypes = ["image/png", "image/jpeg"];

    if (fileTypes.includes(selectedFile.type)) {
      //Upload file to image BB
      const formData = new FormData();
      formData.append("image", selectedFile);

      const response = axios.post(url, formData).then((response) => {
        setIsLoading(false);
        const post: ImageType = {
          caption: caption,
          image: response.data.data.url,
          postedBy: {
            email: userProfile?.name,
            img: userProfile?.avatar,
            name: userProfile?.name,
          },
        };
        axios.post("http://localhost:3000/api/post", post).then((res) => {
          toast.success("Image Uploaded");
          handleDiscard();
        });
      });
    } else {
      setIsLoading(false);
      setWrongFileType(true);
    }
  };

  const handleDiscard = () => {
    setSelectedFile("");
    setCaption("");
  };
  return (
    <div className='flex w-full h-full absolute left-0 top-[60px] mb-10 pt-10 lg:pt-20 bg-[#f8f8f8] justify-center'>
      <div className='w-[60%] bg-white rounded-lg xl:h-[80vh] flex gap-6 flex-wrap justify-between items-center sm:p-14 pt-6'>
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
                {selectedFile ? (
                  <div>
                    <Image
                      width={320}
                      height={400}
                      className='rounded-xl'
                      src={URL.createObjectURL(selectedFile)}
                      alt='img'
                    />
                  </div>
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
            {wrongFileType && (
              <p className='text-center text-xl text-red-400 font-semibold mt-4 w-[250px]'>
                Please Select a Image File
              </p>
            )}
          </div>
        </div>
        <div className='flex flex-col gap-3 mt-16 pb-10'>
          <label className='text-md font-medium'>Caption</label>
          <input
            className='rounded outline-none text-md border-2 border-gray-200 p-2'
            type='text'
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
          <label className='text-md font-medium'>Choose a Category</label>
          <select
            className='outline-none border-2 border-gray-200 text-md capitalize lg:p-4 p-2 rounded cursor-pointer'
            onChange={(e) => setCategory(e.target.value)}
          >
            {topics.map((topic) => (
              <option
                value={topic.name}
                className='outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-300'
                key={topic.name}
              >
                {topic.name}
              </option>
            ))}
          </select>
          <div className='flex gap-6 mt-10'>
            <button
              onClick={handleDiscard}
              type='button'
              className='border-gray-300 border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none'
            >
              Discard
            </button>
            <button
              // disabled={videoAsset?.url ? false : true}
              onClick={handlePost}
              type='button'
              className='bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-md font-medium p-2 rounded w-28 lg:w-44 outline-none'
            >
              Post
            </button>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Upload;
