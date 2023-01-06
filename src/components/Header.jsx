import "../styles/chat.css";
const Header = ({ roomName, fnc }) => {
  return (
    <header>
      <h1>
        <span id="id-chat">{roomName}</span>
      </h1>
      <button id="leave" onClick={fnc}>
        Leave
      </button>
    </header>
  );
};
export default Header;
