import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import styles from "@/styles/Home.module.css";

export const metadata: Metadata = {
  title: "What’s a PDO? - Winemap Europe by Eurac Research",
  description:
    "Europe is home to some of the world’s most prestigious wine regions. In order to maintain the integrity and quality of these wines, the European Union has established a quality scheme called Protected Designation of Origin (PDO).",
};

export default function AboutPdo() {
  return (
    <main className={styles.staticContentBox}>
      <Link href="/" className={styles.backLink}>
        <span className={`${styles.arrow} ${styles.left}`}></span>
        back to map
      </Link>



      <h1>What’s a PDO?</h1>
      <p>
        Europe is home to some of the world’s most prestigious wine regions. In
        order to maintain the integrity and quality of these wines, the European
        Union has established a quality scheme called{" "}
        <strong>Protected Designation of Origin (PDO)</strong>. This system sets
        rules and regulations for the production, labelling, and promotion of
        wines within specific regions of Europe. This classification ensures
        that wines produced within those regions follow strict standards of
        quality and tradition, protecting the reputation and authenticity of
        each wine. The PDO designation is granted by the EU, and only wines that
        are produced within a certain region and meet specific production
        criteria are allowed to carry the PDO label.
      </p>

      <p>
        The PDO system is extensive and complex, covering thousands of wine
        types from various regions in Europe. Until recently, wine enthusiasts
        and industry professionals had to consult various sources to understand
        these classifications.
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
        <Image src="/icons/pdo-label.svg" alt="pdo logo" width={212} height={212} />
        <span>
          Official PDO logo from the Eurpean Commission
          <br />
          https://agriculture.ec.europa.eu/...
        </span>
      </a>
    </main>
  );
}
