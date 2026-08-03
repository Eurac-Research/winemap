import styles from "@/styles/Home.module.css";

export default function Imprint() {
  return (
    <main className={styles.staticContentBox}>

      <h1 className="mt-12">Imprint / Privacy</h1>
      <p className={styles.imprintContent}>
        <strong>Eurac Research</strong>
        <br />
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.eurac.edu/en/institutes-centers/institute-for-alpine-environment"
        >
          Institute for Alpine Environment
        </a>
        <br />
        Viale Druso 1<br />
        39100 - Bolzano – Italy
        <br />
        T +39 0471 055 333
        <br />
        <a href="mailto:alpine.environment@eurac.edu">
          alpine.environment@eurac.edu
        </a>
        <br />
        <br />
        <strong>Privacy</strong>
        <br />
        <a target="_blank" rel="noreferrer" href="https://privacy.eurac.edu">
          Privacy information regarding the use of cookies and the processing of
          personal data on winemap.eurac.edu
        </a>
      </p>
    </main>
  );
}
