import React, { useContext, useEffect } from "react";
import book from "../../img/book.png";
import { Card, Col, Row } from "react-bootstrap";
import { StoreContext } from "../../contexts/StoreProvider";
import { AuthContext } from "../../contexts/AuthProvider";

const MyBooks = () => {
  const { books, getBooks, getBooksFromCart, booksInCart } =
    useContext(StoreContext);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    getBooks();
  }, []);

  useEffect(() => {
    if (user && books) {
      getBooksFromCart(user.uid);
      console.log("Auth");
    }
  }, [user, books]);
  console.log(booksInCart);
  if (!booksInCart) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <div className="filter__block">
        <h2>Мои книги</h2>

        <div className="filter__block_items">
          <p>фильтр:</p>
          <p className="available">одобрено</p>
          <p className="available">неодобрено</p>
        </div>

        <div className="filter__block_items">
          <p>сортировка:</p>
          <p className="available">по году издания</p>
          <p className="available">по алфавиту</p>
        </div>
      </div>
      <Row style={{ marginTop: "40px" }}>
        <Col>
          {booksInCart.map((item) => (
            <Card key={item.id} style={{ width: "18rem" }}>
              <Card.Img variant="top" src={item.image} />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>{item.author}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </div>
  );
};

export default MyBooks;
