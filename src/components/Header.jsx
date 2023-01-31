import "../styles/chat.css";
const Header = ({ roomName, fnc, showUsers }) => {
  return (
    <header id="chat-header">
      <h1 id="id-chat">{roomName}</h1>
      <button id="leave" onClick={fnc}>
        Leave
      </button>
      <button id="show-users" onClick={() => showUsers(true)}>
        <i class="fa-solid fa-user"></i>
      </button>
    </header>
  );
};
export default Header;
