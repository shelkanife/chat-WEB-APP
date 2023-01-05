import { useEffect, useState } from "react";
import Header from "../components/Header";
import Messages from "../components/Messages";
import UserInput from "../components/UserInput";
import { requestTo } from "../services/rooms";
import { useLocation } from "wouter";
import SideBar from "../components/SideBar";

const Chat = ({ socket }) => {
  const [location, navigate] = useLocation();
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    async function existsRoom() {
      const response = await requestTo(location.slice(1), "GET");
      if (response.status === 404) return navigate("/");
      socket.emit("room.join", location.slice(1));
    }
    existsRoom();
  }, [location]);

  useEffect(() => {
    socket.on("message.recive", (msg) =>
      setMessages([...messages, { msg, mine: false }])
    );
  }, [socket, messages]);

  const sendMessage = (e, msg) => {
    e.preventDefault();
    if (!msg) return;
    setMessages([...messages, { msg, mine: true }]);
    socket.emit("message.send", { roomName: location.slice(1), msg });
  };

  const leaveChat = async () => {
    const roomName = location.slice(1);
    const queryStringObj = new URLSearchParams(window.location.search);
    const response = await requestTo(`${roomName}/disconect`, "POST", {
      roomName,
      nickname: Object.fromEntries( queryStringObj).nickname,
    });
    socket.emit("room.list", roomName);
    
    navigate("/");
  };

  return (
    <>
      <main>
        <Header roomName={location.slice(1)} fnc={leaveChat} />
        <Messages messages={messages} />
        <UserInput fnc={sendMessage} />
      </main>
      <SideBar socket={socket} />
    </>
  );
};

export default Chat;
