import React from "react";
import { PlayCircle } from "lucide-react"; // Play icon

// Playlist URLs mapped by language
const playlists = {
  Python: "https://youtu.be/ix9cRaBkVe0?si=3_VKDERvatujjcqK",
  JavaScript: "https://youtu.be/lfmg-EJ8gm4?si=EJa3Z3UXgJINy5Ub",
  HTML: "https://youtu.be/G3e-cpL7ofc?si=qygtzBuiyiJ9gOlV",
  Java: "https://www.youtube.com/watch?v=9n4fczZ0_ak",
  Cpp: "https://www.youtube.com/watch?v=oPpnCh7InLY",
  Swift: "https://www.youtube.com/watch?v=2EX2mAL_W9c",
  Rust: "https://www.youtube.com/watch?v=Jhfrsdf2g7",
  Go: "https://www.youtube.com/watch?v=AKJ98sd7gf",
  Kotlin: "https://www.youtube.com/watch?v=KJh3sjdfe45"
};

function VideoSuggestions({ language }) {
  const playlistUrl = playlists[language]; // Get playlist URL based on selected language

  return (
    <div className="card flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
          Recommended playlist
        </h2>
        <p className="mt-1 text-lg font-bold text-white">{language} crash course</p>
      </div>
      {playlistUrl ? (
        <a
          href={playlistUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn shrink-0 bg-rose-500/90 text-white hover:bg-rose-500"
        >
          <PlayCircle className="h-5 w-5" />
          <span>Watch on YouTube</span>
        </a>
      ) : (
        <p className="text-sm muted">No playlist available for this language yet.</p>
      )}
    </div>
  );
}

export default VideoSuggestions;
