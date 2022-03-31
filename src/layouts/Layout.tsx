import clsx from "clsx";
import * as React from "react";
import { Outlet } from "react-router-dom";
import styles from "../assets/styles/layout.module.scss";
import HeaderSkeleton from "./HeaderSkeleton";

const Header = React.lazy(() => import("./Header"));
const SpinnerIcon = React.lazy(() => import("../widgets/icons/Spinner"));

const Layout: React.FC<React.ComponentProps<"div">> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={styles.container}>
      <React.Suspense fallback={<HeaderSkeleton />}>
        <Header />
      </React.Suspense>

      <div className={clsx(styles.outerWrapper, className)} {...props}>
        <React.Suspense fallback={<Spinner />}>
          <Outlet />
        </React.Suspense>
      </div>
    </div>
  );
};

const Spinner = () => {
  return (
    <div className={styles.spinner}>
      <React.Suspense fallback={<div>Loading...</div>}>
        <SpinnerIcon />
      </React.Suspense>
    </div>
  );
};

export default Layout;
