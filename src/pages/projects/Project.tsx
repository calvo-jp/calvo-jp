import styles from "../../assets/styles/projects.module.scss";
import ArrowRightIcon from "../../components/widgets/icons/ArrowRight";
import Image from "../../components/widgets/Image";
import IProject from "../../types/project";
import Control from "./Control";

interface ControlsConfig {
  next?: boolean;
  prev?: boolean;
}

interface ProjectProps {
  data: IProject;
  onNext?: () => void;
  onPrev?: () => void;
  controls?: ControlsConfig;
}

const Project = (props: ProjectProps) => {
  const {
    data: { name, description, image, repository, hostedAt },

    controls = {
      next: false,
      prev: false,
    },

    onPrev,
    onNext,
  } = props;

  return (
    <div className={styles.item}>
      <div className={styles.details}>
        <div className={styles.name}>{name}</div>
        <div className={styles.description}>{description}</div>
      </div>

      <div className={styles.box}>
        {controls.prev && <Control type="prev" onClick={onPrev} />}

        <div className={styles.image}>
          {!image && <div className={styles.alert}>No image available</div>}
          {image && <Image src={image} alt="" placeholder={<Loader />} />}
        </div>

        {controls.next && <Control type="next" onClick={onNext} />}
      </div>

      <div className={styles.actions}>
        <div className={styles.mobileControlsWrapper}>
          <Control
            type="prev"
            mobile
            onClick={onPrev}
            disabled={!controls.prev}
          />

          <Control
            type="next"
            mobile
            onClick={onNext}
            disabled={!controls.next}
          />
        </div>

        <a
          href={hostedAt ? hostedAt : repository}
          target="_blank"
          rel="norefferer noopener"
        >
          <span>{hostedAt ? "Go to website" : "Source code"}</span>
          <ArrowRightIcon />
        </a>
      </div>
    </div>
  );
};

const Loader = () => {
  return (
    <div className={styles.loader}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Project;
