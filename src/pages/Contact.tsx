import * as React from 'react';
import styles from '../assets/styles/contact.module.scss';
import useSocials from '../hooks/useSocials';
import ArrowRightIcon from '../widgets/icons/ArrowRight';

const Contact = () => {
  const socials = useSocials();

  return (
    <div className={styles.contact}>
      <div className={styles.wrapper}>
        <section className={styles.content}>
          <p>Looking for a developer?</p>
          <h1>Let's Talk</h1>

          <div className={styles.background}>
            <Blob />
          </div>
        </section>

        <section className={styles.items}>
          <Item
            icon={PhoneIcon}
            label="phone number"
            value="+63 956-741-6960"
          />
          <Item
            icon={EmailIcon}
            label="email address"
            value="calvojp92@gmail.com"
          />
        </section>
      </div>
    </div>
  );
};

type SVGIcon = (props: React.ComponentProps<'svg'>) => JSX.Element;

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

const PhoneIcon: SVGIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#000000"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
    </svg>
  );
};

const EmailIcon: SVGIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#000000"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
      <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
  );
};

const Blob = () => {
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
