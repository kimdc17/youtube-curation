import Head from 'next/head';
import { fetchVideos } from '../utils/fetchVideos';

export async function getServerSideProps() {
  try {
    const videos = await fetchVideos();
    return { props: { videos: videos || [] } };
  } catch (error) {
    console.error("🚨 API fetch 실패:", error);
    return { props: { videos: [] } };
  }
}

export default function Home({ videos }) {
  return (
    <div>
      <Head>
        <title>유튜브 인기 영상 모음</title>
        <meta name="description" content="실시간 대한민국 유튜브 인기 영상 큐레이션" />
      </Head>

      <main className="p-6">
        <h1 className="text-2xl font-bold mb-6">🔥 지금 대한민국에서 인기 있는 유튜브 영상</h1>

        {videos.length === 0 ? (
          <div className="text-red-500">
            <p>😢 데이터를 불러올 수 없습니다. 잠시 후 다시 시도해 주세요.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => {
              const { id, snippet } = video;
              if (!snippet) return null;

              return (
                <a
                  key={id}
                  href={`https://www.youtube.com/watch?v=${id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border rounded-lg shadow hover:shadow-lg transition p-3 bg-white"
                >
                  <img
                    src={snippet.thumbnails.medium.url}
                    alt={snippet.title}
                    className="rounded mb-2 w-full"
                  />
                  <h2 className="font-semibold text-base">{snippet.title}</h2>
                  <p className="text-sm text-gray-500">{snippet.channelTitle}</p>
                </a>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
