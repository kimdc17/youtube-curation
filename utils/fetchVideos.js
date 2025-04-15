export async function fetchVideos() {
  const apiKey = process.env.YOUTUBE_API_KEY;
  console.log("✅ [확인용] API KEY:", apiKey); // 이 줄 꼭 추가!
  
  const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=KR&maxResults=10&key=${apiKey}`;
  const res = await fetch(apiUrl);
  const data = await res.json();

  console.log("✅ [확인용] API 응답 데이터:", data);

  return data.items;
}
