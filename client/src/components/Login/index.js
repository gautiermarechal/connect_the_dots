import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { COLORS } from "../../constants";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //Validators
  const [emailIsValid, setEmailIsValid] = useState();
  const [empty, setEmpty] = useState();
  const [userFound, setUserFound] = useState();
  const [canSubmit, setCanSubmit] = useState(false);
  //Errors
  const [errors, setErrors] = useState([]);
  const [displayError, setDisplayError] = useState(false);

  return (
    <>
      <MainContainer>
        <LoginContainer>
          <Title>Login</Title>
          <Formik
            initialValues={{ email: "", password: "" }}
            validate={(values) => {
              const errors = {};

              if (!values.email) {
                errors.email = "Required";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }
              if (!values.password) {
                errors.password = "Required";
              }

              console.log(errors);

              return fetch(`http://localhost:4000/users/email/${values.email}`)
                .then((res) => res.json())
                .then((json) => {
                  if (json.status === 200) {
                    if (values.password !== json.data.password) {
                      errors.email = "Credentials not found";
                    }
                  } else {
                    errors.email = "Credentials not found";
                  }

                  return errors;
                });
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                setSubmitting(false);
                localStorage.setItem("user-email", values.email);
                history.push("/");
                window.location.reload();
              }, 400);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (
              <Form onSubmit={handleSubmit}>
                <Label htmlFor="email" type="email">
                  Email *
                </Label>
                <Input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  placeholder="Enter your email address"
                />
                <ErrorContainer>
                  <Error>{errors.email && touched.email && errors.email}</Error>
                </ErrorContainer>
                <Label htmlFor="password">Password *</Label>
                <Input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  placeholder="Enter your password here"
                />
                <ErrorContainer>
                  <Error>
                    {errors.password && touched.password && errors.password}
                  </Error>
                </ErrorContainer>
                <SubmitButton type="submit" disabled={isSubmitting}>
                  Submit
                </SubmitButton>
              </Form>
            )}
          </Formik>
        </LoginContainer>
      </MainContainer>
    </>
  );
};

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${COLORS.lightGreen};
  height: auto;
  width: 500px;
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),
    0 100px 80px rgba(0, 0, 0, 0.12);
  border-radius: 7px;
  padding: 40px;
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label``;

const Input = styled.input`
  margin-bottom: 20px;
  border-style: solid;
  border-color: #d3d7d7;
  border-width: 1px;
  border-radius: 7px;
  width: 325px;
  height: 40px;
  padding: 15px;
`;

const SubmitButton = styled.button`
  background-color: ${COLORS.green};
  border-style: none;
  border-radius: 3px;
  color: white;
  padding: 5px;
  width: 110px;
  margin: 2px;
  height: 30px;
  cursor: pointer;
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 7px;
`;

const Error = styled.div`
  color: red;
  margin-top: -15px;
  margin-bottom: 15px;
`;

export default Login;
