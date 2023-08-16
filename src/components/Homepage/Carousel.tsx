'use client';
import { Service } from '@/interfaces/service';
import Image from 'next/image';
import Link from 'next/link';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

const HomePageCarouselCard = ({ service }: { service: Service }) => {
  const { name, description, carouselImage, slug } = service;

  return (
    <div className="h-[480px] relative w-full bg-gray-300">
      <Image
        src={carouselImage || '/images/hero.jpg'}
        alt="hero"
        layout="fill"
        objectFit="cover"
      />

      <div className="bg-gradient-to-t w-full h-full absolute z-10 from-black via-black/70 to-transparent bg-opacity-80"></div>
      <div className="absolute text-left text-white w-5/6 sm:w-1/2 z-20 left-6 bottom-8 sm:left-8 space-y-4">
        <h1 className="font-bold text-xl sm:text-3xl ">{name}</h1>
        <p className="text-gray-300 text-xs line-clamp-2 sm:line-clamp-3 sm:text-sm">
          {description}
        </p>
        <Link href={`/blogs/${slug}`} className="btn w-fit group block">
          <span className="btn-shadow-span"></span>
          <span className="relative">Explore Service</span>
        </Link>
      </div>
    </div>
  );
};

type Props = {
  services: Service[];
};

const HomePageCarousel = ({ services }: Props) => {
  return (
    <div>
      <Carousel
        autoPlay={true}
        infiniteLoop
        showIndicators={false}
        showThumbs={false}
      >
        {services?.map((service) => (
          <HomePageCarouselCard key={service._id} service={service} />
        ))}
      </Carousel>
    </div>
  );
};

export default HomePageCarousel;