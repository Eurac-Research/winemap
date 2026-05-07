type EbaVideoEmbedProps = {
  title: string;
  youtubeId: string;
  caption?: string;
};

const getEmbedUrl = (youtubeId: string) =>
  `https://www.youtube.com/embed/${youtubeId}`;

export function EbaVideoEmbed({
  title,
  youtubeId,
  caption,
}: EbaVideoEmbedProps) {
  return (
    <figure className="overflow-hidden rounded-lg border border-[color:var(--border-soft)] bg-[color:var(--surface-overlay)]">
      <div className="aspect-video bg-[color:var(--surface-panel-strong)]">
        <iframe
          src={getEmbedUrl(youtubeId)}
          title={title}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      {caption ? (
        <figcaption className="border-t border-[color:var(--border-soft)] px-4 py-3 text-sm text-[color:var(--muted-foreground)]">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
