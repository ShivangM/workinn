'use client';
import { ProjectFile } from '@/interfaces/typing';
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

type Props = {
  images: ProjectFile[];
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
          src={image.url}
          key={index}
          alt={image.name}
          className="object-cover"
        />
      ))}
    </Carousel>
  );
};

export default ImageGallery;
