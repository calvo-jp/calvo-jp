import Footer from 'layouts/Footer';
import Header from 'layouts/Header';
import Head from 'next/head';
import * as React from 'react';
import Alert from 'widgets/Alert';
import Button from 'widgets/Button';
import TextField from 'widgets/TextField';

const Contact = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

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
                <p>Send an email to calvojp92@gmail.com</p>
              </section>

              <section>
                <Alert
                  open={!!error}
                  onClose={() => setError('')}
                  variant="error"
                  className="mb-4"
                >
                  <p>{error}</p>
                </Alert>

                <form
                  noValidate
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-4"
                >
                  <TextField
                    id="email"
                    label="Email"
                    fullWidth
                    autoFocus
                    required
                  />
                  <TextField id="subject" label="Subject" fullWidth />
                  <TextField id="message" label="Message" fullWidth multiline />

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
