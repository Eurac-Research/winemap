import Image from "next/image";
import Link from "next/link";

import styles from "@/styles/Home.module.css";

export default function About() {
  return (
    <main className={styles.staticContentBox}>
      <Link href="/" className={styles.backLink}>
        <span className={`${styles.arrow} ${styles.left}`}></span>
        back to map
      </Link>

      <h1>Winemap</h1>
      <p>
        The Winemap is based on a collection and harmonization of data from
        different sources and projects. The Winemap was created by the{" "}
        <a
          href="https://www.eurac.edu/en/institutes-centers/institute-for-alpine-environment"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          <strong>Institute for Alpine Environment</strong>{" "}
        </a>
        at Eurac Research.
      </p>

      <section id="respond" className="mt-4">
        <div className="rounded-lg border border-white/10 bg-white/5 p-6">
          <h2>RESPOnD Project</h2>
          <p className="mb-4">
            The RESPOnD project aims to develop strategies for sustainable mountain development in the Alpine Space.
          </p>
          <a
            href="https://www.alpine-space.eu/project/respond/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Visit RESPOnD project page →
          </a>
        </div>
      </section>
      <section id="kultivas" className="mt-4">
        <div className="rounded-lg border border-white/10 bg-white/5 p-6">
          <h2>KULTIVAS Project</h2>
          <p className="mb-4">
            text
          </p>
          <a
            href="https://kultivas.eu/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Visit KULTIVAS project page →
          </a>
        </div>
      </section>
      <section id="rebecka" className="mt-4">
        <div className="rounded-lg border border-white/10 bg-white/5 p-6">
          <h2>REBECKA Project</h2>
          <p className="mb-4">
            text
          </p>
          <a
            href="https://www.eurac.edu/en/projects/rebecka"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Visit REBECKA project page →
          </a>
        </div>
      </section>
      <section id="clim-smart" className="mt-4">
        <div className="rounded-lg border border-white/10 bg-white/5 p-6">
          <h2>ClimSmart Project</h2>
          <p className="mb-4">
            text
          </p>
          <a
            href="https://fusiongrant.info/de/fusion-grant/archiv/climsmart-climate-smart-agriculture-entscheidungshilfen-fuer-die-suedtiroler-landwirtschaft-zur-anpassung-an-den-klimawandel"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Visit ClimSmart project page →
          </a>
        </div>
      </section>

      <section className="mt-12">
        <Link
          href="/literature"
          className="block rounded-lg border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/10"
        >
          <h2>Scientific literature</h2>
          <p className="text-white/70">
            Explore the publications behind the Winemap project, including data
            sources and the climate resilience study.
          </p>
          <span className="inline-block mt-4 underline">Go to literature →</span>
        </Link>
      </section>

      <section id="institute" className="mt-12">
        <div className="rounded-lg border border-white/10 bg-white/5 p-6">
          <h2>Institute for Alpine Environment</h2>
          <p>
            WINEMAP is developed by the Institute for Alpine Environment at
            Eurac Research in Bolzano, Italy. Our interdisciplinary research
            team specializes in climate adaptation, environmental science, and
            sustainable agriculture, providing the scientific foundation for
            this platform. The project is part of{" "}
            <a
              href="https://www.eurac.edu/en/data-in-action"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Data in Action
            </a>
            , an initiative by Eurac Research&apos;s Communication Department
            that transforms research data into accessible digital experiences.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-white/10 bg-black/30 p-4">
              <h3 className="text-lg font-semibold">Biodiversity & Ecosystems</h3>
              <p className="text-sm text-white/70">
                Monitoring and understanding biodiversity changes across alpine
                environments, from soil organisms to birds, ensuring the
                preservation of mountain ecosystems.
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-black/30 p-4">
              <h3 className="text-lg font-semibold">Climate Change Research</h3>
              <p className="text-sm text-white/70">
                Investigating climate impacts on alpine regions through
                long-term monitoring, from snowfall patterns to ecosystem shifts
                at high altitudes.
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-black/30 p-4">
              <h3 className="text-lg font-semibold">
                Sustainable Mountain Development
              </h3>
              <p className="text-sm text-white/70">
                Developing integrated landscape management approaches for
                resilient mountain forests and agriculture under global change.
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <a
              href="https://www.eurac.edu/en/institutes-centers/institute-for-alpine-environment"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-black font-semibold rounded hover:bg-white/90 transition-colors"
            >
              Learn more about the Institute
            </a>
            <Link
              href="/team"
              className="inline-flex items-center justify-center px-6 py-3 border border-white/20 text-white font-semibold rounded hover:bg-white/10 transition-colors"
            >
              Meet the team
            </Link>
          </div>
        </div>
      </section>

      <p className="mt-12">
        Winemap is part of the Eurac Research{" "}
        <a
          href="https://www.eurac.edu/en/data-in-action"
          target="_blank"
          rel="noreferrer"
          className="underline"
        >
          <i>Data in Action</i>
        </a>{" "}
        initiative.
        <br />
        The code is available on GitHub:{" "}
        <a
          href="https://github.com/Eurac-Research/winemap"
          target="_blank"
          rel="noreferrer"
          className="underline"
        >
          https://github.com/Eurac-Research/winemap
        </a>
      </p>

    </main>
  );
}
