import { useEffect, useState } from "react";

const UserList = ({ users }) => {
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

export default UserList;
