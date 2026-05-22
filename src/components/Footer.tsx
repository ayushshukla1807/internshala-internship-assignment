import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-16 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="text-white font-semibold mb-4 text-lg">Internships by places</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors">Internship in India</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Internship in Delhi</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Internship in Bangalore</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Internship in Hyderabad</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Internship in Mumbai</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Internship in Chennai</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-lg">Internship by Stream</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors">Computer Science Internship</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Electronics Internship</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Mechanical Internship</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Civil Internship</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Marketing Internship</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Finance Internship</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-lg">About Internshala</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors">About us</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">We're hiring</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Hire interns for your company</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Team Diary</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Our Services</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-lg">Contact</h4>
            <ul className="space-y-2 text-sm mb-6">
              <li><Link href="#" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white">FB</Link>
              <Link href="#" className="text-gray-400 hover:text-white">TW</Link>
              <Link href="#" className="text-gray-400 hover:text-white">IG</Link>
              <Link href="#" className="text-gray-400 hover:text-white">YT</Link>
              <Link href="#" className="text-gray-400 hover:text-white">IN</Link>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-gray-800 text-sm flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            © Copyright 2026 Internshala
          </div>
          <div className="flex space-x-4">
            <Link href="#" className="hover:text-white">Terms & Conditions</Link>
            <Link href="#" className="hover:text-white">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
