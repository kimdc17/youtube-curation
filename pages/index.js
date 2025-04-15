import Head from 'next/head';
import { fetchVideos } from '../utils/fetchVideos';

export async function getServerSideProps() {
  const videos = await fetchVideos();
  return { props: { videos: videos || [] } };
}

export default function Home({ videos }) {
  return (
    <div>
      <Head>
        <title>유튜브 인기 영상</title>
      </Head>
      <main className="p-4">
        <h1 className="text-2xl font-bold mb-4">🔥 지금 대한민국에서 인기 있는 영상</h1>
        {videos.length === 0 ? (
          <p className="text-red-500">🚨 영상을 불러오지 못했습니다. API 키 또는 네트워크 상태를 확인해주세요.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {videos.map((video) => (
              <a
                key={video.id}
                href={`https://www.youtube.com/watch?v=${video.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="border p-4 rounded shadow hover:bg-gray-100 transition"
              >
                <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} />
                <h2 className="mt-2 font-semibold">{video.snippet.title}</h2>
                <p className="text-sm text-gray-600">{video.snippet.channelTitle}</p>
              </a>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
