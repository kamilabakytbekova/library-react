import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { StoreContext } from "../../contexts/StoreProvider";
import { AuthContext } from "../../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";

const MyBooks = () => {
  const { user } = useContext(AuthContext);
  const {
    getBooksFromCart,
    booksInCart,
    approvedHandler,
    filteredBooks,
    isFiltered,
  } = useContext(StoreContext);

  const [active, setActive] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      getBooksFromCart(user.uid);
    }
  }, [user]);

  const approved = (val) => {
    approvedHandler(val);
    if (val === true) {
      setActive("approved");
    } else {
      setActive("notApproved");
    }
  };

  const resetFilter = () => {
    setActive("");
    getBooksFromCart(user.uid);
  };

  if (!user) {
    navigate("/");
  }

  if (!booksInCart) {
    return <h2>Loading...</h2>;
  }
  if (booksInCart.length === 0) {
    return <h2 style={{ marginTop: "60px" }}>У вас нет книг</h2>;
  }

  return (
    <div>
      <div className="filter__block">
        <h2>Мои книги ({booksInCart.length})</h2>
        <div className="filter__block_items">
          <p>фильтр:</p>
          <button
            onClick={() => approved(true)}
            className={`available ${active === "approved" ? "active" : ""}`}
          >
            одобрено
          </button>
          <button
            onClick={() => approved(false)}
            className={`available ${active === "notApproved" ? "active" : ""}`}
          >
            неодобрено
          </button>

          {isFiltered ? (
            <button
              onClick={resetFilter}
              style={{
                color: "black",
                border: "none",
                backgroundColor: "transparent",
              }}
            >
              Сбросить
            </button>
          ) : null}
        </div>
      </div>
      <Container>
        <Row>
          {isFiltered
            ? filteredBooks.map((item) => (
                <Col md={3}>
                  <Card
                    key={item.id}
                    style={{ width: "18rem", height: "100%" }}
                  >
                    <Card.Img
                      variant="top"
                      src={item.image}
                      style={{ objectFit: "contain", height: "300px" }}
                    />
                    <Card.Body>
                      <Card.Title>{item.name}</Card.Title>
                      <Card.Text>{item.author}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            : booksInCart.map((item) => (
                <Col md={3}>
                  <Card
                    key={item.id}
                    style={{ width: "18rem", height: "100%" }}
                  >
                    <Card.Img
                      variant="top"
                      src={item.image}
                      style={{ objectFit: "contain", height: "300px" }}
                    />
                    <Card.Body>
                      <Card.Title>{item.name}</Card.Title>
                      <Card.Text>{item.author}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
        </Row>
      </Container>
    </div>
  );
};

export default MyBooks;
