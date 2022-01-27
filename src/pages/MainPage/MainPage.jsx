import React, { useEffect } from "react";
import "./MainPage.css";
import { Card, Col, Row } from "react-bootstrap";
import { useState, useContext } from "react";
import OffsetBookDetail from "../../components/DetailOffset/DetailOffset";
import { StoreContext } from "../../contexts/StoreProvider";
import firestore from "../../components/Firebase/Firebase";

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
    getSearchBook,
    sortBooks,
    books,
    getBooks,
    filteredBooks,
    isFiltered,
  } = useContext(StoreContext);

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

  return (
    <div>
      <div className="filter__block">
        <h2>{books.length} книги</h2>

        <div className="filter__block_items">
          <p>фильтр:</p>
          <button variant="dark" className="available">
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
                <Col key={item.id}>
                  <Card
                    onClick={() => handleShow(item.id)}
                    style={{ width: "18rem" }}
                  >
                    <Card.Img variant="top" src={item.image} />
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
                <Col key={item.id}>
                  <Card
                    onClick={() => handleShow(item.id)}
                    style={{ width: "18rem" }}
                  >
                    <Card.Img variant="top" src={item.image} />
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
