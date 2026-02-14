import { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import Player from "video.js/dist/types/player";

interface VideoPlayerProps {
  src: string;
  type?: string;
  poster?: string;
  className?: string;
}

export function VideoPlayer({ src, type = "application/x-mpegURL", poster, className }: VideoPlayerProps) {
  const videoRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Player | null>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    const videoElement = document.createElement("video-js");
    videoElement.classList.add("vjs-big-play-centered", "vjs-fluid");
    videoRef.current.appendChild(videoElement);

    const player = videojs(videoElement, {
      autoplay: false,
      controls: true,
      responsive: true,
      fluid: true,
      poster,
      sources: [{ src, type }],
      language: "ar",
    });

    playerRef.current = player;

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [src, type, poster]);

  return (
    <div className={`rounded-xl overflow-hidden ${className || ""}`}>
      <div ref={videoRef} />
    </div>
  );
}
