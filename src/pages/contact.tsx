import { Field, Form, Formik } from "formik";
import Footer from "layouts/Footer";
import Header from "layouts/Header";
import Head from "next/head";
import * as React from "react";
import request from "utils/request";
import Alert from "widgets/Alert";
import Button from "widgets/Button";
import TextField from "widgets/TextField";
import * as yup from "yup";

const Contact = () => {
  const [error, setError] = React.useState("");

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
                    href="mailto:calvojp92@gmail.com"
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
                  variant="error"
                  className="mb-4"
                  onClose={() => setError("")}
                >
                  {error}
                </Alert>

                <Formik
                  initialValues={{
                    sender: "",
                    subject: "",
                    body: "",
                  }}
                  validationSchema={yup.object().shape({
                    sender: yup
                      .string()
                      .trim()
                      .email("invalid email format")
                      .required("email is required"),
                    subject: yup
                      .string()
                      .trim()
                      .min(15, "subject must be 15 or characters more")
                      .max(50, "subject must be 50 or characters less"),
                    body: yup
                      .string()
                      .trim()
                      .min(25, "body must be 25 or characters more")
                      .max(255, "body must be 255 or characters less")
                      .required("body is required"),
                  })}
                  onSubmit={async (values) => {
                    const email: Partial<typeof values> = {
                      sender: values.sender,
                      subject: values.subject,
                      body: values.body,
                    };

                    // yup adds a value of empty string for optional fields left empty
                    if (email.subject === "") delete email.subject;

                    try {
                      const response = await request.post("/emails", {
                        body: JSON.stringify(email),
                      });

                      const parsed = await response.json();

                      if (!response.ok) console.error(parsed);

                      console.log(parsed);
                    } catch (e) {
                      console.error(e);
                    }
                  }}
                >
                  {({ touched, errors, isSubmitting }) => (
                    <Form noValidate className="flex flex-col gap-4">
                      <Field
                        as={TextField}
                        id="email"
                        name="sender"
                        label="Email"
                        autoFocus
                        required
                        fullWidth
                        error={touched.sender && !!errors.sender}
                        errorText={errors.sender}
                      />

                      <Field
                        as={TextField}
                        id="subject"
                        name="subject"
                        label="Subject"
                        fullWidth
                        error={touched.subject && !!errors.subject}
                        errorText={errors.subject}
                      />

                      <Field
                        as={TextField}
                        id="message"
                        name="body"
                        label="Message"
                        fullWidth
                        multiline
                        error={touched.body && !!errors.body}
                        errorText={errors.body}
                      />

                      <Button
                        type="submit"
                        variant="primary"
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
