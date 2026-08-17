

export type PilotVideo = {
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

export const PilotVideos: PilotVideo[] = [
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
    title:
      "Climate change impacts & long-term adaptation in Südburgenland, Austria",
    caption: "Climate change impacts & long-term adaptation",
    location: "Südburgenland, Austria",
    youtubeId: "Mhy180EeNDc",
  },
];