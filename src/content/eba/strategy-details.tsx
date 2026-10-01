import type { ReactNode } from "react";
import type { EbaChallengeIcon } from "@/content/eba/potential-challenges";

import {
  getEbaStrategyEcosystemServices,
  type EbaStrategyEcosystemServiceEntry,
} from "./strategy-ecosystem-services";

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

export type EbaEcosystemServiceEntry = EbaStrategyEcosystemServiceEntry;

export type EbaStrategyDetailContent = {
  slug: string;
  imagePath?: string;
  imageAlt?: string;
  about?: ReactNode;
  ecosystemServices?: readonly EbaEcosystemServiceEntry[];
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
    imagePath: "/images/eba/interrow_greening2.jpeg",
    ecosystemServices: getEbaStrategyEcosystemServices(
      "intercropping-herbs-plants",
    ),
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
    ecosystemServices: getEbaStrategyEcosystemServices(
      "mulching-organic-soil-cover",
    ),
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
    ecosystemServices: getEbaStrategyEcosystemServices("reduced-no-tillage"),
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
    ecosystemServices: getEbaStrategyEcosystemServices(
      "soil-amendments-compost-biochar",
    ),
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
    slug: "agroforestry",
    about: (
      <>
        <p>
          Agroforestry combines grape production with trees and shrubs to create
          more diverse and multifunctional farming systems. Rather than
          separating productive and ecological areas, woody vegetation is
          intentionally integrated into the vineyard to strengthen ecosystem
          functions while providing additional environmental and economic
          benefits. Depending on the site and management objectives,
          agroforestry can include tree rows between vineyard blocks, fruit or
          timber trees along field margins, scattered trees within the vineyard,
          or wooded buffer zones. The selection, arrangement, and density of
          woody vegetation should be adapted to local soil conditions, water
          availability, topography, and vineyard operations.
        </p>
        <p>
          The presence of trees and shrubs contributes to healthier and more
          resilient vineyard ecosystems. Their root systems improve soil
          structure and nutrient cycling, while the canopy moderates wind speed,
          temperature, and solar radiation. Woody vegetation also creates
          habitats and ecological corridors for pollinators, birds, and natural
          enemies of pests. In addition to supporting grape production,
          agroforestry can diversify farm outputs through products such as
          fruit, timber, biomass, fodder, or other non-timber products,
          strengthening the long-term sustainability of the farming system.
        </p>
      </>
    ),
    ecosystemServices: getEbaStrategyEcosystemServices("agroforestry"),
    challenges: [
      {
        title: "Spatial design and vineyard operations",
        icon: "technical",
        details:
          "The arrangement of trees and shrubs should maintain efficient access for machinery, pruning, spraying, and harvesting while avoiding excessive shading of vines. Tree spacing, orientation, and expected canopy development should be considered during the design phase.",
      },
      {
        title: "Long-term establishment and management",
        icon: "technical",
        details:
          "Agroforestry systems develop over many years and require regular management during establishment, including pruning, weed control, and protection of young trees. Periodic maintenance helps maintain a balance between tree growth and vineyard productivity.",
      },
      {
        title: "Management of resource interactions",
        icon: "resources",
        details:
          "Trees and vines interact through their use of water, nutrients, and light. Species selection, planting density, and appropriate spacing can help maximise complementary interactions while reducing competition, particularly in dry environments or on shallow soils.",
      },
    ],
  },
  {
    slug: "canopy-pruning-management",
    about: (
      <>
        <p>
          Canopy and pruning management aim to maintain a balanced vine
          structure that supports healthy grape production while improving the
          vineyard’s resilience to changing climatic conditions. By regulating
          canopy density, shoot growth, and fruit exposure, growers can create a
          favourable microclimate around the grape clusters that reduces heat
          stress, improves air circulation, and promotes even ripening.
        </p>
        <p>
          A combination of practices can be used throughout the growing season,
          including winter pruning, shoot positioning, shoot and cluster
          thinning, hedging, and selective leaf removal around the fruit zone.
          The choice and timing of each operation depend on the grape variety,
          vine vigour, local climate, and production objectives. In warmer
          regions, maintaining partial leaf cover can protect bunches from
          excessive solar radiation and sunburn, while cooler or more humid
          conditions may require a more open canopy to improve ventilation and
          reduce disease pressure.
        </p>
        <p>
          Well-managed canopies improve light distribution, reduce excessive
          humidity within the vine, and help maintain a balance between
          vegetative growth and fruit development. As part of an integrated
          vineyard management approach, these practices can contribute to more
          stable yields, improved grape quality, and lower reliance on chemical
          plant protection.
        </p>
      </>
    ),
    ecosystemServices: getEbaStrategyEcosystemServices(
      "canopy-pruning-management",
    ),
    challenges: [
      {
        title: "Careful timing of operations",
        icon: "technical",
        details:
          "The timing of pruning, leaf removal, hedging, and thinning strongly influences vine growth, fruit development, and disease risk. Management decisions should respond to vine phenology and weather conditions rather than follow fixed calendar dates.",
      },
      {
        title: "Balanced canopy structure",
        icon: "technical",
        details:
          "Removing too much foliage can expose grape clusters to excessive sunlight and high temperatures, increasing the risk of sunburn, dehydration, and quality losses. Maintaining sufficient leaf area is essential for photosynthesis and long-term vine health.",
      },
      {
        title: "Labour planning and technical knowledge",
        icon: "cost",
        details:
          "Many canopy management operations require skilled labour and careful observation throughout the season. Selecting the most appropriate combination of practices can improve efficiency while achieving production and climate adaptation objectives.",
      },
    ],
  },
  {
    slug: "grapevine-diversity",
    about: (
      <>
        <p>
          Managing grapevine diversity is a long-term strategy that strengthens
          vineyard resilience by making use of the wide range of characteristics
          found in grape varieties and rootstocks. Differences in growth cycle,
          tolerance to drought, heat, frost, and diseases, as well as rooting
          behaviour and water uptake, allow planting material to be matched more
          closely to local environmental conditions and production objectives.
        </p>
        <p>
          Vineyard renewal provides an opportunity to reassess whether existing
          planting material remains suitable for individual vineyard blocks.
          Rather than relying on a single variety – rootstock combination,
          growers can introduce a broader range of locally adapted cultivars,
          disease-resistant varieties, or drought-tolerant rootstocks according
          to soil characteristics, water availability, elevation, and exposure.
          This approach helps spread production risks, increases the adaptive
          capacity of vineyard ecosystems, and can reduce the need for external
          inputs such as plant protection products.
        </p>
        <p>
          Maintaining and using grapevine genetic diversity also contributes to
          the conservation of locally adapted varieties and regional
          viticultural heritage. Combined with other ecosystem-based management
          practices, a diverse vineyard landscape is better equipped to respond
          to changing environmental conditions while sustaining grape quality
          and long-term productivity.
        </p>
      </>
    ),
    ecosystemServices: getEbaStrategyEcosystemServices("grapevine-diversity"),
    challenges: [
      {
        title: "Selection according to local site conditions",
        icon: "technical",
        details:
          "The choice of varieties and rootstocks should consider soil characteristics, water availability, topography, climatic conditions, and long-term climate projections. Planting material that performs well in one location may not be suitable for another.",
      },
      {
        title:
          "Balance climate resilience, market requirements and production regulations",
        icon: "technical",
        details:
          "Adaptation strategies should consider grape quality, yield potential, wine style, and market requirements alongside climate resilience. The suitability of new or alternative varieties should be evaluated within the context of local production systems and appellation regulations, where applicable.",
      },
      {
        title: "Long-term planning",
        icon: "cost",
        details:
          "Changing varieties or rootstocks represents a long-term investment with implications for vineyard management over several decades. Decisions should be based on future climate scenarios, vineyard objectives, and the expected lifespan of the planting, while considering economic feasibility and the availability of suitable planting material.",
      },
    ],
  },
  {
    slug: "livestock-grazing",
    about: (
      <>
        <p>
          Integrating livestock into vineyard management offers a nature-based
          approach to controlling vegetation while supporting ecological
          processes and reducing the need for mechanical or chemical
          interventions. Sheep are most commonly used because they efficiently
          manage ground vegetation and recycle nutrients through manure, while
          poultry such as hens or geese can contribute to weed suppression,
          insect control, and soil disturbance. Grazing can be integrated during
          the winter dormancy period or, under suitable vineyard designs and
          careful management, throughout parts of the growing season. The timing
          and intensity of grazing should be adapted to vine development,
          vegetation growth, and local site conditions to maximise ecological
          benefits while avoiding damage to vines.
        </p>
        <p>
          Beyond vegetation management, livestock contribute to nutrient
          cycling, increase soil biological activity, and promote a more diverse
          ground vegetation. By replacing or reducing mowing, herbicide
          applications, and other external inputs, integrated grazing supports a
          more self-regulating vineyard ecosystem while maintaining productive
          vineyard management.
        </p>
      </>
    ),
    ecosystemServices: getEbaStrategyEcosystemServices("livestock-grazing"),
    challenges: [
      {
        title: "Protection of vines during grazing",
        icon: "technical",
        details:
          "The risk of damage depends on the growth stage of the vines, animal species, and grazing duration. Young vineyards and periods of active shoot and fruit development require particular attention, while protective measures or temporary exclusion of livestock may be necessary to prevent browsing of shoots, leaves, and grape clusters.",
      },
      {
        title: "Seasonal grazing management",
        icon: "technical",
        details:
          "The timing and duration of grazing should reflect vine phenology, vegetation growth, and soil conditions. Winter grazing generally presents fewer risks, whereas grazing during the growing season requires closer supervision. Rotational grazing can help maintain vegetation cover while avoiding overgrazing and excessive soil disturbance.",
      },
      {
        title: "Infrastructure and operational planning",
        icon: "resources",
        details:
          "Successful grazing requires appropriate fencing, access to drinking water, and, where necessary, shelter for livestock. Grazing activities should also be coordinated with vineyard operations such as pruning, spraying, and harvesting.",
      },
      {
        title: "Regular monitoring of vineyard conditions",
        icon: "technical",
        details:
          "Routine observations of vine condition, vegetation cover, soil moisture, and animal behaviour help identify potential issues such as excessive browsing, soil compaction, or uneven grazing. Monitoring also allows stocking density or grazing duration to be adjusted in response to seasonal conditions.",
      },
    ],
  },
  {
    slug: "rainwater-infiltration-soil-water-retention",
    about: (
      <>
        <p>
          Rainwater infiltration and soil water retention are nature-based
          practices that help keep rainfall within the vineyard by slowing
          runoff and allowing water to infiltrate into the soil. Instead of
          directing water away from the field, these practices use natural soil
          and vegetation processes to store moisture where vines can access it
          during dry periods.
        </p>
        <p>
          The strategy can be implemented by creating or maintaining shallow
          vegetated depressions, infiltration strips, or contour-aligned swales
          between vineyard rows that temporarily collect rainwater after storm
          events. These features should be vegetated with permanent ground cover
          and combined with practices such as mulching, compost application, or
          reduced tillage to improve soil structure and increase the soil&apos;s
          capacity to absorb and retain water. Regular maintenance involves
          removing sediment that may reduce infiltration, maintaining vegetation
          cover, and checking that water drains gradually after rainfall. The
          design and placement of infiltration areas should follow the natural
          slope of the vineyard and be adapted to local soil conditions,
          rainfall patterns, and machinery traffic to avoid interference with
          routine vineyard operations.
        </p>
      </>
    ),
    ecosystemServices: getEbaStrategyEcosystemServices(
      "rainwater-infiltration-soil-water-retention",
    ),
    challenges: [
      {
        title: "Adapting the design to site conditions",
        icon: "technical",
        details:
          "The size, depth, and location of infiltration features should reflect vineyard slope, soil type, and expected rainfall. On steeper slopes, several small infiltration areas are generally more effective than a single large one.",
      },
      {
        title: "Maintaining vegetation cover",
        icon: "technical",
        details:
          "Permanent vegetation within infiltration areas protects the soil surface, slows water movement, filters sediments, and supports beneficial organisms. Bare soil should be avoided wherever possible.",
      },
      {
        title: "Preventing clogging and waterlogging",
        icon: "technical",
        details:
          "Sediment, pruning residues, or compacted soil can reduce infiltration over time. Regular inspection after heavy rainfall helps identify areas that require cleaning or light soil loosening. Water should infiltrate within a reasonable period and not remain standing long enough to damage vine roots.",
      },
    ],
  },
  {
    slug: "restoration-of-waterways-and-drainage-networks",
    about: (
      <>
        <p>
          Rainfall moves across vineyards, roads, forests, and agricultural land
          before reaching streams and rivers. Managing these flow pathways is
          essential for reducing erosion, limiting flood risks, and maintaining
          water availability across the landscape. Ecological waterways and
          vegetated runoff management restore natural drainage features so that
          water is slowed, filtered, and gradually absorbed instead of rapidly
          leaving the catchment.
        </p>
        <p>
          Practical actions include restoring riparian vegetation, establishing
          grassed waterways and swales, reconnecting small floodplain areas, and
          maintaining vegetated buffer strips alongside streams and drainage
          channels. Existing runoff channels can be reshaped and stabilised with
          permanent vegetation to safely convey excess water during heavy
          rainfall while reducing flow velocity and sediment transport. Sediment
          retention areas and vegetated infiltration zones can be established
          where runoff naturally concentrates to capture eroded soil and promote
          water infiltration before water reaches streams or rivers. Traditional
          landscape features such as dry-stone walls also contribute by slowing
          runoff, improving hillside stability, and supporting natural drainage.
        </p>
        <p>
          These measures are most effective when implemented across the wider
          catchment and combined with complementary soil management practices
          within vineyards, such as permanent ground cover, cover cropping, and
          reduced tillage. Together, they strengthen the landscape’s capacity to
          regulate water, reduce the impacts of extreme rainfall, and improve
          resilience to longer dry periods.
        </p>
      </>
    ),
    ecosystemServices: getEbaStrategyEcosystemServices(
      "restoration-of-waterways-and-drainage-networks",
    ),
    challenges: [
      {
        title: "Alignment with natural drainage patterns",
        icon: "technical",
        details:
          "Waterways, swales, and buffer zones should follow existing topography and natural flow paths. Preserving or restoring these features is generally more effective than replacing them with artificial drainage infrastructure.",
      },
      {
        title: "Selection and management of vegetation",
        icon: "technical",
        details:
          "Native grasses, shrubs, and riparian plant species provide year-round soil protection, improve bank stability, and create habitat for wildlife. Vegetation should be selected according to local site conditions and managed to maintain both ecological function and water conveyance.",
      },
      {
        title: "Landscape-scale coordination",
        icon: "resources",
        details:
          "Many benefits, including flood mitigation and improved water quality, depend on coordinated management across neighbouring properties and the wider catchment. Collaboration among landowners and local authorities can significantly increase the effectiveness of these measures.",
      },
      {
        title: "Regular inspection and maintenance",
        icon: "technical",
        details:
          "Regular inspections help identify erosion, sediment build-up, blocked flow paths, or damaged vegetation before these reduce the performance of the system. Early maintenance usually requires less effort than repairing severe erosion or channel degradation.",
      },
    ],
  },
  {
    slug: "woody-landscape-elements",
    about: (
      <>
        <p>
          Woody landscape elements such as hedges, tree lines, isolated trees,
          shrubs, and small woodland patches add structure and diversity to
          vineyard landscapes. Beyond defining field boundaries or providing
          visual character, they create a network of habitats that supports
          wildlife, improves ecological connectivity, and strengthens the
          resilience of vineyards to environmental pressures.
        </p>
        <p>
          New plantings can be established along vineyard margins, access roads,
          waterways, or between vineyard blocks, while existing hedges and trees
          can be maintained or restored to enhance their ecological value.
          Selecting a mixture of native trees and shrubs with different
          flowering and fruiting periods provides year-round food and shelter
          for pollinators, birds, and other beneficial organisms. At the same
          time, woody vegetation helps reduce wind speed, moderates local
          temperatures, improves water infiltration, stabilises soils, and
          intercepts surface runoff.
        </p>
        <p>
          Over time, these landscape features create a more diverse and
          interconnected vineyard environment. Their ecological benefits
          increase as vegetation matures, providing stable habitats,
          strengthening ecological interactions, and improving the capacity of
          vineyard landscapes to respond to climatic extremes.
        </p>
      </>
    ),
    ecosystemServices: getEbaStrategyEcosystemServices(
      "woody-landscape-elements",
    ),
    challenges: [
      {
        title: "Selection of suitable plant species",
        icon: "technical",
        details:
          "Native trees and shrubs adapted to local soil and climatic conditions generally provide greater ecological value and require less maintenance once established. A diverse mix of species with staggered flowering and fruiting periods supports other species throughout the year.",
      },
      {
        title: "Strategic placement within the landscape",
        icon: "technical",
        details:
          "The location of hedges and trees should enhance ecological connectivity while avoiding unnecessary shading of vines or interference with machinery. Existing landscape features should be retained and incorporated wherever possible.",
      },
      {
        title: "Long-term establishment and maintenance",
        icon: "technical",
        details:
          "Woody vegetation requires regular management during the establishment phase to ensure successful growth. Periodic pruning and the removal of invasive species help maintain plant health, structural stability, and ecological function over the long term.",
      },
      {
        title: "Balance between ecological benefits and resource competition",
        icon: "resources",
        details:
          "Tree and shrub species, planting density, and distance from vine rows should be selected to minimise excessive competition for water and nutrients while maximising the benefits for biodiversity, soil protection, and microclimate regulation.",
      },
    ],
  },
  {
    slug: "habitats-for-beneficial-species",
    about: (
      <>
        <p>
          Many beneficial organisms depend on small habitat features that
          provide food, nesting sites, shelter, or overwintering opportunities.
          In intensively managed vineyards, these resources are often limited,
          reducing the abundance of pollinators, natural enemies of pests,
          birds, reptiles, and other wildlife. Creating ecological niches within
          and around vineyards helps restore these resources and supports a
          wider range of species throughout the year.
        </p>
        <p>
          Habitat features can be integrated into vineyard margins, unused
          corners, terraces, or other areas with limited production value.
          Flower-rich patches provide nectar and pollen for pollinators, while
          deadwood, stone piles, bare soil, and sand patches offer nesting and
          overwintering sites for insects, reptiles, and small mammals.
          Artificial structures such as bee hotels, bird nest boxes, bat boxes,
          or biodiversity towers can complement natural habitats where suitable
          nesting sites are scarce. Small ponds or seasonal wet areas further
          increase habitat diversity by supporting amphibians, insects, and
          birds. A combination of different habitat features distributed across
          the vineyard landscape generally supports a greater diversity of
          species than relying on a single intervention, while also
          strengthening ecological interactions that contribute to vineyard
          resilience.
        </p>
      </>
    ),
    ecosystemServices: getEbaStrategyEcosystemServices(
      "habitats-for-beneficial-species",
    ),
    challenges: [
      {
        title: "Placement within the vineyard landscape",
        icon: "technical",
        details:
          "Habitat features are most effective when located in areas of low production value, such as vineyard margins, terrace edges, field corners, or buffer zones, where they can complement existing semi-natural habitats without interfering with vineyard operations.",
      },
      {
        title: "Regular maintenance and renewal",
        icon: "technical",
        details:
          "Some habitat features, particularly nesting boxes and insect hotels, require periodic inspection and maintenance to remain functional. Damaged materials, accumulated debris, or deteriorated nesting substrates should be replaced when necessary, while avoiding unnecessary disturbance during breeding or overwintering periods.",
      },
      {
        title: "Use of natural materials",
        icon: "resources",
        details:
          "Natural, untreated materials such as wood, stone, reeds, and sand generally provide more suitable habitats and integrate better into the surrounding environment. Locally sourced materials also help maintain the ecological character of the landscape and reduce maintenance requirements.",
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
    imagePath: "/images/eba/flower_strips.jpeg",
    ecosystemServices: getEbaStrategyEcosystemServices(
      "vegetated-buffer-flower-strips",
    ),
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
    imagePath: "/images/eba/dry_stone_walls.JPG",
    ecosystemServices: getEbaStrategyEcosystemServices("dry-stone-walls"),
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
    imagePath: "/images/eba/terraces.jpg",
    ecosystemServices: getEbaStrategyEcosystemServices(
      "terrace-restoration-management",
    ),
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
