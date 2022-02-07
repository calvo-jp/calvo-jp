import React from 'react';
import styles from '../assets/styles/contact.module.scss';

const Contact = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className={styles.contact}>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          <div className={styles.textfield}>
            <label htmlFor="email">Email</label>
            <input autoFocus required id="email" />
          </div>

          <div className={styles.textfield}>
            <label htmlFor="subject">Subject</label>
            <input id="subject" />
          </div>

          <div className={styles.textfield}>
            <label htmlFor="body">Message</label>
            <textarea id="body" />
          </div>

          <div>
            <button className={styles.button} type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
