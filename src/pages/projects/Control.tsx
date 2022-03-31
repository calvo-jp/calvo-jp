import clsx from "clsx";
import styles from "../../assets/styles/projects.module.scss";
import ChevronLeftIcon from "../../components/widgets/icons/ChevronLeft";
import ChevronRightIcon from "../../components/widgets/icons/ChevronRight";

type ControlType = "next" | "prev";

interface ControlProps {
  type: ControlType;
  mobile?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

const Control = ({ type, mobile, disabled, onClick }: ControlProps) => {
  const next = type === "next";
  const prev = type === "prev";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx({
        [styles.controls]: true,
        [styles.desktop]: !mobile,
        [styles.mobile]: mobile,
        [styles.next]: next,
        [styles.prev]: prev,
      })}
    >
      {next && <ChevronRightIcon />}
      {prev && <ChevronLeftIcon />}
    </button>
  );
};

export default Control;
