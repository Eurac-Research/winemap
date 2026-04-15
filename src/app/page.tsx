import Link from "next/link";
import WinemapDescription from "@/app/components/WinemapDescription";
import MapApplicationCard from "@/app/components/map-applications/MapApplicationCard";
import { mapApplications } from "@/app/components/map-applications/mapApplications";
import MainAreaCard from "@/app/components/winemap-sections/MainAreaCard";
import { mainAreas } from "@/app/components/winemap-sections/mainAreas";

export default function HomePage() {

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[color:var(--page-bg)] text-[color:var(--text-strong)]">
      <section className="relative isolate overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(/images/landscape.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
          }}
        />

        <div className="relative z-20 mx-auto min-h-[clamp(34rem,72vh,54rem)] max-w-7xl">
          <div className="absolute bottom-20 right-[8%] z-20 max-w-3xl sm:bottom-24 lg:bottom-35 lg:right-[30%] min-[1700px]:bottom-36 min-[1700px]:right-[12%]">
            <div className="w-fit max-w-full bg-primary/70 px-4 py-4 text-center shadow-lg backdrop-blur-[2px]">
              <p className="max-w-3xl text-lg leading-relaxed text-[color:var(--text-strong)] md:text-xl">
                Explanatory Text
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className='bg-[color:var(--primary)]/30 py-8'>
        <div className="mx-auto max-w-3xl pb-6 text-center text-[color:var(--text-strong)] text-xl">
          An essential resource for stakeholders, farmers, and researchers on understanding wine heritage, climate adaptation, and governance frameworks.
        </div>
        <div className="mx-auto max-w-3xl text-[color:var(--text-muted)] text-justify">
          <WinemapDescription />
        </div>
        <div className='flex cols-2 gap-40 justify-center mt-8'>
          <Link href = '/about' className="border border-[color:var(--primary)] p-1 rounded-sm transition hover:bg-[color:var(--primary)]">
            About us
          </Link>
          <Link href = '/about#institute' className="border border-[color:var(--primary)] py-1 px-2 rounded-sm transition hover:bg-[color:var(--primary)]">
            Our Institute
          </Link>
        </div>
      </section>

      {/* Main Areas */}
      <section
        id='main-areas'
        className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-[color:var(--text-strong)] sm:text-4xl">
            Discover Our Focus Areas
          </h2>
        </div>

        <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mainAreas.filter((area) => area.showOnLanding).map((area) => (
            <MainAreaCard
              key={area.id}
              id={area.id}
              title={area.title}
              description={area.description}
              icon={area.icon}
              mainHref={area.mainHref}
              categories={area.categories}
              categoriesClassName={area.categoriesClassName}
            />
          ))}
        </div>
      </section>


      {/* Content */}
      <div className="relative z-20 w-full">
        <div className="relative z-20 w-full">
        
          {/* Map-Applications */}
          <section id='map-applications' className="mx-auto max-w-5xl border-t border-[color:var(--border-soft)] px-4 py-20 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-6 text-[color:var(--text-strong)]">Map Applications</h2>
            </div>
            <div className="flex gap-4 overflow-x-auto pt-2 pb-6 snap-x snap-mandatory w-full mx-auto">
              {mapApplications.map((app) => (
                <MapApplicationCard
                  key={app.title}
                  href={app.href}
                  title={app.title}
                  description={app.description}
                  icon={app.icon}
                />
              ))}
            </div>
          </section>

          {/* About Section */}
          <section className="mx-auto max-w-5xl border-t border-[color:var(--border-soft)] px-4 py-20 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-6 text-[color:var(--text-strong)]">About the Winemap</h2>
            </div>
            <WinemapDescription className="mt-3 text-[color:var(--text-muted)]"/>
          </section>

          {/* FAQ Section */}
          <section className="mx-auto max-w-5xl border-t border-[color:var(--border-soft)] px-4 py-20 sm:px-6 lg:px-8">
            <div>
              <h2 className="text-3xl font-bold mb-12 text-center text-[color:var(--text-strong)]">Frequently Asked Questions</h2>
              <div className="space-y-8">
                <div className="group">
                  <h3 className="text-xl font-semibold mb-3 text-[color:var(--text-strong)]">Who is behind this project?</h3>
                  <p className="leading-relaxed text-[color:var(--text-muted)]">
                    WINEMAP is developed by the{" "}
                    <a
                      href="https://www.eurac.edu/en/institutes-centers/institute-for-alpine-environment"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[color:var(--accent-strong)] hover:underline"
                    >
                      Institute for Alpine Environment{" "}
                    </a>
                    at Eurac Research in Bolzano, Italy. Our interdisciplinary research team 
                    specializes in climate adaptation, environmental science, and sustainable 
                    agriculture, providing the scientific foundation for this platform. The project is part of{" "}
                    <a
                      href="https://www.eurac.edu/en/data-in-action"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[color:var(--accent-strong)] hover:underline"
                    >
                      Data in Action
                    </a>
                    , an initiative by Eurac Research&apos;s Communication Department that transforms research data into accessible digital experiences. The platform&apos;s concept and technical development are handled by the Communication Department. Learn more about{" "}
                    <Link href="/team" className="text-[color:var(--accent-strong)] hover:underline">
                      our team
                    </Link>
                    .
                  </p>
                </div>

                <div className="group">
                  <h3 className="text-xl font-semibold mb-3 text-[color:var(--text-strong)]">What is the research behind the Winemap?</h3>
                  <p className="leading-relaxed text-[color:var(--text-muted)]">
                    The different datasets and map-applications show in the Winemap were created 
                    in the framework of several projects and publications.
                    You can find out more about the projects{" "}
                    <a
                      href="/about#projects"
                      className="text-[color:var(--accent-strong)] hover:underline"
                    >
                      here{" "}
                    </a>
                    and browse through related publications{" "}
                    <a
                      href="/literature"
                      className="text-[color:var(--accent-strong)] hover:underline"
                    >
                      here
                    </a>
                    .
                  </p>
                </div>

                <div className="group">
                  <h3 className="text-xl font-semibold mb-3 text-[color:var(--text-strong)]">What is the timeline of the project?</h3>
                  <p className="leading-relaxed text-[color:var(--text-muted)]">
                    The project began with the collection and digitization of PDO wine region data in 2020-2021. Climate and environmental data integration followed in 2022-2023, with ongoing updates to adaptation strategies and pilot implementation experiences. The platform continues to evolve with new data and features.
                  </p>
                </div>

                <div className="group">
                  <h3 className="text-xl font-semibold mb-3 text-[color:var(--text-strong)]">How can I use this data?</h3>
                  <p className="leading-relaxed text-[color:var(--text-muted)]">
                    The WINEMAP data is available for research, educational, and policy-making purposes. For specific data access, collaboration opportunities, or questions about data usage, please{" "}
                    <Link href="/imprint-privacy" className="text-[color:var(--accent-strong)] hover:underline">
                      contact us
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

