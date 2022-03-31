import { Fragment, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import styles from "../assets/styles/about.module.scss";
import Container from "../layouts/Container";
import FooterSkeleton from "../layouts/FooterSkeleton";
import ArrowRightIcon from "../widgets/icons/ArrowRight";

const Footer = lazy(() => import("../layouts/Footer"));
const Background = lazy(() => import("../layouts/Background"));

const About = () => {
  return (
    <Container className={styles.container}>
      <Suspense fallback={<Fragment />}>
        <Background />
      </Suspense>

      <section className={styles.about}>
        <h2 className={styles.heading}>
          - <span className={styles.gradientText}>JP Calvo</span>.
        </h2>

        <p className={styles.bio}>
          An aspiring web developer who loves to use modern tech stacks.
        </p>

        <div className={styles.buttonContainer}>
          <Link to="/projects" className={styles.gradientButton}>
            <span>Go to Projects</span>
            <ArrowRightIcon width={16} height={16} />
          </Link>
        </div>
      </section>

      <Suspense fallback={<FooterSkeleton />}>
        <Footer />
      </Suspense>
    </Container>
  );
};

export default About;
