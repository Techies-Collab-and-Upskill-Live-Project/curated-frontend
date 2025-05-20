export async function fetchYouTubeVideos(query: string) {
  const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
  const endpoint = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoCategoryId=27&maxResults=10&q=${encodeURIComponent(
    query
  )}&key=${API_KEY}`;

  const res = await fetch(endpoint);
  const data = await res.json();

  return data.items;
}
