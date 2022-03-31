import clsx from "clsx";
import { ComponentProps, PropsWithChildren } from "react";
import styles from "../assets/styles/layout.module.scss";

const Container = ({
  children,
  className,
  ...props
}: PropsWithChildren<ComponentProps<"div">>) => {
  return (
    <div className={clsx(styles.innerWrapper, className)} {...props}>
      {children}
    </div>
  );
};

export default Container;
