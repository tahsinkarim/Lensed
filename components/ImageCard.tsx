import { NextPage } from "next";
import React, { useEffect, useRef, useState } from "react";
import { ImageType } from "../types";
import Image from "next/image";
import Link from "next/link";

interface IProps {
  post: ImageType;
}

const ImageCard: NextPage<IProps> = ({ post }) => {
  const date: Date = new Date(post.date);
  const month: string = date.toLocaleString("default", { month: "short" });
  const day: string = date.toLocaleString("default", { day: "numeric" });
  const hour: string = date.toLocaleString("default", {
    hour: "numeric",
    hour12: true,
  });
  const formattedDate: string = `${month} ${day} at ${hour}`;
  console.log(formattedDate);

  return (
    <div className='flex flex-col border-b-2 border-gray-200 pb-6'>
      <div>
        <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded items-center'>
          <div className='md:w-12 md:h-12 w-10 h-10 relative'>
            <Link href=''>
              <>
                <Image
                  fill={true}
                  className='rounded-full object-cover'
                  src={post.postedBy.img}
                  alt={post.postedBy.name}
                />
              </>
            </Link>
          </div>
          <div>
            <Link href=''>
              <div className='flex flex-col justify-center'>
                <p className='flex items-center gap-2 md:text-md font-bold text-primary'>
                  {post.postedBy.name}
                </p>
                <small className=' text-gray-500 m-0'>{formattedDate}</small>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className='lg:ml-20 flex gap-4 relative w-full'>
        <div className='rounded-xl relative w-full h-[50vh]'>
          <Link href=''>
            <Image
              src={post.image}
              fill={true}
              alt={"im"}
              className='object-contain w-[200ox] lg:w-[600px] h-[300px]
              md:h-[400px] lg:h-[530px] cursor-pointer bg-gray-200'
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
