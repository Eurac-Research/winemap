import Link from "next/link";
import { ArrowRight, GraduationCap, Map as MapIcon, Users } from "lucide-react";

import type { TopicMetadata } from "@/components/topics/types";
import { Button } from "@/components/ui/button";

export const metadata = {
  slug: "governance-participatory",
  title: "Participatory Approaches",
  description:
    "",
  order: 3,
} satisfies TopicMetadata;

export default function GovernanceResourcesTopic() {
  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button variant="outline" asChild className="w-fit">
          <Link href="/governance/participatory-approaches">
            <Users className="mr-2 h-4 w-4" aria-hidden="true" />
            Explore participatory approaches
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Link>
        </Button>
      </div>
    </>
  );
}
