// import { IconSearch } from '@tabler/icons-react';

export default function Searchbar() {
  return (
    <div className="w-full max-w-2xl relative">
      <div className="flex items-center border rounded-[10px] gap-2 mb-2">
        {/* Input Container with Icon */}
        <div className="relative flex-1">
          <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-900" />
          <input
            type="text"
            placeholder="Search/Playlist Link..."
            className="w-full pl-10 pr-4 py-2 focus:outline-none bg-transparent"
          />
        </div>
        
        {/* Search Button */}
        <button className="bg-primary text-white px-6 py-2 rounded-md transition-colors">
          Search
        </button>
      </div>
    </div>
  );
}
