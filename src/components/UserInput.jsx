import { useState } from "react";

const UserInput = ({ fnc }) => {
  const handleChange = (e) => setMessage(e.target.value);
  const [message, setMessage] = useState("");
  return (
    <form
      id="form"
      onSubmit={(e) => {
        fnc(e, message);
        setMessage("");
      }}
    >
      <input
        autoFocus
        type="text"
        placeholder="Write here your message"
        autoComplete="off"
        onChange={handleChange}
        value={message}
        className="white-txt theme-clearer-green"
      />
      <button
        id="button"
        className={`btn-send ${message !== "" ? "enable" : null}`}
      >
        <i className="fa fa-regular fa-paper-plane"></i>
      </button>
    </form>
  );
};

export default UserInput;
