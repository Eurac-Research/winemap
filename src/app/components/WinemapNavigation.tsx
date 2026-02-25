"use client";

import Link from "next/link";

interface WinemapNavigationProps {
  currentPage: "regions" | "adaptation" | "environment";
}

export default function WinemapNavigation({
  currentPage,
}: WinemapNavigationProps) {
  return (
    <nav className="flex items-center gap-1 text-sm relative z-10 mt-4">
      <Link
        href="/?vulnerability=false"
        className={`px-3 py-1 rounded transition-all border relative group ${
          currentPage === "regions"
            ? "bg-white bg-opacity-20 text-white border-white border-opacity-50"
            : "text-gray-300 hover:text-white hover:bg-white hover:bg-opacity-10 border-transparent hover:border-white hover:border-opacity-30"
        }`}
      >
        Regions
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-black bg-opacity-90 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 w-40 text-center">
          Explore European PDO wine regions and their characteristics
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-black border-b-opacity-90"></div>
        </div>
      </Link>
      <span className="text-gray-400 mx-1">|</span>
      <Link
        href="/?vulnerability=true"
        className={`px-3 py-1 rounded transition-all border relative group ${
          currentPage === "adaptation"
            ? "bg-white bg-opacity-20 text-white border-white border-opacity-50"
            : "text-gray-300 hover:text-white hover:bg-white hover:bg-opacity-10 border-transparent hover:border-white hover:border-opacity-30"
        }`}
      >
        Adaptation
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-black bg-opacity-90 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 w-40 text-center">
          Climate change vulnerability analysis and adaptation strategies
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-black border-b-opacity-90"></div>
        </div>
      </Link>
      <span className="text-gray-400 mx-1">|</span>
      <Link
        href="/climate-environment"
        className={`px-3 py-1 rounded transition-all border relative group ${
          currentPage === "environment"
            ? "bg-white bg-opacity-20 text-white border-white border-opacity-50"
            : "text-gray-300 hover:text-white hover:bg-white hover:bg-opacity-10 border-transparent hover:border-white hover:border-opacity-30"
        }`}
      >
        Environment
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-black bg-opacity-90 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 w-40 text-center">
          Ecosystem conditions and environmental services in the Alps
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-black border-b-opacity-90"></div>
        </div>
      </Link>
    </nav>
  );
}
