import React from "react";
import styled from "styled-components";
import { COLORS } from "../../constants";
import createUser from "../../handlers/CreateUser";
import { v4 as uuidv4 } from "uuid";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";

const SignUp = () => {
  const history = useHistory();

  return (
    <>
      <MainContainer>
        <SignUpContainer>
          <Title>Sign Up</Title>
          <Formik
            initialValues={{ name: "", username: "", email: "", password: "" }}
            validate={(values) => {
              const errors = {};
              if (!values.name) {
                errors.name = "Required";
              }
              if (!values.username) {
                errors.username = "Required";
              }

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
              return fetch(`http://localhost:4000/users/email/${values.email}`)
                .then((res) => res.json())
                .then((json) => {
                  if (json.status === 200) {
                    errors.email = "This email is already taken";
                  }

                  return errors;
                });
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                setSubmitting(false);
                createUser({
                  _id: uuidv4(),
                  name: values.name,
                  username: values.username,
                  email: values.email,
                  password: values.password,
                  connections: [],
                  connections_bookmarked: [],
                  books_bookmarked: [],
                  categories_bookmarked: [],
                  authors_bookmarked: [],
                });
                history.push("/signup-success");
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
                <Label htmlFor="name">Name *</Label>
                <Input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  placeholder="You can be anonymous..."
                />
                <ErrorContainer>
                  <Error> {errors.name && touched.name && errors.name}</Error>
                </ErrorContainer>
                <Label htmlFor="username">Username *</Label>
                <Input
                  type="text"
                  name="username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                  placeholder="Enter your username"
                />
                <ErrorContainer>
                  <Error>
                    {errors.username && touched.username && errors.username}
                  </Error>
                </ErrorContainer>
                <Label htmlFor="email">Email *</Label>
                <Input
                  type="text"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  placeholder="Enter your email"
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
                  placeholder="Enter your password"
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
        </SignUpContainer>
      </MainContainer>
    </>
  );
};

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
`;

const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  width: 500px;
  box-shadow: 0 1px 4px 0 rgba(21, 27, 38, 0.08);
  background-color: white;
  border-radius: 7px;
  padding: 40px;
  margin-top: 50px;
  margin-bottom: 50px;
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
  background-color: ${COLORS.blue};
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

export default SignUp;
