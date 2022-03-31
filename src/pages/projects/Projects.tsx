import { useState } from "react";
import styles from "../../assets/styles/projects.module.scss";
import useProjects from "../../hooks/useProjects";
import Container from "../../layouts/Container";
import Project from "./Project";

const Projects = () => {
  const projects = useProjects();

  const [current, setCurrent] = useState(0);

  const handleNext = () => setCurrent((state) => state + 1);
  const handlePrev = () => setCurrent((state) => state - 1);

  return (
    <Container className={styles.projects}>
      <Project
        data={projects[current]}
        onNext={handleNext}
        onPrev={handlePrev}
        controls={{
          next: current < projects.length - 1,
          prev: current > 0,
        }}
      />
    </Container>
  );
};

export default Projects;
