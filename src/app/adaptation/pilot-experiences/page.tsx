"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface Video {
  id: string;
  title: string;
  caption: string;
  location: string;
  youtubeId: string;
}

const getEmbedUrl = (youtubeId: string) =>
  `https://www.youtube.com/embed/${youtubeId}`;

const getThumbnailUrl = (youtubeId: string) =>
  `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;

const getFallbackThumbnailUrl = (youtubeId: string) =>
  `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;

const videos: Video[] = [
  {
    id: "box-2-1",
    title: "Varietal Selection in Vrhpolje, Vipava Valley",
    caption: "Varietal Selection",
    location: "Vrhpolje, Vipava Valley",
    youtubeId: "Bt5I0sXKvJ0",
  },
  {
    id: "box-2-2",
    title: "Education & Innovation in Vrhpolje, Vipava Valley",
    caption: "Education & Innovation",
    location: "Vrhpolje, Vipava Valley",
    youtubeId: "0phj_rOHpNA",
  },
  {
    id: "box-2-3",
    title: "Stakeholder Engagement in Südburgenland, Austria",
    caption: "Stakeholder Engagement",
    location: "Südburgenland, Austria",
    youtubeId: "7ElF4lYi3_I",
  },
  {
    id: "box-2-4",
    title: "Climate change impacts & long-term adaptation in Südburgenland, Austria",
    caption: "Climate change impacts & long-term adaptation",
    location: "Südburgenland, Austria",
    youtubeId: "Mhy180EeNDc",
  },
];

export default function PilotExperiencesPage() {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-6 py-32 max-w-6xl">
        {/* Page Content */}
        <article className="prose prose-invert prose-lg max-w-none mb-16">
          <h1 className="text-4xl font-bold mb-8">Pilot implementation experiences</h1>

          <p className="text-lg leading-relaxed mb-12">
            How do adaptation measures look in practice? This section gathers stories from vineyards
            where new and traditional approaches are being tested side by side. Through short films
            from pilot regions of the Interreg Alpine Space project RESPOnD, you can discover how
            winegrowers, researchers and communities are working with their landscapes to address
            climate challenges while preserving local traditions.
          </p>

          <h2 className="text-3xl font-semibold mt-12 mb-8">Video case studies</h2>
        </article>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {videos.map((video) => (
            <div
              key={video.id}
              onClick={() => setSelectedVideo(video)}
              className="group relative rounded-lg overflow-hidden transition-all duration-300 cursor-pointer border border-[color:var(--border-soft)] bg-gradient-to-br from-[color:var(--surface-panel-muted)] to-[color:var(--surface-overlay)] hover:border-[color:var(--border-strong)]"
            >
              {/* Video Thumbnail */}
              <div className="relative aspect-video bg-[color:var(--surface-panel-strong)] flex items-center justify-center">
                <img
                  src={getThumbnailUrl(video.youtubeId)}
                  alt={video.title}
                  className="absolute inset-0 h-full w-full object-cover"
                  onError={(event) => {
                    const image = event.currentTarget;
                    image.onerror = null;
                    image.src = getFallbackThumbnailUrl(video.youtubeId);
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg
                    className="w-16 h-16 text-[color:var(--text-muted)] group-hover:text-[color:var(--text-strong)] transition-colors"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-[color:var(--surface-inverse)]/10 group-hover:bg-[color:var(--surface-inverse)]/20 transition-all duration-300" />
              </div>

              {/* Caption */}
              <div className="p-4">
                {/* <div className="text-xs text-white/40 mb-1">Box 2.{index + 1}</div> */}
                <h3 className="font-semibold mb-1 text-sm text-[color:var(--text-strong)]">{video.caption}</h3>
                <p className="text-xs text-[color:var(--text-muted)]">{video.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm p-4 bg-[color:var(--surface-inverse)]/30"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="relative w-full max-w-5xl rounded-lg overflow-hidden bg-[color:var(--surface-panel-strong)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full transition-colors bg-[color:var(--surface-inverse)]/25 hover:bg-[color:var(--surface-inverse)]/40"
            >
              <X className="w-6 h-6 text-[color:var(--text-strong)]" />
            </button>

            {/* Video Container */}
            <div className="relative aspect-video bg-[color:var(--surface-panel-strong)]">
              <iframe
                src={getEmbedUrl(selectedVideo.youtubeId)}
                title={selectedVideo.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Video Info */}
            <div className="p-6 border-t border-[color:var(--border-soft)]">
              <h3 className="text-xl font-semibold mb-2 text-[color:var(--text-strong)]">{selectedVideo.caption}</h3>
              <p className="text-[color:var(--text-muted)]">{selectedVideo.location}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
