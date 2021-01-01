import React, { useState, ChangeEvent, useContext } from "react";
import { Redirect } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Button,
} from "reactstrap";
import { AuthContext } from "../../contexts/auth.context";
import { auth } from "../../firebase/firebase";
import classes from "./Auth.module.css";
const Auth: React.FC = () => {
  const { currentUser } = useContext(AuthContext);
  interface InputData {
    email: string;
    password: string;
  }
  const [inputValue, setInputValue] = useState<InputData>({
    email: "",
    password: "",
  });
  const handleSignUp = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const email = inputValue.email;
    const password = inputValue.password;
    if (password.trim() && email.trim()) {
      try {
        await auth.createUserWithEmailAndPassword(email, password);
        await auth.currentUser?.getIdToken(true);
        // window.location.href = "/homepage";
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSignIn = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const email = inputValue.email;
    const password = inputValue.password;
    if (password.trim() && email.trim()) {
      try {
        await auth.signInWithEmailAndPassword(email, password);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleEmailChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setInputValue((prev) => ({ ...prev, email: target.value }));
  };
  const handlePasswordChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setInputValue((prev) => ({ ...prev, password: target.value }));
  };
  if (currentUser) {
    return <Redirect to="/homepage" />;
  }
  return (
    <Container>
      <Row className="m-0 mt-4 mb-4">
        <Col className="p-3" lg={{ size: 8, offset: 2 }} md={12} sm={12}>
          <Form
            name="signup"
            onSubmit={(e) => e.preventDefault()}
            className={classes.Form}>
            <Row>
              <Col>
                <FormGroup>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    value={inputValue.email}
                    onChange={handleEmailChange}
                    className={classes.Input}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    value={inputValue.password}
                    onChange={handlePasswordChange}
                    className={classes.Input}
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col className="pr-2">
                <FormGroup>
                  <Button
                    type="submit"
                    block
                    onClick={async (e) => handleSignIn(e)}
                    className={classes.SignInButton}>
                    Sign In
                  </Button>
                </FormGroup>
              </Col>
              <Col className="pl-2">
                <FormGroup style={{ textAlign: "right" }}>
                  <Button
                    type="submit"
                    block
                    onClick={async (e) => handleSignUp(e)}
                    className={classes.SignUpButton}>
                    Sign Up
                  </Button>
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Auth;
