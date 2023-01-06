import { useEffect, useState } from "react";

const SideBar = ({ socket }) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    socket.on("room.listUsers", (users) => {
      setUsers([...users]);
    });
  }, [socket, users]);

  return (
    <aside>
      <h6>On this chat</h6>
      <ul id="participants">
        {users.map((user) => (
          <li key={user}>{user}</li>
        ))}
      </ul>
    </aside>
  );
};

export default SideBar;
