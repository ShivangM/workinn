import HomePageCarousel from '@/components/Homepage/Carousel';
import CTA from '@/components/Homepage/CTA';
import Features from '@/components/Homepage/Features';
import PopularServices from '@/components/Homepage/PopularSubCategories';
import Testimonials from '@/components/Homepage/Testimonials';
import ParallaxSection from '@/components/Parallax';
import fetchTrendingSubCategories from '@/lib/fetchTrendingSubCategories';

export default async function Home() {
  const trendingSubCategories = await fetchTrendingSubCategories();
  return (
    <main className="space-y-10">
      <HomePageCarousel subCategories={trendingSubCategories} />
      <Features />
      <ParallaxSection image="/assets/freelancer.jpg" />
      <PopularServices subCategories={trendingSubCategories} />
      <ParallaxSection image="/assets/hirer-seller.jpg" />
      <Testimonials />
      <ParallaxSection image="/assets/happy-person.jpg" />
      <CTA />
    </main>
  );
}
