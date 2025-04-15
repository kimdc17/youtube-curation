import { useEffect, useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=KR&maxResults=10&key=${apiKey}`
        );
        const data = await res.json();
        if (data.items) {
          setVideos(data.items);
        } else {
          setError(true);
        }
      } catch (err) {
        setError(true);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div>
      <Head>
        <title>🔥 유튜브 인기 영상</title>
      </Head>
      <main className="p-6">
        <h1 className="text-2xl font-bold mb-4">📺 실시간 유튜브 인기 영상</h1>
        {error ? (
          <p className="text-red-500">❌ 데이터를 불러올 수 없습니다.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {videos.map((video) => (
              <a
                key={video.id}
                href={`https://www.youtube.com/watch?v=${video.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="border p-3 rounded shadow hover:bg-gray-100 transition"
              >
                <img
                  src={video.snippet?.thumbnails?.medium?.url}
                  alt={video.snippet?.title}
                  className="w-full rounded mb-2"
                />
                <h2 className="font-semibold">{video.snippet?.title}</h2>
                <p className="text-sm text-gray-500">{video.snippet?.channelTitle}</p>
              </a>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
