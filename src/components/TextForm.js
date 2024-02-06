import React, { useState } from "react";
import "./TextForm.css";

export default function TextForm(props) {
  const handleUpClick = () => {
    let newText = text.toUpperCase();
    setText(newText);
    props.showAlert("Converted to Uppercase!", "success");
  };

  const handleDownClick = () => {
    let newText = text.toLowerCase();
    setText(newText);
    props.showAlert("Converted to Lowercase!", "success");
  };

  const handleOnChange = (event) => {
    setText(event.target.value);
  };

  const handleClear = () => {
    let newText = "";
    setText(newText);
    props.showAlert("Text Cleared!", "success");
  };

  const handleCap = () => {
    let newText = text
      .split(" ")
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(" ");
    setText(newText);
    props.showAlert("Capitalized the first letter of each word!", "success");
  };

  const handleFindAndReplace = () => {
    if (!findText) return; // If findText is empty, do nothing
    const regex = new RegExp(findText, "g"); // 'g' for global search
    const newText = text.replace(regex, replaceText);
    setText(newText);
    props.showAlert("Text Replaced!", "success");
  };

  const [text, setText] = useState("");
  const [findText, setFindText] = useState("");
  const [replaceText, setReplaceText] = useState("");
  return (
    <>
      <div
        className="container"
        style={{ color: props.mode === "dark" ? "white" : "#042743" }}
      >
        <h1>{props.heading}</h1>
        <div className="mb-3">
          <textarea
            className="form-control"
            onChange={handleOnChange}
            style={{
              backgroundColor: props.mode === "dark" ? "#13466e" : "white",
              color: props.mode === "dark" ? "white" : "#042743",
            }}
            value={text}
            id="myBox"
            rows="8"
          ></textarea>
        </div>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleUpClick}
        >
          Convert to Uppercase
        </button>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleDownClick}
        >
          Convert to Lowercase
        </button>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleCap}
        >
          Capitalize the first letter
        </button>
        <button
          disabled={text.length === 0}
          className="btn btn-danger mx-1 my-1"
          onClick={handleClear}
        >
          Clear
        </button>
        {/* New input fields for find and replace */}
        <input
          type="text"
          value={findText}
          onChange={(e) => setFindText(e.target.value)}
          placeholder="Find"
          style={{
            backgroundColor: props.mode === "dark" ? "#13466e" : "white",
            color: props.mode === "dark" ? "white" : "#042743",
          }}
          className={`form-control my-2 ${
            props.mode === "dark" ? "input-dark" : "input-light"
          }`}
        />
        <input
          type="text"
          value={props.replaceText}
          onChange={(e) => setReplaceText(e.target.value)}
          placeholder="Replace with"
          style={{
            backgroundColor: props.mode === "dark" ? "#13466e" : "white",
            color: props.mode === "dark" ? "white" : "#042743",
          }}
          className={`form-control my-2 ${
            props.mode === "dark" ? "input-dark" : "input-light"
          }`}
        />

        <button
          disabled={text.length === 0}
          className="btn btn-primary"
          onClick={handleFindAndReplace}
        >
          Find and Replace
        </button>
      </div>
      <div
        className="container my-3"
        style={{ color: props.mode === "dark" ? "white" : "#042743" }}
      >
        <h2>Your Text Summary</h2>
        <p>
          {
            text.split(" ").filter((element) => {
              return element.length !== 0;
            }).length
          }{" "}
          words and {text.length} characters
        </p>
        <p>
          {0.008 *
            text.split(" ").filter((element) => {
              return element.length !== 0;
            }).length}{" "}
          minutes read
        </p>
        <h2>Preview</h2>
        <p>
          {text.length > 0
            ? text
            : "Enter something in the textbox above to preview it here"}
        </p>
      </div>
    </>
  );
}
