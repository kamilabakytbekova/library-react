import React, { useContext, useState } from "react";
import searchIcon from "./../../img/search.png";
import { FormControl, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../contexts/StoreProvider";

const Search = () => {
  const search = new URLSearchParams(window.location.search);
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState(search.get("q") || "");

  const { getSearchBook, getBooks } = useContext(StoreContext);

  const searchBook = (key, value) => {
    search.set(key, value);
    let newPath = `${window.location.pathname}?${search.toString()}`;
    navigate(newPath);
    setSearchValue(search.get("q") || "");
    if (!searchValue) {
      getBooks();
    } else {
      getSearchBook(key, value);
    }
  };

  return (
    <div>
      <InputGroup style={{ minWidth: "500px" }}>
        <FormControl
          value={searchValue}
          onChange={(e) => searchBook("q", e.target.value)}
          placeholder="Search"
          aria-label="Search"
          aria-describedby="basic-addon2"
        />
        <InputGroup.Text id="basic-addon2">
          <img src={searchIcon} />
        </InputGroup.Text>
      </InputGroup>
    </div>
  );
};

export default Search;
