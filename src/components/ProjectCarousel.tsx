  import type { Project } from "@/content/projects";
  import ProjectSmallCard from "@/components/ProjectCard";
  import styles from "./ProjectCarousel.module.css";

  type ProjectCarouselProps = {
    projects: Project[];
  };

  export default function ProjectCarousel({
    projects,
  }: ProjectCarouselProps) {
    return (
      <div className={styles.viewport}>
        <div className={styles.track}>
          {[0, 1].map((copy) => (
            <div className={styles.group} key={copy}>
              {projects.map((project) => (
                <ProjectSmallCard
                  key={`${copy}-${project.slug}`}
                  {...project}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }