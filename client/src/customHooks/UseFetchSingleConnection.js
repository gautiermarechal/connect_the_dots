import React from "react";
import { useDispatch } from "react-redux";
import {
  requestSingleConnection,
  receiveSingleConnection,
  errorSingleConnection,
} from "../redux/actions/SingleConnectionActions";

const useFetchSingleConnection = (id) => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(requestSingleConnection());
    fetch(`https://connectthedots-514.herokuapp.com/connections/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        dispatch(receiveSingleConnection(json.data));
      })
      .catch((err) => {
        dispatch(errorSingleConnection());
      });
  }, [id]);
};

export default useFetchSingleConnection;
