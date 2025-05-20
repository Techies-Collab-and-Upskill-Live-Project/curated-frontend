import NextTopLoader from "nextjs-toploader";

export default function TopLoader() {
  return (
    <>
      <NextTopLoader
        color="#E2725B"
        initialPosition={0.08}
        crawlSpeed={200}
        height={3}
        crawl={true}
        showSpinner={true}
        easing="ease"
        speed={1000}
        shadow="0 0 10px #E2725B,0 0 5px #B94D3A"
      />
    </>
  );
}
