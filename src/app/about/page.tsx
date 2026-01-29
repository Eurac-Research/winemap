import Image from "next/image";
import Link from "next/link";

import styles from "@/styles/Home.module.css";

export default function About() {
  return (
    <main className={styles.staticContentBox}>
      <Link href="/" className={styles.backLink}>
        <span className={`${styles.arrow} ${styles.left}`}></span>
        back to map
      </Link>

      <h1>Winemap</h1>
      <h2>Map of the Protected Designations of Origin</h2>
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

      <section id="pdo" className="mt-12">
        <h2>What’s a PDO?</h2>
        <p>
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
        <p>
          The PDO system is extensive and complex, covering thousands of wine
          types from various regions in Europe. Until recently, wine enthusiasts
          and industry professionals had to consult various sources to
          understand these classifications.
        </p>
        <p>
          Now, Eurac Research has produced the first-ever comprehensive{" "}
          <Link href="/" style={{ textDecoration: "underline" }}>
            map of Europe’s wine regions classified under the PDO system
          </Link>
          .
        </p>
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
      </section>

      <section id="data" className="mt-12">
        <h2>About the data</h2>
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

      <section id="vulnerability" className="mt-12">
        <h2>Vulnerability Index</h2>
        <p className="mb-6">
          The{" "}
          <Link
            href="/climate-environment?vulnerability=true"
            className="underline"
          >
            Winemap Adaptation
          </Link>{" "}
          presents an overview of the climate change vulnerability of European
          Protected Designation of Origin (PDO) wine regions and is based on the
          integrated vulnerability index that was developed in the study “{" "}
          <a
            href="https://doi.org/10.1038/s41467-024-50549-w"
            className="underline"
            target="_blank"
            rel="noreferrer"
          >
            Climate resilience of European wine regions
          </a>
          ”. The vulnerability refers to the extent to which a region is
          susceptible to, or incapable of withstanding, the adverse effects of
          climate change and is defined as a function of a region&apos;s exposure
          to climate variation, sensitivity and adaptive capacity. <sup>1</sup>
        </p>

        <p>
          The integrated vulnerability index is based on three key dimensions:
        </p>
        <ul className="list-disc list-outside my-6 pl-4 max-w-[700px]">
          <li className="mb-6">
            <b>Exposure:</b> This dimension considers projected changes in
            climatic conditions, which are based on bioclimatic indicators
            specifically developed for viticulture. Regions experiencing greater
            changes are considered more exposed to climate impacts.
          </li>
          <li className="mb-6">
            <b>Sensitivity:</b> Sensitivity reflects how much a region is
            affected by climate related stimuli. It takes into account the
            abundance and diversity of the traditionally cultivated vine
            varieties from each region combined with their climatic
            requirements. Higher sensitivity indicates greater susceptibility
            to climate variations.
          </li>
          <li className="mb-6">
            <b>Adaptive Capacity:</b> This dimension evaluates a region’s
            potential and available resources to adapt to changing climate
            conditions. It includes a variety of different factors relevant for
            climate change adaptation, such as socioeconomic characteristics,
            natural and physical resources, and human capacity.
          </li>
        </ul>
        <p>
          By combining these three dimensions, the integrated vulnerability
          index combines climate projections with individual characteristics of
          each region, including the cultivated varieties, the geographic extent
          and available resources for adaptation. The index therefore gives a
          comprehensive overview on how resilient European wine regions are to
          climate change.
        </p>
        <p>
          The vulnerability index is <b>comparative</b> and as such the
          vulnerability of each region can only be interpreted compared to other
          European PDO regions. It provides critical information for decision
          makers and stakeholders and allows to identify regions that will
          likely face the strongest negative impacts from climate change. The map
          shows the location of the 1085 European PDO regions for which the
          integrated vulnerability index was assessed, and clicking a region
          reveals the individual dimensions of the index.
        </p>
        <p className="text-sm mt-6">
          1) IPCC (2001) Climate change 2001: Impacts, Adaptation and
          Vulnerability, Summary for Policymakers, WMO.
        </p>
      </section>

      <section id="institute" className="mt-12">
        <div className="rounded-lg border border-white/10 bg-white/5 p-6">
          <h2>Institute for Alpine Environment</h2>
          <p>
            WINEMAP is developed by the Institute for Alpine Environment at
            Eurac Research in Bolzano, Italy. Our interdisciplinary research
            team specializes in climate adaptation, environmental science, and
            sustainable agriculture, providing the scientific foundation for
            this platform. The project is part of{" "}
            <a
              href="https://www.eurac.edu/en/data-in-action"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Data in Action
            </a>
            , an initiative by Eurac Research&apos;s Communication Department
            that transforms research data into accessible digital experiences.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-white/10 bg-black/30 p-4">
              <h3 className="text-lg font-semibold">Biodiversity & Ecosystems</h3>
              <p className="text-sm text-white/70">
                Monitoring and understanding biodiversity changes across alpine
                environments, from soil organisms to birds, ensuring the
                preservation of mountain ecosystems.
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-black/30 p-4">
              <h3 className="text-lg font-semibold">Climate Change Research</h3>
              <p className="text-sm text-white/70">
                Investigating climate impacts on alpine regions through
                long-term monitoring, from snowfall patterns to ecosystem shifts
                at high altitudes.
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-black/30 p-4">
              <h3 className="text-lg font-semibold">
                Sustainable Mountain Development
              </h3>
              <p className="text-sm text-white/70">
                Developing integrated landscape management approaches for
                resilient mountain forests and agriculture under global change.
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <a
              href="https://www.eurac.edu/en/institutes-centers/institute-for-alpine-environment"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-black font-semibold rounded hover:bg-white/90 transition-colors"
            >
              Learn more about the Institute
            </a>
            <Link
              href="/team"
              className="inline-flex items-center justify-center px-6 py-3 border border-white/20 text-white font-semibold rounded hover:bg-white/10 transition-colors"
            >
              Meet the team
            </Link>
          </div>
        </div>
      </section>

      <section id="respond" className="mt-8">
        <div className="rounded-lg border border-white/10 bg-white/5 p-6">
          <h2>RESPOnD Project</h2>
          <p>
            This work is part of the RESPOnD project (Resilient Ecosystem
            Services in Declining Mountain Regions), which aims to develop
            strategies for sustainable mountain development in the Alpine Space.
          </p>
          <a
            href="https://www.alpine-space.eu/project/respond/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Visit RESPOnD project page →
          </a>
        </div>
      </section>

      <p className="mt-12">Read more:</p>
      <p className="mt-6">
        <i>
          Candiago, S., Tscholl, S., Bassani, L. et al. A geospatial inventory
          of regulatory information for wine protected designations of origin in
          Europe. Sci Data 9, 394 (2022).
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
      <p className="mt-6">
        <i>
          Tscholl, S., Candiago, S., Marsoner, T. et al. Climate resilience of
          European wine regions. Nat Commun 15, 6254 (2024).
        </i>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://doi.org/10.1038/s41467-024-50549-w"
          style={{ textDecoration: "underline" }}
        >
          https://doi.org/10.1038/s41467-024-50549-w
        </a>
      </p>

      <p className="mt-12">
        Winemap is part of the Eurac Research{" "}
        <a
          href="https://www.eurac.edu/en/data-in-action"
          target="_blank"
          rel="noreferrer"
          className="underline"
        >
          <i>Data in Action</i>
        </a>{" "}
        initiative.
        <br />
        The code is available on GitHub:{" "}
        <a
          href="https://github.com/Eurac-Research/winemap"
          target="_blank"
          rel="noreferrer"
          className="underline"
        >
          https://github.com/Eurac-Research/winemap
        </a>
      </p>

    </main>
  );
}
