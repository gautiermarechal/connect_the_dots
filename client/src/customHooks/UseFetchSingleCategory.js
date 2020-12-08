import React from "react";
import { useDispatch } from "react-redux";
import {
  requestSingleCategory,
  receiveSingleCategory,
  errorSingleCategory,
} from "../redux/actions/SingleCategoryActions";

const useFetchSingleCategory = (id) => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(requestSingleCategory());
    fetch(`http://localhost:4000/categories/${id}`)
      .then((res) => res.json())
      .then((json) => {
        dispatch(receiveSingleCategory(json.data));
      })
      .catch(() => {
        dispatch(errorSingleCategory());
      });
  }, []);
};

export default useFetchSingleCategory;
