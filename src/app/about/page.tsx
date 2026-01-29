import Link from "next/link";

import styles from "@/styles/Home.module.css";
import Textnavigation from "../components/textnavigation";

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

      <p className="mt-12">Read more: </p>
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
      <Textnavigation />
    </main>
  );
}
