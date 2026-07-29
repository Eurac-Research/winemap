import Link from "next/link";
import { ArrowRight, GraduationCap, Map as MapIcon, Users } from "lucide-react";

import type { TopicMetadata } from "@/components/topics/types";
import { Button } from "@/components/ui/button";

export const metadata = {
  slug: "governance-resources",
  title: "PDO Atlas and Resources",
  description:
    "Navigate Europe’s PDO regions and deepen your knowledge through practical governance resources.",
  order: 3,
} satisfies TopicMetadata;

export default function GovernanceResourcesTopic() {
  return (
    <>
      <p>
        Eurac Research&apos;s European PDO Atlas is the first comprehensive map
        of Europe&apos;s wine regions classified under the PDO system. WINEMAP
        Governance also provides accessible information on PDOs, EU legislation,
        participatory approaches, and learning opportunities to help
        stakeholders understand the protection and management of European
        vineyards and sustain their cultural continuity.
      </p>

      <div className="flex flex-wrap gap-3">
        <Button variant="outline" asChild className="w-fit">
          <Link href="/map-applications/pdo-atlas">
            <MapIcon className="mr-2 h-4 w-4" aria-hidden="true" />
            Open European PDO Atlas
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Link>
        </Button>
        <Button variant="outline" asChild className="w-fit">
          <Link href="/governance/participatory-approaches">
            <Users className="mr-2 h-4 w-4" aria-hidden="true" />
            Explore participatory approaches
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Link>
        </Button>
        <Button variant="outline" asChild className="w-fit">
          <Link href="/governance/courses">
            <GraduationCap className="mr-2 h-4 w-4" aria-hidden="true" />
            Browse courses
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Link>
        </Button>
      </div>
    </>
  );
}
