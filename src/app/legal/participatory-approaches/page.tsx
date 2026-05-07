import Link from "next/link";
import Image from "next/image";

export default function VulnerabilityPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-6 py-32">
        <article className="space-y-12">
          <section className="rounded-2xl border p-8 md:p-12 border-[color:var(--border-soft)] bg-gradient-to-br from-[color:var(--surface-panel-muted)] to-[color:var(--surface-overlay)]">
            <span className="inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] border-[color:var(--border-strong)] text-[color:var(--muted-foreground)]">
              Governance
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-tight md:text-5xl">Participatory Approaches</h1>
            <p className="mt-6 max-w-4xl text-lg leading-relaxed text-[color:var(--text-base)]">
              In <b>participatory approaches</b>, researchers and individuals from different backgrounds - 
              such as growers, consultants, and local authorities - work together to develop <b>innovative solutions and ideas</b>. 
              The approach is based on the principle of <b>co-creation</b> and the collaborative, bottom-up process ensures that new 
              ideas and innovations are practical and based on the direct needs and experiences of the local community. 
            </p>
            <p className="mt-4 max-w-4xl text-lg leading-relaxed text-[color:var(--text-base)]">
              A key example of this methodology is the <b>Living Lab</b>, which acts as an 
              <b>innovation hub</b> situated in a real-life setting. Within these labs, 
              researchers and stakeholders join forces to <b>co-produce knowledge</b> and 
              address complex challenges, for instance through activities like workshops 
              and field trips. Research is thereby transformed into a joint effort that 
              builds trust, networks and develops solutions that would not be possible otherwise. 
            </p>
            <p className="mt-4 max-w-4xl text-lg leading-relaxed text-[color:var(--text-base)]">
              In the field of viticulture, these approaches can be used to share knowledge 
              and develop practical strategies for a more <b>sustainable and resilient sector</b>. 
              For a detailed look at how to design and run such collaborative spaces, 
              you can download the <b>Handbook for the co-creation and production of knowledge</b> below, 
              which provides a comprehensive guide on implementing Living Labs within the context of mountain vineyards. 
            </p>

            <br></br>
            <a
              href="/handbook-living-labs.pdf"
              download
              className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition border-[color:var(--border-strong)] text-[color:var(--text-base)] hover:text-[color:var(--foreground)] hover:border-[color:var(--accent-strong)]"
            >
              Download the Handbook (PDF)
            </a>

            <br></br>
            <figure className="w-full max-w-4xl mx-auto px-4">
              <div className="relative aspect-[3/2]">
                <Image
                  src="/livinglab-infographic.png"
                  alt="Infographic on living-labs"
                  fill
                  className="object-contain"
                  sizes="(min-width: 1024px) 800px, 100vw"
                />
              </div>
              <figcaption className="mt-3 text-sm text-center text-[color:var(--muted-foreground)]">
                Infographic on the general structure and idea behind living labs in the context of viticulture
              </figcaption>
            </figure>

          </section>
        </article>
      </div>
    </main>
  );
}
