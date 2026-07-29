import Link from "next/link";
import { ArrowRight, GraduationCap, Map as MapIcon, Users } from "lucide-react";

import type { TopicMetadata } from "@/components/topics/types";
import { Button } from "@/components/ui/button";

export const metadata = {
  slug: "governance-courses",
  title: "Courses",
  description:
    "",
  order: 2,
} satisfies TopicMetadata;

export default function GovernanceResourcesTopic() {
  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button variant="outline" asChild className="w-fit">
          <Link href="/governance/courses">
            <Users className="mr-2 h-4 w-4" aria-hidden="true" />
            Explore courses
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Link>
        </Button>
      </div>
    </>
  );
}