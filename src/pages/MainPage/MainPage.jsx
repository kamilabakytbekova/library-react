import React, { useEffect } from "react";
import "./MainPage.css";
import { Card, Col, Row } from "react-bootstrap";
import { useState, useContext } from "react";
import OffsetBookDetail from "../../components/DetailOffset/DetailOffset";
import { StoreContext } from "../../contexts/StoreProvider";
import firestore from "../../components/Firebase/Firebase";
import { AuthContext } from "../../contexts/AuthProvider";

const MainPage = () => {
  const [show, setShow] = useState(false);
  const [book, setBook] = useState(null);
  const [value, setValue] = useState("default");

  const handleClose = () => setShow(false);
  const handleShow = (bookId) => {
    setBook(bookId);
    setShow(true);
  };

  const {
    sortBooks,
    books,
    getBooks,
    filteredBooks,
    isFiltered,
    availableHandler,
  } = useContext(StoreContext);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    getBooks();
  }, []);

  if (!books) {
    return <h2>Loading...</h2>;
  }

  const sortHandler = (val) => {
    setValue(val);
    sortBooks(val);
  };

  const availableClick = () => {
    availableHandler();
  };

  return (
    <div>
      <div className="filter__block">
        <h2>{books.length} книги</h2>

        <div className="filter__block_items">
          <p>фильтр:</p>
          <button onClick={availableClick} variant="dark" className="available">
            доступные
          </button>
        </div>

        <div className="filter__block_items">
          <p>сортировка:</p>
          <button
            className="available"
            onClick={() => sortHandler("year")}
            className="available"
            variant="dark"
          >
            по году издания
          </button>
          <button
            onClick={() => sortHandler("name")}
            className="available"
            variant="dark"
          >
            по алфавиту
          </button>
        </div>
      </div>
      <Row style={{ marginTop: "40px" }}>
        {isFiltered
          ? filteredBooks.map((item) => {
              return (
                <Col md={3} key={item.id}>
                  <Card
                    onClick={() => handleShow(item.id)}
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
                      <Card.Text>{item.year}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })
          : books.map((item) => {
              return (
                <Col md={3} key={item.id}>
                  <Card
                    onClick={() => handleShow(item.id)}
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
                      <Card.Text>{item.year}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
      </Row>
      {show && (
        <OffsetBookDetail show={show} handleClose={handleClose} bookId={book} />
      )}
    </div>
  );
};

export default MainPage;
