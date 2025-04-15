export async function fetchVideos() {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=KR&maxResults=10&key=${apiKey}`;

  try {
    const res = await fetch(apiUrl);
    const data = await res.json();

    console.log("🔍 [Vercel] API KEY:", apiKey ? "OK" : "❌ 없음");
    console.log("📦 [Vercel] API 응답:", JSON.stringify(data));

    return data.items || [];
  } catch (err) {
    console.error("🚨 fetchVideos API 오류:", err);
    return [];
  }
}
