import Image from "next/image";
import * as React from "react";
import styles from "./lightbox.module.css";
import useLightboxState from "./useLightboxState";

const LightBox = () => {
  const [state, setState] = useLightboxState();

  const handleEscape = React.useMemo(() => {
    return () => {
      document.addEventListener("keydown", (e) => {
        // FIXME: need to add a checker if lb is on top of everything. (using zIndex)
        if (e.code === "Escape" && state.open) {
          setState({
            src: "",
            open: false,
          });
        }
      });
    };
  }, [setState, state.open]);

  React.useEffect(() => {
    handleScroll(state.open);
    handleEscape();
  }, [state.open, handleEscape]);

  if (!state.open) return <React.Fragment />;

  // TODO: need to show something while image is loading

  return (
    <div className={styles.overlay}>
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

let lb__touched = false;
let lb__bodyWidth = "";
let lb__bodyPosition = "";
let lb__bodyOverflowY = "";
let lb__htmlScrollTop = 0;

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
    lb__bodyWidth = body.style.width;
    lb__bodyPosition = body.style.position;
    lb__bodyOverflowY = body.style.overflowY;
    // save scrolltop state
    lb__htmlScrollTop = html.scrollTop;
    // apply
    body.style.width = "100%";
    body.style.position = "fixed";
    body.style.overflowY = "scroll";
    // mark virginized
    lb__touched = true;
  } else {
    // skip initial load
    if (lb__touched) {
      // restore body style
      body.style.width = lb__bodyWidth;
      body.style.position = lb__bodyPosition;
      body.style.overflowY = lb__bodyOverflowY;
      // restore scrolltop state
      html.scrollTo(0, lb__htmlScrollTop);
    }
  }
};

export default LightBox;
