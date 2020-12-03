import React from "react";
import { useDispatch } from "react-redux";
import {
  requestCurrentUser,
  receiveCurrentUser,
  errorCurrentUser,
} from "../redux/actions/CurrentUserActions";

const useFetchCurrentUser = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(requestCurrentUser());
    if (localStorage.getItem("user-email")) {
      fetch(
        `http://localhost:4000/users/email/${localStorage.getItem(
          "user-email"
        )}`
      )
        .then((res) => res.json())
        .then((json) => {
          dispatch(
            receiveCurrentUser({
              id: json.data._id,
              username: json.data.username,
              email: json.data.email,
              connections: json.data.connections,
              connections_bookmarked: json.data.connections_bookmarked,
            })
          );
        })
        .catch((err) => {
          dispatch(errorCurrentUser());
        });
    }
  }, []);
};

export default useFetchCurrentUser;
