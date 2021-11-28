import Footer from 'layouts/Footer';
import Header from 'layouts/Header';
import Head from 'next/head';
import * as React from 'react';
import Alert from 'widgets/Alert';
import Button from 'widgets/Button';
import TextField from 'widgets/TextField';

const Contact = () => {
  const [error, setError] = React.useState<string>();

  return (
    <React.Fragment>
      <Head>
        <title>JP Calvo | Contact</title>
      </Head>

      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-grow flex flex-col justify-center p-4">
          <div>
            <div className="max-w-[350px] mx-auto">
              <section className="mb-4 text-sm text-gray-500 text-center">
                <p>
                  <span>Send an email to </span>
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=calvojp92@gmail.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-700 hover:text-blue-600 transition-colors duration-300"
                  >
                    calvojp92@gmail.com
                  </a>
                </p>
              </section>

              <section>
                <Alert
                  open={!!error}
                  onClose={() => setError(undefined)}
                  variant="error"
                  className="mb-4"
                >
                  <p>{error}</p>
                </Alert>

                <form noValidate className="flex flex-col gap-4">
                  <TextField
                    id="email"
                    name="from"
                    label="Email"
                    autoFocus
                    required
                    fullWidth
                  />

                  <TextField
                    id="subject"
                    name="subject"
                    label="Subject"
                    fullWidth
                  />

                  <TextField
                    id="message"
                    name="body"
                    label="Message"
                    fullWidth
                    multiline
                  />

                  <Button variant="primary" type="submit">
                    Send
                  </Button>
                </form>
              </section>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </React.Fragment>
  );
};

export default Contact;
