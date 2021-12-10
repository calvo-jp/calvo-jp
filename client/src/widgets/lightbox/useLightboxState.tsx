import * as React from 'react';
import LightboxContext from './LightboxContext';

const useLightboxState = () => {
  return React.useContext(LightboxContext);
};

export default useLightboxState;
