import type { IndicatorContentBlock } from "@/app/components/indicators/IndicatorContent";

export type Indicator = {
  id: string;
  name: string;
  category: string;
  subtitle?: string;
  description: string[];
  methodology?: string[];
  references?: string[];
  contentBlocks?: IndicatorContentBlock[];
  video?: {
    label: string;
    url: string;
  };
  mapboxLayerId?: string;
};

export const Indicators: Indicator[] = [
  {
    id: "pollination",
    name: "Pollination",
    category: "ecosystem-services",
    subtitle: "Relative potential for pollination service provision in agricultural areas.",
    description: [
      "The Pollination indicator represents the relative potential of ecosystems to support insect-mediated crop pollination. Pollination by wild insects—particularly bees—is a crucial regulating ecosystem service with significant ecological and economic importance, as many agricultural crops depend on insect pollination to maintain stable yields and product quality.",
      "Healthy ecosystems provide floral resources, nesting habitats, and suitable microclimatic conditions that sustain pollinator populations. Landscapes rich in semi-natural habitats generally support higher pollinator abundance and diversity, thereby increasing pollination potential in nearby agricultural areas. The indicator expresses the relative capacity of a landscape to sustain pollination services on a standardized 0–100 scale, where higher values indicate more favorable ecological conditions for supporting wild pollinator communities."
    ],
    methodology: [
      "The indicator focuses on wild bees as key pollinators and models pollination potential based on habitat suitability and landscape configuration. The assessment integrates habitat-specific availability of floral resources and nesting opportunities, climatic suitability derived from temperature and solar irradiance (represented through an annually averaged pollinator activity coefficient), and a distance-decay function reflecting decreasing pollination service delivery with increasing distance from natural and semi-natural habitats. The resulting spatial layers were combined and standardized to a 0–100 index, where higher values indicate greater potential to support pollination services."
    ],
    references: [
      "Zulian G, Maes J, Paracchini M. L. 2013 Linking Land Cover Data and Crop Yields for Mapping and Assessment of Pollination Services in Europe. Land 2013, 2, 472-492; doi:10.3390/land2030472",
      "Vallecillo S, La Notte A, Polce C, Zulian G, Alexandris N, Ferrini S, Maes J. 2018. Ecosystem services accounting: Part I - Outdoor recreation and crop pollination, EUR 29024 EN; Publications Office of the European Union, Luxembourg, doi:10.2760/619793, JRC110321",
      "Zulian G, Paracchini M, Maes J, Liquete Garcia M. ESTIMAP: Ecosystem services mapping at European scale. EUR 26474. Luxembourg (Luxembourg): Publications Office of the European Union; 2013. JRC87585 10.2788/64713",
      "Marsoner, T., Simion, H., Giombini, V. et al. A detailed land use/land cover map for the European Alps macro region. Sci Data 10, 468 (2023). https://doi.org/10.1038/s41597-023-02344-3",
      "Fick, S.E. and R.J. Hijmans, 2017. WorldClim 2: new 1km spatial resolution climate surfaces for global land areas. International Journal of Climatology, 37(12): 4302-4315",
      "EU, Copernicus Land Monitoring Service. European Environment Agency (EEA) -Dataset: Riparian Zones status 2018 https://land.copernicus.eu/local/riparian-zones/riparian-zones-2018 (2021)"
    ],
    mapboxLayerId: "env_pollination_potential_100m-cgzjjo3l"
  },
  {
    id: "erosion-control",
    name: "Soil Erosion Control",
    category: "ecosystem-services",
    subtitle: "Relative capacity of ecosystems to prevent soil loss from water and wind erosion.",
    description: [
      "The Soil Erosion Control indicator represents the capacity of ecosystems to prevent soil loss caused by water and wind erosion. Soil erosion is a major environmental concern that affects soil fertility, agricultural productivity, water quality, and long-term landscape stability.",
      "Vegetation cover plays a central role in stabilizing soils by intercepting rainfall, reducing surface runoff, improving soil structure, and protecting against wind exposure. Landscapes with well-established vegetation and favorable terrain characteristics generally provide stronger erosion control services. The indicator is expressed on a 0–100 scale, where higher values indicate greater capacity of ecosystems to protect soils from erosion."
    ],
    methodology: [
      "Soil erosion risk was estimated using the Revised Universal Soil Loss Equation (RUSLE). The model incorporates rainfall erosivity, soil erodibility, topographic factors (slope length and steepness), vegetation cover, and land management practices. Vegetation cover and erosion-control practice factors were represented using proxy values derived from land cover datasets. The resulting erosion control capacity was standardized to a 0–100 index, with higher values indicating stronger erosion mitigation potential."
    ],
    video: {
      label: "Learn more about soil erosion here",
      url: "https://www.youtube.com/watch?v=BoSUEIkK_Y4"
    },
    references: [
      "Fu, B., Liu, Y. LÃ¼, Y., He, C. Zeng, Y., Wu, B., (2011). Assessing the soil erosion control service of ecosystems change in the Loess Plateau of China. Ecological Complexity (8), Issue 4, 284-293. https://doi.org/10.1016/j.ecocom.2011.07.003.",
      "Guerra, Carlos A., Maes, J. Geijzendorffer, I. Metzger, M.J. (2016). An assessment of soil erosion prevention by vegetation in Mediterranean Europe: Current trends of ecosystem service provision. Ecological Indicators (60), 213-222. https://doi.org/10.1016/j.ecolind.2015.06.043",
      "Laaich, H. et al. (2016). Soil erodibility mapping using three approaches in the Tangiers province â€“Northern Morocco. International Soil and Water Conservation Research (4), 159â€“167.",
      "Panagos, P. et al. (2015). Estimating the soil erosion cover-management factor at the European scale. Land Use Policy (48), 38â€“50.",
      "Marsoner, T., Simion, H., Giombini, V. et al. A detailed land use/land cover map for the European Alps macro region. Sci Data 10, 468 (2023). https://doi.org/10.1038/s41597-023-02344-3",
      "Marchi, M., Castellanos-Acuna, D., Hamann, A., Wang, T., Ray, D. Menzel, A. 2020. ClimateEU, scale-free climate normals, historical time series, and future projections for Europe. Scientific Data 7: 428. doi: 10.1038/s41597-020-00763-0",
      "Poggio, L., de Sousa, L. M., Batjes, N. H., Heuvelink, G. B. M., Kempen, B., Ribeiro, E., and Rossiter, D., 2021. SoilGrids 2.0: producing soil information for the globe with quantified spatial uncertainty. SOIL, 7, 217â€“240. https://doi.org/10.5194/soil-7-217-2021",
      "Fick, S.E. and R.J. Hijmans, 2017. WorldClim 2: new 1km spatial resolution climate surfaces for global land areas. International Journal of Climatology, 37(12): 4302-4315",
      "European Environment Agency, 2016. EU-DEM v1.1. Copernicus Land Monitoring Service. https://sdi.eea.europa.eu/catalogue/srv/api/records/3473589f-0854-4601-919e-2e7dd172ff50"
    ],
    mapboxLayerId: "env_soilerosion_100m-4qhu04m5"
  },
  {
    id: "pest-control",
    name: "Pest control",
    category: "ecosystem-services",
    subtitle: "Relative potential to sustain natural pest control in agricultural areas.",
    description: [
      "The Pest Control indicator represents the relative potential of agricultural landscapes to sustain natural pest regulation by beneficial organisms. Natural pest control is an important regulating ecosystem service that supports sustainable agriculture by reducing reliance on chemical pesticides and enhancing agroecosystem resilience.",
      "Semi-natural habitats such as hedgerows, woodlands, and grasslands provide refuge, breeding sites, and food resources for natural enemies of crop pests. Landscape heterogeneity and connectivity strongly influence the effectiveness of this service. The indicator reflects the capacity of landscapes to support biologically based pest regulation and is expressed on a 0–100 scale, where higher values indicate greater natural pest control potential."
    ],
    methodology: [
      "The indicator is based on a pan-European spatial model linking landscape structure to pest control potential. The model integrates the composition and abundance of semi-natural habitats, their spatial configuration, and distance from agricultural fields. Empirical field survey data quantifying habitat-specific contributions to natural enemy populations were incorporated. Agricultural areas within the study region were extracted and standardized to a 0–100 index scale."
    ],
    references: [
      "Rega, C. et al. (2018). A pan-European model of landscape potential to support natural pest control services. Ecological Indicators, 90: 653-664. doi.org/10.1016/j.ecolind.2018.03.075, https://publications.jrc.ec.europa.eu/repository/handle/JRC111488"
    ],
    mapboxLayerId: "env_pestcontrol_100m-bplrmwe4"
  },
  {
    id: "net-primary-production",
    name: "Net primary production",
    category: "ecosystem-services",
    subtitle: "Thermal growing conditions and ripening suitability",
    description: [
      "The Net Primary Production (NPP) indicator represents the amount of carbon fixed by vegetation through photosynthesis and available for plant growth. It is a fundamental measure of ecosystem productivity and reflects the capacity of ecosystems to generate biomass.",
      "Higher NPP values indicate more productive ecosystems with favorable growing conditions, contributing to carbon sequestration, biomass availability, and overall ecosystem functioning. The indicator is expressed on a standardized 0–100 scale, where higher values correspond to greater ecosystem productivity."
    ],
    methodology: [
      "Annual Net Primary Production (g C/m²/year) was derived from Gross Primary Production using a Carbon Use Efficiency factor of 0.5. The original EEA dataset (2018–2022) was averaged across the five-year period for the study area. The resulting values were standardized to a 0–100 index scale."
    ],
    references: [
      "European Environment Agency, 2023. Medium Resolution Net Primary Production [Dataset]- NPP, raster 196m version 1, Nov. 2023. European Environment Agency. Available at: https://sdi.eea.europa.eu/catalogue/srv/api/records/28d6b823-e2fd-4bf4-a6aa-cb6a359c52da?language=all (Accessed: 01/2025)(eea_r_3035_196_m_modis-npp_p_2000-2022_v01_r00)"
    ],
    mapboxLayerId: "env_netprimaryproduction_100m-cqp3l98f"
  },
  {
    id: "outdoor-recreation",
    name: "Outdoor recreation",
    category: "ecosystem-services",
    subtitle: "Relative potential of landscapes to provide accessible nature-based recreation opportunities.",
    description: [
      "The Outdoor Recreation indicator represents the relative capacity of ecosystems to provide nature-based recreational opportunities. Access to natural and semi-natural environments contributes substantially to physical health, mental well-being, and overall quality of life.",
      "Recreational attractiveness depends on multiple landscape characteristics, including naturalness, scenic diversity, terrain features, water presence, and accessibility. Areas combining ecological value with good accessibility typically offer higher recreational potential. The indicator is expressed on a 0–100 scale, where higher values indicate greater potential to support outdoor recreational activities."
    ],
    methodology: [
      "The model integrates six spatial components: degree of naturalness, presence of protected areas (e.g., Natura 2000), presence of water bodies, landscape diversity, terrain ruggedness, and density of mountain peaks. Accessibility weighting was applied to account for proximity to infrastructure and settlements. The composite indicator was standardized to a 0–100 scale."
    ],
    references: [
      "Schirpke, Uta, et al. \"Revealing spatial and temporal patterns of outdoor recreation in the European Alps and their surroundings.\" Ecosystem services 31 (2018): 336-350.",
      "EU, Copernicus Land Monitoring Service. (2019). European Environment Agency (EEA)-dataset: CORINE land cover-2018, version 2020_20u1. https://land.copernicus.eu/pan-european/corine-land-cover",
      "European Environment Agency (EEA)-dataset: Natura 2000 (vector) - version 2017, Mar. 2018. European Environment Agency. Available at https://www.eea.europa.eu/en/datahub/datahubitem-view/6fc8ad2d-195d-40f4-bdec-576e7d1268e4?activeAccordion=1091667.(eea_v_3035_100_k_natura2000_p_2022_v01_r00)",
      "European Environment Agency, 2016. EU-DEM v1.1. Copernicus Land Monitoring Service. https://sdi.eea.europa.eu/catalogue/srv/api/records/3473589f-0854-4601-919e-2e7dd172ff50",
      "OpenStreetMap contributors. Country shapefiles [Data files from 01.2020]. Retrieved from https://download.geofabrik.de (2020)"
    ],
    mapboxLayerId: "env_outdoor_recreation_100m-11ruod2g"
  },
  {
    id: "landscape-aesthetics",
    name: "Landscape aesthetics",
    category: "ecosystem-services",
    subtitle: "Relative scenic value of landscapes based on visibility and landscape composition.",
    description: [
      "The Landscape Aesthetics indicator represents the relative scenic value of landscapes. Scenic beauty influences human well-being, recreational behavior, and regional attractiveness, and is therefore an important cultural ecosystem service.",
      "Landscape aesthetics depend on both intrinsic landscape characteristics and visibility. Diverse, natural, and visually structured environments are generally perceived as more attractive. The indicator is expressed on a 0–100 scale, where higher values indicate landscapes with higher relative scenic quality."
    ],
    methodology: [
      "The indicator combines a visibility analysis and an assessment of landscape beauty. Visibility was calculated using observer points distributed across raster cells and built-up areas, including population-weighted locations. Landscape beauty was estimated using proxy values assigned to land cover types and applying focal statistics within a 500 m radius to account for the perception of surrounding landscapes. User-generated Flickr photo data were additionally considered as a proxy for perceived attractiveness. Results were standardized to a 0–100 scale."
    ],
    references: [
      "García, A. M., Santé, I., Loureiro, X. & Miranda, D. Green infrastructure spatial planning considering ecosystem services assessment and trade-off analysis. Application at landscape scale in Galicia region (NW Spain). Ecosystem Services 43, 101115 (2020).",
      "Schirpke, U. Effects of past landscape changes on aesthetic landscape values in the European Alps. Landscape and Urban Planning 13 (2021).",
      "Marsoner, T., Simion, H., Giombini, V. et al. A detailed land use/land cover map for the European Alps macro region. Sci Data 10, 468 (2023). https://doi.org/10.1038/s41597-023-02344-3",
      "European Environment Agency, 2016. EU-DEM v1.1. Copernicus Land Monitoring Service. https://sdi.eea.europa.eu/catalogue/srv/api/records/3473589f-0854-4601-919e-2e7dd172ff50",
      "Schirpke, U., Meisch, C., Marsoner, T. & Tappeiner, U. Revealing spatial and temporal patterns of outdoor recreation in the European Alps and their surroundings. Ecosystem Services 31, 336–350 (2018)."
    ],
    mapboxLayerId: "env_landscape_aesthetics_100m-b1zuidds"
  },
  {
    id: "naturalness-index",
    name: "Naturalness",
    category: "ecosystem-conditions",
    subtitle: "Degree of naturalness based on land use intensity and ecological value.",
    description: [
      "The Naturalness indicator represents the degree to which landscapes are characterized by natural or semi-natural ecosystems as opposed to intensively used or artificial land uses. Natural and semi-natural areas play a fundamental role in maintaining biodiversity, ecological processes, and ecosystem resilience.",
      "Landscapes with higher naturalness typically provide more stable habitats, support greater species diversity, and enhance regulating ecosystem services such as pest control, pollination, and climate regulation. In agricultural regions, nearby natural areas can increase ecological resilience and adaptive capacity. The indicator is expressed on a 0–100 scale, where higher values indicate landscapes with a higher degree of naturalness and ecological integrity."
    ],
    methodology: [
      "The indicator is derived from a land use/land cover classification reclassified according to a seven-level hemeroby (naturalness) scale ranging from artificial to natural ecosystems (Rüdisser et al., 2012). The original classification was reversed to ensure that higher values correspond to higher naturalness. The classification was further enhanced by integrating Natura 2000 areas and High Nature Value (HNV) farmland, each contributing an additional score. The resulting values were standardized to a 0–100 index and mapped at 100 m spatial resolution."
    ],
    references: [
      "Rüdisser, J., Tasser, E., & Tappeiner, U. (2012). Distance to nature—a new biodiversity relevant environmental indicator set at the landscape level. Ecological Indicators, 15(1), 208-216 doi.org/10.1016/j.ecolind.2011.09.027",
      "EU, Copernicus Land Monitoring Service. (2019). European Environment Agency (EEA)-dataset: CORINE land cover-2018, version 2020_20u1. https://land.copernicus.eu/pan-european/corine-land-cover",
      "European Environment Agency (EEA)-dataset: High Nature Value (HNV) farmland 2012 (100 m) accounting version, Nov. 2017. European Environment Agency. Available at https://www.eea.europa.eu/en/datahub/datahubitem-view/1bd26e8f-8ea0-45e0-b6bf-9ed2baff5d28?activeAccordion=1070000 (Accessed 11/2024) (eea_r_3035_100_m_hnv-farm-2012-acc_p_2012_v01_r00)",
      "European Environment Agency (EEA)-dataset: Natura 2000 (vector) - version 2017, Mar. 2018. European Environment Agency. Available at https://www.eea.europa.eu/en/datahub/datahubitem-view/6fc8ad2d-195d-40f4-bdec-576e7d1268e4?activeAccordion=1091667. (Accessed 11/2024) (eea_v_3035_100_k_natura2000_p_2022_v01_r00)"
    ],
    mapboxLayerId: "env_naturalness_index-4gh1u3nd"
  },
  {
    id: "distance-to-nature",
    name: "Land use integrity",
    category: "ecosystem-conditions",
    subtitle: "Degree of landscape integrity based on proximity to natural and near-natural habitats.",
    description: [
      "The Land Use Integrity indicator reflects the structural and ecological integrity of landscapes based on their proximity to natural and near-natural habitats. The spatial arrangement of ecosystems and their connectivity strongly influence biodiversity, ecological processes, and the provision of ecosystem services.",
      "Landscapes located closer to natural habitats tend to support higher species diversity, improved dispersal processes, and enhanced ecological resilience. Natural and semi-natural areas can function as refuges, stepping stones, and habitat corridors within otherwise intensively used landscapes. The indicator is expressed on a 0–100 scale, where higher values indicate higher land use integrity and closer proximity to natural habitats."
    ],
    methodology: [
      "The indicator is based on the distance-to-nature concept described by Rüdisser et al. (2012). It combines two components: (1) the degree of naturalness derived from land use classification and (2) the average distance to the nearest natural or near-natural habitat patch. Naturalness was classified using a seven-stage qualitative scale, and distances were calculated spatially for each raster cell. The combined index was transformed so that higher values represent higher landscape integrity (i.e., shorter distance to natural habitats). Results were standardized to a 0–100 scale and mapped at 100 m resolution."
    ],
    references: [
      "Rüdisser, J., Tasser, E., & Tappeiner, U. (2012). Distance to nature—a new biodiversity relevant environmental indicator set at the landscape level. Ecological Indicators, 15(1), 208-216 doi.org/10.1016/j.ecolind.2011.09.027",
      "EU, Copernicus Land Monitoring Service. (2019). European Environment Agency (EEA)-dataset: CORINE land cover-2018, version 2020_20u1. https://land.copernicus.eu/pan-european/corine-land-cover"
    ],
    mapboxLayerId: "env_distance_to_nature-4pdad6jf"
  },
  {
    id: "landuse-diversity",
    name: "Land use diversity",
    category: "ecosystem-conditions",
    subtitle: "Landscape heterogeneity based on the diversity and distribution of land cover types.",
    description: [
      "The Land Use Diversity indicator represents the heterogeneity of landscapes in terms of the variety and relative distribution of land use and land cover classes. Landscape heterogeneity is widely recognized as an important factor supporting biodiversity, ecological stability, and multifunctionality.",
      "More diverse landscapes often provide a broader range of habitats and ecological niches, enhancing ecosystem functioning and resilience. Heterogeneous landscapes are also better able to support multiple ecosystem services simultaneously. The indicator is expressed on a 0–100 scale, where higher values indicate greater landscape complexity and diversity."
    ],
    methodology: [
      "Land use diversity was calculated at 100 m resolution using a diversity index that accounts for both richness (number of land use classes) and relative abundance (area coverage). Simpson-based diversity calculations were applied within a defined spatial unit (1 ha), using the proportion of each land use type relative to the total area. The resulting diversity values were standardized to a 0–100 index scale."
    ],
    references: [
      "Comer D., Greene, S. (2015). The development and application of a land use diversity index for Oklahoma City, OK. Applied Geography, 60, 46-57 doi.org/10.1016/j.apgeog.2015.02.015",
      "EU, Copernicus Land Monitoring Service. (2019). European Environment Agency (EEA)-dataset: CORINE land cover-2018, version 2020_20u1. https://land.copernicus.eu/pan-european/corine-land-cover"
    ],
    mapboxLayerId: "env_landuse_diversity_index-35je19qp"
  },
  {
    id: "climatic-waterbalance",
    name: "Climate water balance",
    category: "ecosystem-conditions",
    subtitle: "Water availability from precipitation after accounting for evapotranspiration.",
    description: [
      "The Climate Water Balance indicator represents the amount of water available from precipitation after accounting for evapotranspiration. Water availability is a key determinant of ecosystem productivity, vegetation health, and agricultural suitability, particularly under changing climatic conditions.",
      "Regions with higher positive water balance are generally less exposed to drought stress and may require less artificial irrigation. Adequate water availability enhances ecosystem resilience and supports long-term sustainability of land use systems. The indicator is expressed on a 0–100 scale, where higher values indicate greater climatic water availability."
    ],
    methodology: [
      "The indicator is based on the Climate Moisture Index (CMI) derived from the CHELSA climate database. The CMI represents the difference between precipitation and potential evapotranspiration (mm). Average monthly CMI values for the period 1981–2010 were aggregated to calculate mean annual climate water balance. The resulting values were standardized to a 0–100 index scale, with higher values indicating greater water availability."
    ],
    references: [
      "Tscholl, S et al. (2024). Climate resilient winegrowing regions. Nature communications 15 (6254). doi.org/10.1038/s41467-024-50549-w",
      "Karger, D. N., Schmatz, D. R., Dettling, G. & Zimmermann, N. E. High-resolution monthly precipitation and temperature time series from 2006 to 2100. Sci Data 7, 248 (2020).",
      "Karger, D. N. et al. Climatologies at high resolution for the earth's land surface areas. Sci Data 4, 170122 (2017)."
    ],
    mapboxLayerId: "env_climatic_waterbalance_1me376vw"
  },


  {
    id: "huglin",
    name: "Huglin Index",
    category: "climate",
    subtitle: "Thermal growing conditions and ripening suitability.",
    description: [
      "The Huglin Index (HI) is a bioclimatic indicator that describes the thermal growing conditions throughout the vegetation period in a wine region. It is primarily linked to vine phenology and development and plays a critical role in determining viticultural suitability."
    ],
    contentBlocks: [
      {
        type: "imageComparison",
        beforeImage: "/images/indicators/huglin_1981_2010.png",
        afterImage: "/images/indicators/huglin_2071_2100.png",
        beforeLabel: "1981-2010",
        afterLabel: "2071-2100",
        alt: "Huglin Index Comparison",
        aspectRatio: "auto",
        caption: "Figure 1: Comparison of Huglin Index between historical (1981-2010) and projected (2071-2100) climate scenarios showing increased thermal suitability across European wine regions."
      }
    ],
    methodology: [
      "The Huglin Index is calculated over a 6-month period (typically 1 April to 30 September in the Northern Hemisphere) using the following formula:",
      "HI = ((T - 10) + (Tmax - 10)) / 2 * d.",
      "T = mean air temperature (deg C).",
      "Tmax = maximum air temperature (deg C).",
      "d = day-length coefficient (1.00 to 1.06 depending on latitude).",
      " ",
      "The HI categorises climatic conditions into classes ranging from very cool to very warm, indicating different suitability levels for grape varieties and ripening:",
      "- 1200-1500 GDD (Very cool) - Only very early-ripening varieties are likely to reach maturity.",
      "- 1500-1800 GDD (Cool) - Supports many early-ripening white and red varieties.",
      "- 1800-2100 GDD (Temperate) - Later-ripening varieties such as Syrah can also mature.",
      "- 2100-2400 GDD (Warm temperate) - Late-ripening and predominantly red varieties can reach full potential.",
      "- 2400-2700 GDD (Warm) - Thermal potential exceeds needs for many varieties, with possible heat stress.",
      "- 2700-3000 GDD (Very warm) - Typical of intertropical climates with very high heat availability.",
    ],
    references: [
    ],
  },
  {
    id: "cool-night",
    name: "Cool Night Index",
    category: "climate",
    subtitle: "Night-time temperature during ripening.",
    description: [
      "The Cool Night Index (CNI) describes the minimum temperatures during the ripening phase of grapes. It is useful for evaluating sensory qualities such as aroma and polyphenol development."
    ],
    contentBlocks: [
      {
        type: "imageComparison",
        beforeImage: "/images/indicators/cni_1981_2010.png",
        afterImage: "/images/indicators/cni_2071_2100.png",
        beforeLabel: "1981-2010",
        afterLabel: "2071-2100",
        alt: "Cool Night Index Comparison",
        aspectRatio: "auto",
        caption: "Figure 2: Comparison of Cool Night Index between historical (1981-2010) and projected (2071-2100) climate scenarios indicating shifts towards warmer night temperatures during grape ripening in many wine regions."
      }
    ],
    methodology: [
      "The CNI is calculated as the average minimum temperature in September (Northern Hemisphere) or March (Southern Hemisphere), using daily minimum temperature data.",
      "The CNI categorises climatic conditions into the following classes:",
      "- Below 12 C (Very cool) - Very low night temperatures can be favorable for wine quality if thermal potential during the day is still sufficient for ripening.",
      "- 12-14 C (Cool) - Warmer nights but still cool enough to have positive effects on grape colour and aroma.",
      "- 14-18 C (Temperate) - Conditions become too warm for some early-ripening varieties.",
      "- Above 18 C (Warm) - Higher risk of aroma loss and reduced color development for many varieties.",
    ],
    references: [
    ],
  },
  {
    id: "dryness-index",
    name: "Dryness Index",
    category: "climate",
    subtitle: "Soil water balance and drought pressure.",
    description: [
      "The Dryness Index (DI) evaluates water availability for grapevines by combining precipitation, evapotranspiration, and soil water reserve assumptions. It helps characterise drought pressure and corresponding adaptation needs."
    ],
    contentBlocks: [
      {
        type: "imageComparison",
        beforeImage: "/images/indicators/di_1981_2010.png",
        afterImage: "/images/indicators/di_2071_2100.png",
        beforeLabel: "1981-2010",
        afterLabel: "2071-2100",
        alt: "Dryness Index Comparison",
        aspectRatio: "auto",
        caption: "Figure 3: Comparison of Dryness Index between historical (1981-2010) and projected (2071-2100) climate scenarios showing increased dryness in many traditional wine regions, highlighting the growing importance of water management and irrigation strategies."
      }
    ],
    methodology: [
      "The Dryness Index (DI) is computed over a 6-month period and follows a water balance equation:",
      "W = W0 + P - Tv - Es.",
      "W = soil water reserve at the end of the period.",
      "W0 = initial useful soil water reserve (often 200 mm).",
      "P = precipitation.",
      "Tv = potential vineyard transpiration.",
      "Es = direct evaporation from soil.",
      "The DI categorises climatic conditions into the following classes:",
      "- Above 150 mm (Humid) - High water availability, sometimes beyond optimum for quality.",
      "- 50-150 mm (Subhumid) - Low drought risk in general; but some varieties need drier conditions to produce optimum quality.",
      "- -100 to 50 mm (Moderately dry) - Some dryness may occur, which can support quality through controlled stress.",
      "- Below -100 mm (Very dry) - High drought stress risk, often requiring irrigation.",
    ],
    references: [
    ],
  },


  {
    id: "exposure-index",
    name: "Exposure",
    category: "vulnerability",
    subtitle: "The amount of climate change a system experiences.",
    description: [
      "Exposure refers to the extent and type of significant climate changes or events that a system experiences. As such, it describes the expected changes in climatic conditions in a particular area. This can include various aspects of weather and climate, from long-term shifts in average temperatures and rainfall to the occurrence of specific weather events. The level of exposure an area faces depends both on wider global climate change patterns and its specific geographical location. It focuses on the general trends and magnitude of these climatic shifts.",
      "For European wine regions, higher levels of climate exposure are frequently observed in Southern and Eastern European areas, particularly in mountainous terrains. This indicates that these regions are expected to experience more significant climatic changes. Conversely, regions influenced by strong oceanic climates or located at higher latitudes generally experience lower levels of exposure.",
    ],
    contentBlocks: [
      {
        type: "image",
        src: "/images/vulnerability/1_Exposure_bioclim.png",
        alt: "Climate Change Exposure of European Wine Regions",
        caption: "Climate Change Exposure of European Wine Regions",
        wrapperClassName: "w-full max-w-2xl mx-auto px-4 mt-6",
      }
    ],
    methodology: [
    ],
    references: [
    ],
  },
  {
    id: "sensitivity-index",
    name: "Sensitivity",
    category: "vulnerability",
    subtitle: "The degree to which a system is impacted by climate change.",
    description: [
      "Sensitivity is defined as the degree to which a system is influenced or affected by climate-related changes, whether positively or negatively. This impact can be direct, such as changes in the growth of certain plants due to temperature shifts, or indirect, like the damage caused by increased flooding. Not every part of a system will be affected in the same way by every climate stimulus. Essentially, it highlights how a system's unique characteristics determine its reaction to different climatic conditions.",
      "Many Southern European wine regions often show higher sensitivity to climate changes. This is frequently linked to a limited range of grape varieties or existing warm conditions that are already close to the optimal growing limits of cultivated varieties. However, areas with lower sensitivity can also be found in Southern Europe and some higher latitude regions exhibit increased sensitivity.",
    ],
    contentBlocks: [
      {
        type: "image",
        src: "/images/vulnerability/2_Sensitivity_bioclim.png",
        alt: "Climate Change Sensitivity of European Wine Regions",
        caption: "Climate Change Sensitivity of European Wine Regions",
        wrapperClassName: "w-full max-w-2xl mx-auto px-4 mt-6",
      }
    ],
    methodology: [
    ],
    references: [
    ],
  },
  {
    id: "adaptive-capacity-index",
    name: "Adaptive Capacity",
    category: "vulnerability",
    subtitle: "The ability of a system to adapt to climate change.",
    description: [
      "Adaptive capacity is the ability of a system to adjust to climate change, to reduce potential harm, take advantage of new opportunities, or manage the consequences. It shows a region's readiness and potential to successfully respond to a changing climate. This capacity is essential for developing and putting into practice effective strategies to deal with climate change. It may include a wide range of a region's resources and strengths, such as its financial stability, natural resources, physical infrastructure, social networks, and human knowledge and skills, all of which contribute to its ability to respond to climate impacts.",
      "European wine regions with elevated adaptive capacity are typically found in mountainous regions, particularly in the central-southern European alpine areas. This suggests these regions have a greater potential and readiness to adjust to climate change. In contrast, parts of central Southern Europe and Eastern Europe tend to have lower adaptive capacity. Many regions at higher latitudes generally fall into a moderate adaptive capacity range.",
    ],
    contentBlocks: [
      {
        type: "image",
        src: "/images/vulnerability/3_adaptive_capacity_bioclim.png",
        alt: "Adaptive Capacity to Climate Change of European Wine Regions",
        caption: "Adaptive Capacity to Climate Change of European Wine Regions",
        wrapperClassName: "w-full max-w-2xl mx-auto px-4 mt-6",
      }
    ],
    methodology: [
    ],
    references: [
    ],
  },
  {
    id: "vulnerability",
    name: "Vulnerability",
    category: "vulnerability",
    subtitle: "The susceptibility of a system to the negative effects of climate change.",
    description: [
      "Vulnerability describes how susceptible a system, such as a community, an environment, or an economy, is to the negative effects of climate change, including extreme weather and changing climate patterns. It provides an overall understanding of the expected level of negative effects on a system due to external pressures. When assessing vulnerability, experts consider how much a system is exposed to climate changes, how sensitive it is to those changes, and its ability to adapt. Vulnerability thus brings together the concepts of exposure, sensitivity, and adaptive capacity.",
      "Southern and Eastern European wine regions tend to show the highest vulnerability to climate change. This means these areas are considered most susceptible to negative climate impacts. Regions situated in cooler, higher latitude zones or certain mountainous areas often demonstrate lower to moderate levels of vulnerability.",
    ],
    contentBlocks: [
      {
        type: "image",
        src: "/images/vulnerability/4_vulnerability_bioclim.png",
        alt: "Climate Change Vulnerability of European Wine Regions",
        caption: "Climate Change Vulnerability of European Wine Regions",
        wrapperClassName: "w-full max-w-2xl mx-auto px-4 mt-6",
      }
    ],
    methodology: [
    ],
    references: [
    ],
  }
];

export const getIndicatorsByCategory = (category: string) =>
  Indicators.filter(indicator => indicator.category === category);

export const getIndicatorsWithMap = () =>
  Indicators.filter(indicator => indicator.mapboxLayerId);

export const getIndicatorsWithMapByCategory = (category: string) =>
  Indicators.filter(
    indicator => indicator.category === category && indicator.mapboxLayerId
  );

export const getIndicatorById = (id: string) =>
  Indicators.find(indicator => indicator.id === id);


