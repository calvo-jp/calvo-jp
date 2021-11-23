import Head from 'next/head';
import * as React from 'react';

const NotFound = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Error 404 | Page not found</title>
      </Head>

      <div className="min-h-screen flex items-center justify-center p-2">
        <h1 className="text-gray-300 text-9xl font-bold">4O4</h1>
      </div>
    </React.Fragment>
  );
};

export default NotFound;
