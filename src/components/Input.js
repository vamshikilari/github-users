import React from "react";
import Loader from "./Loader";

function Input({ inputValue, handleInput, fetching }) {
  return (
    <>
      <div style={{ width: "25rem" }} className="d-flex col w-100">
        <label htmlFor="autocomplete-input" className="input-label">
          Search for a user 🚀{" "}
        </label>
        <span className="d-flex">
          <input
            id="autocomplete-input"
            type="text"
            value={inputValue}
            onChange={handleInput}
            aria-labelledby="autocomplete-input"
          />
          {fetching && <Loader />}
        </span>
      </div>
    </>
  );
}

export default Input;
