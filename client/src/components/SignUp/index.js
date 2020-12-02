import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { COLORS } from "../../constants";
import createUser from "../../handlers/CreateUser";
import { v4 as uuidv4 } from "uuid";
import { useHistory } from "react-router-dom";
import {
  isEmailValid,
  isPasswordGoodLength,
  isValidEmpty,
} from "../../handlers/validators/SignUpValidators";

const SignUp = () => {
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [displayError, setDisplayError] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  useEffect(() => {}, [errors]);

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

  const handleSubmit = () => {
    //Check if any input is empty
    if (!isValidEmpty(user)) {
      if (!errors.includes("Please fill in all the required fields"))
        setErrors([...errors, "Please fill in all the required fields"]);
    } else {
      const tempArr = errors;
      tempArr.splice(
        tempArr.indexOf("Please fill in all the required fields"),
        1
      );
      setErrors(tempArr);
    }

    //Check password
    if (!isPasswordGoodLength(user)) {
      if (!errors.includes("Password is too short"))
        setErrors([...errors, "Password is too short"]);
    } else {
      const tempArr = errors;
      tempArr.splice(tempArr.indexOf("Password is too short"), 1);
      setErrors(tempArr);
    }

    //Check email
    if (!isEmailValid(user)) {
      if (!errors.includes("Email is not valid"))
        setErrors([...errors, "Email is not valid"]);
    } else {
      const tempArr = errors;
      tempArr.splice(tempArr.indexOf("Email is not valid"), 1);
      setErrors(tempArr);
    }

    //Display errors
    if (!canSubmit) {
      setDisplayError(true);
    } else {
      setDisplayError(false);
    }

    if (errors.length > 0) {
      setCanSubmit(false);
    } else {
      setCanSubmit(true);
    }

    if (canSubmit) {
      createUser({
        _id: uuidv4(),
        ...user,
        connections: [],
        connections_bookmarked: [],
      });
      history.push("signup-success");
    }
  };

  return (
    <>
      <MainContainer>
        <SignUpContainer>
          <Title>Sign Up</Title>
          <Form>
            <Label htmlFor="name-input">Name *</Label>
            <Input
              id="name-input"
              placeholder="You can be anonymous..."
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              required={true}
            />
            <Label htmlFor="username-input">Username *</Label>
            <Input
              id="username-input"
              placeholder="This has to be unique"
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              required={true}
            />
            <Label htmlFor="email-input">Email *</Label>
            <Input
              id="email-input"
              type="email"
              onChange={(e) => {
                setUser({ ...user, email: e.target.value });
              }}
              required={true}
            />
            <Label htmlFor="password-input">Password *</Label>
            <Input
              id="password-input"
              type="password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              required={true}
            />
          </Form>
          <SubmitButton type="submit" onClick={handleSubmit}>
            Submit
          </SubmitButton>
          <ErrorContainer>
            {errors.map((error) => {
              return <ErrorList>{error}</ErrorList>;
            })}
          </ErrorContainer>
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
  background-color: ${COLORS.lightGreen};
  height: auto;
  width: 500px;
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),
    0 100px 80px rgba(0, 0, 0, 0.12);
  border-radius: 7px;
  padding: 40px;
  margin-top: 20px;
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

export default SignUp;
