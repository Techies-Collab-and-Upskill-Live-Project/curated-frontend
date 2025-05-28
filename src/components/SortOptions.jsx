const SortOptions = () => {
    return (
        <div className="flex flex-wrap gap-2 px-4 pb-2">
            {["All", "Sort by Topic", "Sort by Date", "By Relevance", "By Hashtags"].map((label) => (
                <button key={label} className="px-4 py-2 bg-gray-200 rounded-full text-sm hover:bg-gray-300">
                    {label}
                </button>
            ))}
        </div>
    );
};

export default SortOptions;
