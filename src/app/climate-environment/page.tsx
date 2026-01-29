"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Map, { MapRef, NavigationControl, ScaleControl } from "react-map-gl/mapbox";
import type { Map as MapboxMap } from "mapbox-gl";
import { Radio, RadioChangeEvent } from "antd";
import MapLegend from "@/app/components/MapLegend";
import styles from "@/styles/Home.module.css";
import { isMobile } from "react-device-detect";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/app/components/ui/resizable";

const ReactMap = Map;
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

interface LayerGroup {
  id: string;
  title: string;
  description: string;
  layers: Layer[];
}

interface Layer {
  id: string;
  name: string;
  description: string;
  references?: string[];
  inputData?: string[];
  mapboxLayerId: string;
}

const layerGroups: LayerGroup[] = [
  {
    id: "ecosystem-conditions",
    title: "ECOLOGICAL CONDITIONS AND ECOSYSTEM SERVICES IN THE ALPS",
    description: "Ecosystem conditions: the overall quality of an ecosystem to reflect its health and ability to provide ecosystem services",
    layers: [
      {
        id: "naturalness-index",
        name: "Naturalness (index)",
        description: "The degree of land use/land cover naturalness (index). Natural and seminatural areas play an important role for viticulture because they provide habitats for natural predators that can support pest and disease control. Because a shift in climatic conditions can change patterns of crop pathogens and pests, these areas are of critical importance for adaptation purposes, as they support the resilience of vineyard landscapes. The indicator is calculated by reclassifying a land use/land cover map on a 1-7 hemeroby scale as follows: 1 = Artificial, 2 = Artificial with natural elements, 3 = Cultural, 4 = Altered, 5 = Semi-natural, 6 = Near natural, 7 = Natural (Rüdisser et al., 2012). The original classification was reversed to assign higher values to more natural land use classes. In the second stage, the classification was integrated with Natura2000 (+1) and High Nature Value Farmland (+1) data. The final classification therefore ranges from 1 to 9. Values were rescaled on a 0-100 scale. The indicator was mapped at 100 m spatial resolution.",
        references: [
          "Rüdisser, J., Tasser, E., & Tappeiner, U. (2012). Distance to nature—a new biodiversity relevant environmental indicator set at the landscape level. Ecological Indicators, 15(1), 208-216 doi.org/10.1016/j.ecolind.2011.09.027"
        ],
        inputData: [
          "EU, Copernicus Land Monitoring Service. (2019). European Environment Agency (EEA)-dataset: CORINE land cover-2018, version 2020_20u1. https://land.copernicus.eu/pan-european/corine-land-cover",
          "European Environment Agency (EEA)-dataset: High Nature Value (HNV) farmland 2012 (100 m) accounting version, Nov. 2017. European Environment Agency. Available at https://www.eea.europa.eu/en/datahub/datahubitem-view/1bd26e8f-8ea0-45e0-b6bf-9ed2baff5d28?activeAccordion=1070000 (Accessed 11/2024) (eea_r_3035_100_m_hnv-farm-2012-acc_p_2012_v01_r00)",
          "European Environment Agency (EEA)-dataset: Natura 2000 (vector) - version 2017, Mar. 2018. European Environment Agency. Available at https://www.eea.europa.eu/en/datahub/datahubitem-view/6fc8ad2d-195d-40f4-bdec-576e7d1268e4?activeAccordion=1091667. (Accessed 11/2024) (eea_v_3035_100_k_natura2000_p_2022_v01_r00)"
        ],
        mapboxLayerId: "env_naturalness_index-4gh1u3nd"
      },
      {
        id: "distance-to-nature",
        name: "Land use integrity (index)",
        description: "The degree of land use integrity based on the distance to natural and near-natural areas (index). The composition and configuration of different ecosystems in a landscape, and the way they are managed have an influence on biodiversity, and the quality of ecological processes and functions which are key to supporting a variety of ecosystem services. Biodiversity of intensively used landscapes can be enhanced through the proximity to natural habitats. The presence of natural and semi natural habitat patches can serve as habitats for otherwise regionally extinct species and as nesting and recolonization areas for many dispersing animal and plant species. Furthermore, natural and semi natural habitats can serve as \"steppingstones\" and habitat corridors between otherwise separated habitats (Rüdisser et al., 2012). The land use integrity indicator is based on the distance to nature index described in Rüdisser et al. (2012). Distance to nature represents a composite index which is calculated by multiplying the degree of naturalness (Nd) by the distance to natural habitats (Dn), defined as the average distance to the next natural or near natural ecosystem patch. For Nd, land use is reclassified along a seven qualitative staged naturalness scale (1-7), with 1 corresponding to natural ecosystems with no or minimal anthropogenic influence, and 7 corresponding to artificial systems or structures. The indicator values were transformed to indicate that a higher land use integrity and quality is reached when the indicator value is low (i.e., low distance to natural habitats). The indicator was mapped at 100 m spatial resolution and standardized on a 0-100 range.",
        references: [
          "Rüdisser, J., Tasser, E., & Tappeiner, U. (2012). Distance to nature—a new biodiversity relevant environmental indicator set at the landscape level. Ecological Indicators, 15(1), 208-216 doi.org/10.1016/j.ecolind.2011.09.027"
        ],
        inputData: [
          "EU, Copernicus Land Monitoring Service. (2019). European Environment Agency (EEA)-dataset: CORINE land cover-2018, version 2020_20u1. https://land.copernicus.eu/pan-european/corine-land-cover"
        ],
        mapboxLayerId: "env_distance_to_nature-4pdad6jf"
      },
      {
        id: "landuse-diversity",
        name: "Land use diversity (index)",
        description: "The diversity of land use/land cover classes (index). The composition and configuration of different ecosystems in a landscape, as well as the way they are managed have an influence on biodiversity, and on the quality of ecological processes and functions. Higher landscape heterogeneity is often considered an important environmental factor that promotes biodiversity and the provision of a variety of ecosystem services. The diversity of land use/land cover classes was calculated at 100 m resolution based on their richness (number of different land uses) and abundance (area coverage) as calculated through the Simpson diversity using the following formula: SUM pi * ln(pi) where pi is the proportion of each land use type on the total area considered (1 ha). Higher indicator values indicate a higher landscape complexity. The indicator was mapped at 100 m resolution and standardized on a 0-100 range.",
        references: [
          "Comer D., Greene, S. (2015). The development and application of a land use diversity index for Oklahoma City, OK. Applied Geography, 60, 46-57 doi.org/10.1016/j.apgeog.2015.02.015"
        ],
        inputData: [
          "EU, Copernicus Land Monitoring Service. (2019). European Environment Agency (EEA)-dataset: CORINE land cover-2018, version 2020_20u1. https://land.copernicus.eu/pan-european/corine-land-cover"
        ],
        mapboxLayerId: "env_landuse_diversity_index-35je19qp"
      },
      {
        id: "climatic-waterbalance",
        name: "Climate water balance (index)",
        description: "The water available from precipitation after accounting for evapotranspiration (index). Artificial irrigation might not be feasible in all areas and can pose significant challenges to the natural water reserves of a region. The available water from precipitation (after accounting for evapotranspiration) is therefore critical to the adaptive capacity of a region. A higher availability of water is related to lower risk for drought and lower dependence on irrigation and may therefore protect regions from negative impacts of climate change. The indicator for climate water balance is based on the climate moisture index (cmi) from the CHELSA database, which is calculated as the difference between evapotranspiration and total precipitation (mm). For the computation, the average monthly cmi over the period 1981-2010 was used to calculate the average yearly climate water balance. The indicator was standardized on a 0-100 range, with higher values indicating increased water availability.",
        references: [
          "Tscholl, S et al. (2024). Climate resilient winegrowing regions. Nature communications 15 (6254). doi.org/10.1038/s41467-024-50549-w"
        ],
        inputData: [
          "Karger, D. N., Schmatz, D. R., Dettling, G. & Zimmermann, N. E. High-resolution monthly precipitation and temperature time series from 2006 to 2100. Sci Data 7, 248 (2020).",
          "Karger, D. N. et al. Climatologies at high resolution for the earth's land surface areas. Sci Data 4, 170122 (2017)."
        ],
        mapboxLayerId: "env_climatic_waterbalance_1me376vw"
      }
    ]
  },
  {
    id: "ecosystem-services",
    title: "ECOSYSTEM SERVICES",
    description: "The benefits that nature provides to humans",
    layers: [
      {
        id: "pest-control",
        name: "Pest control (index)",
        description: "The relative potential to sustain natural pest control in agricultural areas (index). Pest control by natural enemies (natural pest control) is an important regulating ecosystem service with significant implications for the sustainability of agroecosystems. The presence of semi-natural habitats and landscape heterogeneity are key determinants of the delivery of this service and for the long-term sustainability of agroecosystems (Rega et al., 2018). The indicator model considers landscape composition in terms of semi-natural habitat types, abundance, spatial configuration and distance from the focal field. It combines recent high-resolution geospatial layers with empirical results from extensive field surveys measuring the specific contribution of different semi-natural habitats to support flying insects and enemies providing natural pest control (Rega et al., 2018). The original dataset from Rega et al. (2018) has been extracted for the agricultural areas within the study area. The indicator values are scaled on a 0-100 scale, with higher values indicating higher natural pest control potential.",
        references: [
          "Rega, C. et al. (2018). A pan-European model of landscape potential to support natural pest control services. Ecological Indicators, 90: 653-664. doi.org/10.1016/j.ecolind.2018.03.075, https://publications.jrc.ec.europa.eu/repository/handle/JRC111488"
        ],
        mapboxLayerId: "env_pestcontrol_100m-bplrmwe4"
      },
      {
        id: "pollination-potential",
        name: "Pollination (index)",
        description: "The relative capacity of ecosystems to support insect pollination (index). Crop pollination by wild insects is a key regulating ecosystem service with high economic implications. The productivity of many agricultural crops depends on the presence of pollinating insects and the ecosystems that support insect populations (Zulian et al., 2013). The methodology used to map the pollination indicator focuses on wild bees as key animal pollinators. The indicator assumes that different habitats offer varying floral resources and nesting opportunities. The indicator also accounts for climatic variation in temperature and solar irradiance by calculating an annually averaged activity coefficient representing the pollination activity. In addition, given that pollination services decrease by increasing the distance from natural and semi-natural areas, a distance decay function is applied. The indicator values were mapped on a 0-100 scale, with higher values indicating a higher potential capacity to support insect pollination.",
        references: [
          "Zulian G, Maes J, Paracchini M. L. 2013 Linking Land Cover Data and Crop Yields for Mapping and Assessment of Pollination Services in Europe. Land 2013, 2, 472-492; doi:10.3390/land2030472",
          "Vallecillo S, La Notte A, Polce C, Zulian G, Alexandris N, Ferrini S, Maes J. 2018. Ecosystem services accounting: Part I - Outdoor recreation and crop pollination, EUR 29024 EN; Publications Office of the European Union, Luxembourg, doi:10.2760/619793, JRC110321",
          "Zulian G, Paracchini M, Maes J, Liquete Garcia M. ESTIMAP: Ecosystem services mapping at European scale. EUR 26474. Luxembourg (Luxembourg): Publications Office of the European Union; 2013. JRC87585 10.2788/64713"
        ],
        inputData: [
          "Marsoner, T., Simion, H., Giombini, V. et al. A detailed land use/land cover map for the European Alps macro region. Sci Data 10, 468 (2023). https://doi.org/10.1038/s41597-023-02344-3",
          "Fick, S.E. and R.J. Hijmans, 2017. WorldClim 2: new 1km spatial resolution climate surfaces for global land areas. International Journal of Climatology, 37(12): 4302-4315",
          "EU, Copernicus Land Monitoring Service. European Environment Agency (EEA) -Dataset: Riparian Zones status 2018 https://land.copernicus.eu/local/riparian-zones/riparian-zones-2018 (2021)"
        ],
        mapboxLayerId: "env_pollination_potential_100m-cgzjjo3l"
      },
      {
        id: "soil-erosion",
        name: "Soil erosion control (index)",
        description: "The prevention of soil erosion (index). Soil erosion is a widespread issue in natural and managed ecosystems, with several implications for environmental quality (soil deterioration) and social economy (decline in soil productivity). By protecting soil from wind and water processes, terrestrial ecosystems control soil erosion rates, therefore providing a fundamental ecosystem service that ensures human wellbeing. Using the Revised Universal Soil Loss Equation, the soil erosion rates are calculated based on rainfall erosivity, soil erodibility, topography and soil retention, which is determined by vegetation cover. For the vegetation cover factor and erosion control practice factors, proxy values where used. The indicator values range on a 0-100 scale, with higher values indicating higher control of soil erosion.",
        references: [
          "Fu, B., Liu, Y. Lü, Y., He, C. Zeng, Y., Wu, B., (2011). Assessing the soil erosion control service of ecosystems change in the Loess Plateau of China. Ecological Complexity(8), Issue 4, 284-293. https://doi.org/10.1016/j.ecocom.2011.07.003.",
          "Guerra, Carlos A., Maes, J. Geijzendorffer, I. Metzger, M.J. (2016). An assessment of soil erosion prevention by vegetation in Mediterranean Europe: Current trends of ecosystem service provision. Ecological Indicators (60), 213-222. https://doi.org/10.1016/j.ecolind.2015.06.043",
          "Laaich, H. et al. (2016). Soil erodibility mapping using three approaches in the Tangiers province –Northern Morocco. International Soil and Water Conservation Research (4), 159–167.",
          "Panagos, P. et al. (2015). Estimating the soil erosion cover-management factor at the European scale. Land Use Policy (48), 38–50."
        ],
        inputData: [
          "Marsoner, T., Simion, H., Giombini, V. et al. A detailed land use/land cover map for the European Alps macro region. Sci Data 10, 468 (2023). https://doi.org/10.1038/s41597-023-02344-3",
          "Marchi, M., Castellanos-Acuna, D., Hamann, A., Wang, T., Ray, D. Menzel, A. 2020. ClimateEU, scale-free climate normals, historical time series, and future projections for Europe. Scientific Data 7: 428. doi: 10.1038/s41597-020-00763-0",
          "Poggio, L., de Sousa, L. M., Batjes, N. H., Heuvelink, G. B. M., Kempen, B., Ribeiro, E., and Rossiter, D., 2021. SoilGrids 2.0: producing soil information for the globe with quantified spatial uncertainty. SOIL, 7, 217–240. https://doi.org/10.5194/soil-7-217-2021",
          "Fick, S.E. and R.J. Hijmans, 2017. WorldClim 2: new 1km spatial resolution climate surfaces for global land areas. International Journal of Climatology, 37(12): 4302-4315",
          "European Environment Agency, 2016. EU-DEM v1.1. Copernicus Land Monitoring Service. https://sdi.eea.europa.eu/catalogue/srv/api/records/3473589f-0854-4601-919e-2e7dd172ff50"
        ],
        mapboxLayerId: "env_soilerosion_100m-4qhu04m5"
      },
      {
        id: "net-primary-production",
        name: "Net primary production (index)",
        description: "Total amount of carbon dioxide used for plant growth per unit time (index). The Net Primary Production (NPP) dataset quantifies the total amount of carbon dioxide used for plant growth per unit time (index). The yearly NPP (g C/m²/year) is calculated from yearly Gross Primary Production multiplied with a Carbon Use Efficiency factor of 0.5. The original datasets (EEA, 2023) for the years 2018-2022 were averaged to get the average NPP value for the study areas and then standardized on a 0-100 range.",
        references: [
          "European Environment Agency, 2023. Medium Resolution Net Primary Production [Dataset]- NPP, raster 196m version 1, Nov. 2023. European Environment Agency. Available at: https://sdi.eea.europa.eu/catalogue/srv/api/records/28d6b823-e2fd-4bf4-a6aa-cb6a359c52da?language=all (Accessed: 01/2025)(eea_r_3035_196_m_modis-npp_p_2000-2022_v01_r00)"
        ],
        mapboxLayerId: "env_netprimaryproduction_100m-cqp3l98f"
      },
      {
        id: "outdoor-recreation",
        name: "Outdoor recreation (index)",
        description: "The relative capacity of ecosystems to support nature-based recreation opportunities (index). Outdoor recreation in natural and semi-natural environments plays a crucial role for physical and mental health and contributes substantially to human well-being. The outdoor recreation potential of different ecosystems is modelled based on the following six landscape factors: naturalness, presence of protected areas (Natura2000), presence of water, landscape diversity, terrain ruggedness, density of mountain peaks, and is weighted by the degree of accessibility of a specific area (Schirpke et al., 2018). The indicator values range on a 0-100 scale, with higher values indicating higher outdoor recreation potential.",
        references: [
          "Schirpke, Uta, et al. \"Revealing spatial and temporal patterns of outdoor recreation in the European Alps and their surroundings.\" Ecosystem services 31 (2018): 336-350."
        ],
        inputData: [
          "EU, Copernicus Land Monitoring Service. (2019). European Environment Agency (EEA)-dataset: CORINE land cover-2018, version 2020_20u1. https://land.copernicus.eu/pan-european/corine-land-cover",
          "European Environment Agency (EEA)-dataset: Natura 2000 (vector) - version 2017, Mar. 2018. European Environment Agency. Available at https://www.eea.europa.eu/en/datahub/datahubitem-view/6fc8ad2d-195d-40f4-bdec-576e7d1268e4?activeAccordion=1091667.(eea_v_3035_100_k_natura2000_p_2022_v01_r00)",
          "European Environment Agency, 2016. EU-DEM v1.1. Copernicus Land Monitoring Service. https://sdi.eea.europa.eu/catalogue/srv/api/records/3473589f-0854-4601-919e-2e7dd172ff50",
          "OpenStreetMap contributors. Country shapefiles [Data files from 01.2020]. Retrieved from https://download.geofabrik.de (2020)"
        ],
        mapboxLayerId: "env_outdoor_recreation_100m-11ruod2g"
      },
      {
        id: "landscape-aesthetics",
        name: "Landscape aesthetics (index)",
        description: "The relative aesthetic value of a landscape (index). The scenic beauty of landscapes is highly appreciated for enjoying nature and carrying out recreational activities. The aesthetic value of a landscape is therefore an important aspect contributing to human well-being (Schirpke et al., 2021). The landscape aesthetic indicator is modelled considering two factors: the visibility and the objective aesthetic beauty of the visible landscape. For the landscape visibility, two separate visibility analysis are performed: 1) using one observer point of each 250m raster cell and 2) using one observer point for each built-up area as well as one observer point for every 250 people living in the area. Additionally, photo user day Flickr photo points were considered. The landscape aesthetic beauty is modelled using proxy values for landcover types, and by applying focal statistic with a 500m radius, since landscape is always perceived as a location with its surroundings. The indicator values range on a 0-100 scale, with higher values indicating higher landscape beauty.",
        references: [
          "García, A. M., Santé, I., Loureiro, X. & Miranda, D. Green infrastructure spatial planning considering ecosystem services assessment and trade-off analysis. Application at landscape scale in Galicia region (NW Spain). Ecosystem Services 43, 101115 (2020).",
          "Schirpke, U. Effects of past landscape changes on aesthetic landscape values in the European Alps. Landscape and Urban Planning 13 (2021)."
        ],
        inputData: [
          "Marsoner, T., Simion, H., Giombini, V. et al. A detailed land use/land cover map for the European Alps macro region. Sci Data 10, 468 (2023). https://doi.org/10.1038/s41597-023-02344-3",
          "European Environment Agency, 2016. EU-DEM v1.1. Copernicus Land Monitoring Service. https://sdi.eea.europa.eu/catalogue/srv/api/records/3473589f-0854-4601-919e-2e7dd172ff50",
          "Schirpke, U., Meisch, C., Marsoner, T. & Tappeiner, U. Revealing spatial and temporal patterns of outdoor recreation in the European Alps and their surroundings. Ecosystem Services 31, 336–350 (2018)."
        ],
        mapboxLayerId: "env_landscape_aesthetics_100m-b1zuidds"
      }
    ]
  }
];

export default function EnvironmentalPage() {
  const mapRef = useRef<MapRef>(null);

  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapInstance, setMapInstance] = useState<MapboxMap | null>(null);
  const [selectedGroupId, setSelectedGroupId] = useState(layerGroups[0].id);
  const [selectedLayerId, setSelectedLayerId] = useState(layerGroups[0].layers[0].id);
  const handlePanelLayout = useCallback(() => {
    mapRef.current?.getMap().resize();
  }, []);

  const selectedGroup = layerGroups.find(group => group.id === selectedGroupId) || layerGroups[0];
  const selectedLayer = selectedGroup.layers.find(layer => layer.id === selectedLayerId) || selectedGroup.layers[0];

  // Handle layer visibility when map loads or selection changes
  useEffect(() => {
    if (!mapLoaded || !mapRef.current) return;

    const map = mapRef.current.getMap();

    // Hide all environmental layers first
    layerGroups.forEach(group => {
      group.layers.forEach(layer => {
        try {
          if (map.getLayer(layer.mapboxLayerId)) {
            map.setLayoutProperty(layer.mapboxLayerId, 'visibility', 'none');
          }
        } catch {
          // Layer not present in map style.
        }
      });
    });

    // Show the selected layer
    try {
      if (map.getLayer(selectedLayer.mapboxLayerId)) {
        map.setLayoutProperty(selectedLayer.mapboxLayerId, 'visibility', 'visible');
      }
    } catch {
      // Layer not present in map style.
    }
  }, [mapLoaded, selectedLayer.mapboxLayerId]);

  const handleGroupChange = (activeKey: string) => {
    setSelectedGroupId(activeKey);
    const newGroup = layerGroups.find(group => group.id === activeKey);
    if (newGroup && newGroup.layers.length > 0) {
      setSelectedLayerId(newGroup.layers[0].id);
    }
  };

  const handleLayerChange = (e: RadioChangeEvent) => {
    setSelectedLayerId(e.target.value);
  };

  // Function to convert URLs in text to clickable links
  const renderTextWithLinks = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);

    return parts.map((part, index) => {
      if (urlRegex.test(part)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 underline break-all"
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  return (
    <div className="h-screen w-full bg-black pt-24">
      <ResizablePanelGroup
        direction={isMobile ? "vertical" : "horizontal"}
        onLayout={handlePanelLayout}
        className="h-[calc(100vh-6rem)] w-full"
      >
        <ResizablePanel
          defaultSize={isMobile ? "48%" : "32%"}
          minSize={isMobile ? "28%" : "24%"}
          maxSize={isMobile ? "78%" : "45%"}
          className="bg-black/95 backdrop-blur-md overflow-hidden"
        >
          <div
            className={`h-full overflow-hidden ${isMobile ? "border-b" : "border-r"} border-white/20`}
          >
            <div className={styles.panelFrame}>
              <div className={styles.frontpageContent}>
                {/* Winemap Header */}
                {/* <header className="mb-8">
              <div className="flex items-start justify-between w-full mb-4 flex-col">
                <div className="flex items-start justify-start gap-2 flex-col ">
                  <h1 className="text-[28px] font-bold mt-4 mb-0 ">
                    <Link
                      href="/"
                      className="transition-all hover:[text-shadow:_0_0_10px_rgb(255_255_255)] flex gap-2"
                    >
                      WINEMAP{" "}
                      <span className="font-extralight italic">ENVIRONMENT</span>
                    </Link>
                  </h1>
                  <a
                    href="https://www.eurac.edu"
                    title="Go to Eurac Research Website"
                    className="pb-[3px] flex gap-2 items-center"
                  >
                    by
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="178.793"
                      height="22"
                      viewBox="0 0 178.793 19.536"
                      className="h-4 w-auto"
                    >
                      <path
                        d="M165.199 19.215c.679-.027 1.709-.081 2.768-.081 1.031 0 2.144.054 2.822.081v-.76l-.9-.135c-.6-.109-.9-.272-.9-2.171V8.303a6.188 6.188 0 0 1 3.147-1.058c2.307 0 2.849 1.275 2.849 3.337v5.562c0 1.9-.271 2.062-.9 2.171l-.9.135v.765c.678-.027 1.709-.081 2.767-.081 1.031 0 2.144.054 2.822.081v-.76l-.9-.135c-.6-.109-.9-.272-.9-2.171v-5.866c0-2.74-.923-4.639-4.124-4.639a6.3 6.3 0 0 0-3.88 1.763V0a20.047 20.047 0 0 1-3.771 1.465v.65c1.763.352 1.763.678 1.763 2.062v11.967c0 1.9-.271 2.062-.9 2.171l-.9.135Zm-6.539.326a4.838 4.838 0 0 0 4.016-1.737l-.136-.705a5.725 5.725 0 0 1-3.147.841c-2.822 0-4.8-1.927-4.8-5.4 0-3.608 1.927-5.725 4.232-5.725 1.927 0 2.551 1.031 2.632 2.577h1.031c0-.9.027-2.2.109-3.093a10.729 10.729 0 0 0-3.608-.651c-3.555 0-6.513 3.12-6.513 7.163 0 4.124 2.306 6.729 6.186 6.729m-16.037-.325c.678-.027 1.709-.109 2.767-.109 1.031 0 2.5.082 3.175.109v-.76l-1.247-.14c-.6-.082-.9-.272-.9-2.171V8.466a4.73 4.73 0 0 1 2.879-1.031 4.092 4.092 0 0 1 1.493.244l.218-1.872a4.463 4.463 0 0 0-1.167-.163 5.094 5.094 0 0 0-3.419 1.9V5.508a26.914 26.914 0 0 1-3.771 1.3v.651c1.764.352 1.764.678 1.764 2.062v6.62c0 1.9-.272 2.062-.9 2.171l-.9.135Zm-9.415-1.248a2.045 2.045 0 0 1-2.225-2.152c0-1.655 1.248-2.659 4.042-2.659.3 0 .761 0 1.059.028-.027.569-.081 2.6-.081 3.581a3.744 3.744 0 0 1-2.795 1.194m-.732 1.574a4.534 4.534 0 0 0 3.608-1.845h.055a1.777 1.777 0 0 0 1.98 1.845 4.134 4.134 0 0 0 2.063-.489v-.76c-1.656 0-2.144-.379-2.144-1.709 0-2.442.109-4.5.109-6.62 0-2.632-1.52-4.314-4.586-4.314a5.427 5.427 0 0 0-3.717 1.546l.136.787a6.281 6.281 0 0 1 3.094-.732c2.116 0 3.039 1.112 3.039 3.2v1.578c-.407-.027-1.086-.027-1.466-.027-3.473 0-5.725 1.628-5.725 4.178a3.316 3.316 0 0 0 3.555 3.365m-14.19-8.846c.217-1.845 1.356-3.852 3.636-3.852a2.977 2.977 0 0 1 2.846 3.256c0 .379-.162.6-.624.6Zm3.88 8.846c1.953 0 3.663-.842 4.178-1.683l-.081-.678a7.9 7.9 0 0 1-3.581.76c-3.039 0-4.5-2.442-4.5-5.372 0-.245 0-.516.027-.786h8.764a5.816 5.816 0 0 0 .055-.977 4.832 4.832 0 0 0-4.993-5.155c-3.527 0-6 3.039-6 7.163 0 4.151 2.144 6.729 6.133 6.729m-13.648 0c2.713 0 4.694-1.818 4.694-3.989 0-4.857-6.838-3.554-6.838-6.7 0-1.383 1.059-2.089 2.687-2.089 1.818 0 2.632.9 2.767 2.632h1a22.693 22.693 0 0 1-.054-3.039 10.491 10.491 0 0 0-3.609-.705c-2.632 0-4.585 1.411-4.585 3.581 0 4.911 6.81 3.256 6.81 6.648 0 1.519-1.194 2.469-2.9 2.469-2.307 0-2.876-1.058-3.12-2.985h-1a31.179 31.179 0 0 1 .074 3.555 12.844 12.844 0 0 0 4.07.624m-15.38-8.849c.217-1.845 1.357-3.852 3.636-3.852a2.978 2.978 0 0 1 2.845 3.256c0 .379-.163.6-.624.6Zm3.88 8.846c1.954 0 3.663-.842 4.179-1.683l-.082-.678a7.9 7.9 0 0 1-3.581.76c-3.038 0-4.5-2.442-4.5-5.372 0-.245 0-.516.027-.786h8.764a5.931 5.931 0 0 0 .054-.977 4.832 4.832 0 0 0-4.992-5.155c-3.528 0-6 3.039-6 7.163 0 4.151 2.144 6.729 6.132 6.729m-15.986-.322c.678-.027 1.709-.109 2.767-.109 1.032 0 2.5.082 3.175.109v-.76l-1.248-.14c-.6-.082-.9-.272-.9-2.171V8.466a4.728 4.728 0 0 1 2.881-1.031 4.091 4.091 0 0 1 1.492.244l.218-1.872a4.458 4.458 0 0 0-1.167-.163 5.091 5.091 0 0 0-3.419 1.9V5.508a26.95 26.95 0 0 1-3.772 1.3v.651c1.764.352 1.764.678 1.764 2.062v6.62c0 1.9-.272 2.062-.9 2.171l-.9.135Zm-13.296.321a10.166 10.166 0 0 0 3.687-.663v-4.032a5.963 5.963 0 0 1-3.283.778c-1.7 0-2.707-1.152-2.707-3.283 0-2.592 1.094-3.629 2.679-3.629a8.352 8.352 0 0 1 3.082.6V5.366a12.034 12.034 0 0 0-3.573-.518c-5.011 0-7.6 3.2-7.6 7.488 0 4.464 2.362 7.2 7.719 7.2M50.66 16.048c-.806 0-1.325-.259-1.325-1.066 0-.95.518-1.325 1.959-1.325a5.282 5.282 0 0 1 .633.029V15.5a1.742 1.742 0 0 1-1.267.547m-1.76 3.489a4.211 4.211 0 0 0 3.718-1.788 3.347 3.347 0 0 0 3.37 1.786 4.056 4.056 0 0 0 2.391-.576v-3.2a2.9 2.9 0 0 1-.462.058c-.576 0-.806-.346-.806-1.009v-4.43c0-3.772-1.872-5.529-6.48-5.529a14.844 14.844 0 0 0-4.751.72v3.83a14.846 14.846 0 0 1 3.859-.6c1.556 0 2.189.547 2.189 1.728v.461c-.2 0-.433-.029-.921-.029-3.888 0-6.711 1.095-6.711 4.349 0 2.966 2.045 4.233 4.609 4.233m-15.525-.234h5.184v-9.274a7.4 7.4 0 0 1 3.11-.72 6.513 6.513 0 0 1 1.584.173V4.992a3.481 3.481 0 0 0-1.152-.144 4.839 4.839 0 0 0-3.657 1.728V5.078H33.38Zm-12.3.231a6.047 6.047 0 0 0 3.888-1.354v1.123h5.04V5.078h-5.182v9.706a3.025 3.025 0 0 1-1.728.748c-1.037 0-1.555-.461-1.555-1.757V5.078H16.33v9.476c0 2.851 1.239 4.982 4.752 4.982M5.414 10.548c.058-1.009.49-2.045 1.728-2.045 1.095 0 1.555.95 1.555 1.872v.173Zm2.42 8.986a13.961 13.961 0 0 0 4.838-.806v-3.829a11.914 11.914 0 0 1-4.406.864c-2.3 0-2.852-.864-2.938-2.419h8.324a13.521 13.521 0 0 0 .086-1.527c0-3.657-1.584-6.969-6.624-6.969C2.275 4.848 0 8.39 0 12.163c0 4.32 2.16 7.373 7.834 7.373"
                        fill="#fff"
                      ></path>
                    </svg>
                  </a>
                </div>
              </div>
            </header> */}
                {/* Main Title */}
                <h2 className="text-xl font-semibold mb-6">ECOLOGICAL CONDITIONS AND ECOSYSTEM SERVICES IN THE ALPS</h2>

                {/* Group Selection Tabs */}
                <div className="mb-6">
                  <div className="flex bg-white/10 rounded-lg p-1 w-fit gap-1">
                    {layerGroups.map(group => (
                      <button
                        key={group.id}
                        onClick={() => handleGroupChange(group.id)}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all !mt-0 duration-200 ${selectedGroupId === group.id
                          ? 'bg-white text-black shadow-sm'
                          : 'text-white hover:bg-white/20'
                          }`}
                      >
                        {group.id === 'ecosystem-conditions' ? 'Ecosystem Conditions' : 'Ecosystem Services'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Layer Selection */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Layers</h3>
                  <Radio.Group
                    value={selectedLayerId}
                    onChange={handleLayerChange}
                    className="flex flex-col space-y-2 "
                  >
                    {selectedGroup.layers.map(layer => (
                      <Radio
                        key={layer.id}
                        value={layer.id}
                        className="text-white block w-full"
                      >
                        <span className="text-sm">{layer.name}</span>
                      </Radio>
                    ))}
                  </Radio.Group>
                </div>

                {/* Layer Description */}
                <div className="border-t border-gray-600 pt-6 pb-10">
                  <div className="mb-4">
                    <h4 className="text-lg font-medium mb-2">{selectedLayer.name}</h4>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {renderTextWithLinks(selectedLayer.description)}
                    </p>
                  </div>

                  {selectedLayer.references && (
                    <div className="mb-4">
                      <h5 className="text-md font-medium mb-2">References:</h5>
                      <ul className="text-xs text-gray-400 space-y-1">
                        {selectedLayer.references.map((ref, index) => (
                          <li key={index}>• {renderTextWithLinks(ref)}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedLayer.inputData && (
                    <div className="mb-4">
                      <h5 className="text-md font-medium mb-2">Input Data:</h5>
                      <ul className="text-xs text-gray-400 space-y-1">
                        {selectedLayer.inputData.map((data, index) => (
                          <li key={index}>• {renderTextWithLinks(data)}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Acknowledgement - shown for all layers */}
                  <div>
                    <h5 className="text-md font-medium mb-2">Acknowledgement:</h5>
                    <p className="text-xs text-gray-400">
                      The data presented were produced within the project AGATA (Accessible ecoloGicAl daTA for resilient Viticulture), jointly financed by Eurac Research and the University of Verona as part of the &ldquo;JOINT RESEARCH 2022&rdquo; Call.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle
          withHandle
          className={`${isMobile
            ? "h-3 w-full cursor-row-resize hover:h-4"
            : "w-2 h-full cursor-col-resize hover:w-3"
            } flex items-center justify-center bg-[#E91E63] opacity-60 hover:opacity-100 text-[#E91E63] hover:brightness-110 transition-all relative z-20`}
        />

        <ResizablePanel className="relative">
          <Suspense fallback={<div>Loading...</div>}>
            <ReactMap
              ref={mapRef}
              minZoom={isMobile ? 1 : 3}
              initialViewState={{
                latitude: 46,
                longitude: 5,
                zoom: 5.2,
                bearing: 0,
                pitch: 0,
              }}
              style={{ width: "100%", height: "100%" }}
              mapStyle="mapbox://styles/tiacop/cmdg1whvv001s01r2diojaxic"
              mapboxAccessToken={MAPBOX_TOKEN}
              onLoad={(event) => {
                setMapLoaded(true);
                setMapInstance(event.target);
              }}
            >
              <NavigationControl
                position="bottom-right"
                visualizePitch={true}
                showCompass={true}
              />
              <ScaleControl position="bottom-right" />
            </ReactMap>

            <MapLegend
              map={mapInstance}
              layerId={selectedLayer.mapboxLayerId}
              layerName={selectedLayer.name}
              isVisible={mapLoaded}
            />
          </Suspense>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
