import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../services/authentication.service";

const Login = (props) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    props.funcNav(false);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        email,
        password,
        isAdmin: 0,
      };

      const result = await loginUser(data);
      if (result.status === "success") {
        localStorage.setItem("token", result.accessToken);
        return navigate("/", { replace: true });
      }
      return alert(result.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="mainContainer">
      <Row>
        <Col className="titleContainer justifyCenter" xs={12} md={12}>
          Login Employee
        </Col>
        <Col xs={12} md={12} className="mt-1 justifyCenter">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                onChange={(ev) => setEmail(ev.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPlaintextPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(ev) => setPassword(ev.target.value)}
                required
              />
            </Form.Group>
            <Button
              type="submit"
              variant="success"
              className="loginButtonWidth"
            >
              Login
            </Button>{" "}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
