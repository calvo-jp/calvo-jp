import Image from "next/image";
import * as React from "react";
import CloseIcon from "widgets/icons/Close";
import styles from "./lightbox.module.css";
import useLightbox from "./useLightbox";
import * as utils from "./utils";

const LightBox = () => {
  const [state, setState] = useLightbox();
  const lightboxRef = React.useRef<HTMLDivElement>(null);

  const closeLightbox = React.useMemo(() => {
    return () =>
      setState((state) => ({
        ...state,
        open: false,
        src: "",
      }));
  }, [setState]);

  const handleEscape = React.useMemo(() => {
    return () => {
      document.addEventListener("keydown", (e) => {
        if (
          e.code === "Escape" &&
          state.open &&
          lightboxRef.current &&
          utils.isOnTopOfAllElems(lightboxRef.current)
        )
          closeLightbox();
      });
    };
  }, [closeLightbox, state.open]);

  React.useEffect(() => {
    handleScroll(state.open);
    handleEscape();

    // apply highest possible zindex
    if (lightboxRef.current) utils.applyHighestZIndex(lightboxRef.current);
  }, [state.open, handleEscape]);

  if (!state.open) return <React.Fragment />;

  return (
    <div
      ref={lightboxRef}
      role="dialog"
      aria-modal="true"
      className={styles.container}
    >
      <section className={styles.header}>
        <p className={styles.caption}>calvojp &trade;</p>

        <nav className={styles.toolbar}>
          <button onClick={closeLightbox}>
            <CloseIcon />
          </button>
        </nav>
      </section>

      <section className={styles.main}>
        <div className={styles.wrapper}>
          <Image
            layout="fill"
            alt=""
            src={state.src}
            className={styles.image}
          />
        </div>
      </section>
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
