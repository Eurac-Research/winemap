import Link from "next/link";

import styles from "@/styles/Home.module.scss";

export default function Textnavigation() {
  const year = new Date().getFullYear();
  return (
    <>
      <div className={styles.frontpageContent} style={{ padding: "0" }}>
        <p className={styles.homeNavigation}>
          <Link href="/about" className={styles.homeNavigationItem}>
            About the project
          </Link>
        </p>
        <p>
          <Link href="/about-pdo" className={styles.homeNavigationItem}>
            What’s a PDO?
          </Link>
        </p>
        <p>
          <Link href="/about-data" className={styles.homeNavigationItem}>
            About the data
          </Link>
        </p>
        <p>
          <Link href="/vulnerability" className={styles.homeNavigationItem}>
            Vulnerability Index
          </Link>
        </p>
        <p>
          <Link href="/team" className={styles.homeNavigationItem}>
            The Team
          </Link>
        </p>
      </div>
      <div className={styles.imprintBoxMap}>
        <span>
          © {year} Eurac Research{" "}
          <Link href="/imprint-privacy">Imprint / Privacy</Link>
        </span>
      </div>
    </>
  );
}
