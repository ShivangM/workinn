import HomePageCarousel from '@/components/Homepage/Carousel';
import fetchTrendingServices from '@/lib/fetchTrendingServices';

export default async function Home() {
  const trendingServices = await fetchTrendingServices();
  return (
    <main className="">
      <HomePageCarousel services={trendingServices} />
    </main>
  );
}
