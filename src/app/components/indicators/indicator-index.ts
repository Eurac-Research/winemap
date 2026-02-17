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


