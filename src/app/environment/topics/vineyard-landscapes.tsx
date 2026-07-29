import { GlossaryTermPopover } from "@/components/glossary/glossaryTerm";
import type { TopicMetadata } from "@/components/topics/types";

export const metadata = {
  slug: "vineyard-landscapes",
  title: "Vineyard Landscapes",
  description:
    "Understand vineyards as socio-ecological systems shaped by nature, farming, and heritage.",
  order: 1,
} satisfies TopicMetadata;

export default function VineyardLandscapesTopic() {
  return (
    <>
      <p>
        For centuries, vineyard landscapes across Europe have evolved into
        complex systems deeply embedded in local economies, environments, and
        cultural traditions. Far from being mere production areas, they are
        dynamic{" "}
        <GlossaryTermPopover id="socio-ecological-system">
          socio-ecological systems
        </GlossaryTermPopover>{" "}
        shaped by long-standing interactions between human activities and
        natural processes.
      </p>

      <p>
        Vineyard landscapes provide a wide range of{" "}
        <GlossaryTermPopover id="ecosystem-services">
          ecosystem services
        </GlossaryTermPopover>{" "}
        , the benefits that nature offers to society. Alongside grape and wine
        production, the mosaic of forests, croplands, and riparian areas around
        vineyards supports biodiversity and the functioning of ecosystems. It
        also sustains cultural identities, local traditions, tourism, and the
        connection between communities and their environment.
      </p>

      <p>
        This interplay between environmental conditions, agricultural practices,
        and cultural heritage is central to{" "}
        <GlossaryTermPopover id="terroir">terroir</GlossaryTermPopover>. The
        combination of climate, soil, landscape, and human knowledge gives wines
        their distinctive character and roots their identity in both land and
        generations of cultural practice.
      </p>
    </>
  );
}
