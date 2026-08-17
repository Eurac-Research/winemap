import Link from "next/link";
import { ArrowRight, Film } from "lucide-react";

import type { TopicMetadata } from "@/components/topics/types";
import { Button } from "@/components/ui/button";

export const metadata = {
  slug: "pilot-experiences",
  title: "Pilot Experiences",
  description:
    "Watch short films about nature-based adaptation in vineyards across different study areas.",
  order: 2,
} satisfies TopicMetadata;

export default function PilotExperiencesTopic() {
  return (
    <>
      <p>
        Adaptation takes different forms in different places. Practical
        experiences from different regions where winegrowers,
        researchers, and communities are testing new and traditional approaches
        side by side are therefore an invaluable tool to facilitate implementation and planning
        of nature-based adaptation in vineyards.
      </p>

      <p>
        WINEMAP Adaptation features a collection of stories from vineyards and
        winegrowers where practical adaptation measures are
        being implemented. These stories are presented as a collection of videos
        from different winegrowing regions across the Alpine Space area.
      </p>

      <p>
        Through short films from the pilot regions of the{" "}
        <Link
          key="respond-link"
          href="https://www.alpine-space.eu/project/respond/"
          className="text-cyan-700 hover:text-cyan-500"
          target="_blank"
          rel="noopener noreferrer"
        >
          Interreg Alpine Space project RESPOnD
        </Link>{" "}
        you can discover how
        winegrowers, researchers and communities are working with their
        landscapes to address climate challenges while preserving local
        traditions.
      </p>

      <Button variant="outline" asChild className="w-fit">
        <Link href="/adaptation/pilot-experiences">
          <Film className="mr-2 h-4 w-4" aria-hidden="true" />
          Watch pilot experiences
          <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
        </Link>
      </Button>
    </>
  );
}
