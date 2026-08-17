import Link from "next/link";
import { ArrowRight, ShieldAlert } from "lucide-react";

import { GlossaryTermPopover } from "@/components/glossary/glossaryTerm";
import type { TopicMetadata } from "@/components/topics/types";
import { Button } from "@/components/ui/button";

export const metadata = {
  slug: "pressures-and-change",
  title: "Pressures and Change",
  description:
    "Explore the climate change vulnerability of European Wine Regions.",
  order: 1,
} satisfies TopicMetadata;

export default function PressuresAndChangeTopic() {
  return (
    <>
      <p>
        Climate is one of the foundations of winegrowing. It influences when
        vines grow and ripen, the water they need, and the quality and style of
        the grapes. As Europe warms, changing temperatures, rainfall patterns,
        droughts, and heat extremes are already reshaping the conditions in
        which wine is made.
      </p>

      <p>
        The effects are not the same everywhere. A warmer season may bring new
        possibilities in some cooler places, but it can also create more water
        stress, earlier ripening, and changes in grape composition. Wine regions
        differ in their climates, grape varieties, landscapes, and the rules
        that regulate the production of their wines. These differences shape how
        strongly a region is affected by changing environmental conditions
        and the options it has for responding.
      </p>

      <p>
        Climate-change{" "}
        <GlossaryTermPopover id="vulnerability">
          vulnerability
        </GlossaryTermPopover>{" "}
        brings three dimensions together. <strong>Exposure</strong> describes how much
        the climate is expected to change in a region.{" "}
        <strong>Sensitivity</strong> is related to how strongly its vines and wines may
        be affected by those changes. <strong>Adaptive capacity</strong> identifies
        what resources and opportunities the region has to adapt, such as
        knowledge, labour, finance, infrastructure, water, and suitable land.
      </p>

      <p>
        Looking at all three dimensions together is important. A region that
        faces major climate change may be better able to respond if it has
        major resources for adaptation. Conversely, even a smaller change can
        be difficult where varieties are already close to their climatic limits
        or where support for change is limited.
      </p>

      <p>
        The Vulnerability Explorer turns this information into an interactive
        map of European Protected Designation of Origin (PDO) wine regions. It
        is based on a {" "}
        <Link
          href="https://www.nature.com/articles/s41467-024-50549-w"
          className="text-cyan-700 hover:text-cyan-500"
          target="_blank"
          rel="noopener noreferrer"
        >
          scientific study
        </Link>{" "}
        of 1,085 wine regions and helps you compare their exposure, sensitivity, adaptive
        capacity and overall vulnerability. This information helps to identify regions most at risk, 
        to guide efforts to enhance resilience and to reduce negative impacts of climate change.
      </p>

      <div className="flex flex-wrap gap-3">
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
