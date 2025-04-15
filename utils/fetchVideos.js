export async function fetchVideos() {
  try {
    const apiKey = process.env.YOUTUBE_API_KEY;
    console.log("✅ API KEY:", apiKey);

    const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=KR&maxResults=10&key=${apiKey}`;
    const res = await fetch(apiUrl);
    const data = await res.json();

    console.log("📦 API 응답:", data); // ✅ return 전에 위치

    if (!data.items) {
      console.error("❌ YouTube API 응답 오류:", data);
      return [];
    }

    return data.items;
  } catch (error) {
    console.error("❌ fetchVideos 오류:", error);
    return [];
  }
}
