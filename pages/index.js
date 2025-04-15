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
      <main className="p-4 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">🔥 지금 대한민국에서 인기 있는 유튜브 영상</h1>

        {videos.length === 0 ? (
          <div className="text-red-500 bg-red-100 p-4 rounded">
            🚨 영상을 불러오지 못했습니다. API 키 또는 YouTube API 문제일 수 있습니다.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {videos.map((video) => {
              const { id, snippet = {} } = video;
              const title = snippet.title || '제목 없음';
              const channel = snippet.channelTitle || '채널 없음';
              const thumbnail = snippet.thumbnails?.medium?.url || '';

              return (
                <a
                  key={id}
                  href={`https://www.youtube.com/watch?v=${id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border p-4 rounded shadow hover:shadow-lg transition"
                >
                  {thumbnail && (
                    <img
                      src={thumbnail}
                      alt={title}
                      className="rounded"
                    />
                  )}
                  <h2 className="mt-3 font-semibold text-lg">{title}</h2>
                  <p className="text-sm text-gray-600">{channel}</p>
                </a>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
