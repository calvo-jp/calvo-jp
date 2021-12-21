import * as React from "react";
import LightboxContext from "./LightboxContext";

const useLightbox = () => {
  return React.useContext(LightboxContext);
};

export default useLightbox;
