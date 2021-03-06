import React from "react";
import { useDispatch } from "react-redux";
import {
  errorSingleCategoryConnections,
  receiveSingleCategoryConnections,
  requestSingleCategoryConnections,
} from "../redux/actions/SingleCategoryConnectionsActions";

const useFetchCategoryConnections = (id) => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(requestSingleCategoryConnections());
    fetch(`https://connectthedots-514.herokuapp.com/connections/category/${id}`)
      .then((res) => res.json())
      .then((json) => {
        dispatch(receiveSingleCategoryConnections(json.data));
      })
      .catch(() => {
        dispatch(errorSingleCategoryConnections());
      });
  }, []);
};

export default useFetchCategoryConnections;
