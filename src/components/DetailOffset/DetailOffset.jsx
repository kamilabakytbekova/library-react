import { useState, useEffect, useContext } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import { AuthContext } from "../../contexts/AuthProvider";
import { StoreContext } from "../../contexts/StoreProvider";

const OffsetBookDetail = ({ show, handleClose, bookId }) => {
  const [currentBook, setCurrentBook] = useState({});

  const { books, addBookToMyBooks, booksInCart, getBooksFromCart } =
    useContext(StoreContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    setCurrentBook(books.filter((item) => item.id === bookId)[0]);
  }, [bookId]);

  useEffect(() => {
    if (user) {
      getBooksFromCart(user.uid);
    }
  }, [user]);

  const handleAddToCart = (cartsBook) => {
    addBookToMyBooks(cartsBook, user.uid);
  };

  if (!currentBook) return <h1>No book!</h1>;

  return (
    <Offcanvas show={show} onHide={handleClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>{currentBook.name}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {currentBook.author}, {currentBook.year}
        <img
          style={{ marginTop: "20px", width: 300 }}
          src={currentBook.image}
          alt=""
        />
        <br />
        {booksInCart &&
        booksInCart.filter((item) => currentBook.id === item.id).length ? (
          <p style={{ marginTop: "40px" }}>Книга взята</p>
        ) : (
          <button
            onClick={() => handleAddToCart(currentBook)}
            className="available detail-btn"
          >
            Взять книгу
          </button>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};
export default OffsetBookDetail;
