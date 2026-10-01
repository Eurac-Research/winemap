"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { PilotVideos, type PilotVideo } from "@/content/pilot-videos";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";

const getEmbedUrl = (youtubeId: string) =>
  `https://www.youtube.com/embed/${youtubeId}`;

const getThumbnailUrl = (youtubeId: string) =>
  `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;

const getFallbackThumbnailUrl = (youtubeId: string) =>
  `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;

export default function PilotVideoCarousel() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [selectedVideo, setSelectedVideo] = useState<PilotVideo | null>(null);

  const moveCarousel = (direction: 1 | -1) => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const cards = viewport.querySelectorAll<HTMLElement>("[data-pilot-video]");
    const cardWidth = cards[1]?.offsetLeft - cards[0]?.offsetLeft;
    if (!cardWidth) return;

    const maxScrollLeft = viewport.scrollWidth - viewport.clientWidth;
    const nextScrollLeft =
      direction === -1
        ? Math.max(0, viewport.scrollLeft - cardWidth)
        : Math.min(maxScrollLeft, viewport.scrollLeft + cardWidth);

    viewport.scrollTo({ left: nextScrollLeft, behavior: "smooth" });
  };

  return (
    <section className="mt-10" aria-labelledby="pilot-videos-title">
      <h3
        id="pilot-videos-title"
        className="text-xl font-semibold app-text-color"
      >
        Video case studies
      </h3>

      <div className="mt-5 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 sm:gap-4">
        <button
          type="button"
          onClick={() => moveCarousel(-1)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--border)] bg-[color:var(--surface-overlay)] app-text-color transition hover:border-[color:var(--accent)] hover:text-[color:var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)] sm:h-12 sm:w-12"
          aria-label="Show previous pilot video"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>

        <div
          ref={viewportRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-1 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Pilot videos carousel"
        >
          {PilotVideos.map((video) => (
            <button
              key={video.id}
              type="button"
              data-pilot-video
              onClick={() => setSelectedVideo(video)}
              className="group w-[min(18rem,calc(100vw-7rem))] shrink-0 snap-start overflow-hidden border border-[color:var(--border)] bg-[color:var(--surface-overlay)] text-left transition-all duration-300 hover:border-[color:var(--accent)] hover:shadow-[var(--shadow-soft)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)] sm:w-72 lg:w-80"
            >
              <div className="relative aspect-video bg-[color:var(--surface)]">
                <Image
                  src={getThumbnailUrl(video.youtubeId)}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 20rem, (min-width: 640px) 18rem, calc(100vw - 7rem)"
                  className="object-cover"
                  onError={(event) => {
                    const image = event.currentTarget;
                    image.onerror = null;
                    image.src = getFallbackThumbnailUrl(video.youtubeId);
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-[color:var(--surface-inverse)]/10 transition group-hover:bg-[color:var(--surface-inverse)]/20">
                  <span className="flex items-center justify-center rounded-full bg-white/70 p-1.5 transition-transform group-hover:scale-105">
                    <Play className="h-7 w-7" aria-hidden="true" />
                  </span>
                </div>
              </div>

              <div className="flex min-h-24 flex-col p-4">
                <h4 className="text-sm font-semibold app-text-color">
                  {video.caption}
                </h4>
                <p className="mt-auto pt-2 app-label">{video.location}</p>
              </div>
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => moveCarousel(1)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--border)] bg-[color:var(--surface-overlay)] app-text-color transition hover:border-[color:var(--accent)] hover:text-[color:var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)] sm:h-12 sm:w-12"
          aria-label="Show next pilot video"
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      {selectedVideo ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[color:var(--surface-inverse)]/30 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="pilot-video-modal-title"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="relative w-full max-w-5xl overflow-hidden rounded-lg bg-[color:var(--surface)]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedVideo(null)}
              className="absolute right-4 top-4 z-10 rounded-full bg-[color:var(--surface-inverse)]/25 p-2 transition-colors hover:bg-[color:var(--surface-inverse)]/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)]"
              aria-label="Close video"
            >
              <X className="h-6 w-6 app-text-color" aria-hidden="true" />
            </button>

            <div className="relative aspect-video bg-[color:var(--surface)]">
              <iframe
                src={getEmbedUrl(selectedVideo.youtubeId)}
                title={selectedVideo.title}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="border-t border-[color:var(--border)] p-6">
              <h3
                id="pilot-video-modal-title"
                className="text-xl font-semibold app-text-color"
              >
                {selectedVideo.caption}
              </h3>
              <p className="mt-2 app-muted">{selectedVideo.location}</p>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
