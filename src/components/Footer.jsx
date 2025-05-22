import Link from 'next/link';
import { FaGooglePlay, FaAppStore } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-12 px-4 sm:px-6 lg:px-8 hover:text-gray-700">
      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] gap-8 mb-12 text-white">
          {/* Left Column - Theme */}
          <div>
            <h3 className="text-2xl font-bold mb-6">CurateD</h3>
            <p className="mb-6 text-gray-300">Discover smarter ways to learn.</p>
          </div>

          {/* Middle Column - Links */}
          <div className="grid grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold mb-4">Home</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-300 hover:text-white">Product Features</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-white">Benefits</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-white">How to use</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-white">Key Features</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-white">Pricing</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-white">Testimonials</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">App</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-300 hover:text-white">Mobile App</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-white">Desktop App</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-white">How to use</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">All Pages</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-300 hover:text-white">Home</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-white">App</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-white">Blogs</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-white">Blog Open</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-white">Contact</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-white">Privacy Policy</Link></li>                
              </ul>
            </div>
          </div>

          {/* Right Column - App Download */}
          <div className="bg-white border rounded-[10px] p-5">
            <h4 className="font-semibold mb-4 text-black">Download our App</h4>
            <div className="space-y-4">
              <button className="flex items-center bg-primary hover:bg-gray-700 rounded-lg px-4 py-3 w-full transition">
                <FaGooglePlay className="mr-3 text-xl" />
                <div className="text-left">
                  <p className="text-xs text-gray-300">Get it On</p>
                  <p className="font-medium">Google Play</p>
                </div>
              </button>
              <button className="flex items-center bg-primary hover:bg-gray-700 rounded-lg px-4 py-3 w-full transition">
                <FaAppStore className="mr-3 text-xl" />
                <div className="text-left">
                  <p className="text-xs text-gray-300">Get it On</p>
                  <p className="font-medium">App Store</p>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white pt-8 flex flex-col md:flex-row justify-between text-white items-center">
          <p className="mb-4 md:mb-0">© {new Date().getFullYear()} All rights Reserved</p>
          <div className="flex space-x-6">
            <Link href="#" className="hover:text-gray-700">Privacy Policy</Link>
            <Link href="#" className="hover:text-gray-700">Terms of Services</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}