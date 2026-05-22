import Header from '@/components/Header';
import InternshipList from '@/components/InternshipList';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-gray-950 font-sans">
      <Header />
      <main>
        <InternshipList />
      </main>
    </div>
  );
}
