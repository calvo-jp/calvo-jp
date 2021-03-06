import { Link } from "react-router-dom";
import image from "../assets/images/404.png";
import styles from "../assets/styles/notfound.module.scss";
import Container from "../components/Container";
import ArrowLeftIcon from "../components/widgets/icons/ArrowLeft";
import Image from "../components/widgets/Image";

const NotFound = () => {
  return (
    <Container className={styles.container}>
      <div className={styles.image}>
        <Image src={image} alt="" draggable={false} />
      </div>

      <div className={styles.text}>
        <article>
          <h1>Error 404</h1>
          <p>The page you are trying to access does not exist</p>
        </article>

        <Link to="/about" className={styles.backButton}>
          <ArrowLeftIcon width={16} height={16} />
          <span>GO TO HOMEPAGE</span>
        </Link>
      </div>
    </Container>
  );
};

export default NotFound;
