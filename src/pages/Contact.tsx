import * as React from "react";
import styles from "../assets/styles/contact.module.scss";
import Container from "../layouts/Container";
import FooterSkeleton from "../layouts/FooterSkeleton";
import EnvelopeIcon from "../widgets/icons/Envelope";
import PhoneIcon from "../widgets/icons/Phone";

const Footer = React.lazy(() => import("../layouts/Footer"));

const Contact = () => {
  return (
    <React.Fragment>
      <Container className={styles.contact}>
        <div className={styles.wrapper}>
          <section className={styles.content}>
            <p>Looking for a developer?</p>
            <h1>Let's Talk</h1>

            <div className={styles.background}>
              <BlobBackground />
            </div>
          </section>

          <section className={styles.items}>
            <Item
              icon={PhoneIcon}
              label="phone number"
              value="+63 956-741-6960"
            />
            <Item
              icon={EnvelopeIcon}
              label="email address"
              value="calvojp92@gmail.com"
            />
          </section>
        </div>
      </Container>

      <React.Suspense fallback={<FooterSkeleton />}>
        <Footer />
      </React.Suspense>
    </React.Fragment>
  );
};

type SVGIcon = (props: React.ComponentProps<"svg">) => JSX.Element;

interface ItemProps {
  label: string;
  value: string;
  icon: SVGIcon;
}

const Item = ({ label, value, icon: Icon }: ItemProps) => {
  return (
    <div className={styles.item}>
      <Icon className={styles.icon} />

      <div>
        <div className={styles.label}>{label}</div>
        <div className={styles.value}>{value}</div>
      </div>
    </div>
  );
};

const BlobBackground = () => {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path
        fill="#202324"
        d="M38.9,-65.6C51.3,-60.3,62.8,-51.6,70,-40.1C77.2,-28.6,80.3,-14.3,79.6,-0.4C79,13.5,74.7,27.1,66.8,37.5C59,48,47.6,55.3,35.9,63.5C24.1,71.6,12.1,80.5,-1.2,82.6C-14.5,84.7,-29.1,80.1,-41.7,72.5C-54.3,64.9,-65,54.3,-69.8,41.7C-74.6,29.1,-73.5,14.6,-75.1,-1C-76.8,-16.5,-81.2,-32.9,-76,-44.9C-70.9,-56.9,-56.2,-64.4,-41.9,-68.6C-27.7,-72.8,-13.8,-73.8,-0.3,-73.3C13.3,-72.8,26.6,-70.9,38.9,-65.6Z"
        transform="translate(100 100)"
      />
    </svg>
  );
};

export default Contact;
