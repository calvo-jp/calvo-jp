import * as React from 'react';
import FooterSkeleton from '../layouts/FooterSkeleton';

const Footer = React.lazy(() => import('../layouts/Footer'));

const Landing = () => {
  return (
    <div className="flex flex-col">
      <header></header>

      <main className="grow"></main>

      <React.Suspense fallback={<FooterSkeleton />}>
        <Footer />
      </React.Suspense>
    </div>
  );
};

export default Landing;
