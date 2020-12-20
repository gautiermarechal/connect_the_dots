import React from "react";
import { useDispatch } from "react-redux";
import {
  errorCategories,
  receiveCategories,
  requestCategories,
} from "../redux/actions/CategoriesActions";

const useFetchCategories = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(requestCategories());
    fetch("https://connectthedots-514.herokuapp.com/categories")
      .then((res) => res.json())
      .then((json) => {
        dispatch(receiveCategories(json.data));
      })
      .catch(() => {
        dispatch(errorCategories());
      });
  }, []);
};

export default useFetchCategories;
