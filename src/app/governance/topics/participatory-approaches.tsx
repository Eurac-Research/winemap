import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Users } from "lucide-react";

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
      <p>
        In <b>participatory approaches</b>, researchers and individuals
        from different backgrounds - such as growers, consultants, and
        local authorities - work together to develop{" "}
        <b>innovative solutions and ideas</b>. The approach is based on
        the principle of <b>co-creation</b> and the collaborative,
        bottom-up process ensures that new ideas and innovations are
        practical and based on the direct needs and experiences of the
        local community.
      </p>
      <p>
        A key example of this methodology is the <b>Living Lab</b>, which
        acts as an <b>innovation hub</b> situated in a real-life setting.
        Within these labs, researchers and stakeholders join forces to{" "}
        <b>co-produce knowledge</b> and address complex challenges, for
        instance through activities like workshops and field trips.
        Research is thereby transformed into a joint effort that builds
        trust, networks and develops solutions that would not be possible
        otherwise.
      </p>
      <p>
        In the field of viticulture, these approaches can be used to share
        knowledge and develop practical strategies for a more{" "}
        <b>sustainable and resilient sector</b>. For a detailed look at
        how to design and run such collaborative spaces, you can download
        the{" "}
        <b>Handbook for the co-creation and production of knowledge</b>{" "}
        below, which provides a comprehensive guide on implementing Living
        Labs within the context of mountain vineyards.
      </p>

      <figure className="article-figure">
        <div className="relative aspect-[3/2]">
          <Image
            src="/livinglab-infographic.png"
            alt="Infographic on living-labs"
            fill
            className="object-contain"
            sizes="(min-width: 1024px) 800px, 100vw"
          />
        </div>
        <figcaption className="article-caption">
          Infographic on the general structure and idea behind living labs
          in the context of viticulture
        </figcaption>
      </figure>

      <a
        href="/handbook-living-labs.pdf"
        download
        className="mx-auto gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition border-[color:var(--accent)] app-accent-text hover:bg-[color:var(--accent-soft)]"
      >
        Download the Handbook (PDF)
      </a>
      
    </>
  );
}
