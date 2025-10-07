import Link from "next/link";
import { Map, Leaf, Scale } from "lucide-react";

export default function HomePage() {
  return (
    <div className="relative min-h-screen text-white flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Background Image Layer */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/images/winemap-bg.jpg)',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Radial Gradient Overlay to soften edges and focus center */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: 'radial-gradient(circle at center, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.85) 40%, rgba(0,0,0,0.9) 70%, rgba(0,0,0,0.95) 100%)',
        }}
      />

      {/* Content Layer */}
      <div className="relative z-20 w-full">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center justify-center px-4 py-20">
          <div className="max-w-5xl mx-auto text-center">
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
              A comprehensive overview of all wine regions that fall under the Protected Designation of Origin (PDO)
              label. An essential resource for understanding wine heritage, climate adaptation, and governance frameworks.
            </p>
          </div>
        </section>

        {/* Main Areas Grid */}
        <section className="px-4 py-20 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Area 1: Benefits, Values & Climatic Threats */}
            <Link
              href="/climate-environment"
              className="group relative bg-white/5 border border-white/10 hover:border-[#E91E63] transition-all duration-300 overflow-hidden backdrop-blur-md"
            >
              <div className="p-8 h-full flex flex-col">
                <div className="mb-6">
                  <div className="w-16 h-16 rounded-full bg-[#E91E63]/10 flex items-center justify-center mb-4 group-hover:bg-[#E91E63]/20 transition-colors">
                    <Map className="w-8 h-8 text-[#E91E63]" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">BENEFITS, VALUES & CLIMATIC THREATS</h2>
                </div>

                <div className="space-y-4 flex-grow">
                  <div>
                    <h3 className="text-white/90 font-semibold mb-1">Wine map climate & environment</h3>
                    <p className="text-white/60 text-sm leading-relaxed">
                      Explore how climate change impacts wine regions across Europe, understanding vulnerabilities and
                      environmental factors.
                    </p>
                  </div>
                </div>

                <div className="mt-6 text-[#E91E63] font-semibold group-hover:translate-x-2 transition-transform">
                  Explore →
                </div>
              </div>
            </Link>

            {/* Area 2: Ecosystem-Based Adaptation */}
            <Link
              href="/adaptation"
              className="group relative bg-white/5 border border-white/10 hover:border-[#E91E63] transition-all duration-300 overflow-hidden backdrop-blur-md"
            >
              <div className="p-8 h-full flex flex-col">
                <div className="mb-6">
                  <div className="w-16 h-16 rounded-full bg-[#E91E63]/10 flex items-center justify-center mb-4 group-hover:bg-[#E91E63]/20 transition-colors">
                    <Leaf className="w-8 h-8 text-[#E91E63]" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">ECOSYSTEM-BASED ADAPTATION</h2>
                </div>

                <div className="space-y-4 flex-grow">
                  <div>
                    <h3 className="text-white/90 font-semibold mb-1">Wine map adaptation</h3>
                    <p className="text-white/60 text-sm leading-relaxed">
                      Discover sustainable adaptation strategies and ecosystem-based solutions for resilient wine
                      production.
                    </p>
                  </div>
                </div>

                <div className="mt-6 text-[#E91E63] font-semibold group-hover:translate-x-2 transition-transform">
                  Explore →
                </div>
              </div>
            </Link>

            {/* Area 3: Governance */}
            <Link
              href="/legal"
              className="group relative bg-white/5 border border-white/10 hover:border-[#E91E63] transition-all duration-300 overflow-hidden backdrop-blur-md"
            >
              <div className="p-8 h-full flex flex-col">
                <div className="mb-6">
                  <div className="w-16 h-16 rounded-full bg-[#E91E63]/10 flex items-center justify-center mb-4 group-hover:bg-[#E91E63]/20 transition-colors">
                    <Scale className="w-8 h-8 text-[#E91E63]" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">GOVERNANCE</h2>
                </div>

                <div className="space-y-4 flex-grow">
                  <div>
                    <h3 className="text-white/90 font-semibold mb-1">Wine map legal</h3>
                    <p className="text-white/60 text-sm leading-relaxed">
                      Navigate the legal frameworks, PDO regulations, and governance structures protecting European wine
                      heritage.
                    </p>
                  </div>
                </div>

                <div className="mt-6 text-[#E91E63] font-semibold group-hover:translate-x-2 transition-transform">
                  Explore →
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* About Section */}
        <section className="px-4 py-20 max-w-4xl mx-auto border-t border-white/10">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-6">About the Project</h2>
            <p className="text-white/70 leading-relaxed mb-4">
              The Winemap provides a comprehensive overview of all wine regions that fall under the Protected Designation
              of Origin (PDO) label (as of November 2021). It is an essential resource for anyone interested in wine or
              who works in the wine industry or related sectors.
            </p>
            <p className="text-white/70 leading-relaxed">
              The map is based on a collection of legal information, including grape varieties, geospatial boundaries, and
              production details, and is the first representation of European PDO regions in one comprehensive resource.
            </p>
          </div>
        </section>

        {/* Additional Links */}
        <div className="flex flex-wrap justify-center gap-6 text-sm">
          <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
            About the project
          </Link>
          <Link href="/about-pdo" className="text-gray-400 hover:text-white transition-colors">
            What&apos;s a PDO?
          </Link>
          <Link href="/about-data" className="text-gray-400 hover:text-white transition-colors">
            About the data
          </Link>
          <Link href="/team" className="text-gray-400 hover:text-white transition-colors">
            The Team
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} Eurac Research{" "}
            <Link href="/imprint-privacy" className="underline hover:text-gray-400">
              Imprint / Privacy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
