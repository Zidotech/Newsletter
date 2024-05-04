import { useState, useEffect } from "react";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import InputField from "./InputField";

const CustomForm = ({ status, message, onValidated }) => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    if (status === "success") clearFields();
  }, [status]);

  const clearFields = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    email &&
      firstName &&
      lastName &&
      email.indexOf("@") > -1 &&
      onValidated({
        EMAIL: email,
        MERGE1: firstName,
        MERGE2: lastName,
      });
  };

  return (
    <form className="mc__form" onSubmit={(e) => handleSubmit(e)}>
      <h3 className="mc__title">Join our email list for future updates.</h3>

      {status === "sending" && (
        <div className="mc__alert mc__alert--sending">sending...</div>
      )}
      {status === "error" && (
        <div
          className="mc__alert mc__alert--error"
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
      {status === "success" && (
        <div
          className="mc__alert mc__alert--success"
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}

      <div className="mc__field-container">
        <InputField
          label="First Name"
          onChangeHandler={setFirstName}
          type="text"
          value={firstName}
          placeholder="Jane"
          isRequired
        />

        <InputField
          label="Last Name"
          onChangeHandler={setLastName}
          type="text"
          value={lastName}
          placeholder="Doe"
          isRequired
        />

        <InputField
          label="Email"
          onChangeHandler={setEmail}
          type="email"
          value={email}
          placeholder="your@email.com"
          isRequired
        />
      </div>

      <InputField
        label="subscribe"
        type="submit"
        formValues={[email, firstName, lastName]}
      />
    </form>
  );
};

const MailchimpForm = () => {
  const postUrl = `https://xyz.us17.list-manage.com/subscribe/post?u=${
    import.meta.env.VITE_REACT_APP_MAILCHIMP_U
  }&id=${import.meta.env.VITE_REACT_APP_MAILCHIMP_ID}`;

  return (
    <div>
      <MailchimpSubscribe
        url={postUrl}
        render={({ subscribe, status, message }) => (
          <CustomForm
            status={status}
            message={message}
            onValidated={(formData) => subscribe(formData)}
          />
        )}
      />
    </div>
  );
};

export default MailchimpForm;
