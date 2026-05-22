import Header from '@/components/Header';
import HeroBanner from '@/components/HeroBanner';
import InternshipList from '@/components/InternshipList';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fa] dark:bg-gray-950 font-sans">
      <Header />
      <main className="flex-grow">
        <HeroBanner />
        <InternshipList />
      </main>
      <Footer />
    </div>
  );
}
