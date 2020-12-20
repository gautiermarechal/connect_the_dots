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
    fetch(`https://connectthedots-514.herokuapp.com/categories/${id}`)
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
