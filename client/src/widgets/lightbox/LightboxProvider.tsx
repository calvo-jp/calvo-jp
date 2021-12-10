import * as React from "react";
import Lightbox from ".";
import LightboxContext from "./LightboxContext";
import LightboxState from "./LightboxState";

const LightboxProvider: React.FC = ({ children }) => {
  // prettier-ignore
  const [state, setState] = React.useState<LightboxState>({ src: "" });

  return (
    <LightboxContext.Provider value={[state, setState]}>
      <Lightbox />
      <React.Fragment>{children}</React.Fragment>
    </LightboxContext.Provider>
  );
};

export default LightboxProvider;
