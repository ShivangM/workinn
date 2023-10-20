import HomePageCarousel from '@/components/Homepage/Carousel';
import CTA from '@/components/Homepage/CTA';
import Features from '@/components/Homepage/Features';
import PopularServices from '@/components/Homepage/PopularSubCategories';
import Testimonials from '@/components/Homepage/Testimonials';
import ParallaxSection from '@/components/Parallax';
import fetchTrendingServiceCategories from '@/lib/fetchTrendingServiceCategories';

export default async function Home() {
  const { data: trendingServiceCategories } = await fetchTrendingServiceCategories();

  return (
    <main className="space-y-10">
      <HomePageCarousel serviceCategories={trendingServiceCategories} />
      <Features />
      <ParallaxSection image="/assets/freelancer.jpg" />
      <PopularServices serviceCategories={trendingServiceCategories} />
      <ParallaxSection image="/assets/hirer-seller.jpg" />
      <Testimonials />
      <ParallaxSection image="/assets/happy-person.jpg" />
      <CTA />
    </main>
  );
}
