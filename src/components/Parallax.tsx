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
    >
      <div className="h-80 sm:h-96 lg:h-[480px]" />
    </Parallax>
  );
};

export default ParallaxSection;
