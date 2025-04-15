export async function fetchVideos() {
  try {
    const apiKey = process.env.YOUTUBE_API_KEY;
    console.log("✅ API KEY:", apiKey);

    const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=KR&maxResults=10&key=${apiKey}`;
    const res = await fetch(apiUrl);
    const data = await res.json();

    console.log("📦 API 응답:", data); // ✅ 응답 로그 추가

    if (!data.items) {
      return [];
    }

    return data.items;
  } catch (error) {
    console.error("❌ fetchVideos 오류:", error);
    return [];
  }
}
