export async function fetchYouTubeVideos(query) {
  const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
  const endpoint = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=30&q=${query}&key=${API_KEY}`;

  console.log("query from server", query);

  const res = await fetch(endpoint);
  const data = await res.json();

  const filteredVideos = data.items.filter((video) => {
    const title = video.snippet.title.toLowerCase();
    const description = video.snippet.description.toLowerCase();
    const q = query.toLowerCase();

    return title.includes(q) || description.includes(q);
  });

  return filteredVideos;
}
