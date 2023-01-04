import { useState, useRef, useEffect } from "react";

const Messages = ({ messages }) => {
  const eleRef = useRef(null);
  useEffect(() => {
    eleRef.current.scrollTop = eleRef.current.scrollHeight;
  }, [messages]);
  return (
    <section id="chat" className="theme-clearer-green">
      <ul id="messages" ref={eleRef}>
        {messages.map((message) => (
          <li className={message.mine ? "out" : "in"}>
            <p className={message.mine ? "out" : "in"}>
              {message.msg}
              <span className={message.mine ? "out" : "in"}></span>
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Messages;
