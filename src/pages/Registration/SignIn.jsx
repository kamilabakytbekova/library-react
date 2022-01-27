import React, { useContext, useState } from "react";
import { Button, Col, Container, Form, Row, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const { signUp } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(email, password, name);
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
          <Form className="form-block" onSubmit={handleSubmit}>
            <h3>Регистрация</h3>
            {error && <Alert variant="danger">{error}</Alert>}
            <hr />
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Control
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Введите ваше имя"
              />
            </Form.Group>
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

            <Form.Label>Уже есть аккаунт?</Form.Label>
            <Link style={{ marginLeft: 10 }} to={"/login"}>
              Войти
            </Link>
            <br />
            <Button variant="dark" type="submit">
              Зарегистрироваться
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignIn;
