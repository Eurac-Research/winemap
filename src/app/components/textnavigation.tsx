import Link from "next/link";

import styles from "@/styles/Home.module.css";

/**
 * A functional component that renders the text navigation for the front page.
 * It includes links to various sections of the website such as "About the project",
 * "What’s a PDO?", "About the data", "Vulnerability Index", and "The Team".
 *
 * @returns {JSX.Element} The rendered text navigation component.
 */
export default function Textnavigation() {
  return (
    <>
      <div className={styles.frontpageContent} style={{ padding: "0" }}>
        <p className={styles.homeNavigation}>
          <Link href="/about" className={styles.homeNavigationItem}>
            About the project
          </Link>
        </p>
        <p>
          <Link href="/about#pdo" className={styles.homeNavigationItem}>
            What’s a PDO?
          </Link>
        </p>
        <p>
          <Link href="/about#data" className={styles.homeNavigationItem}>
            About the data
          </Link>
        </p>
        <p>
          <Link href="/about#vulnerability" className={styles.homeNavigationItem}>
            Vulnerability Index
          </Link>
        </p>
        <p>
          <Link href="/team" className={styles.homeNavigationItem}>
            The Team
          </Link>
        </p>
      </div>
    </>
  );
}
