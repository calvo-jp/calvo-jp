import styles from '../../assets/styles/projects.module.scss';
import IProject from '../../types/project';
import ArrowRightIcon from '../../widgets/icons/ArrowRight';
import Control from './Control';

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
    data: { name, description, screenshots, repository, hostedAt },

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
          <img src={screenshots} alt="" />
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
          href={unsafeCoalesce(hostedAt, repository)}
          target="_blank"
          rel="norefferer noopener"
        >
          <span>{hostedAt ? 'Go to website' : 'Source code'}</span>
          <ArrowRightIcon />
        </a>
      </div>
    </div>
  );
};

const unsafeCoalesce = (...args: any[]): any => {
  for (const arg of args) if (!!arg) return arg;
};

export default Project;
