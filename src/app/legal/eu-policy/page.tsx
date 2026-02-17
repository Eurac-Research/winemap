import Image from "next/image";
import Link from "next/link";

import styles from "@/styles/Home.module.css";
import DatawrapperChart from "@/app/components/DatawrapperChart";

export default function ClimateIndicatorsPage() {
  return (
    <div className="min-h-screen bg-black text-white">

      <div className="container mx-auto px-6 py-32 max-w-5xl">
        {/* Page Content */}
        <article className="prose prose-invert prose-lg max-w-none">
          <h1 className="text-4xl font-bold mb-8">Geographic Indications</h1>

          <p className="text-lg leading-relaxed mb-6">
            Europe is home to some of the world’s most prestigious wine regions.
            In order to maintain the integrity and quality of these wines, the
            European Union has established a quality scheme called Protected
            Designation of Origin (PDO). This system sets rules and regulations
            for the production, labelling, and promotion of wines within specific
            regions of Europe. This classification ensures that wines produced
            within those regions follow strict standards of quality and tradition,
            protecting the reputation and authenticity of each wine. The PDO
            designation is granted by the EU, and only wines that are produced
            within a certain region and meet specific production criteria are
            allowed to carry the PDO label.
          </p>
          <p className="text-lg leading-relaxed mb-6">
            The PDO system is extensive and complex, covering thousands of wine
            types from various regions in Europe. Until recently, wine enthusiasts
            and industry professionals had to consult various sources to
            understand these classifications.
          </p>
          <p className="text-lg leading-relaxed mb-6">
            Now, Eurac Research has produced the first-ever comprehensive{" "}
            <Link href="/" style={{ textDecoration: "underline" }}>
              map of Europe’s wine regions classified under the PDO system
            </Link>
            .
          </p>
          <p className="text-lg leading-relaxed mb-6">
            <a
              className={styles.contentImageBox}
              href="https://agriculture.ec.europa.eu/farming/geographical-indications-and-quality-schemes/geographical-indications-and-quality-schemes-explained_en#pdo"
            >
              <Image
                src="/icons/pdo-label.svg"
                alt="PDO logo"
                width={212}
                height={212}
              />
              <span>
                Official PDO logo from the Eurpean Commission
                <br />
                https://agriculture.ec.europa.eu/...
              </span>
            </a>
          </p>

          <div className="my-8">
            <DatawrapperChart
              chartId="DEUDJ/6?dark=true"
              title="Nr. of registered PDOs"
              ariaLabel="Line chart showing the number of registered PDOs over time"
              height={378}
            />
          </div>

          <h2 className="mt-8">Map of the Protected Designations of Origin</h2>
          <p>
            The Winemap provides a comprehensive overview of the 1,174 European wine
            regions which fall under the{" "}
            <strong>Protected Designation of Origin (PDO)</strong>
            label. It is an essential resource for anyone interested in wine or who
            works in the wine industry and can be used to increase knowledge as well
            as appreciation of regional wines and as an instrument for wine sector
            decision making. The map is based on a collection of legal information,
            including grape varieties, geospatial boundaries, and production
            details, and is the first representation of European PDO regions in one
            comprehensive resource.
          </p>
          <p>
            The Winemap is intended to help protect the unique cultural,
            socio-economic, and environmental heritage of European wine regions by
            providing easily accessible information from different sources. It can
            be used to identify the location of specific PDO regions, learn about
            the grape varieties grown in each region, and to discover the unique
            production methods used to make each wine. It also helps to highlight
            some of the lesser-known PDO regions in Europe. Moreover, the Winemap
            reveals fascinating insights into the various wine classifications of
            Europe’s major wine-producing countries. For example, the map highlights
            the vast number of Italian and French wines that fall under the PDO
            system: 400 and 300 PDOs, respectively. In contrast, Spain has only 103,
            Germany 30, Austria 16, and Portugal 15.
          </p>
          <p>
            The European wine map is also intended to help address future challenges
            the European wine sector will undergo and provide updated data that
            contributes to translating information into policy decisions and
            actions. European PDO wine regions are facing increasing threats from
            intensive management practices and climate change, the latter is
            especially concerning as it will lead to declines in wine quality and
            yield, posing a threat to the excellence of the European wine sector.
            Professionals in the wine industry urgently need new knowledge and tools
            to build the ecological resilience and adaptive capacity of their
            vineyards and successfully face these challenges.
          </p>

          <section>
            <p>
              The Winemap is based on a collection and harmonization of data from
              different sources. Information on the individual PDO regions was
              collected from official legal regulations which can be accessed via
              the{" "}
              <a
                target="_blank"
                rel="noreferrer"
                style={{ textDecoration: "underline" }}
                href="https://ec.europa.eu/info/food-farming-fisheries/food-safety-and-quality/certification/quality-labels/geographical-indications-register/"
              >
                eAmbrosia database
              </a>
              . This data includes information on geographic boundaries as well as
              on several production regulations, such as authorized grape varieties
              and wine types, maximum yields, and planting density for each PDO
              region. Further details can be found in the corresponding scientific
              publication:
            </p>
            <p>
              <i>
                A geospatial inventory of regulatory information for wine protected
                designations of origin in Europe, Scientific Data Volume 9, Article
                number: 394 (2022).
              </i>{" "}
              <a
                target="_blank"
                rel="noreferrer"
                href="https://doi.org/10.1038/s41597-022-01513-0"
                style={{ textDecoration: "underline" }}
              >
                https://doi.org/10.1038/s41597-022-01513-0
              </a>
            </p>
            <p>
              To show the extent of vine cultivation within individual PDO regions,
              the Winemap also contains information on the location of vineyards
              throughout Europe. This data was generated by combining information on
              vineyard locations from{" "}
              <a
                target="_blank"
                rel="noreferrer"
                href="https://land.copernicus.eu/pan-european/corine-land-cover"
                style={{ textDecoration: "underline" }}
              >
                Corine Land Cover
              </a>{" "}
              and{" "}
              <a
                target="_blank"
                rel="noreferrer"
                href="https://download.geofabrik.de/"
                style={{ textDecoration: "underline" }}
              >
                OpenStreetMap data
              </a>
              . Combining both data sources allowed us to get the most comprehensive
              overview of vineyard locations in Europe, based on freely accessible
              datasets. However, there are still areas and regions where not all
              vineyards were recorded in our dataset. For details on coverage and
              extent, please refer to individual sources.
            </p>
          </section>

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
