import HomePageCarousel from '@/components/Homepage/Carousel';
import CTA from '@/components/Homepage/CTA';
import Features from '@/components/Homepage/Features';
import PopularServices from '@/components/Homepage/PopularServices';
import Testimonials from '@/components/Homepage/Testimonials';
import ParallaxSection from '@/components/Parallax';
import fetchTrendingServices from '@/lib/fetchTrendingServices';

export default async function Home() {
  const trendingServices = await fetchTrendingServices();
  return (
    <main className="space-y-10">
      <HomePageCarousel services={trendingServices} />
      <Features />
      <ParallaxSection image="/assets/freelancer.jpg" />
      <PopularServices services={trendingServices} />
      <ParallaxSection image="/assets/hirer-seller.jpg" />
      <Testimonials />
      <ParallaxSection image="/assets/happy-person.jpg" />
      <CTA />
    </main>
  );
}
