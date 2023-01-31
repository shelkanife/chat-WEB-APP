import { useEffect, useState, useRef } from "react";
import "../styles/sidebar.css";

const SideBar = ({ socket, showUsers, fnc, show }) => {
  const [users, setUsers] = useState([]);
  const ref = useRef();

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) show(false);
  };

  useEffect(() => {
    socket.on("room.listUsers", (users) => {
      setUsers([...users]);
    });
  }, [socket, users]);
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);
  return (
    <aside className={showUsers ? "show" : null} ref={ref}>
      <h4 id="sidebar-title">On this chat</h4>
      <ul id="sidebar">
        {users.map((user) => (
          <li key={user}>{user}</li>
        ))}
      </ul>
      <button id="aside-btn" onClick={fnc}>
        Leave
      </button>
    </aside>
  );
};

export default SideBar;
