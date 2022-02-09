import styles from '../../assets/styles/projects.module.scss';
import IProject from '../../types/project';
import ArrowRightIcon from '../../widgets/icons/ArrowRight';
import Control from './Control';

const Project = ({ name, description, screenshots, repository }: IProject) => {
  return (
    <div className={styles.item}>
      <div className={styles.details}>
        <div className={styles.name}>{name}</div>
        <div className={styles.description}>{description}</div>
      </div>

      <div className={styles.box}>
        <Control type="prev" />

        <div className={styles.image}>
          <img src={screenshots} alt="" />
        </div>

        <Control type="next" />
      </div>

      <div className={styles.actions}>
        <div className={styles.mobileControlsWrapper}>
          <Control type="prev" mobile />
          <Control type="next" mobile />
        </div>

        <a href={repository}>
          <span>Source Code</span>
          <ArrowRightIcon />
        </a>
      </div>
    </div>
  );
};

export default Project;
