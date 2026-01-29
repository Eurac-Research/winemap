import Image from "next/image";
import Link from "next/link";

import styles from "@/styles/Home.module.css";

/**
 * The `About` component renders the "About" page of the application.
 * It includes a header with navigation links, a description of the team,
 * and a list of team members with their respective information and images.
 *
 * @returns {JSX.Element} The rendered "About" page component.
 */
export default function About() {
  return (
    <main className={styles.staticContentBox}>
      <Link href="/" className={styles.backLink}>
        <span className={`${styles.arrow} ${styles.left}`}></span>
        back to map
      </Link>



      <h1>The Team</h1>
      <p>
        An interdisciplinary research team from Eurac Research Bolzano, the
        University of Venice, the University of Trás-os-Montes and Alto Douro
        and the University of Innsbruck came together for the initiative. Led by
        Eurac Research, the team have successfully collaborated to set up this
        database on PDO vines. With their combined expertise and dedication, the
        team has compiled an extensive collection of information for PDO wine
        production in Europe. The results were published as an article in
        Nature’s Scientific Data in 2022:
      </p>
      <p>
        <i>
          A geospatial inventory of regulatory information for wine protected
          designations of origin in Europe,- Scientific Data Volume 9, Article
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
        <span className={styles.teamItem}>
          <Image
            src="https://webassets.eurac.edu/31538/1620137491-candiagosebastian.jpg?w=150&h=150&fm=png&fit=crop&mask=ellipse&auto=format&dpr=2"
            width={150}
            height={150}
            alt="Sebastian Candiago"
            quality={95}
          ></Image>
          <span>
            <a
              href="https://www.unive.it/data/persone/18664532"
              target="_blank"
              rel="noreferrer"
            >
              <span>Sebastian Candiago</span>
            </a>
            <span>Eurac Research, Institute for Alpine Environment</span>
            <span>
              Department of Economics, Ca’ Foscari University of Venice
            </span>
          </span>
        </span>
        <span className={styles.teamItem}>
          <Image
            src="https://webassets.eurac.edu/31538/1620655782-tschollsimon.jpg?w=150&h=150&fm=png&fit=crop&mask=ellipse&auto=format&dpr=2"
            width={150}
            height={150}
            alt="Simon Tscholl"
            quality={95}
          ></Image>
          <span>
            <a
              href="https://www.eurac.edu/en/people/simon-tscholl"
              target="_blank"
              rel="noreferrer"
            >
              <span>Simon Tscholl</span>
            </a>
            <span>Eurac Research, Institute for Alpine Environment</span>
            <span>University of Innsbruck, Department of Ecology</span>
          </span>
        </span>
        <span className={styles.teamItem}>
          <Image
            src="https://webassets.eurac.edu/31538/1624523789-egarterlukas.jpg?w=150&h=150&fm=png&fit=crop&mask=ellipse&auto=format&dpr=2"
            width={150}
            height={150}
            alt="Lukas Egarter"
            quality={95}
          ></Image>
          <span>
            <a
              href="https://www.eurac.edu/en/people/lukas-egarter-vigl"
              target="_blank"
              rel="noreferrer"
            >
              <span>Lukas Egarter Vigl</span>
            </a>
            <span>Eurac Research, Institute for Alpine Environment</span>
          </span>
        </span>
      </p>

      <section className="mt-12">
        <Link
          href="/literature"
          className="block rounded-lg border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/10"
        >
          <h2>Scientific literature</h2>
          <p className="text-white/70">
            Explore the publications behind the Winemap project, including data
            sources and the climate resilience study.
          </p>
          <span className="inline-block mt-4 underline">Go to literature →</span>
        </Link>
      </section>

    </main>
  );
}
