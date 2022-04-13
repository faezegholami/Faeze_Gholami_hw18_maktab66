import "./App.css";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import React, { useContext, useState } from "react";

import "react-bootstrap";
import { Container, Row } from "react-bootstrap";
import { UserContext } from "./context/UserContext";
import Successful from "./components/Successful";

function App() {
  const [change, setChange] = useState(false);
  const { isSignin } = useContext(UserContext);
  console.log(isSignin);

  return (
    <>
      {isSignin ? (
        <Container className="container">
          <Row>
            <Successful />
          </Row>
        </Container>
      ) : (
        <Container className="container">
          <Row className="row">
            <button
              onClick={() => setChange(true)}
              className={change ? "grayBut" : ""}
            >
              ورود
            </button>
            <button
              onClick={() => setChange(false)}
              className={change ? "" : "grayBut"}
            >
              ثبت‌نام
            </button>
          </Row>
          {change ? (
            <Row>
              <SignIn />
            </Row>
          ) : (
            <Row>
              <SignUp />
            </Row>
          )}
        </Container>
      )}
    </>
  );
}

export default App;
