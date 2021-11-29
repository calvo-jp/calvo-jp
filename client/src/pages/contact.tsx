import { Form, Formik } from 'formik';
import Footer from 'layouts/Footer';
import Header from 'layouts/Header';
import Head from 'next/head';
import * as React from 'react';
import Alert from 'widgets/Alert';
import Button from 'widgets/Button';
import TextField from 'widgets/TextField';
import * as yup from 'yup';

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

                <Formik
                  initialValues={{
                    from: '',
                    subject: '',
                    body: '',
                  }}
                  validationSchema={yup.object().shape({
                    from: yup.string().email().max(100).required(),
                    subject: yup.string().min(10).max(50),
                    body: yup.string().min(15).max(255).required(),
                  })}
                  onSubmit={async (values) => {
                    console.log(values);
                  }}
                >
                  {({
                    handleBlur,
                    handleChange,
                    values,
                    errors,
                    touched,
                    isSubmitting,
                  }) => (
                    <Form noValidate className="flex flex-col gap-4">
                      <TextField
                        id="email"
                        name="from"
                        label="Email"
                        autoFocus
                        required
                        fullWidth
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.from}
                        error={touched.from && !!errors.from}
                        errorText={errors.from}
                      />

                      <TextField
                        id="subject"
                        name="subject"
                        label="Subject"
                        fullWidth
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.subject}
                        error={touched.subject && !!errors.subject}
                        errorText={errors.subject}
                      />

                      <TextField
                        id="message"
                        name="body"
                        label="Message"
                        fullWidth
                        multiline
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.body}
                        error={touched.body && !!errors.body}
                        errorText={errors.body}
                      />

                      <Button
                        variant="primary"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        Send
                      </Button>
                    </Form>
                  )}
                </Formik>
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
