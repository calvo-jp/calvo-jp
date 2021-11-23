import Footer from 'layouts/Footer';
import Header from 'layouts/Header';
import Head from 'next/head';
import * as React from 'react';
import Alert from 'widgets/Alert';
import Button from 'widgets/Button';
import TextField from 'widgets/TextField';

interface Mail {
  from: string;
  body: string;
  subject: string;
}

type ValidationError = Partial<Record<keyof Mail, boolean>>;

const sendMail = async (mail: Mail) => {};

const initMail: Mail = {
  body: '',
  from: '',
  subject: '',
};

const Contact = () => {
  const [mail, setMail] = React.useState<Mail>(initMail);

  const [validationErrors, setValidationErrors] =
    React.useState<ValidationError>({});

  const [httpRequestError, setHttpRequestError] = React.useState<string>();

  /** event handler */
  const handler = {
    /** input onchange handler */
    onChange(e: React.ChangeEvent<HTMLInputElement>) {
      setMail((state) => ({ ...state, [e.target.name]: e.target.value }));
    },

    /** form onsubmit handler */
    async onSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      await sendMail(mail);
    },

    /** reset http error */
    onClose() {
      setHttpRequestError(undefined);
    },
  };

  React.useEffect(() => {
    return () => {
      setMail(initMail);
      setValidationErrors({});
      setHttpRequestError(undefined);
    };
  }, []);

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
                  open={!!httpRequestError}
                  variant="error"
                  onClose={handler.onClose}
                  className="mb-4"
                >
                  <p>{httpRequestError}</p>
                </Alert>

                <form
                  noValidate
                  onSubmit={handler.onSubmit}
                  className="flex flex-col gap-4"
                >
                  <TextField
                    id="email"
                    name="from"
                    label="Email"
                    value={mail.from}
                    onChange={handler.onChange}
                    autoFocus
                    required
                    fullWidth
                  />

                  <TextField
                    id="subject"
                    name="subject"
                    label="Subject"
                    value={mail.subject}
                    onChange={handler.onChange}
                    fullWidth
                  />

                  <TextField
                    id="message"
                    name="body"
                    label="Message"
                    value={mail.body}
                    onChange={handler.onChange}
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
