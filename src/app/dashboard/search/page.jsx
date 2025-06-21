import React from "react";

const search = [
  // 'search history',
  // 'search history',
  // 'search history',
  // 'search history',
]

const page = () => {
  return <div className="flex mx-auto flex-col">
    {
      !search.length ? (
        <div className="shadow max-w-2xl mx-auto flex flex-col items-center p-8">
          <h1 className="text-2xl font-bold mb-4">Try Searching to get started</h1>
          <p>Start watching videos to help us build your search history</p>
        </div>
      ) : (
        <div className="p-8 text-2xl">
          {search.map((item, idx) => (
            <p key={idx} className="p-4">{item}</p>
          ))}
        </div>
      )
    }

  </div>;
};

export default page;
