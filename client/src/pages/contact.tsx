import Footer from "layouts/Footer";
import Header from "layouts/Header";
import Head from "next/head";
import * as React from "react";
import validateEmail from "utils/validateEmail";
import Alert from "widgets/Alert";
import Button from "widgets/Button";
import TextField from "widgets/TextField";

interface Email {
  from: string;
  body: string;
  subject?: string;
}

type Error = Partial<Email>;
type Touch = Partial<Record<EmailKey, boolean>>;
type EmailKey = keyof Email;

interface RequestStatus {
  error?: boolean;
  pending?: boolean;
}

const defaultEmail: Email = {
  from: "",
  body: "",
};

const Contact = () => {
  const [email, setEmail] = React.useState<Email>(defaultEmail);
  const [status, setStatus] = React.useState<RequestStatus>({});
  const [errors, setErrors] = React.useState<Error>({});
  const [touched, setTouched] = React.useState<Touch>({});

  const markTouched = (key: EmailKey) => {
    if (!touched[key]) {
      setTouched((state) => ({
        ...state,
        [key]: true,
      }));
    }
  };

  const saveError = (key: EmailKey, error: string) => {
    if (errors[key] && errors[key] === error) return;

    setErrors((state) => ({
      ...state,
      [key]: error,
    }));
  };

  const validate = (key: EmailKey, value: string) => {
    switch (key) {
      // required, email
      case "from":
        if (value === "") return saveError(key, "email is required");
        if (!validateEmail(value))
          return saveError(key, "invalid email format");
        break;

      // required, min 25, max 255
      case "body":
        if (value === "") return saveError(key, "body is required");
        if (value.trim().length < 25)
          return saveError(key, "body must be 25 characters or more");
        if (value.trim().length > 255)
          return saveError(key, "body must be 255 characters or less");
        break;

      // optional, min 15, max 50
      case "subject":
        if (value !== "") {
          if (value.trim().length < 15)
            return saveError(key, "body must be 15 characters or more");
          if (value.trim().length > 50)
            return saveError(key, "body must be 50 characters or less");
        }

        break;
      default:
        break;
    }

    setErrors((state) => ({
      ...state,
      [key]: false,
    }));
  };

  /** textifield event handlers */
  const listeners = {
    onBlur: (e: React.FocusEvent<HTMLInputElement, Element>) => {
      const name = e.target.name as EmailKey;
      const value = e.target.value;

      markTouched(name);
      validate(name, value);
    },
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      const name = e.target.name as EmailKey;
      const value = e.target.value;

      markTouched(name);
      validate(name, value);

      setEmail((state) => ({
        ...state,
        [name]: value,
      }));
    },
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setStatus((state) => ({
      ...state,
      pending: true,
    }));
  };

  React.useEffect(() => {
    return () => {
      setEmail(defaultEmail);
      setErrors({});
      setTouched({});
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
                <Alert variant="error" open={!!status.error} className="mb-4">
                  {status.error}
                </Alert>

                <form
                  noValidate
                  className="flex flex-col gap-4"
                  onSubmit={handleSubmit}
                >
                  <TextField
                    id="email"
                    name="from"
                    label="Email"
                    autoFocus
                    required
                    fullWidth
                    error={touched.from && !!errors.from}
                    errorText={errors.from}
                    {...listeners}
                  />

                  <TextField
                    id="subject"
                    name="subject"
                    label="Subject"
                    fullWidth
                    error={touched.subject && !!errors.subject}
                    errorText={errors.subject}
                    {...listeners}
                  />

                  <TextField
                    id="message"
                    name="body"
                    label="Message"
                    fullWidth
                    multiline
                    error={touched.body && !!errors.body}
                    errorText={errors.body}
                    {...listeners}
                  />

                  <Button
                    type="submit"
                    variant="primary"
                    disabled={status.pending}
                  >
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
