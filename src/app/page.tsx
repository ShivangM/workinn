import HomePageCarousel from '@/components/Homepage/Carousel';
import CTA from '@/components/Homepage/CTA';
import Features from '@/components/Homepage/Features';
import PopularServiceCategories from '@/components/Homepage/PopularServiceCategories';
import Testimonials from '@/components/Homepage/Testimonials';
import ParallaxSection from '@/components/Parallax';
import fetchTrendingServiceCategories from '@/lib/fetchTrendingServiceCategories';

export default async function Home() {
  const { data: trendingServiceCategories } =
    await fetchTrendingServiceCategories(
      0,
      'gzkMNphktJN3HsJLOPny',
      '0e7JSDhNAXuHWxLzxjq6'
    );

  return (
    <main className="space-y-10">
      <HomePageCarousel serviceCategories={trendingServiceCategories} />
      <Features />
      <ParallaxSection image="/assets/freelancer.jpg" />
      <PopularServiceCategories serviceCategories={trendingServiceCategories} />
      <ParallaxSection image="/assets/hirer-seller.jpg" />
      <Testimonials />
      <ParallaxSection image="/assets/happy-person.jpg" />
      <CTA />
    </main>
  );
}
