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

  return (
    <React.Fragment>
      <Head>
        <title>JP Calvo | Contact</title>
      </Head>

      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-grow flex flex-col justify-center p-2">
          <div>
            <div className="max-w-[350px] mx-auto">
              <section className="mb-4 text-sm text-gray-500 text-center">
                <p>Send an email to calvojp92@gmail.com</p>
              </section>

              <section>
                <Alert className="mb-4">
                  You have entered an invalid email
                </Alert>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <TextField id="email" label="Email" fullWidth autoFocus />
                  <TextField id="subject" label="Subject" fullWidth />
                  <TextField id="message" label="Message" fullWidth />
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
