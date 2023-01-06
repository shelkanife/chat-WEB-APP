import { useState } from "react";
import "../styles/modal.css";
import { requestTo } from "../services/rooms";

const Modal = ({ show, fnc, onSubmit, socket, title, btnText, children }) => {
  return (
    <div className={`modal ${show ? "show" : null}`} id="modal">
      <div class="modal-content">
        <span class="close" onClick={fnc}>
          &times;
        </span>
        <h4>{title}</h4>
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
