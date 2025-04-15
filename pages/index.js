{videos.length === 0 ? (
  <p className="text-red-500">
    🚨 영상을 불러오지 못했습니다. API 키 또는 네트워크 상태를 확인해주세요.
  </p>
) : (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {videos.map((video) => {
      const snippet = video.snippet || {};
      const thumbnail = snippet.thumbnails?.medium?.url;
      return (
        <a
          key={video.id}
          href={`https://www.youtube.com/watch?v=${video.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="border p-4 rounded shadow hover:bg-gray-100 transition"
        >
          {thumbnail && (
            <img src={thumbnail} alt={snippet.title || '유튜브 썸네일'} />
          )}
          <h2 className="mt-2 font-semibold">{snippet.title || '제목 없음'}</h2>
          <p className="text-sm text-gray-600">{snippet.channelTitle || '채널 없음'}</p>
        </a>
      );
    })}
  </div>
)}
