import React from "react";
import { useDispatch } from "react-redux";
import {
  requestSingleBook,
  receiveSingleBook,
  errorSingleBook,
} from "../redux/actions/SingleBookActions";

const useFetchSingleBook = (query) => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(requestSingleBook());
    fetch(`https://connectthedots-514.herokuapp.com/books?query=${query}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        dispatch(receiveSingleBook(json.data.items[0]));
      })
      .catch((err) => {
        dispatch(errorSingleBook());
      });
  }, [query]);
};

export default useFetchSingleBook;
