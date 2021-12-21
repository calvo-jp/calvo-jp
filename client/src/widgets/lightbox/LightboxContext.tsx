import * as React from 'react';
import LightboxState from './LightboxState';

// prettier-ignore
const LightboxContext = React.createContext<
  [LightboxState, React.Dispatch<React.SetStateAction<LightboxState>>]
>([{ src: "" }, function () {}]);

export default LightboxContext;
