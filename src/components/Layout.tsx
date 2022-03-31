import clsx from "clsx";
import { ComponentProps, lazy, PropsWithChildren, Suspense } from "react";
import { Outlet } from "react-router-dom";
import styles from "../assets/styles/layout.module.scss";
import HeaderSkeleton from "./header/Skeleton";

const Header = lazy(() => import("./header"));
const SpinnerIcon = lazy(() => import("./widgets/icons/Spinner"));

const Layout = ({
  children,
  className,
  ...props
}: PropsWithChildren<ComponentProps<"div">>) => {
  return (
    <div className={styles.container}>
      <Suspense fallback={<HeaderSkeleton />}>
        <Header />
      </Suspense>

      <div className={clsx(styles.outerWrapper, className)} {...props}>
        <Suspense fallback={<Spinner />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

const Spinner = () => {
  return (
    <div className={styles.spinner}>
      <Suspense fallback={<div>Loading...</div>}>
        <SpinnerIcon />
      </Suspense>
    </div>
  );
};

export default Layout;
