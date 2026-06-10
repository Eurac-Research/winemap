import type { ReactNode } from "react";
import type { EbaEcosystemServiceId } from "@/content/eba/ecosystem-services";
import type { EbaChallengeIcon } from "@/content/eba/potential-challenges";

export type EbaSectionContent = {
  id: string;
  title: string;
  children: ReactNode;
};

export type EbaVideoContent = {
  id: string;
  title: string;
  youtubeId: string;
  caption?: string;
};

export type EbaStrategyChallenge = {
  title: string;
  icon?: EbaChallengeIcon;
  details?: ReactNode;
};

export type EbaEcosystemServiceEntry = {
  id: EbaEcosystemServiceId;
  note?: string;
};

export type EbaStrategyDetailContent = {
  slug: string;
  imagePath?: string;
  imageAlt?: string;
  about?: ReactNode;
  ecosystemServices?: EbaEcosystemServiceEntry[];
  challenges?: EbaStrategyChallenge[];
  sections?: EbaSectionContent[];
  videos?: EbaVideoContent[];
};

export const ebaStrategyDetails: EbaStrategyDetailContent[] = [
  {
    slug: "intercropping-herbs-plants",
    about: (
      <>
        <p>
          Cover crops are plants that are intentionally grown between the vine
          rows. They are meant to enhance soil properties without the need to
          use herbicides. Management involves various application methods, such
          as planting in all or alternating rows of the most appropriate native
          or locally adapted plant species.
        </p>
        <p>
          There is a wide selection of possible plant species that can be used
          as cover crops. Common species include annuals like barley and oats,
          legumes such as vetch and clover, and brassicas like daikon radish.
          The selection of species to seed and the timing depend on the desired
          effect and on the season.
        </p>
        <p>
          For example, sowing in autumn can provide green manure to a vineyard
          over the winter period, while mowing cover crops in summer creates a
          mulch layer that reduces water evaporation from the soil during warm
          summer periods. After the growing period, the crops can be ploughed
          under and incorporated into the soil as green manure to improve soil
          fertility.
        </p>
      </>
    ),
    imagePath: "/images/vineyard_sun.jpg",
    ecosystemServices: [
      {
        id: "soil-health-fertility",
        note: "improved soil structure, nutrient cycling and organic matter content",
      },
      { id: "erosion-control", note: "slope stabilisation" },
      { id: "carbon-sequestration" },
      { id: "water-retention", note: "reduced surface runoff" },
      {
        id: "water-regulation",
        note: "improved infiltration, retention, and reduced nutrient leaching",
      },
      { id: "biodiversity-enhancement" },
      {
        id: "natural-pest-control",
        note: "support for beneficial insects and natural enemies",
      },
      {
        id: "climate-regulation",
        note: "local microclimate regulation and reduced temperature extremes",
      },
      {
        id: "cultural-heritage",
        note: "preservation of traditional knowledge and historical land-use practices",
      },
      { id: "landscape-aesthetics", note: "distinct landscape character" },
    ],
    challenges: [
      {
        title: "Resource interactions with vines",
        icon: "resources",
        details:
          "Resource interactions between cover crops and grapevines should be considered when designing and managing intercropping systems, particularly in young vineyards or water-limited environments. The choice of species, sowing density, and management regime largely determines whether ecological benefits are achieved without adversely affecting vine performance.",
      },
      {
        title: "Management and labour requirements",
        icon: "cost",
        details:
          "The establishment and maintenance of cover crops require planning and regular management, including the timing of sowing, mowing, and incorporation practices. Successful implementation depends on integrating these activities into existing vineyard operations and adapting them to local conditions.",
      },
      {
        title: "Site-specific performance",
        icon: "technical",
        details:
          "Cover crop performance varies according to climate, soil conditions, species selection, and seed quality. Tailoring mixtures and management practices to local conditions is often necessary to ensure reliable establishment, effective ground cover, and long-term ecosystem benefits.",
      },
    ],
  },
  {
    slug: "mulching-organic-soil-cover",
    about: (
      <>
        <p>
          Mulching is a vineyard management practice in which the soil surface
          beneath or between vines is covered with a layer of organic material.
          Common mulching materials include straw, hay, compost, leaves, bark,
          and shredded vineyard residues such as pruning cuttings and wood
          chips.
        </p>
        <p>
          By covering the soil surface, mulches help suppress weed growth,
          reduce water evaporation, moderate soil temperatures, and protect the
          soil from erosion. As organic mulches gradually decompose, they
          contribute organic matter and nutrients to the soil, supporting soil
          fertility and biological activity.
        </p>
        <p>
          Mulching can also improve soil structure, increase water-holding
          capacity, and enhance vineyard resilience to drought and extreme
          weather conditions. The choice of mulch material, application rate,
          and timing should be adapted to local soil, climate, and vineyard
          management objectives.
        </p>
      </>
    ),
    imagePath: "/images/vineyard_sun.jpg",
    ecosystemServices: [
      {
        id: "soil-health-fertility",
        note: "improved soil structure, nutrient cycling and organic matter content",
      },
      { id: "erosion-control", note: "root stabilisation" },
      { id: "water-retention", note: "reduced surface runoff" },
      {
        id: "water-regulation",
        note: "improved infiltration and soil moisture conservation",
      },
      {
        id: "climate-regulation",
        note: "soil temperature control",
      },
      { id: "biodiversity-enhancement", note: "above- and below-ground" },
      { id: "weed-control" },
      {
        id: "grape-production",
        note: "improved vine growth and resilience under water-limited conditions",
      },
    ],
    challenges: [
      {
        title: "Pest, disease and phytosanitary management",
        icon: "technical",
        details:
          "The selection and management of mulching materials should consider local pest and disease pressures. Regular monitoring and the use of suitable organic materials can help maximise soil benefits while minimising the potential for pests or pathogens to establish within the mulch layer.",
      },
      {
        title: "Management and labour requirements",
        icon: "cost",
        details:
          "The application and maintenance of mulch require planning and regular management, particularly regarding material sourcing, application timing, and replenishment. Integrating mulching practices into existing vineyard operations can support their long-term effectiveness and facilitate adoption.",
      },
      {
        title: "Technical requirements and site-specific performance",
        icon: "technical",
        details:
          "The effectiveness of mulching depends on factors such as soil type, climate, mulch material, and application rate. Regular soil and vine monitoring, combined with site-specific adjustments, can help optimise soil moisture conservation, nutrient cycling, and erosion protection while maintaining healthy vine growth.",
      },
    ],
  },
  {
    slug: "reduced-no-tillage",
    about: (
      <>
        <p>
          Reduced tillage and no-tillage are soil management practices that
          minimise mechanical soil disturbance while maintaining continuous soil
          cover. In vineyards, these practices are most commonly implemented in
          the inter-rows and are often combined with permanent or semi-permanent
          cover crops and mulching.
        </p>
        <p>
          Reduced tillage limits the frequency, depth, and intensity of soil
          cultivation, while no-tillage avoids soil disturbance altogether
          except for essential planting or maintenance operations. By reducing
          soil disturbance, these practices help preserve soil structure,
          enhance biological activity, and promote the accumulation of organic
          matter.
        </p>
        <p>
          They can improve water infiltration, reduce soil erosion, increase
          water retention, and support the long-term fertility and resilience of
          vineyard soils. Successful implementation requires management
          practices adapted to local soil, climate, and vineyard conditions.
        </p>
      </>
    ),
    imagePath: "/images/vineyard_sun.jpg",
    ecosystemServices: [
      {
        id: "soil-health-fertility",
        note: "improved soil structure, nutrient cycling and organic matter content",
      },
      { id: "erosion-control", note: "slope stabilisation" },
      {
        id: "water-retention",
        note: "reduced surface runoff and moisture control",
      },
      {
        id: "climate-regulation",
        note: "local microclimate regulation and reduced temperature extremes",
      },
      { id: "carbon-sequestration" },
      { id: "biodiversity-enhancement", note: "above- and below-ground" },
      { id: "pollination-services" },
      {
        id: "natural-pest-control",
        note: "support for beneficial insects and natural enemies",
      },
      { id: "landscape-aesthetics", note: "distinct landscape character" },
    ],
    challenges: [
      {
        title: "Transition of management practices",
        icon: "technical",
        details:
          "The transition from conventional tillage to reduced or no-tillage systems often requires adjustments to vineyard operations. Changes in soil cover management, machinery use, and weed control strategies should be planned carefully to ensure a smooth transition while maintaining vineyard productivity.",
      },
      {
        title: "Weed and vegetation management",
        icon: "resources",
        details:
          "As soil disturbance is reduced, vegetation management becomes a central component of the system. The integration of cover crops, mulching, or other ecological approaches supports weed suppression while contributing to soil protection and biodiversity conservation.",
      },
      {
        title: "Soil-specific suitability",
        icon: "technical",
        details:
          "The benefits of reduced tillage and no-tillage are strongly influenced by soil characteristics, climatic conditions, and topography. Local adaptation of management practices, supported by regular field observations, is essential for maintaining soil structure and enhancing long-term soil resilience.",
      },
    ],
  },
  {
    slug: "soil-amendments-compost-biochar",
    about: (
      <>
        <p>
          The application of organic soil amendments, such as compost and
          biochar, is a widely used practice to improve soil health and support
          long-term vineyard resilience. Unlike synthetic mineral fertilisers,
          these amendments contribute organic matter to the soil, enhancing
          nutrient cycling, biological activity, and soil structure.
        </p>
        <p>
          They can also improve water retention, increase infiltration, and
          support the accumulation of soil organic carbon. Composts, including
          green waste compost, vermicompost, and composted manure, provide
          nutrients and organic matter that support soil fertility and microbial
          activity.
        </p>
        <p>
          Biochar is a stable, carbon-rich material produced through the
          pyrolysis of organic biomass under low-oxygen conditions. When
          incorporated into soil, these amendments can improve soil structure,
          increase water-holding capacity, and contribute to long-term carbon
          storage.
        </p>
      </>
    ),
    imagePath: "/images/vineyard_sun.jpg",
    ecosystemServices: [
      {
        id: "soil-health-fertility",
        note: "improved soil structure, nutrient cycling and organic matter content",
      },
      { id: "erosion-control", note: "slope stabilisation" },
      { id: "water-retention", note: "reduced surface runoff" },
      { id: "water-quality" },
      { id: "carbon-sequestration" },
      { id: "biodiversity-enhancement", note: "above- and below-ground" },
      {
        id: "natural-pest-pathogen-control",
        note: "support for beneficial insects and natural enemies",
      },
      {
        id: "grape-production",
        note: "improved vine growth and yield",
      },
    ],
    challenges: [
      {
        title: "Amendment selection and application rates",
        icon: "technical",
        details:
          "The effects of biochar and compost depend on their composition, quality, and application rate. Selecting appropriate materials and adapting application rates to soil conditions and vineyard objectives are important for achieving the desired improvements in soil fertility and water management.",
      },
      {
        title: "Nutrient management and vine response",
        icon: "resources",
        details:
          "Organic amendments influence nutrient availability and soil biological activity. Their use should be integrated into broader nutrient management strategies to maintain balanced vine growth and avoid excessive vegetative development or nutrient imbalances.",
      },
      {
        title: "Monitoring of soil and vineyard performance",
        icon: "technical",
        details:
          "The response of soils and vines to organic amendments varies according to soil type, climate, and management practices. Periodic assessment of soil properties, vine performance, and nutrient status provides a basis for adapting management practices and optimising long-term benefits.",
      },
    ],
  },
  {
    slug: "vegetated-buffer-flower-strips",
    about: (
      <>
        <p>
          Vegetated buffer strips and flower strips involve the establishment
          and management of permanent or semi-permanent vegetation within or
          adjacent to vineyards to reduce environmental pressures and enhance
          ecosystem functioning. They are typically located along vineyard
          margins, terrace embankments, waterways, roadsides, and other
          non-cultivated areas where they act as ecological buffers between
          vineyards and surrounding landscapes.
        </p>
        <p>
          These strips are composed of diverse plant communities, including
          native grasses, herbs, and flowering species, which can be established
          through sowing regional seed mixtures or by promoting the natural
          development of spontaneous vegetation through extensive management.
          Depending on their location and design, buffer strips can intercept
          sediment, nutrients, and pesticide residues transported by surface
          runoff, thereby reducing the risk of water contamination and soil
          loss.
        </p>
        <p>
          When implemented as hedgerows or other woody landscape elements, they
          can also reduce wind erosion and pesticide drift, particularly when
          positioned perpendicular to prevailing wind directions. In addition to
          their protective functions, vegetated buffer and flower strips provide
          habitat, food resources, and ecological corridors for pollinators,
          natural enemies of pests, and other wildlife.
        </p>
        <p>
          By increasing habitat connectivity and structural diversity within
          agricultural landscapes, they contribute to biodiversity conservation
          and support ecosystem resilience under changing environmental
          conditions.
        </p>
      </>
    ),
    imagePath: "/images/vineyard_sun.jpg",
    ecosystemServices: [
      {
        id: "soil-health-fertility",
        note: "improved soil structure, nutrient cycling, and organic matter content",
      },
      {
        id: "erosion-control",
        note: "slope stabilisation and prevention of runoff",
      },
      { id: "carbon-sequestration" },
      { id: "water-retention", note: "reduced surface runoff" },
      {
        id: "water-regulation",
        note: "improved infiltration, retention, and reduced nutrient leaching",
      },
      { id: "biodiversity-enhancement", note: "above- and below-ground" },
      {
        id: "natural-pest-control",
        note: "support for beneficial insects and natural enemies",
      },
      {
        id: "climate-regulation",
        note: "local microclimate regulation and reduced temperature extremes",
      },
      {
        id: "pollination-services",
        note: "food and habitat resources for pollinators",
      },
      { id: "landscape-aesthetics" },
    ],
    challenges: [
      {
        title: "Appropriate establishment and maintenance",
        icon: "technical",
        details:
          "Successful buffer strips require careful establishment and ongoing management. Selecting suitable native or locally adapted species, ensuring good establishment, and carrying out periodic maintenance can help maximise biodiversity benefits while preventing the dominance of undesirable species.",
      },
      {
        title: "Site-specific design",
        icon: "technical",
        details:
          "The effectiveness of vegetated buffer strips depends on their width, vegetation composition, and placement within the landscape. Adapting their design to local conditions such as slope, soil type, climate, and runoff pathways can enhance their capacity to reduce erosion, retain pollutants, and support biodiversity.",
      },
      {
        title: "Regular monitoring and adaptive management",
        icon: "technical",
        details:
          "Regular monitoring helps ensure that buffer strips continue to deliver their intended benefits. Adaptive management, including adjustments to vegetation composition and maintenance practices, can help maintain ecological functioning, support beneficial organisms, and minimise potential pest or weed-related issues.",
      },
    ],
  },
  {
    slug: "dry-stone-walls",
    about: (
      <>
        <p>
          Dry-stone walls are traditional masonry structures built without
          binders such as mortar or cement, using locally sourced stones often
          collected from cultivated land or nearby quarries. Their construction
          relies on a foundation of large blocks, successive layers of coarser
          material, and smaller stones filling the gaps to ensure stability,
          with wall dimensions adapted to slope conditions and typically
          tapering towards the top.
        </p>
        <p>
          The dry laying allows rainwater drainage and is often combined with a
          crushed stone backing to reduce hydrostatic pressure. Dry-stone walls
          are integral components of terraced and agricultural landscapes,
          shaped over centuries through the interaction between human management
          and natural processes.
        </p>
        <p>
          They are considered living structures due to their ecological
          functions and interactions within the environment. Along with other
          structural elements such as hedgerows and stone heaps, dry-stone walls
          create valuable ecological niches in agricultural landscapes,
          particularly in viticultural areas.
        </p>
      </>
    ),
    imagePath: "/images/vineyard_sun.jpg",
    ecosystemServices: [
      { id: "erosion-control", note: "slope stabilisation" },
      { id: "water-retention", note: "reduced surface runoff" },
      {
        id: "climate-regulation",
        note: "reduced temperature extremes",
      },
      {
        id: "water-regulation",
        note: "improved infiltration, retention, and reduced nutrient leaching",
      },
      {
        id: "habitat-provision",
        note: "microhabitats for plants, invertebrates, reptiles, and small mammals",
      },
      {
        id: "biodiversity-enhancement",
        note: "microhabitats for plants, invertebrates, reptiles, and small mammals",
      },
      {
        id: "cultural-heritage",
        note: "preservation of traditional knowledge and historical land-use practices",
      },
      {
        id: "landscape-aesthetics",
        note: "distinct landscape character and enhanced recreational value",
      },
    ],
    challenges: [
      {
        title: "Construction and maintenance expertise",
        icon: "technical",
        details:
          "The long-term stability and functionality of dry-stone walls depend on appropriate construction techniques and periodic maintenance. Preserving and transferring traditional craftsmanship plays an important role in ensuring the durability and ecological value of these structures.",
      },
      {
        title: "Availability of skills and materials",
        icon: "resources",
        details:
          "The restoration and maintenance of dry-stone walls depend on access to appropriate stone materials and specialised construction knowledge. In some regions, the availability of skilled craftspeople and suitable materials may influence the feasibility and long-term maintenance of these structures.",
      },
      {
        title: "Long-term conservation and landscape management",
        icon: "technical",
        details:
          "The ecological and cultural benefits of dry-stone walls are maintained through continued management and integration within broader landscape conservation efforts. Preventing abandonment and supporting the maintenance of traditional vineyard landscapes contribute to the preservation of biodiversity, cultural heritage, and ecosystem functions.",
      },
    ],
  },
  {
    slug: "terrace-restoration-management",
    about: (
      <>
        <p>
          Terrace restoration and the creation of new terracing systems are land
          management practices commonly used in steep mountain and hillside
          viticulture. Terrace systems consist of a series of level or gently
          sloping platforms supported by retaining walls or embankments,
          enabling grape production on terrain that would otherwise be difficult
          to cultivate.
        </p>
        <p>
          Traditional dry-stone walls are a key component of these systems and
          are often constructed using locally sourced stones with little or no
          binding material. Terrace restoration typically involves repairing or
          rebuilding collapsed or unstable walls, replacing displaced stones,
          improving structural stability, and restoring drainage functions.
        </p>
        <p>
          Soil conservation measures may include re-levelling terrace surfaces,
          replacing eroded soil, incorporating organic matter, and establishing
          vegetation cover to reduce erosion and improve slope stability.
          Maintaining drainage channels and preventing water accumulation behind
          retaining walls are also important for reducing the risk of structural
          damage.
        </p>
        <p>
          The design and orientation of vineyard rows play an important role in
          the effectiveness of terraced systems. On sloping terrain,
          contour-aligned rows can reduce surface runoff, limit soil erosion,
          and improve water infiltration compared with downslope configurations.
          Modern terracing systems often combine these principles with layouts
          that improve accessibility and facilitate vineyard operations while
          maintaining environmental benefits.
        </p>
      </>
    ),
    imagePath: "/images/vineyard_sun.jpg",
    ecosystemServices: [
      { id: "erosion-control", note: "slope stabilisation" },
      {
        id: "water-regulation",
        note: "improved infiltration, retention, and reduced nutrient leaching",
      },
      {
        id: "climate-resilience",
        note: "enhanced stability of vineyard systems under extreme weather conditions",
      },
      {
        id: "habitat-provision",
        note: "microhabitats for plants, invertebrates, reptiles, and small mammals",
      },
      {
        id: "biodiversity-enhancement",
        note: "microhabitats for plants, invertebrates, reptiles, and small mammals",
      },
      {
        id: "cultural-heritage",
        note: "preservation of traditional knowledge and historical land-use practices",
      },
      {
        id: "landscape-aesthetics",
        note: "distinct landscape character and enhanced recreational value",
      },
    ],
    challenges: [
      {
        title: "Structural maintenance and long-term planning",
        icon: "technical",
        details:
          "The long-term performance of terrace systems depends on the regular maintenance of retaining walls, embankments, and drainage infrastructure. Restoration and construction projects require careful planning and sustained investment to ensure structural stability and preserve their environmental and cultural value.",
      },
      {
        title: "Accessibility and operational requirements",
        icon: "cost",
        details:
          "The design of terraced vineyards influences accessibility, labour requirements, and mechanisation opportunities. Modern terracing approaches increasingly seek to balance environmental objectives with operational efficiency, worker safety, and the economic viability of steep-slope viticulture.",
      },
      {
        title: "Site-specific design and ecological integration",
        icon: "technical",
        details:
          "Successful terrace systems are adapted to local topography, soil characteristics, climatic conditions, and hydrological processes. The integration of vegetation cover, biodiversity-enhancing features, and effective water management measures strengthens erosion control, supports habitat provision, and contributes to the long-term resilience of terraced landscapes.",
      },
    ],
  },
];

export const getEbaStrategyDetailBySlug = (slug: string) =>
  ebaStrategyDetails.find((strategy) => strategy.slug === slug);
