import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch } from "react-redux";
import { getContentPostConnection } from "../../redux/actions/PostConnectionActions";

const TextEditor = () => {
  const [state, setState] = useState("");
  const dispatch = useDispatch();

  const handleChange = (data) => {
    setState(data);
    dispatch(getContentPostConnection(data));
  };

  return (
    <ReactQuill
      theme="snow"
      value={state}
      onChange={handleChange}
      style={{
        minHeight: " 400px",
        height: "80vh",
        width: "80vw",
        marginBottom: "100px",
      }}
    />
  );
};

export default TextEditor;
