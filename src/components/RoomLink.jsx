const RoomLink = ({ roomName, fnc }) => {
  return (
    <li className="room-item">
      {roomName}
      <button onClick={fnc}>Join</button>
    </li>
  );
};

export default RoomLink;
