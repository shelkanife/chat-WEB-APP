import { useEffect, useRef } from "react";
import "../styles/modal.css";

const Modal = ({ fnc, onSubmit, title, btnText, children }) => {
  const ref = useRef();
  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) fnc();
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () =>
      document.removeEventListener("click", handleClickOutside, true);
  }, []);
  return (
    <div className="modal show" id="modal">
      <div class="modal-content" ref={ref}>
        <span class="close" onClick={fnc}>
          &times;
        </span>
        <h3>{title}</h3>
        <form onSubmit={onSubmit} className="new-chat-form">
          {children}
          <div class="form-control">
            <button>{btnText}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
