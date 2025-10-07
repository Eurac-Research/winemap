import Link from "next/link";

export default function ClimateIndicatorsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header Navigation
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <Link
            href="/"
            className="text-white hover:text-gray-300 transition-colors flex items-center gap-2 text-lg font-semibold"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            WINEMAP
          </Link>
        </div>
      </header> */}

      <div className="container mx-auto px-6 py-32 max-w-5xl">
        {/* Page Content */}
        <article className="prose prose-invert prose-lg max-w-none">
          <h1 className="text-4xl font-bold mb-8">Climate indicators and scenarios</h1>

          <p className="text-lg leading-relaxed mb-6">
            Wine production and its quality are highly sensitive to local weather variability and broader climatic conditions. Indeed, climate is often considered the most important factor influencing viticultural productivity and quality, largely determining which grape varieties can be grown and the distinctive wines that can be produced in a specific region, contributing significantly to its 'Terroir'. The global distribution of high-quality viticulture is therefore strongly influenced by specific climatic conditions.
          </p>

          <p className="text-lg leading-relaxed mb-6">
            Given this strong dependence, climate change poses a severe threat to the global wine industry, already causing shifts in suitability and altering product quality in many regions. To address this challenge, bioclimatic indicators serve as indispensable instruments. These tools are designed to evaluate shifts in climatic conditions and growing suitability over time, providing essential information on present-day and future climatic conditions for wine-growing regions.
          </p>

          <h2 className="text-3xl font-semibold mt-12 mb-6">Why are these indicators used?</h2>

          <p className="text-lg leading-relaxed mb-6">
            Bioclimatic indices are employed to describe various attributes of wine production, including aspects of vine development, grape ripening, and water availability for the plants. They range from simple measures, such as mean temperature over the vegetation period, to more complex methods incorporating latitudinal temperature adjustments and specific temperature thresholds. These indices, for example, allow characterisation of the water availability in the soil or night temperatures during the crucial ripening phase, which are important for the development of sensory characteristics like polyphenols and aromas in grapes.
          </p>

          <p className="text-lg leading-relaxed mb-6">
            By understanding the identified changes in these bioclimatic indices under future climate scenarios, it becomes possible to determine the necessity for certain adaptation strategies, which can help to improve the climate resilience of wine regions. They provide a uniform climatic description of different grape-growing regions, enabling comparisons and a broader understanding of global viticultural climates. Ultimately, these indicators help viticulturists and policymakers make informed decisions regarding planting choices and management practices to foster climate-resilient wine production.
          </p>

          {/* Box 1: Huglin Index */}
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-8 my-12">
            <h3 className="text-2xl font-semibold mb-6">Box 1: Huglin Index</h3>

            <h4 className="text-xl font-medium mb-4">General Introduction</h4>
            <p className="mb-6">
              The Huglin Index (HI) is a bioclimatic indicator that describes the thermal growing conditions throughout the vegetation period in a wine region. It is primarily linked to vine phenology and development. The HI assesses the temperatures required for adequate grapevine development and grape berry ripening. It plays a critical role in determining viticultural suitability and also demonstrates a good relationship with the potential sugar content of grapes.
            </p>

            <h4 className="text-xl font-medium mb-4">Interpretation</h4>
            <p className="mb-4">
              The HI categorises climatic conditions into several classes, ranging from 'very cool' to 'too hot', each indicating different suitability levels for grape varieties and their ripening.
            </p>

            <ul className="space-y-4 mb-6">
              <li>
                <strong>1200–1500 GDD (Very cool):</strong> These regions are at the inferior thermal limit for vines. Only very early-ripening varieties, especially white ones like Muller-Thurgau, Pinot blanc, Gamay, or Gewurztraminer, can reach maturity. Certain regions may need to use interspecific hybrids or American Vitis varieties, which are more cold-resistant than Vitis vinifera.
              </li>
              <li>
                <strong>1500–1800 GDD (Cool):</strong> The thermal potential in this class allows a wide range of early-ripening grape varieties, both white and red, to ripen. Examples include Riesling, Pinot noir, Chardonnay, Merlot, and Cabernet franc.
              </li>
              <li>
                <strong>1800–2100 GDD (Temperate):</strong> In these conditions, later-ripening varieties, such as Cabernet-Sauvignon, Ugni Blanc, and Syrah, can also reach maturity.
              </li>
              <li>
                <strong>2100–2400 GDD (Warm temperate):</strong> In the warm temperate class, late-ripening and predominantly red varieties such as Grenache, Mourvèdre or Carignan can reach their full potential.
              </li>
              <li>
                <strong>2400–2700 GDD (Warm):</strong> Climates in this class are characterised by a thermal potential that exceeds the needs for most varieties, even late-ripening ones, with some associated risks of thermal stress.
              </li>
              <li>
                <strong>2700–3000 GDD (Very warm):</strong> Under very warm viticultural climates, conditions are typical of intertropical zones, where it may even be possible to achieve more than one harvest per year using specialized grape varieties.
              </li>
            </ul>

            <h4 className="text-xl font-medium mb-4">Methodology</h4>
            <p className="mb-4">
              The Huglin Index is calculated for a 6-month period, typically from 1 April to 30 September in the Northern Hemisphere, or 1 October to 31 March in the Southern Hemisphere.
            </p>
            <p className="mb-4">
              The formula for the Huglin Index (HI) is:
            </p>
            <p className="font-mono bg-black p-4 rounded mb-4">
              HI = Σ ( (T − 10) + (T<sub>max</sub> − 10) ) / 2 * d
            </p>
            <p className="mb-2">Where:</p>
            <ul className="space-y-2 mb-4">
              <li><strong>T</strong> = Mean air temperature (°C).</li>
              <li><strong>T<sub>max</sub></strong> = Maximum air temperature (°C).</li>
              <li><strong>d</strong> = Length of day coefficient, which adjusts for latitudinal variations in day length during the growing season. This coefficient ranges from 1.00 to 1.06 depending on the latitude.</li>
            </ul>
            <p>
              The index is typically calculated from monthly climatic means. The input data for HI consists of daily mean and maximum temperature data.
            </p>
          </div>

          {/* Box 2: Cool Night Index */}
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-8 my-12">
            <h3 className="text-2xl font-semibold mb-6">Box 2: Cool Night Index</h3>

            <h4 className="text-xl font-medium mb-4">General Introduction</h4>
            <p className="mb-6">
              The Cool Night Index (CNI) is a bioclimatic indicator that specifically describes the minimum temperature during the ripening phase of grapes. This index is crucial for understanding the development of the sensory characteristics of grapes, such as polyphenols and aromas. The CNI's purpose is to assess the qualitative potentials of wine-growing regions, particularly concerning the secondary metabolites in grapes, which significantly influence grape and wine colour and aromas.
            </p>

            <h4 className="text-xl font-medium mb-4">Interpretation</h4>
            <p className="mb-4">
              The CNI classifies night temperatures during ripening, each class having distinct implications for grape quality and wine style.
            </p>

            <ul className="space-y-4 mb-6">
              <li>
                <strong>Less than 12°C (Very cool):</strong> Regions in this class experience very low night temperatures during ripening. The positive effect of these temperatures largely depends on a sufficiently high thermal potential to ensure good grape ripening for the specific variety. Many regions renowned for high-quality white wines fall into this category.
              </li>
              <li>
                <strong>12–14°C (Cool):</strong> Ripening occurs under conditions that are cooler than temperate nights. Night temperatures tend to not exceed maximum values favourable for ripening, which is generally beneficial for grape colours and aromas.
              </li>
              <li>
                <strong>14–18°C (Temperate):</strong> This class represents an intermediate condition between cool and warm nights. While later-ripening varieties will still tend to mature under lower night temperatures, early-ripening varieties might experience comparatively warm ripening conditions.
              </li>
              <li>
                <strong>Greater than 18°C (Warm):</strong> In these regions, high nocturnal temperatures occur during grape ripening. Such conditions can negatively impact berry colour and aromatic potential. There is also a tendency for loss of aromas, and red varieties may develop a relatively lighter colour.
              </li>
            </ul>

            <h4 className="text-xl font-medium mb-4">Methodology</h4>
            <p>
              The Cool Night Index (CNI) is calculated by averaging the minimum temperature during the month of September for the Northern Hemisphere or during March for the Southern Hemisphere. The input data required for the CNI calculation are daily minimum temperature data.
            </p>
          </div>

          {/* Box 3: Dryness Index */}
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-8 my-12">
            <h3 className="text-2xl font-semibold mb-6">Box 3: Dryness Index</h3>

            <h4 className="text-xl font-medium mb-4">General Introduction</h4>
            <p className="mb-6">
              The Dryness Index (DI) is a bioclimatic indicator that describes the water availability for grapevines. It evaluates the soil water availability essential for vine development by estimating soil water reserves, precipitation, and potential evapotranspiration. The DI is related to vine growth and berry development and is based on an adaptation of Riou's potential water balance of the soil index, specifically developed for vineyard use. This index allows for the characterisation of the water component of the climate in a grape-growing region, indicating the potential water availability in the soil in relation to the level of dryness. It is also considered important for grape ripening and overall wine quality.
            </p>

            <h4 className="text-xl font-medium mb-4">Interpretation</h4>
            <p className="mb-4">
              The DI classifies regions based on their water availability, broadly categorising them into wet and dry climates.
            </p>

            <ul className="space-y-4 mb-6">
              <li>
                <strong>Greater than 150 mm (Humid):</strong> This class indicates regions with a high level of water availability, often tending towards excess in relation to quality. Optimal grape ripening is frequently observed in less humid years within these regions.
              </li>
              <li>
                <strong>50–150 mm (Subhumid):</strong> Regions falling into the subhumid class are typically characterised by a level of water balance which minimizes the risk of water stress and dryness. However, for some vines a certain level of dryness is beneficial for quality and therefore optimum wine quality is often found in regions with lower water availability levels.
              </li>
              <li>
                <strong>-100 to 50 mm (Moderately dry):</strong> In this group, vines may experience a certain level of dryness. This situation, often involving significant stomatal regulation of the plant, is generally favourable for maturation and may lead to high-quality wines. Irrigation may be practised in some cases. Mediterranean-type climates, which often experience water deficits in summer, typically start to appear around a DI value of less than 50 mm.
              </li>
              <li>
                <strong>Less than -100 mm (Very dry):</strong> Potential dryness is pronounced in these regions, frequently leading to stress effects on vines. Irrigation is common and often mandatory when the DI falls below -200 mm, due to a high deficit of available soil water and a frequent risk of severe stress if not adequately irrigated.
              </li>
            </ul>

            <h4 className="text-xl font-medium mb-4">Methodology</h4>
            <p className="mb-4">
              The Dryness Index (DI) is calculated based on a 6-month period, consistent with the Huglin Index, from 1 April to 30 September in the Northern Hemisphere.
            </p>
            <p className="mb-4">
              The formula for calculating the DI is:
            </p>
            <p className="font-mono bg-black p-4 rounded mb-4">
              W = W<sub>o</sub> + P − T<sub>v</sub> − E<sub>s</sub>
            </p>
            <p className="mb-2">Where:</p>
            <ul className="space-y-2 mb-4">
              <li><strong>W</strong> = The estimated soil water reserve at the end of a given period. The DI itself is the value of W obtained at the final moment of the 6-month calculation period.</li>
              <li><strong>W<sub>o</sub></strong> = The initial useful soil water reserve, which can be accessed by the roots. This is typically set at 200 mm.</li>
              <li><strong>P</strong> = Precipitation (mm).</li>
              <li><strong>T<sub>v</sub></strong> = Potential vineyard transpiration (mm). This is calculated as Potential Evapotranspiration (ETP) multiplied by 'k', a coefficient of radiation absorption by the vine plant, which varies by month (e.g., 0.1 for April, 0.3 for May, and 0.5 for June-September in the Northern Hemisphere). ETP can be calculated using different methods, for instance the Thornthwaite approach.</li>
              <li><strong>E<sub>s</sub></strong> = Direct evaporation from the soil (mm). This is calculated using ETP, 'k', the number of days in the month (N), and rainfall per month (JPm).</li>
            </ul>
            <p>
              The input data for DI include the initial soil water content, precipitation, and potential evapotranspiration.
            </p>
          </div>

          {/* Back to top link */}
          <div className="mt-16 pt-8 border-t border-gray-700">
            <Link
              href="/"
              className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-2"
            >
              ← Back to WINEMAP
            </Link>
          </div>
        </article>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-20 py-8">
        <div className="container mx-auto px-6 text-center text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} Eurac Research{" "}
            <Link href="/imprint-privacy" className="underline hover:text-gray-400">
              Imprint / Privacy
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
