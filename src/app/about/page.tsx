import Link from "next/link";
import { Leaf, Scale, ThermometerSun, Map as MapIcon } from "lucide-react";
import WinemapDescription from "@/app/components/WinemapDescription";

import styles from "@/styles/Home.module.css";

export default function About() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-6xl px-6 py-32">
        <article>

          <section id='general' className="p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl">Winemap</h1>
            <WinemapDescription className="mt-3 text-white/70"/>
          </section>

          <section id='projects' className="p-8 md:p-12">
            <div>
              <h2 className="text-2xl md:text-3xl">Projects behind Winemap</h2>
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

                    <div className="flex items-start justify-between gap-6">
                      <p className="mt-2 text-white/70">
                        The RESPOnD project aims to co-design ecosystem-based adaptation solutions 
                        with wine practitioners and decision-makers to increase the climate resilience
                        of alpine wine orchards
                      </p>
                      <figure className="w-full">
                        <img
                          src="/RESPOnD_Logo_Monochrome.svg"
                          alt="RESPOnD logo"
                          className="w-[140px] h-auto object-contain"
                        />
                      </figure>
                    </div>
                    <span className="mt-4 inline-flex items-center gap-2 underline underline-offset-4">
                      Visit RESPOnD project page &rarr;
                    </span>
                  </a>
                </section>

                <section id="agata" className="block rounded-xl border border-white/10 bg-white/5 p-6 transition-colors hover:border-white/30 hover:bg-white/10">
                    <h3 className="text-lg font-semibold">AGATA Project</h3>
                    <p className="mt-2 text-white/70">
                      The AGATA (Accessible ecoloGicAl daTA for resilient Viticulture) project aims to 
                      develop spatially explicit indicators that describe key ecological 
                      conditions and ecosystem services provided by vineyard landscapes across the Alpine region, 
                      with the goal of strengthening their ecological resilience and long‑term sustainability.
                    </p>
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

          <section id="institute" className="p-8 md:p-12">
            <div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-6 mt-4">
                  <div className="flex items-start gap-3 mb-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="178.793"
                      height="22"
                      viewBox="0 0 178.793 19.536"
                      className="h-6 w-auto mt-1"
                    >
                      <path
                        d="M165.199 19.215c.679-.027 1.709-.081 2.768-.081 1.031 0 2.144.054 2.822.081v-.76l-.9-.135c-.6-.109-.9-.272-.9-2.171V8.303a6.188 6.188 0 0 1 3.147-1.058c2.307 0 2.849 1.275 2.849 3.337v5.562c0 1.9-.271 2.062-.9 2.171l-.9.135v.765c.678-.027 1.709-.081 2.767-.081 1.031 0 2.144.054 2.822.081v-.76l-.9-.135c-.6-.109-.9-.272-.9-2.171v-5.866c0-2.74-.923-4.639-4.124-4.639a6.3 6.3 0 0 0-3.88 1.763V0a20.047 20.047 0 0 1-3.771 1.465v.65c1.763.352 1.763.678 1.763 2.062v11.967c0 1.9-.271 2.062-.9 2.171l-.9.135Zm-6.539.326a4.838 4.838 0 0 0 4.016-1.737l-.136-.705a5.725 5.725 0 0 1-3.147.841c-2.822 0-4.8-1.927-4.8-5.4 0-3.608 1.927-5.725 4.232-5.725 1.927 0 2.551 1.031 2.632 2.577h1.031c0-.9.027-2.2.109-3.093a10.729 10.729 0 0 0-3.608-.651c-3.555 0-6.513 3.12-6.513 7.163 0 4.124 2.306 6.729 6.186 6.729m-16.037-.325c.678-.027 1.709-.109 2.767-.109 1.031 0 2.5.082 3.175.109v-.76l-1.247-.14c-.6-.082-.9-.272-.9-2.171V8.466a4.73 4.73 0 0 1 2.879-1.031 4.092 4.092 0 0 1 1.493.244l.218-1.872a4.463 4.463 0 0 0-1.167-.163 5.094 5.094 0 0 0-3.419 1.9V5.508a26.914 26.914 0 0 1-3.771 1.3v.651c1.764.352 1.764.678 1.764 2.062v6.62c0 1.9-.272 2.062-.9 2.171l-.9.135Zm-9.415-1.248a2.045 2.045 0 0 1-2.225-2.152c0-1.655 1.248-2.659 4.042-2.659.3 0 .761 0 1.059.028-.027.569-.081 2.6-.081 3.581a3.744 3.744 0 0 1-2.795 1.194m-.732 1.574a4.534 4.534 0 0 0 3.608-1.845h.055a1.777 1.777 0 0 0 1.98 1.845 4.134 4.134 0 0 0 2.063-.489v-.76c-1.656 0-2.144-.379-2.144-1.709 0-2.442.109-4.5.109-6.62 0-2.632-1.52-4.314-4.586-4.314a5.427 5.427 0 0 0-3.717 1.546l.136.787a6.281 6.281 0 0 1 3.094-.732c2.116 0 3.039 1.112 3.039 3.2v1.578c-.407-.027-1.086-.027-1.466-.027-3.473 0-5.725 1.628-5.725 4.178a3.316 3.316 0 0 0 3.555 3.365m-14.19-8.846c.217-1.845 1.356-3.852 3.636-3.852a2.977 2.977 0 0 1 2.846 3.256c0 .379-.162.6-.624.6Zm3.88 8.846c1.953 0 3.663-.842 4.178-1.683l-.081-.678a7.9 7.9 0 0 1-3.581.76c-3.039 0-4.5-2.442-4.5-5.372 0-.245 0-.516.027-.786h8.764a5.816 5.816 0 0 0 .055-.977 4.832 4.832 0 0 0-4.993-5.155c-3.527 0-6 3.039-6 7.163 0 4.151 2.144 6.729 6.133 6.729m-13.648 0c2.713 0 4.694-1.818 4.694-3.989 0-4.857-6.838-3.554-6.838-6.7 0-1.383 1.059-2.089 2.687-2.089 1.818 0 2.632.9 2.767 2.632h1a22.693 22.693 0 0 1-.054-3.039 10.491 10.491 0 0 0-3.609-.705c-2.632 0-4.585 1.411-4.585 3.581 0 4.911 6.81 3.256 6.81 6.648 0 1.519-1.194 2.469-2.9 2.469-2.307 0-2.876-1.058-3.12-2.985h-1a31.179 31.179 0 0 1 .074 3.555 12.844 12.844 0 0 0 4.07.624m-15.38-8.849c.217-1.845 1.357-3.852 3.636-3.852a2.978 2.978 0 0 1 2.845 3.256c0 .379-.163.6-.624.6Zm3.88 8.846c1.954 0 3.663-.842 4.179-1.683l-.082-.678a7.9 7.9 0 0 1-3.581.76c-3.038 0-4.5-2.442-4.5-5.372 0-.245 0-.516.027-.786h8.764a5.931 5.931 0 0 0 .054-.977 4.832 4.832 0 0 0-4.992-5.155c-3.528 0-6 3.039-6 7.163 0 4.151 2.144 6.729 6.132 6.729m-15.986-.322c.678-.027 1.709-.109 2.767-.109 1.032 0 2.5.082 3.175.109v-.76l-1.248-.14c-.6-.082-.9-.272-.9-2.171V8.466a4.728 4.728 0 0 1 2.881-1.031 4.091 4.091 0 0 1 1.492.244l.218-1.872a4.458 4.458 0 0 0-1.167-.163 5.091 5.091 0 0 0-3.419 1.9V5.508a26.95 26.95 0 0 1-3.772 1.3v.651c1.764.352 1.764.678 1.764 2.062v6.62c0 1.9-.272 2.062-.9 2.171l-.9.135Zm-13.296.321a10.166 10.166 0 0 0 3.687-.663v-4.032a5.963 5.963 0 0 1-3.283.778c-1.7 0-2.707-1.152-2.707-3.283 0-2.592 1.094-3.629 2.679-3.629a8.352 8.352 0 0 1 3.082.6V5.366a12.034 12.034 0 0 0-3.573-.518c-5.011 0-7.6 3.2-7.6 7.488 0 4.464 2.362 7.2 7.719 7.2M50.66 16.048c-.806 0-1.325-.259-1.325-1.066 0-.95.518-1.325 1.959-1.325a5.282 5.282 0 0 1 .633.029V15.5a1.742 1.742 0 0 1-1.267.547m-1.76 3.489a4.211 4.211 0 0 0 3.718-1.788 3.347 3.347 0 0 0 3.37 1.786 4.056 4.056 0 0 0 2.391-.576v-3.2a2.9 2.9 0 0 1-.462.058c-.576 0-.806-.346-.806-1.009v-4.43c0-3.772-1.872-5.529-6.48-5.529a14.844 14.844 0 0 0-4.751.72v3.83a14.846 14.846 0 0 1 3.859-.6c1.556 0 2.189.547 2.189 1.728v.461c-.2 0-.433-.029-.921-.029-3.888 0-6.711 1.095-6.711 4.349 0 2.966 2.045 4.233 4.609 4.233m-15.525-.234h5.184v-9.274a7.4 7.4 0 0 1 3.11-.72 6.513 6.513 0 0 1 1.584.173V4.992a3.481 3.481 0 0 0-1.152-.144 4.839 4.839 0 0 0-3.657 1.728V5.078H33.38Zm-12.3.231a6.047 6.047 0 0 0 3.888-1.354v1.123h5.04V5.078h-5.182v9.706a3.025 3.025 0 0 1-1.728.748c-1.037 0-1.555-.461-1.555-1.757V5.078H16.33v9.476c0 2.851 1.239 4.982 4.752 4.982M5.414 10.548c.058-1.009.49-2.045 1.728-2.045 1.095 0 1.555.95 1.555 1.872v.173Zm2.42 8.986a13.961 13.961 0 0 0 4.838-.806v-3.829a11.914 11.914 0 0 1-4.406.864c-2.3 0-2.852-.864-2.938-2.419h8.324a13.521 13.521 0 0 0 .086-1.527c0-3.657-1.584-6.969-6.624-6.969C2.275 4.848 0 8.39 0 12.163c0 4.32 2.16 7.373 7.834 7.373"
                        fill="#fff"
                      ></path>
                    </svg>
                  </div>
                  <h2 className="text-2xl md:text-3xl">
                    Institute for Alpine Environment
                  </h2>
                  <p className="text-white/80 mt-3">
                    The Winemap is developed by the Institute for Alpine Environment at
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

                  <h2 className="text-2xl md:text-3xl mt-3">
                    Our Mission
                  </h2>
                  <p className="text-white/70 leading-relaxed mb-6">
                    The global biodiversity crisis is one of the greatest challenges facing humanity today. Our research focuses on how biodiversity, ecosystem functions, and services are changing and adapting due to human activities and climate change, with particular emphasis on mountain areas and their unique vulnerabilities.
                  </p>

                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                      <div className="w-12 h-12 rounded-full bg-[#E91E63]/10 flex items-center justify-center mb-4">
                        <Leaf className="w-6 h-6 text-[#E91E63]" />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">Biodiversity & Ecosystems</h3>
                      <p className="text-white/60 text-sm leading-relaxed">
                        Monitoring and understanding biodiversity changes across alpine environments, from soil organisms to birds, ensuring the preservation of mountain ecosystems.
                      </p>
                    </div>

                    <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                      <div className="w-12 h-12 rounded-full bg-[#E91E63]/10 flex items-center justify-center mb-4">
                        <ThermometerSun className="w-6 h-6 text-[#E91E63]" />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">Climate Change Research</h3>
                      <p className="text-white/60 text-sm leading-relaxed">
                        Investigating climate impacts on alpine regions through long-term monitoring, from snowfall patterns to ecosystem shifts at high altitudes.
                      </p>
                    </div>

                    <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                      <div className="w-12 h-12 rounded-full bg-[#E91E63]/10 flex items-center justify-center mb-4">
                        <Scale className="w-6 h-6 text-[#E91E63]" />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">Sustainable Mountain Development</h3>
                      <p className="text-white/60 text-sm leading-relaxed">
                        Developing integrated landscape management approaches for resilient mountain forests and agriculture under global change.
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

          <section  className="p-8 md:p-12">
            <div>
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
        </article>
      </div>
    </main>
  );
}
