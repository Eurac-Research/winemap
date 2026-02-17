export type EcosystemServiceIndicator = {
  id: string;
  name: string;
  category: string;
  subtitle?: string;
  description: string[];
  methodology?: string[];
  references?: string[];
  video?: {
    label: string;
    url: string;
  };
  mapboxLayerId?: string;
};

export const ecosystemServiceIndicators: EcosystemServiceIndicator[] = [
  {
    id: "pollination",
    name: "Pollination",
    category: "Ecosystem Services",
    subtitle: "Thermal growing conditions and ripening suitability",
    description: [
      "The indicator describes the relative capacity of ecosystems to support insect pollination (index). Crop pollination by wild insects is a key regulating ecosystem service with high economic implications. In fact, the productivity of many agricultural crops depends on the presence of pollinating insects and the ecosystems that support insect populations (Zulian et al., 2013).",
      "The relative capacity of ecosystems to support insect pollination (index). Crop pollination by wild insects is a key regulating ecosystem service with high economic implications. The productivity of many agricultural crops depends on the presence of pollinating insects and the ecosystems that support insect populations (Zulian et al., 2013). The methodology used to map the pollination indicator focuses on wild bees as key animal pollinators. The indicator assumes that different habitats offer varying floral resources and nesting opportunities. The indicator also accounts for climatic variation in temperature and solar irradiance by calculating an annually averaged activity coefficient representing the pollination activity. In addition, given that pollination services decrease by increasing the distance from natural and semi-natural areas, a distance decay function is applied. The indicator values were mapped on a 0-100 scale, with higher values indicating a higher potential capacity to support insect pollination."
    ],
    methodology: [
      "The methodology used to map the pollination indicator focuses on wild bees as key animal pollinators. The indicator assumes that different habitats offer varying floral resources and nesting opportunities. The indicator also accounts for climatic variation in temperature and solar irradiance by calculating an annually averaged activity coefficient representing the pollination activity. In addition, given that pollination services decrease by increasing the distance from natural and semi-natural areas, a distance decay function is applied. The indicator values were mapped on a 0-100 scale, with higher values indicating a higher potential capacity to support insect pollination."
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
    category: "Ecosystem Services",
    subtitle: "Thermal growing conditions and ripening suitability",
    description: [
      "The indicator describes the prevention of soil erosion. Soil erosion is a widespread issue in natural and managed ecosystems, with several implications for environmental quality (soil deterioration) and social economy (decline in soil productivity). By protecting soil from wind and water processes, terrestrial ecosystems control soil erosion rates, therefore providing a fundamental ecosystem service that ensures human wellbeing.",
      "The prevention of soil erosion (index). Soil erosion is a widespread issue in natural and managed ecosystems, with several implications for environmental quality (soil deterioration) and social economy (decline in soil productivity). By protecting soil from wind and water processes, terrestrial ecosystems control soil erosion rates, therefore providing a fundamental ecosystem service that ensures human wellbeing. Using the Revised Universal Soil Loss Equation, the soil erosion rates are calculated based on rainfall erosivity, soil erodibility, topography and soil retention, which is determined by vegetation cover. For the vegetation cover factor and erosion control practice factors, proxy values where used. The indicator values range on a 0-100 scale, with higher values indicating higher control of soil erosion.",
    ],
    video: {
      label: "Learn more about soil erosion here",
      url: "https://www.youtube.com/watch?v=BoSUEIkK_Y4"
    },
    methodology: [
      "Using the Revised Universal Soil Loss Equation, the soil erosion rates are calculated based on rainfall erosivity, soil erodibility, topography and soil retention, which is determined by vegetation cover. For the vegetation cover factor and erosion control practice factors, proxy values where used. The indicator values range on a 0-100 scale, with higher values indicating higher control of soil erosion."
    ],
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
      category: "Ecosystem Services",
      description: [
        "The relative potential to sustain natural pest control in agricultural areas (index). Pest control by natural enemies (natural pest control) is an important regulating ecosystem service with significant implications for the sustainability of agroecosystems. The presence of semi-natural habitats and landscape heterogeneity are key determinants of the delivery of this service and for the long-term sustainability of agroecosystems (Rega et al., 2018). The indicator model considers landscape composition in terms of semi-natural habitat types, abundance, spatial configuration and distance from the focal field. It combines recent high-resolution geospatial layers with empirical results from extensive field surveys measuring the specific contribution of different semi-natural habitats to support flying insects and enemies providing natural pest control (Rega et al., 2018). The original dataset from Rega et al. (2018) has been extracted for the agricultural areas within the study area. The indicator values are scaled on a 0-100 scale, with higher values indicating higher natural pest control potential.",
      ],
      references: [
        "Rega, C. et al. (2018). A pan-European model of landscape potential to support natural pest control services. Ecological Indicators, 90: 653-664. doi.org/10.1016/j.ecolind.2018.03.075, https://publications.jrc.ec.europa.eu/repository/handle/JRC111488"
      ],
      mapboxLayerId: "env_pestcontrol_100m-bplrmwe4"
    },
    {
      id: "net-primary-production",
      name: "Net primary production (index)",
      category: "Ecosystem Services",
      description: [
        "Total amount of carbon dioxide used for plant growth per unit time (index). The Net Primary Production (NPP) dataset quantifies the total amount of carbon dioxide used for plant growth per unit time (index). The yearly NPP (g C/m²/year) is calculated from yearly Gross Primary Production multiplied with a Carbon Use Efficiency factor of 0.5. The original datasets (EEA, 2023) for the years 2018-2022 were averaged to get the average NPP value for the study areas and then standardized on a 0-100 range.",
      ],
      references: [
        "European Environment Agency, 2023. Medium Resolution Net Primary Production [Dataset]- NPP, raster 196m version 1, Nov. 2023. European Environment Agency. Available at: https://sdi.eea.europa.eu/catalogue/srv/api/records/28d6b823-e2fd-4bf4-a6aa-cb6a359c52da?language=all (Accessed: 01/2025)(eea_r_3035_196_m_modis-npp_p_2000-2022_v01_r00)"
      ],
      mapboxLayerId: "env_netprimaryproduction_100m-cqp3l98f"
    },
    {
      id: "outdoor-recreation",
      name: "Outdoor recreation (index)",
      category: "Ecosystem Services",
      description: [
        "The relative capacity of ecosystems to support nature-based recreation opportunities (index). Outdoor recreation in natural and semi-natural environments plays a crucial role for physical and mental health and contributes substantially to human well-being. The outdoor recreation potential of different ecosystems is modelled based on the following six landscape factors: naturalness, presence of protected areas (Natura2000), presence of water, landscape diversity, terrain ruggedness, density of mountain peaks, and is weighted by the degree of accessibility of a specific area (Schirpke et al., 2018). The indicator values range on a 0-100 scale, with higher values indicating higher outdoor recreation potential.",
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
      name: "Landscape aesthetics (index)",
      category: "Ecosystem Services",
      description: [
        "The relative aesthetic value of a landscape (index). The scenic beauty of landscapes is highly appreciated for enjoying nature and carrying out recreational activities. The aesthetic value of a landscape is therefore an important aspect contributing to human well-being (Schirpke et al., 2021). The landscape aesthetic indicator is modelled considering two factors: the visibility and the objective aesthetic beauty of the visible landscape. For the landscape visibility, two separate visibility analysis are performed: 1) using one observer point of each 250m raster cell and 2) using one observer point for each built-up area as well as one observer point for every 250 people living in the area. Additionally, photo user day Flickr photo points were considered. The landscape aesthetic beauty is modelled using proxy values for landcover types, and by applying focal statistic with a 500m radius, since landscape is always perceived as a location with its surroundings. The indicator values range on a 0-100 scale, with higher values indicating higher landscape beauty.",
      ],
      references: [
        "García, A. M., Santé, I., Loureiro, X. & Miranda, D. Green infrastructure spatial planning considering ecosystem services assessment and trade-off analysis. Application at landscape scale in Galicia region (NW Spain). Ecosystem Services 43, 101115 (2020).",
        "Schirpke, U. Effects of past landscape changes on aesthetic landscape values in the European Alps. Landscape and Urban Planning 13 (2021).",
        "Marsoner, T., Simion, H., Giombini, V. et al. A detailed land use/land cover map for the European Alps macro region. Sci Data 10, 468 (2023). https://doi.org/10.1038/s41597-023-02344-3",
        "European Environment Agency, 2016. EU-DEM v1.1. Copernicus Land Monitoring Service. https://sdi.eea.europa.eu/catalogue/srv/api/records/3473589f-0854-4601-919e-2e7dd172ff50",
        "Schirpke, U., Meisch, C., Marsoner, T. & Tappeiner, U. Revealing spatial and temporal patterns of outdoor recreation in the European Alps and their surroundings. Ecosystem Services 31, 336–350 (2018)."
      ],
      mapboxLayerId: "env_landscape_aesthetics_100m-b1zuidds"
    }
];
