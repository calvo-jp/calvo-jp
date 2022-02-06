import styles from '../assets/styles/about.module.scss';
import Footer from '../layouts/Footer';
import Header from '../layouts/Header';

const About = () => {
  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}></main>

      <Footer />
    </div>
  );
};

export default About;
