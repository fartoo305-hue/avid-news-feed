import { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import Player from "video.js/dist/types/player";

interface StreamSource {
  src: string;
  label?: string;
  type?: string;
}

interface VideoPlayerProps {
  src: string;
  sources?: StreamSource[];
  type?: string;
  poster?: string;
  className?: string;
}

export function VideoPlayer({ src, sources, type = "application/x-mpegURL", poster, className }: VideoPlayerProps) {
  const videoRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Player | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const allSources = sources && sources.length > 0
    ? sources
    : [{ src, label: "الافتراضي", type }];

  const currentSrc = allSources[activeIdx];

  useEffect(() => {
    if (!videoRef.current) return;

    // Clear previous
    if (playerRef.current) {
      playerRef.current.dispose();
      playerRef.current = null;
    }

    const videoElement = document.createElement("video-js");
    videoElement.classList.add("vjs-big-play-centered", "vjs-fluid");
    videoRef.current.innerHTML = "";
    videoRef.current.appendChild(videoElement);

    const player = videojs(videoElement, {
      autoplay: false,
      controls: true,
      responsive: true,
      fluid: true,
      poster,
      sources: [{ src: currentSrc.src, type: currentSrc.type || type }],
      language: "ar",
      liveui: true,
    });

    // Auto-switch to next server on error
    player.on("error", () => {
      if (activeIdx < allSources.length - 1) {
        setActiveIdx((prev) => prev + 1);
      }
    });

    playerRef.current = player;

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [currentSrc.src, type, poster]);

  return (
    <div className={`rounded-xl overflow-hidden ${className || ""}`}>
      <div ref={videoRef} />
      {allSources.length > 1 && (
        <div className="flex gap-2 mt-3 flex-wrap">
          {allSources.map((s, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold font-body transition-colors ${
                activeIdx === i
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-accent"
              }`}
            >
              {s.label || `سيرفر ${i + 1}`}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
