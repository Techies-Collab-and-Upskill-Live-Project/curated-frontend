"use client";

const search = [
  // 'search history',
  // 'search history',
  // 'search history',
  // 'search history',
];

export default function SearchPage() {
  return (
    <section className="flex mx-auto flex-col">
      {!search.length ? (
        <div className="shadow-custom-soft max-w-2xl md:w-[820px] mx-auto my-28 md:my-40 flex flex-col items-center py-16 px-6 base:px-10 md:p-24 rounded-[12px]">
          <h1 className="text-[18px] md:text-2xl font-bold mb-4">
            Try Searching to get started
          </h1>
          <p className="text-[.99rem] md:text-base base:text-[.65rem]">
            Start watching videos to help us build your search history
          </p>
        </div>
      ) : (
        <div className="p-8 text-2xl">
          {search.map((item, idx) => (
            <p key={idx} className="p-4">
              {item}
            </p>
          ))}
        </div>
      )}
    </section>
  );
}
