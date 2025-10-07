"use client"

import { Map, Video } from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"

export function Navigation() {
  return (
    <div className=" bg-black fixed top-0 left-0 w-full z-50 border-b border-white/20">
      <div className="px-6 flex justify-center items-center">
        <NavigationMenu className="justify-center py-6">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-black text-white hover:bg-white/10 hover:text-white data-[state=open]:bg-white/10 data-[state=open]:text-white text-base px-5 py-3">
                BENEFITS, VALUES & CLIMATIC THREATS
              </NavigationMenuTrigger>
              <NavigationMenuContent className="bg-black border-white/20">
                <div className="grid grid-cols-[340px_1fr] gap-0 w-[900px]">
                  {/* Left side - Large clickable main entry */}
                  <NavigationMenuLink
                    href="/climate-environment"
                    className="flex flex-col justify-center p-10 bg-zinc-900 hover:bg-zinc-800 transition-colors border-r border-white/10"
                  >
                    <Map className="size-12 text-white mb-4" />
                    <h3 className="text-2xl font-semibold text-white mb-3">Wine map climate & environment</h3>
                    <p className="text-base text-white/60 leading-relaxed">
                      Explore climate data and environmental indicators for wine regions.
                    </p>
                  </NavigationMenuLink>

                  {/* Right side - List of subsections */}
                  <div className="grid gap-1 p-5">
                    <NavigationMenuLink
                      href="#climate-indicators"
                      className="block rounded-md p-4 hover:bg-white/10 transition-colors"
                    >
                      <div className="font-semibold text-white mb-1.5 text-base">Climate Indicators & scenarios</div>
                      <div className="text-sm text-white/60 leading-relaxed">
                        Raster data with different climatic indices (Huglin Index, Dryness Index...)
                      </div>
                    </NavigationMenuLink>

                    <NavigationMenuLink
                      href="#vulnerability"
                      className="block rounded-md p-4 hover:bg-white/10 transition-colors"
                    >
                      <div className="font-semibold text-white mb-1.5 text-base">Vulnerability & Risks</div>
                      <div className="text-sm text-white/60 leading-relaxed">Exposure, Sensitivity</div>
                    </NavigationMenuLink>

                    <NavigationMenuLink
                      href="#ecosystem-services"
                      className="block rounded-md p-4 hover:bg-white/10 transition-colors"
                    >
                      <div className="font-semibold text-white mb-1.5 text-base">Ecosystem Services</div>
                      <div className="text-sm text-white/60 leading-relaxed">
                        Pollination, Soil erosion control Index
                      </div>
                    </NavigationMenuLink>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-black text-white hover:bg-white/10 hover:text-white data-[state=open]:bg-white/10 data-[state=open]:text-white text-base px-5 py-3">
                ECOSYSTEM-BASED ADAPTATION
              </NavigationMenuTrigger>
              <NavigationMenuContent className="bg-black border-white/20">
                <div className="grid grid-cols-[340px_1fr] gap-0 w-[900px]">
                  {/* Left side - Large clickable main entry */}
                  <NavigationMenuLink
                    href="/?vulnerability=true"
                    className="flex flex-col justify-center p-10 bg-zinc-900 hover:bg-zinc-800 transition-colors border-r border-white/10"
                  >
                    <Map className="size-12 text-white mb-4" />
                    <h3 className="text-2xl font-semibold text-white mb-3">Wine map adaptation</h3>
                    <p className="text-base text-white/60 leading-relaxed">
                      Discover ecosystem-based adaptation strategies for viticulture.
                    </p>
                  </NavigationMenuLink>

                  {/* Right side - List of subsections */}
                  <div className="grid gap-1 p-5">
                    <NavigationMenuLink
                      href="#eba-catalogue"
                      className="block rounded-md p-4 hover:bg-white/10 transition-colors"
                    >
                      <div className="font-semibold text-white mb-1.5 text-base">Catalogue of EbA strategies</div>
                      <div className="text-sm text-white/60 leading-relaxed">
                        The Catalogue of EbA strategies brings together approaches that harness biodiversity and
                        ecosystem functions to mitigate risks.
                      </div>
                    </NavigationMenuLink>

                    <NavigationMenuLink
                      href="#pilot-implementation"
                      className="block rounded-md p-4 hover:bg-white/10 transition-colors"
                    >
                      <div className="font-semibold text-white mb-1.5 flex items-center gap-2 text-base">
                        <div className="bg-white rounded-md p-1 flex items-center justify-center">
                          <Video className="size-4 text-black" />
                        </div>
                        Pilot implementation experiences
                      </div>
                      <div className="text-sm text-white/60 leading-relaxed">
                        Through short films from pilot regions, you can discover how winegrowers, researchers and
                        communities are working with their landscapes to address climate challenges while preserving
                        local traditions.
                      </div>
                    </NavigationMenuLink>

                    <NavigationMenuLink
                      href="#spatial-analogues"
                      className="block rounded-md p-4 hover:bg-white/10 transition-colors"
                    >
                      <div className="font-semibold text-white mb-1.5 text-base">Spatial analogues</div>
                      <div className="text-sm text-white/60 leading-relaxed">
                        This section includes an interactive tool to select and visualize spatial analogues for
                        individual European wine regions.
                      </div>
                    </NavigationMenuLink>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-black text-white hover:bg-white/10 hover:text-white data-[state=open]:bg-white/10 data-[state=open]:text-white text-base px-5 py-3">
                GOVERNANCE
              </NavigationMenuTrigger>
              <NavigationMenuContent className="bg-black border-white/20">
                <div className="grid grid-cols-[340px_1fr] gap-0 w-[900px]">
                  {/* Left side - Large clickable main entry */}
                  <NavigationMenuLink
                    href="/?vulnerability=false"
                    className="flex flex-col justify-center p-10 bg-zinc-900 hover:bg-zinc-800 transition-colors border-r border-white/10"
                  >
                    <Map className="size-12 text-white mb-4" />
                    <h3 className="text-2xl font-semibold text-white mb-3">Wine map legal</h3>
                    <p className="text-base text-white/60 leading-relaxed">
                      Navigate regulations and governance frameworks for wine production.
                    </p>
                  </NavigationMenuLink>

                  {/* Right side - List of subsections */}
                  <div className="grid gap-1 p-5">
                    <NavigationMenuLink
                      href="#eu-regulations"
                      className="block rounded-md p-4 hover:bg-white/10 transition-colors"
                    >
                      <div className="font-semibold text-white mb-1.5 text-base">EU Planting and Plant Health Regulations</div>
                      <div className="text-sm text-white/60 leading-relaxed">
                        The EU Planting and Plant Health Regulations aim to ensure the sustainable management of plant
                        health risks and promote biodiversity in viticulture.
                      </div>
                    </NavigationMenuLink>

                    <NavigationMenuLink
                      href="#geographic-indications"
                      className="block rounded-md p-4 hover:bg-white/10 transition-colors"
                    >
                      <div className="font-semibold text-white mb-1.5 text-base">Geographic indications</div>
                      <div className="text-sm text-white/60 leading-relaxed">
                        Geographical indications at the EU level are a form of intellectual property protection that
                        safeguard the names of products whose qualities, reputation, or characteristics are linked to
                        their specific geographical origin.
                      </div>
                    </NavigationMenuLink>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  )
}
