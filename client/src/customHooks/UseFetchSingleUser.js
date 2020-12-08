import React from "react";
import { useDispatch } from "react-redux";
import {
  requestSingleUser,
  receiveSingleUser,
  errorSingleUser,
} from "../redux/actions/SingleUserActions";

const useFetchSingleUser = (id) => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(requestSingleUser());
    fetch(`http://localhost:4000/users/${id}`)
      .then((res) => res.json())
      .then((json) => {
        dispatch(receiveSingleUser(json.data));
      })
      .catch(() => {
        dispatch(errorSingleUser());
      });
  }, []);
};

export default useFetchSingleUser;
