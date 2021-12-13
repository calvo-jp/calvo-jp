import Image from "next/image";
import * as React from "react";
import styles from "./lightbox.module.css";
import useLightbox from "./useLightbox";
import utils from "./__utils";

const LightBox = () => {
  const [state, setState] = useLightbox();
  const lightboxRef = React.useRef<HTMLDivElement>(null);

  const handleEscape = React.useMemo(() => {
    return () => {
      document.addEventListener("keydown", (e) => {
        if (
          e.code === "Escape" &&
          state.open &&
          lightboxRef.current &&
          utils.isOnTopOfAllElems(lightboxRef.current)
        )
          setState({
            src: "",
            open: false,
          });
      });
    };
  }, [setState, state.open]);

  React.useEffect(() => {
    handleScroll(state.open);
    handleEscape();

    // apply highest possible zindex
    if (lightboxRef.current) utils.applyHighestZIndex(lightboxRef.current);
  }, [state.open, handleEscape]);

  if (!state.open) return <React.Fragment />;

  return (
    <div className={styles.lightbox} ref={lightboxRef}>
      <div
        className={styles.container}
        onClick={() => {
          setState({
            src: "",
            open: false,
          });
        }}
      >
        <Image
          src={state.src}
          alt=""
          layout="fill"
          className={styles.image}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        />
      </div>
    </div>
  );
};

let __lb__touched__ = false;
let __lb__bodyWidth__ = "";
let __lb__bodyPosition__ = "";
let __lb__bodyOverflowY__ = "";
let __lb__htmlScrollTop__ = 0;

/** Handles body scrolling whenever lightbox is toggled */
const handleScroll = (disable?: boolean) => {
  const body = document.body;
  const html = document.documentElement;

  // check if there is a scroll-y
  // FIXME: this should be changed to a more reliable fn
  const isScrollable = window.innerWidth > document.documentElement.clientWidth;
  if (!isScrollable) return;

  if (disable) {
    // save body style
    __lb__bodyWidth__ = body.style.width;
    __lb__bodyPosition__ = body.style.position;
    __lb__bodyOverflowY__ = body.style.overflowY;
    // save scrolltop state
    __lb__htmlScrollTop__ = html.scrollTop;
    // apply
    body.style.width = "100%";
    body.style.position = "fixed";
    body.style.overflowY = "scroll";
    // mark virginized
    __lb__touched__ = true;
  } else {
    // skip initial load
    if (__lb__touched__) {
      // restore body style
      body.style.width = __lb__bodyWidth__;
      body.style.position = __lb__bodyPosition__;
      body.style.overflowY = __lb__bodyOverflowY__;
      // restore scrolltop state
      html.scrollTo(0, __lb__htmlScrollTop__);
    }
  }
};

export default LightBox;
