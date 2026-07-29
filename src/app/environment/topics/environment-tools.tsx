import Link from "next/link";
import { ArrowRight, Map as MapIcon, ShieldAlert } from "lucide-react";

import { GlossaryTermPopover } from "@/components/glossary/glossaryTerm";
import type { TopicMetadata } from "@/components/topics/types";
import { Button } from "@/components/ui/button";

export const metadata = {
  slug: "environment-tools",
  title: "Environmental Evidence",
  description:
    "Use mapped conditions, ecosystem services, and vulnerability to support informed decisions.",
  order: 3,
} satisfies TopicMetadata;

export default function EnvironmentToolsTopic() {
  return (
    <>
      <p>
        These pressures highlight the need to understand and manage vineyard
        landscapes as multifunctional systems. Assessing their{" "}
        <GlossaryTermPopover id="ecological-conditions">
          ecological conditions
        </GlossaryTermPopover>{" "}
        , mapping ecosystem services, and identifying areas of vulnerability are
        essential steps toward sustainable, resilient viticulture.
      </p>

      <p>
        WINEMAP Environment provides accessible, spatially explicit information
        on environmental conditions, ecosystem services, and climate-related
        risks. It supports winegrowers, researchers, and policymakers in making
        informed decisions that preserve the ecological integrity and cultural
        heritage of European wine landscapes.
      </p>

      <div className="flex flex-wrap gap-3">
        <Button variant="outline" asChild className="w-fit">
          <Link href="/map-applications/environment-browser">
            <MapIcon className="mr-2 h-4 w-4" aria-hidden="true" />
            Open Environment Browser
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Link>
        </Button>
        <Button variant="outline" asChild className="w-fit">
          <Link href="/map-applications/vulnerability-explorer">
            <ShieldAlert className="mr-2 h-4 w-4" aria-hidden="true" />
            Open Vulnerability Explorer
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Link>
        </Button>
      </div>
    </>
  );
}
