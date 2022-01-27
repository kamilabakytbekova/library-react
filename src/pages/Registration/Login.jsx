import React, { useContext, useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <Container
      style={{ position: "fixed", top: "50%", transform: "translateY(-50%)" }}
    >
      <Row className="justify-content-md-center ">
        <Col lg="auto">
          <Form onSubmit={handleSubmit} className="form-block">
            <h3>Войти</h3>
            <hr />
            {error && <Alert variant="danger">{error}</Alert>}

            {/* <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Control type="text" placeholder="Введите ваше имя" />
            </Form.Group> */}

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Введите email"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Введите пароль"
              />
            </Form.Group>

            <Form.Label>Еще нет аккаунта?</Form.Label>
            <Link style={{ marginLeft: 10 }} to={"/signIn"}>
              Зарегистрироваться
            </Link>
            <br />
            <Button variant="dark" type="submit">
              Войти
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
