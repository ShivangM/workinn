'use client';
import Image from 'next/image';
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

type Props = {
  images: string[];
};

const ImageGallery = ({ images }: Props) => {
  return (
    <Carousel
      showThumbs={true}
      showStatus={false}
      showIndicators={false}
      showArrows={true}
      autoPlay
    >
      {images.map((image, index) => (
        <img
          src={image}
          key={index}
          alt="Service Image"
          className="object-cover"
        />
      ))}
    </Carousel>
  );
};

export default ImageGallery;
