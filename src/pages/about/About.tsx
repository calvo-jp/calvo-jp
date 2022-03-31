import { Fragment, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import Container from "../../components/Container";
import FooterSkeleton from "../../components/footer/Skeleton";
import ArrowRightIcon from "../../components/widgets/icons/ArrowRight";
import styles from "../assets/styles/about.module.scss";

const Footer = lazy(() => import("../../components/footer"));
const Background = lazy(() => import("./Background"));

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
