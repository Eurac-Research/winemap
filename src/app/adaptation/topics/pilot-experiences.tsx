import Link from "next/link";
import { ArrowRight, Film } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { AdaptationTopicMetadata } from "../topics.generated";

export const metadata = {
  slug: "pilot-experiences",
  title: "Pilot Experiences",
  description:
    "Watch short films about adaptation in vineyards and wine-growing communities.",
  order: 3,
} satisfies AdaptationTopicMetadata;

export default function PilotExperiencesTopic() {
  return (
    <>
      <p>
        Adaptation takes different forms in different places. The pilot
        experiences bring together stories from vineyards where winegrowers,
        researchers, and communities are testing new and traditional approaches
        side by side.
      </p>

      <p>
        Through short films from the RESPOnD pilot regions, discover how local
        knowledge and landscape-based action are helping address climate
        challenges while preserving regional traditions.
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
