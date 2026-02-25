import Link from "next/link";
import { Leaf, Scale, ThermometerSun, Map as MapIcon } from "lucide-react";
import { Sidebar } from "./components/Sidebar";
import WinemapDescription from "@/app/components/WinemapDescription";

export default function HomePage() {
  return (
    <div className="relative min-h-screen text-white p-0 overflow-x-hidden">
    {/* Sticky Hero Section */}
    <section className="relative sticky top-0 z-10 h-screen ">

      {/* Background Image Layer */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/images/winemap-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
        }}
      />

      {/* Radial Gradient Overlay to soften edges and focus center */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: 'radial-gradient(circle at center, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.85) 40%, rgba(0,0,0,0.9) 70%, rgba(0,0,0,0.95) 100%)',
          backgroundAttachment: 'fixed',
        }}
      />

      <div className="h-full px-6 md:px-12">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-end">
          <div className="max-w-xl border border-white/20 bg-white/10 rounded-xl shadow-xl p-6 text-center z-50">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 text-white">WINEMAP</h1>
            <p className="text-xl md:text-2xl text-white/60 mb-4 font-light flex items-center justify-center gap-2">by         <svg
              xmlns="http://www.w3.org/2000/svg"
              width="178.793"
              height="22"
              viewBox="0 0 178.793 19.536"
              className="h-6 w-auto"
            >
              <path
                d="M165.199 19.215c.679-.027 1.709-.081 2.768-.081 1.031 0 2.144.054 2.822.081v-.76l-.9-.135c-.6-.109-.9-.272-.9-2.171V8.303a6.188 6.188 0 0 1 3.147-1.058c2.307 0 2.849 1.275 2.849 3.337v5.562c0 1.9-.271 2.062-.9 2.171l-.9.135v.765c.678-.027 1.709-.081 2.767-.081 1.031 0 2.144.054 2.822.081v-.76l-.9-.135c-.6-.109-.9-.272-.9-2.171v-5.866c0-2.74-.923-4.639-4.124-4.639a6.3 6.3 0 0 0-3.88 1.763V0a20.047 20.047 0 0 1-3.771 1.465v.65c1.763.352 1.763.678 1.763 2.062v11.967c0 1.9-.271 2.062-.9 2.171l-.9.135Zm-6.539.326a4.838 4.838 0 0 0 4.016-1.737l-.136-.705a5.725 5.725 0 0 1-3.147.841c-2.822 0-4.8-1.927-4.8-5.4 0-3.608 1.927-5.725 4.232-5.725 1.927 0 2.551 1.031 2.632 2.577h1.031c0-.9.027-2.2.109-3.093a10.729 10.729 0 0 0-3.608-.651c-3.555 0-6.513 3.12-6.513 7.163 0 4.124 2.306 6.729 6.186 6.729m-16.037-.325c.678-.027 1.709-.109 2.767-.109 1.031 0 2.5.082 3.175.109v-.76l-1.247-.14c-.6-.082-.9-.272-.9-2.171V8.466a4.73 4.73 0 0 1 2.879-1.031 4.092 4.092 0 0 1 1.493.244l.218-1.872a4.463 4.463 0 0 0-1.167-.163 5.094 5.094 0 0 0-3.419 1.9V5.508a26.914 26.914 0 0 1-3.771 1.3v.651c1.764.352 1.764.678 1.764 2.062v6.62c0 1.9-.272 2.062-.9 2.171l-.9.135Zm-9.415-1.248a2.045 2.045 0 0 1-2.225-2.152c0-1.655 1.248-2.659 4.042-2.659.3 0 .761 0 1.059.028-.027.569-.081 2.6-.081 3.581a3.744 3.744 0 0 1-2.795 1.194m-.732 1.574a4.534 4.534 0 0 0 3.608-1.845h.055a1.777 1.777 0 0 0 1.98 1.845 4.134 4.134 0 0 0 2.063-.489v-.76c-1.656 0-2.144-.379-2.144-1.709 0-2.442.109-4.5.109-6.62 0-2.632-1.52-4.314-4.586-4.314a5.427 5.427 0 0 0-3.717 1.546l.136.787a6.281 6.281 0 0 1 3.094-.732c2.116 0 3.039 1.112 3.039 3.2v1.578c-.407-.027-1.086-.027-1.466-.027-3.473 0-5.725 1.628-5.725 4.178a3.316 3.316 0 0 0 3.555 3.365m-14.19-8.846c.217-1.845 1.356-3.852 3.636-3.852a2.977 2.977 0 0 1 2.846 3.256c0 .379-.162.6-.624.6Zm3.88 8.846c1.953 0 3.663-.842 4.178-1.683l-.081-.678a7.9 7.9 0 0 1-3.581.76c-3.039 0-4.5-2.442-4.5-5.372 0-.245 0-.516.027-.786h8.764a5.816 5.816 0 0 0 .055-.977 4.832 4.832 0 0 0-4.993-5.155c-3.527 0-6 3.039-6 7.163 0 4.151 2.144 6.729 6.133 6.729m-13.648 0c2.713 0 4.694-1.818 4.694-3.989 0-4.857-6.838-3.554-6.838-6.7 0-1.383 1.059-2.089 2.687-2.089 1.818 0 2.632.9 2.767 2.632h1a22.693 22.693 0 0 1-.054-3.039 10.491 10.491 0 0 0-3.609-.705c-2.632 0-4.585 1.411-4.585 3.581 0 4.911 6.81 3.256 6.81 6.648 0 1.519-1.194 2.469-2.9 2.469-2.307 0-2.876-1.058-3.12-2.985h-1a31.179 31.179 0 0 1 .074 3.555 12.844 12.844 0 0 0 4.07.624m-15.38-8.849c.217-1.845 1.357-3.852 3.636-3.852a2.978 2.978 0 0 1 2.845 3.256c0 .379-.163.6-.624.6Zm3.88 8.846c1.954 0 3.663-.842 4.179-1.683l-.082-.678a7.9 7.9 0 0 1-3.581.76c-3.038 0-4.5-2.442-4.5-5.372 0-.245 0-.516.027-.786h8.764a5.931 5.931 0 0 0 .054-.977 4.832 4.832 0 0 0-4.992-5.155c-3.528 0-6 3.039-6 7.163 0 4.151 2.144 6.729 6.132 6.729m-15.986-.322c.678-.027 1.709-.109 2.767-.109 1.032 0 2.5.082 3.175.109v-.76l-1.248-.14c-.6-.082-.9-.272-.9-2.171V8.466a4.728 4.728 0 0 1 2.881-1.031 4.091 4.091 0 0 1 1.492.244l.218-1.872a4.458 4.458 0 0 0-1.167-.163 5.091 5.091 0 0 0-3.419 1.9V5.508a26.95 26.95 0 0 1-3.772 1.3v.651c1.764.352 1.764.678 1.764 2.062v6.62c0 1.9-.272 2.062-.9 2.171l-.9.135Zm-13.296.321a10.166 10.166 0 0 0 3.687-.663v-4.032a5.963 5.963 0 0 1-3.283.778c-1.7 0-2.707-1.152-2.707-3.283 0-2.592 1.094-3.629 2.679-3.629a8.352 8.352 0 0 1 3.082.6V5.366a12.034 12.034 0 0 0-3.573-.518c-5.011 0-7.6 3.2-7.6 7.488 0 4.464 2.362 7.2 7.719 7.2M50.66 16.048c-.806 0-1.325-.259-1.325-1.066 0-.95.518-1.325 1.959-1.325a5.282 5.282 0 0 1 .633.029V15.5a1.742 1.742 0 0 1-1.267.547m-1.76 3.489a4.211 4.211 0 0 0 3.718-1.788 3.347 3.347 0 0 0 3.37 1.786 4.056 4.056 0 0 0 2.391-.576v-3.2a2.9 2.9 0 0 1-.462.058c-.576 0-.806-.346-.806-1.009v-4.43c0-3.772-1.872-5.529-6.48-5.529a14.844 14.844 0 0 0-4.751.72v3.83a14.846 14.846 0 0 1 3.859-.6c1.556 0 2.189.547 2.189 1.728v.461c-.2 0-.433-.029-.921-.029-3.888 0-6.711 1.095-6.711 4.349 0 2.966 2.045 4.233 4.609 4.233m-15.525-.234h5.184v-9.274a7.4 7.4 0 0 1 3.11-.72 6.513 6.513 0 0 1 1.584.173V4.992a3.481 3.481 0 0 0-1.152-.144 4.839 4.839 0 0 0-3.657 1.728V5.078H33.38Zm-12.3.231a6.047 6.047 0 0 0 3.888-1.354v1.123h5.04V5.078h-5.182v9.706a3.025 3.025 0 0 1-1.728.748c-1.037 0-1.555-.461-1.555-1.757V5.078H16.33v9.476c0 2.851 1.239 4.982 4.752 4.982M5.414 10.548c.058-1.009.49-2.045 1.728-2.045 1.095 0 1.555.95 1.555 1.872v.173Zm2.42 8.986a13.961 13.961 0 0 0 4.838-.806v-3.829a11.914 11.914 0 0 1-4.406.864c-2.3 0-2.852-.864-2.938-2.419h8.324a13.521 13.521 0 0 0 .086-1.527c0-3.657-1.584-6.969-6.624-6.969C2.275 4.848 0 8.39 0 12.163c0 4.32 2.16 7.373 7.834 7.373"
                fill="#fff"
              ></path>
            </svg>
            </p>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              An essential resource for stakeholders, farmers, and researchers on understanding wine heritage, climate adaptation, and governance frameworks.
            </p>
          </div>
        </div>
        <img
          src="/RESPOnD_Logo_Monochrome.svg"
          alt="RESPOnD Logo"
          className="absolute top-6 left-6 z-50 h-24 w-auto rounded-md"
        />
      </div>
    </section>

      {/* Background + Content Layer */}
      <div className="relative z-20 w-full -mt-[100vh] bg-black min-h-screen pt-4">

        {/* Content Layer */}
        <div className="relative z-20 w-full">
          {/* Sidebar Component */}
          <Sidebar />

          {/* Main Areas - Vertical Layout */}
          <section className="relative z-30 px-4 pb-12 max-w-5xl mx-auto bg-black/90 backdrop-blur-xl rounded-3xl mt-4">
            <div className="space-y-6">
              {/* Area 1: Climate & Environment */}
              <div id="climate-environment" className="group relative bg-gradient-to-br from-white/10 to-white/5 border border-white/20 hover:border-[#E91E63] transition-all duration-300 overflow-hidden backdrop-blur-md rounded-xl shadow-xl hover:shadow-[#E91E63]/20">
                <div className="grid md:grid-cols-[200px_1fr_250px] gap-6 p-8 items-center">
                  {/* Left - Icon and Title */}
                  <Link href="/#climate-environment" className="flex flex-col items-center text-center group/main">
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#E91E63]/20 to-[#E91E63]/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <ThermometerSun className="w-12 h-12 text-[#E91E63]" aria-hidden="true" />
                    </div>
                    <h2 className="text-xl font-bold text-white uppercase tracking-wide group-hover/main:text-[#E91E63] transition-colors">
                      Climate &<br />Environment
                    </h2>
                  </Link>

                  {/* Middle - Description and Map Button */}
                  <div className="flex flex-col justify-center space-y-4">
                    <p className="text-white/70 text-sm leading-relaxed">
                      Explore climate data, vulnerability assessments, and environmental indicators for wine regions across Europe.
                    </p>
                    <Link
                      href="/#climate-environment"
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-zinc-900/80 hover:bg-[#E91E63] text-white rounded-lg transition-all duration-300 font-semibold text-sm shadow-lg hover:shadow-[#E91E63]/50 self-start"
                    >
                      <MapIcon className="w-4 h-4" aria-hidden="true" />
                      Open Map
                    </Link>
                  </div>

                  {/* Right - Categories */}
                  <div className="space-y-1 border-l border-white/10 pl-6">
                    <Link
                      href="/climate-environment/climate"
                      className="block px-3 py-2 rounded-lg hover:bg-white/10 transition-colors group/link"
                    >
                      <h3 className="text-white/90 font-semibold text-sm group-hover/link:text-[#E91E63] transition-colors">
                        Climate Indicators →
                      </h3>
                    </Link>
                    <Link
                      href="/climate-environment/vulnerability"
                      className="block px-3 py-2 rounded-lg hover:bg-white/10 transition-colors group/link"
                    >
                      <h3 className="text-white/90 font-semibold text-sm group-hover/link:text-[#E91E63] transition-colors">
                        Vulnerability & Risks →
                      </h3>
                    </Link>
                    <Link
                      href="/climate-environment/ecosystem-services"
                      className="block px-3 py-2 rounded-lg hover:bg-white/10 transition-colors group/link"
                    >
                      <h3 className="text-white/90 font-semibold text-sm group-hover/link:text-[#E91E63] transition-colors">
                        Ecosystem Services →
                      </h3>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Area 2: Adaptation */}
              <div id="adaptation" className="group relative bg-gradient-to-br from-white/10 to-white/5 border border-white/20 hover:border-[#E91E63] transition-all duration-300 overflow-hidden backdrop-blur-md rounded-xl shadow-xl hover:shadow-[#E91E63]/20">
                <div className="grid md:grid-cols-[200px_1fr_250px] gap-6 p-8 items-center">
                  {/* Left - Icon and Title */}
                  <Link href="/adaptation" className="flex flex-col items-center text-center group/main">
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#E91E63]/20 to-[#E91E63]/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Leaf className="w-12 h-12 text-[#E91E63]" aria-hidden="true" />
                    </div>
                    <h2 className="text-xl font-bold text-white uppercase tracking-wide group-hover/main:text-[#E91E63] transition-colors">
                      Adaptation
                    </h2>
                  </Link>

                  {/* Middle - Description and Map Button */}
                  <div className="flex flex-col justify-center space-y-4">
                    <p className="text-white/70 text-sm leading-relaxed">
                      Discover ecosystem-based adaptation strategies and pilot implementation experiences in wine regions.
                    </p>
                    <Link
                      href="/adaptation"
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-zinc-900/80 hover:bg-[#E91E63] text-white rounded-lg transition-all duration-300 font-semibold text-sm shadow-lg hover:shadow-[#E91E63]/50 self-start"
                    >
                      <MapIcon className="w-4 h-4" aria-hidden="true" />
                      Open Map
                    </Link>
                  </div>

                  {/* Right - Categories */}
                  <div className="space-y-1 border-l border-white/10 pl-6">
                    <Link
                      href="/adaptation"
                      className="block px-3 py-2 rounded-lg hover:bg-white/10 transition-colors group/link"
                    >
                      <h3 className="text-white/90 font-semibold text-sm group-hover/link:text-[#E91E63] transition-colors">
                        EbA Strategies Catalogue →
                      </h3>
                    </Link>
                    <Link
                      href="/adaptation/pilot-experiences"
                      className="block px-3 py-2 rounded-lg hover:bg-white/10 transition-colors group/link"
                    >
                      <h3 className="text-white/90 font-semibold text-sm group-hover/link:text-[#E91E63] transition-colors">
                        Pilot Experiences →
                      </h3>
                    </Link>
                    <Link
                      href="/adaptation"
                      className="block px-3 py-2 rounded-lg hover:bg-white/10 transition-colors group/link"
                    >
                      <h3 className="text-white/90 font-semibold text-sm group-hover/link:text-[#E91E63] transition-colors">
                        Spatial Analogues →
                      </h3>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Area 3: Governance */}
              <div id='governance' className="group relative bg-gradient-to-br from-white/10 to-white/5 border border-white/20 hover:border-[#E91E63] transition-all duration-300 overflow-hidden backdrop-blur-md rounded-xl shadow-xl hover:shadow-[#E91E63]/20">
                <div className="grid md:grid-cols-[200px_1fr_250px] gap-6 p-8 items-center">
                  {/* Left - Icon and Title */}
                  <Link href="/legal" className="flex flex-col items-center text-center group/main">
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#E91E63]/20 to-[#E91E63]/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Scale className="w-12 h-12 text-[#E91E63]" aria-hidden="true" />
                    </div>
                    <h2 className="text-xl font-bold text-white uppercase tracking-wide group-hover/main:text-[#E91E63] transition-colors">
                      Governance
                    </h2>
                  </Link>

                  {/* Middle - Description and Map Button */}
                  <div className="flex flex-col justify-center space-y-4">
                    <p className="text-white/70 text-sm leading-relaxed">
                      Navigate legal frameworks, regulations, and geographic indications for wine production in Europe.
                    </p>
                    <Link
                      href="/legal"
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-zinc-900/80 hover:bg-[#E91E63] text-white rounded-lg transition-all duration-300 font-semibold text-sm shadow-lg hover:shadow-[#E91E63]/50 self-start"
                    >
                      <MapIcon className="w-4 h-4" aria-hidden="true" />
                      Open Map
                    </Link>
                  </div>

                  {/* Right - Categories */}
                  <div className="space-y-1 border-l border-white/10 pl-6">
                    <Link
                      href="/legal/eu-policy"
                      className="block px-3 py-2 rounded-lg hover:bg-white/10 transition-colors group/link"
                    >
                      <h3 className="text-white/90 font-semibold text-sm group-hover/link:text-[#E91E63] transition-colors">
                        EU Policy →
                      </h3>
                    </Link>
                    <Link
                      href="/legal/participatory-approaches"
                      className="block px-3 py-2 rounded-lg hover:bg-white/10 transition-colors group/link"
                    >
                      <h3 className="text-white/90 font-semibold text-sm group-hover/link:text-[#E91E63] transition-colors">
                        Participatory Approaches →
                      </h3>
                    </Link>
                    <Link
                      href="/legal/participatory-approaches"
                      className="block px-3 py-2 rounded-lg hover:bg-white/10 transition-colors group/link"
                    >
                      <h3 className="text-white/90 font-semibold text-sm group-hover/link:text-[#E91E63] transition-colors">
                        Courses →
                      </h3>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Cartography Section */}
          <section id='cartography' className="px-4 pb-16 max-w-5xl mx-auto">
            <Link href="/cartography" className="group relative bg-white/5 border border-white/10 hover:border-[#E91E63]/50 transition-all duration-300 overflow-hidden backdrop-blur-md rounded-lg block">
              <div className="grid md:grid-cols-[140px_1fr] gap-4 p-6 items-center">
                {/* Left side - Icon */}
                <div className="flex flex-col items-center justify-center">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#E91E63]/10 to-[#E91E63]/5 flex items-center justify-center mb-2">
                    <MapIcon className="w-7 h-7 text-[#E91E63]" aria-hidden="true" />
                  </div>
                  <span className="text-white/80 font-semibold text-sm text-center">
                    Cartography
                  </span>
                </div>

                {/* Right side - Description */}
                <div className="flex flex-col justify-center">
                  <h2 className="text-lg font-bold text-white mb-2 group-hover:text-[#E91E63] transition-colors">
                    Cartographic Interface
                  </h2>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Access all map layers in one unified interface. Toggle layers, organize by scale or category, and explore detailed information.
                  </p>
                </div>
              </div>
            </Link>
          </section>

          {/* About Section */}
          <section className="px-4 py-20 max-w-4xl mx-auto border-t border-white/10">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-6">About the Winemap</h2>
            </div>
            <WinemapDescription className="mt-3 text-white/70"/>
          </section>

          {/* FAQ Section */}
          <section className="px-4 py-20 max-w-4xl mx-auto border-t border-white/10">
            <div>
              <h2 className="text-3xl font-bold text-white mb-12 text-center">Frequently Asked Questions</h2>
              <div className="space-y-8">
                <div className="group">
                  <h3 className="text-xl font-semibold text-white mb-3">Who is behind this project?</h3>
                  <p className="text-white/70 leading-relaxed">
                    WINEMAP is developed by the{" "}
                    <a
                      href="https://www.eurac.edu/en/institutes-centers/institute-for-alpine-environment"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#E91E63] hover:underline"
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
                      className="text-[#E91E63] hover:underline"
                    >
                      Data in Action
                    </a>
                    , an initiative by Eurac Research&apos;s Communication Department that transforms research data into accessible digital experiences. The platform&apos;s concept and technical development are handled by the Communication Department. Learn more about{" "}
                    <Link href="/team" className="text-[#E91E63] hover:underline">
                      our team
                    </Link>
                    .
                  </p>
                </div>

                <div className="group">
                  <h3 className="text-xl font-semibold text-white mb-3">What is the research behind the Winemap?</h3>
                  <p className="text-white/70 leading-relaxed">
                    The different datasets and map-applications show in the Winemap were created 
                    in the framework of several projects and publications.
                    You can find out more about the projects{" "}
                    <a
                      href="/about#projects"
                      className="text-[#E91E63] hover:underline"
                    >
                      here{" "}
                    </a>
                    and browse through related publications{" "}
                    <a
                      href="/literature"
                      className="text-[#E91E63] hover:underline"
                    >
                      here
                    </a>
                    .
                  </p>
                </div>

                <div className="group">
                  <h3 className="text-xl font-semibold text-white mb-3">What is the timeline of the project?</h3>
                  <p className="text-white/70 leading-relaxed">
                    The project began with the collection and digitization of PDO wine region data in 2020-2021. Climate and environmental data integration followed in 2022-2023, with ongoing updates to adaptation strategies and pilot implementation experiences. The platform continues to evolve with new data and features.
                  </p>
                </div>

                <div className="group">
                  <h3 className="text-xl font-semibold text-white mb-3">How can I use this data?</h3>
                  <p className="text-white/70 leading-relaxed">
                    The WINEMAP data is available for research, educational, and policy-making purposes. For specific data access, collaboration opportunities, or questions about data usage, please{" "}
                    <Link href="/imprint-privacy" className="text-[#E91E63] hover:underline">
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
