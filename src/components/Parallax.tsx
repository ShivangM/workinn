'use client';
import { Parallax } from 'react-parallax';

type Props = {
  image: string;
};

const ParallaxSection = ({ image }: Props) => {
  return (
    <Parallax
      blur={{ min: -15, max: 15 }}
      bgImage={image}
      bgImageAlt="Hirer and Seller Shaking Hands"
      bgImageSizes="3982x2579"
      strength={-200}
      className="h-80 sm:h-96 object-cover lg:h-[480px]"
    >
      {/* <div /> */}
    </Parallax>
  );
};

export default ParallaxSection;
