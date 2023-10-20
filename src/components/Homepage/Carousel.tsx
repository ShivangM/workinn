'use client';
import { ServiceCategory } from '@/interfaces/service';
import Image from 'next/image';
import Link from 'next/link';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

const HomePageCarouselCard = ({ serviceCategory }: { serviceCategory: ServiceCategory }) => {
  const { name, description, carouselImage, slug } = serviceCategory;

  return (
    <div className="h-[480px] lg:h-screen relative w-full bg-gray-300">
      <Image
        src={
          carouselImage ||
          `https://source.unsplash.com/random/1920x1080/?${name}`
        }
        alt="hero"
        layout="fill"
        objectFit="cover"
      />

      <div className="bg-gradient-to-t w-full h-full absolute z-10 from-black via-black/70 to-transparent bg-opacity-80"></div>
      <div className="absolute text-left text-white w-5/6 sm:w-1/2 z-20 left-8 bottom-10 sm:left-10 space-y-4">
        <h1 className="font-bold text-xl sm:text-3xl ">{name}</h1>
        <p className="text-gray-300 text-xs line-clamp-2 sm:line-clamp-3 sm:text-sm">
          {description}
        </p>
        <Link href={`/services/${slug}`} className="btn w-fit group block">
          <span className="relative">Explore Service</span>
        </Link>
      </div>
    </div>
  );
};

type Props = {
  serviceCategories: ServiceCategory[];
};

const HomePageCarousel = ({ serviceCategories }: Props) => {
  return (
    <div>
      <Carousel
        autoPlay={true}
        infiniteLoop
        showIndicators={false}
        showThumbs={false}
        showStatus={false}
      >
        {serviceCategories?.map((serviceCategory) => (
          <HomePageCarouselCard key={serviceCategory.id} serviceCategory={serviceCategory} />
        ))}
      </Carousel>
    </div>
  );
};

export default HomePageCarousel;
