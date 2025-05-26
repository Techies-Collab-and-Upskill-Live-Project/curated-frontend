import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>CuratED</title>
      </Head>

      <main className="min-h-screen bg-white px-6 py-6">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6">
          {/* Logo */}
          <h1 className="text-xl font-bold text-[#ED7D31]">CuratED</h1>

          {/* Icons */}
          <div className="flex items-center gap-4">
            {/* Notification Icon */}
            <span className="text-2xl cursor-pointer">🔔</span>

            {/* Profile Picture */}
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="User"
              className="w-8 h-8 rounded-full object-cover"
            />
          </div>
        </div>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto">
          {/* Lightbulb Illustration (placeholder emoji for now) */}
          <div className="text-4xl mb-2">💡</div>

          <h2 className="text-3xl font-extrabold text-gray-800">
            Discover Smarter Ways to Learn
          </h2>
          <p className="text-gray-500 mt-2">
            CuratED helps you find insightful, educational videos tailored to your interests
          </p>

          {/* Search Bar */}
          <div className="mt-6 flex justify-center gap-2">
            <input
              type="text"
              placeholder="Search/Playlist Link..."
              className="border border-gray-300 rounded-lg px-4 py-2 w-full max-w-md"
            />
            <button className="bg-[#ED7D31] text-white px-6 py-2 rounded-lg hover:bg-[#e76d1a]">
              Search
            </button>
          </div>

          {/* Tooltip */}
          <div className="mt-2 text-sm text-gray-400">Use the search bar to find videos</div>
        </div>

        {/* Video Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 max-w-6xl mx-auto">
          {/* Video 1 */}
          <div className="aspect-video rounded-lg overflow-hidden shadow-md">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/8nQ5yGRZCkM"
              title="Grids in Web Design"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          {/* Video 2 */}
          <div className="aspect-video rounded-lg overflow-hidden shadow-md">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/3mZ3j0d2XMw"
              title="Spacing Elements"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          {/* Video 3 */}
          <div className="aspect-video rounded-lg overflow-hidden shadow-md">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/-G7bJVAIiEI"
              title="Formulas and Functions"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </main>
    </>
  );
}
