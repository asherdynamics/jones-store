import { useState } from "react";

import Form from "@Components/Form";
import TextField from "@Components/common/formControls/TextField";
import Button from "@Components/common/formControls/Button";
import { userLoginSchema } from "@Lib/validations";
import { validateInput, validateInputs } from "@Lib/helpers";
import { useAuthState } from "@Lib/contexts/AuthContext";
import { UserType } from "src/types/shared";
import Router from "next/router";

const defaultUserCred = {
  user: "devnuggetsbusinesss@gmail.com",
  pass: "Password101",
};

const validateFormField = validateInput(userLoginSchema);

export default function SignIn() {
  const [formErrors, setFormErrors] = useState<formParams>({});
  const { setAuthUser } = useAuthState();

  return (
    <>
      <h2 className="auth__header">Sign In</h2>
      <Form
        method="POST"
        action="/api/auth/signin"
        beforeSubmit={(params) => {
          const error = validateInputs(params, userLoginSchema);
          if (error) {
            error.inner.forEach((error) => {
              setFormErrors((formErrors) => ({
                ...formErrors,
                [error.path as string]: error.message,
              }));
            });
            return [params, false];
          }
        }}
        afterSubmit={(res) => {
          setAuthUser(res.data as UserType);
          Router.push(location.origin);
        }}
      >
        <TextField
          error={formErrors["email"]}
          defaultValue={defaultUserCred.user}
          name="email"
          label="Email or User"
          required
          onBlur={(e) =>
            setFormErrors({
              ...formErrors,
              email: validateFormField("email", e.target.value),
            })
          }
        />
        <TextField
          error={formErrors["password"]}
          defaultValue={defaultUserCred.pass}
          name="password"
          type="password"
          label="Password"
          required
          onBlur={(e) =>
            setFormErrors({
              ...formErrors,
              password: validateFormField("password", e.target.value),
            })
          }
        />
        <Button type="submit">Sign In</Button>
      </Form>
    </>
  );
}

interface formParams {
  email?: string;
  password?: string;
}
