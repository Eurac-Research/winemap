"use client";

import Link from "next/link";
import { useState } from "react";
import { X } from "lucide-react";

interface Video {
  id: string;
  title: string;
  caption: string;
  location: string;
  thumbnail: string;
  videoUrl: string;
}

const videos: Video[] = [
  {
    id: "box-2-1",
    title: "Water management in South Tyrol, Italy",
    caption: "Water management",
    location: "South Tyrol, Italy",
    thumbnail: "/video-thumbnails/south-tyrol.jpg",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID_1",
  },
  {
    id: "box-2-2",
    title: "Dry-stone walls in Ballons des Vosges, France",
    caption: "Dry-stone walls",
    location: "Ballons des Vosges, France",
    thumbnail: "/video-thumbnails/vosges.jpg",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID_2",
  },
  {
    id: "box-2-3",
    title: "Terraces in the Cinque Terre National Park, Italy",
    caption: "Terraces",
    location: "Cinque Terre National Park, Italy",
    thumbnail: "/video-thumbnails/cinque-terre.jpg",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID_3",
  },
  {
    id: "box-2-4",
    title: "Vine pruning techniques, cover crops and humus enhancement in Südburgenland, Austria",
    caption: "Vine pruning techniques, cover crops and humus enhancement",
    location: "Südburgenland, Austria",
    thumbnail: "/video-thumbnails/sudburgenland.jpg",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID_4",
  },
  {
    id: "box-2-5",
    title: "Microclimate manipulation and water harvesting in Vipava Valley, Slovenia",
    caption: "Microclimate manipulation and water harvesting",
    location: "Vipava Valley, Slovenia",
    thumbnail: "/video-thumbnails/vipava.jpg",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID_5",
  },
  {
    id: "box-2-6",
    title: "New varieties and rootstock selection in Franken, Germany",
    caption: "New varieties and rootstock selection",
    location: "Franken, Germany",
    thumbnail: "/video-thumbnails/franken.jpg",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID_6",
  },
  {
    id: "box-2-7",
    title: "The potential of Kaolin to prevent sunburn damage in Valle d'Aosta, Italy",
    caption: "Kaolin to prevent sunburn damage",
    location: "Valle d'Aosta, Italy",
    thumbnail: "/video-thumbnails/valle-aosta.jpg",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID_7",
  },
];

export default function PilotExperiencesPage() {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  return (
    <div className="min-h-screen bg-black text-white">
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
          {videos.map((video, index) => (
            <div
              key={video.id}
              onClick={() => setSelectedVideo(video)}
              className="group relative bg-gradient-to-br from-[#2a2a2a] to-[#1f1f1f] border border-white/10 rounded-lg overflow-hidden hover:border-white/30 transition-all duration-300 cursor-pointer"
            >
              {/* Video Thumbnail */}
              <div className="relative aspect-video bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center">
                {/* Placeholder for video thumbnail - replace with actual images */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg
                    className="w-16 h-16 text-white/40 group-hover:text-white/60 transition-colors"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300" />
              </div>

              {/* Caption */}
              <div className="p-4">
                <div className="text-xs text-white/40 mb-1">Box 2.{index + 1}</div>
                <h3 className="font-semibold text-white mb-1 text-sm">{video.caption}</h3>
                <p className="text-xs text-white/60">{video.location}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Back Link */}
        <div className="text-center">
          <Link
            href="/adaptation"
            className="text-white/60 hover:text-white transition-colors inline-flex items-center gap-2"
          >
            <span>←</span>
            Back to Adaptation Map
          </Link>
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="relative w-full max-w-5xl bg-zinc-900 rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Video Container */}
            <div className="relative aspect-video bg-black">
              <iframe
                src={selectedVideo.videoUrl}
                title={selectedVideo.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Video Info */}
            <div className="p-6 border-t border-white/10">
              <h3 className="text-xl font-semibold text-white mb-2">{selectedVideo.caption}</h3>
              <p className="text-white/60">{selectedVideo.location}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
