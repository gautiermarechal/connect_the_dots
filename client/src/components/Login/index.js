import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { COLORS } from "../../constants";
import { useHistory } from "react-router-dom";
import {
  isValidEmail,
  isValidEmpty,
  userMatches,
} from "../../handlers/validators/LoginValidators";

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

  useEffect(() => {
    if (errors.length > 0) {
      setDisplayError(true);
    } else {
      setDisplayError(false);
    }
  }, [errors]);

  const handleSubmit = () => {
    if (isValidEmpty(email, password)) {
      setEmpty(false);
    } else {
      setEmpty(true);
      if (!errors.includes("Please fill in all required fields")) {
        setErrors([...errors, "Please fill in all required fields"]);
      }
    }
    //Check user exist
    if (emailIsValid && !empty) {
      userMatches(email, password).then((result) => {
        if (result) {
          setUserFound(true);
          setCanSubmit(true);
        } else {
          setUserFound(false);
          if (
            !errors.includes(
              "Could not find an account matching with these credentials"
            )
          ) {
            setErrors([
              ...errors,
              "Could not find an account matching with these credentials",
            ]);
          }
        }
      });
    }

    if (canSubmit) {
      history.push("/user-feed");
    }
  };

  const onChangeEmail = () => {
    //Check email
    if (isValidEmail(email)) {
      setEmailIsValid(true);
      const index = errors.indexOf("Email is not valid");
      errors.splice(index, 1);
    } else {
      setEmailIsValid(false);
      if (!errors.includes("Email is not valid")) {
        setErrors([...errors, "Email is not valid"]);
      }
    }
  };

  const ErrorContainer = styled.div`
    background-color: rgba(255, 26, 26, 0.2);
    display: ${displayError ? "flex" : "none"};
    flex-direction: column;
    width: 100%;
  `;

  const ErrorList = styled.ul`
    list-style-type: none;
  `;

  const Error = styled.li``;
  return (
    <>
      <MainContainer>
        <LoginContainer>
          <Title>Login</Title>
          <Form>
            <Label htmlFor="email-input" type="email">
              Email
            </Label>
            <Input
              id="email-input"
              onChange={(e) => {
                setEmail(e.target.value);
                onChangeEmail();
              }}
            />
            <Label htmlFor="password-input">Password</Label>
            <Input
              id="password-input"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form>
          <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
          <ErrorContainer>
            <ErrorList>
              {errors.map((error) => (
                <Error>{error}</Error>
              ))}
            </ErrorList>
          </ErrorContainer>
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

export default Login;
