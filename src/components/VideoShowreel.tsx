import { Clapperboard, Play } from "lucide-react";
import { useRef, useState } from "react";
import { getProjectVideo } from "../data/projectAssets";
import { videoReel } from "../data/hiring";

export function VideoShowreel() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const src = getProjectVideo(videoReel.projectId);

  if (!src) return null;

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-border/50 bg-white shadow-[0_16px_48px_-20px_rgba(15,23,42,0.12)] dark:border-white/10 dark:bg-[#0c121c]">
      <div className="flex items-center justify-between gap-4 border-b border-border/50 bg-off-white/80 px-5 py-4 dark:border-white/10 dark:bg-white/[0.03] sm:px-6">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-pale text-green-dark ring-1 ring-green/15 dark:bg-green/10">
            <Clapperboard className="h-5 w-5" strokeWidth={2} />
          </span>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-green-dark">
              Video reel
            </p>
            <h3 className="font-heading text-lg font-semibold text-text sm:text-xl">
              {videoReel.title}
            </h3>
          </div>
        </div>
        <span className="hidden rounded-full border border-green/20 bg-green-pale/70 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-green-dark dark:bg-green/10 sm:inline-flex">
          Sample edit
        </span>
      </div>

      <div className="p-3 sm:p-4">
        <div className="overflow-hidden rounded-[1.1rem] border border-border/60 bg-black shadow-inner ring-1 ring-black/10 dark:border-white/10">
          <div className="flex items-center gap-2 border-b border-white/10 bg-[#111827] px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
            <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
            <span className="h-2 w-2 rounded-full bg-[#28c840]" />
            <span className="ml-2 truncate text-[10px] font-medium text-white/50">reel.mp4</span>
          </div>
          <div className="relative aspect-video bg-black">
            <video
              ref={videoRef}
              src={src}
              className="h-full w-full object-contain"
              controls
              playsInline
              preload="metadata"
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
            />
            {!playing ? (
              <button
                type="button"
                onClick={togglePlay}
                className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-t from-black/60 via-black/20 to-black/30 transition hover:from-black/70"
                aria-label="Play video reel"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-green-dark shadow-[0_12px_40px_rgba(0,0,0,0.35)] ring-4 ring-white/20 transition-transform hover:scale-105">
                  <Play className="ml-1 h-7 w-7 fill-current" />
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
                  Watch reel
                </span>
              </button>
            ) : null}
          </div>
        </div>
        <p className="mt-3 px-1 text-sm leading-relaxed text-text-secondary">{videoReel.description}</p>
      </div>
    </div>
  );
}
