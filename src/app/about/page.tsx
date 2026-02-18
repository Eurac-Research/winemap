import Link from "next/link";

import styles from "@/styles/Home.module.css";

export default function About() {
  return (
    <main className={styles.staticContentBox}>
      <Link href="/" className={styles.backLink}>
        <span className={`${styles.arrow} ${styles.left}`}></span>
        back to map
      </Link>

      <section className="mt-6">
        <div className="max-w-2xl">
          <h1 className="mt-3 text-3xl md:text-4xl">Winemap</h1>
          <p className="mt-4 text-white/80">
            The Winemap is based on a collection and harmonization of data from
            different sources and projects. The Winemap was created by the{" "}
            <a
              href="https://www.eurac.edu/en/institutes-centers/institute-for-alpine-environment"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4"
            >
              <strong>Institute for Alpine Environment</strong>
            </a>{" "}
            at Eurac Research.
          </p>
        </div>
      </section>

      <section id='projects' className="mt-10">
        <div className="max-w-2xl">
          <h2 className="text-2xl md:text-3xl mt-4">Projects behind Winemap</h2>
          <p className="mt-3 text-white/70">
            These initiatives provide the research foundation and datasets that
            feed into the Winemap platform.
          </p>
          <div className="mt-6 grid gap-4">
            <section id="respond">
              <a
                href="https://www.alpine-space.eu/project/respond/"
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-xl border border-white/10 bg-white/5 p-6 transition-colors hover:border-white/30 hover:bg-white/10"
              >
                <h3 className="text-lg font-semibold">RESPOnD Project</h3>
                <p className="mt-2 text-white/70">
                  The RESPOnD project aims to co-design ecosystem-based adaptation solutions 
                  with wine practitioners and decision-makers to increase the climate resilience
                  of alpine wine orchards
                </p>
                <span className="mt-4 inline-flex items-center gap-2 underline underline-offset-4">
                  Visit RESPOnD project page &rarr;
                </span>
              </a>
            </section>
            <section id="kultivas">
              <a
                href="https://kultivas.eu/"
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-xl border border-white/10 bg-white/5 p-6 transition-colors hover:border-white/30 hover:bg-white/10"
              >
                <h3 className="text-lg font-semibold">KULTIVAS Project</h3>
                <p className="mt-2 text-white/70">
                KULTIVAS is a modern big-data application that uses high resolution climatic and remote sensing data combined with 
                machine learning to enable data-based decision making in agriculture and forestry.
                </p>
                <span className="mt-4 inline-flex items-center gap-2 underline underline-offset-4">
                  Visit KULTIVAS project page &rarr;
                </span>
              </a>
            </section>
            <section id="rebecka">
              <a
                href="https://www.eurac.edu/en/projects/rebecka"
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-xl border border-white/10 bg-white/5 p-6 transition-colors hover:border-white/30 hover:bg-white/10"
              >
                <h3 className="text-lg font-semibold">REBECKA Project</h3>
                <p className="mt-2 text-white/70">
                The REBECKA project aims to develop a land-suitability model for viticulture based
                on historical harvest data, grape quality assessments and climatic models.
                </p>
                <span className="mt-4 inline-flex items-center gap-2 underline underline-offset-4">
                  Visit REBECKA project page &rarr;
                </span>
              </a>
            </section>
            <section id="clim-smart">
              <a
                href="https://fusiongrant.info/de/fusion-grant/archiv/climsmart-climate-smart-agriculture-entscheidungshilfen-fuer-die-suedtiroler-landwirtschaft-zur-anpassung-an-den-klimawandel"
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-xl border border-white/10 bg-white/5 p-6 transition-colors hover:border-white/30 hover:bg-white/10"
              >
                <h3 className="text-lg font-semibold">ClimSmart Project</h3>
                <p className="mt-2 text-white/70">
                The ClimSmart Project combines high-resolution climate data and modern analytical methods
                to identify targeted adaptation strategies for mountain agriculture.
                </p>
                <span className="mt-4 inline-flex items-center gap-2 underline underline-offset-4">
                  Visit ClimSmart project page &rarr;
                </span>
              </a>
            </section>
          </div>
        </div>
      </section>

      <section id="institute" className="mt-12">
        <div className="max-w-2xl">
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-2xl md:text-3xl">
              Institute for Alpine Environment
            </h2>
            <p className="mt-3 text-white/80">
              WINEMAP is developed by the Institute for Alpine Environment at
              Eurac Research in Bolzano, Italy. Our interdisciplinary research
              team specializes in climate adaptation, environmental science, and
              sustainable agriculture, providing the scientific foundation for
              this platform. The project is part of{" "}
              <a
                href="https://www.eurac.edu/en/data-in-action"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4"
              >
                Data in Action
              </a>
              , an initiative by Eurac Research&apos;s Communication Department
              that transforms research data into accessible digital experiences.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-lg border border-white/10 bg-black/30 p-4">
                <h3 className="text-lg font-semibold">
                  Biodiversity & Ecosystems
                </h3>
                <p className="mt-2 text-sm text-white/70">
                  Monitoring and understanding biodiversity changes across
                  alpine environments, from soil organisms to birds, ensuring
                  the preservation of mountain ecosystems.
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-black/30 p-4">
                <h3 className="text-lg font-semibold">
                  Climate Change Research
                </h3>
                <p className="mt-2 text-sm text-white/70">
                  Investigating climate impacts on alpine regions through
                  long-term monitoring, from snowfall patterns to ecosystem
                  shifts at high altitudes.
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-black/30 p-4">
                <h3 className="text-lg font-semibold">
                  Sustainable Mountain Development
                </h3>
                <p className="mt-2 text-sm text-white/70">
                  Developing integrated landscape management approaches for
                  resilient mountain forests and agriculture under global
                  change.
                </p>
              </div>
            </div>
            <div className="mt-6 flex flex-col gap-4 sm:flex-row">
              <a
                href="https://www.eurac.edu/en/institutes-centers/institute-for-alpine-environment"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded bg-white px-6 py-3 font-semibold text-black transition-colors hover:bg-white/90"
              >
                Learn more about the Institute
              </a>
              <Link
                href="/team"
                className="inline-flex items-center justify-center rounded border border-white/20 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
              >
                Meet the team
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <div className="max-w-2xl">
          <Link
            href="/literature"
            className="block rounded-xl border border-white/10 bg-white/5 p-6 transition-colors hover:border-white/30 hover:bg-white/10"
          >
            <h2 className="text-2xl md:text-3xl">Scientific literature</h2>
            <p className="mt-3 text-white/70">
              Explore the publications behind the Winemap project.
            </p>
            <span className="mt-4 inline-flex items-center gap-2 underline underline-offset-4">
              Go to literature &rarr;
            </span>
          </Link>
        </div>
      </section>

      <section className="mt-12">
        <div className="max-w-2xl text-white/70">
          <p>
            Winemap is part of the Eurac Research{" "}
            <a
              href="https://www.eurac.edu/en/data-in-action"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4"
            >
              <i>Data in Action</i>
            </a>{" "}
            initiative.
          </p>
          <p className="mt-3">
            The code is available on GitHub:{" "}
            <a
              href="https://github.com/Eurac-Research/winemap"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4"
            >
              https://github.com/Eurac-Research/winemap
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
