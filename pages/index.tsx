import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import { NextPage } from "next";
import axios from "axios";
import { ImageType } from "../types";
import NoResults from "../components/NoResults";
import ImageCard from "../components/ImageCard";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

interface IProps {
  images: ImageType[];
}

const Home: NextPage<IProps> = ({ images }) => {
  console.log(images);
  return (
    <div className='flex flex-col gap-10 videos h-full'>
      {images?.length ? (
        images.map((image: ImageType) => (
          <ImageCard post={image} key={image._id} />
        ))
      ) : (
        <NoResults text={"No Post Available"} />
      )}
    </div>
  );
};

export const getServerSideProps = async () => {
  const res = await axios.get(
    `https://lensed-a67lw04nk-tahsinkarim.vercel.app/api/post`
  );
  const data = await res.data;

  return {
    props: {
      images: data,
    },
  };
};

export default Home;
