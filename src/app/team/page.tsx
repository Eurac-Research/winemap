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
          <span className={styles.teamItem}>
            <Image
              src="https://webassets.eurac.edu/31538/1626080384-simionheidi.jpg?w=150&h=150&fm=png&fit=crop&mask=ellipse&auto=format&dpr=2t"
              width={150}
              height={150}
              alt="Heidi Simion"
              quality={95}
            ></Image>
            <span>
              <a
                href="https://www.eurac.edu/en/people/heidi-simion"
                target="_blank"
                rel="noreferrer"
              >
                <span>Heidi Simion</span>
              </a>
              <span>Eurac Research, Institute for Alpine Environment</span>
            </span>
          </span>
          <span className={styles.teamItem}>
            <Image
              src="https://webassets.eurac.edu/31538/1744019504-kleblfabian.jpg?w=150&h=150&fm=png&fit=crop&mask=ellipse&auto=format&dpr=2t"
              width={150}
              height={150}
              alt="Fabian Klebl"
              quality={95}
            ></Image>
            <span>
              <a
                href="https://www.eurac.edu/en/people/fabian-norbert-klebl"
                target="_blank"
                rel="noreferrer"
              >
                <span>Fabian Klebl</span>
              </a>
              <span>Eurac Research, Institute for Alpine Environment</span>
            </span>
          </span>
          <span className={styles.teamItem}>
            <Image
              src="https://webassets.eurac.edu/31538/1731321601-mauremathilde.jpg?w=150&h=150&fm=png&fit=crop&mask=ellipse&auto=format&dpr=2t"
              width={150}
              height={150}
              alt="Mathilde Maure"
              quality={95}
            ></Image>
            <span>
              <a
                href="https://www.eurac.edu/en/people/mathilde-maure"
                target="_blank"
                rel="noreferrer"
              >
                <span>Mathilde Maure</span>
              </a>
              <span>Eurac Research, Institute for Alpine Environment</span>
            </span>
          </span>
      </p>

      <br></br>
      <h1>Former Collaborators</h1>
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
              href="https://www.pes.uni-bayreuth.de/en/professorship/team/candiago-sebastian/index.php"
              target="_blank"
              rel="noreferrer"
            >
              <span>Sebastian Candiago</span>
            </a>
            <span>
              University of Bayreuth, Faculty of Biology, Chemistry and Earth Sciences - Department of Earth Science
            </span>
          </span>
        </span>

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
