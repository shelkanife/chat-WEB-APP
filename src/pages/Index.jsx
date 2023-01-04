import { useState } from "react";
import Card from "../components/Card";
import Modal from "../components/Modal";
import { requestTo } from "../services/rooms";
import { useLocation } from "wouter";
import { Link } from "wouter";

const Index = ({ socket }) => {
  const [show, setShow] = useState(false);
  const [nickname, setNickname] = useState("");
  const [roomName, setRoomName] = useState("");
  const [location, navigate] = useLocation();

  const createRoom = async (e) => {
    e.preventDefault();
    if (nickname && roomName) {
      const response = await requestTo("create", "POST", {
        nickname,
        roomName,
      });
      const jsonResponse = await response.json();
      if (response.status === 201)
        navigate(`rooms/${roomName}?nickname=${nickname}`);
      else showError(jsonResponse.msg);
    } else showError("All fields are required");
  };

  const showError = (msg) => {
    alert(msg);
  };

  return (
    <main>
      <header>
        <h1>Chat rooms</h1>
      </header>
      <section className="cards-wrapper">
        <Card text="Create a new romm" fnc={() => setShow(true)} />
        <Card text="Join to a room" fnc={() => navigate("/rooms")} />
      </section>
      <Modal
        show={show}
        fnc={() => setShow(false)}
        socket={socket}
        onSubmit={createRoom}
        title="Create new room"
        btnText="Create"
      >
        <div class="form-control">
          <label>Nickname</label>
          <input
            type="text"
            name="nickname"
            id="nickname"
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>
        <div class="form-control">
          <label>Room name</label>
          <input
            type="text"
            name="roomName"
            id="roomname"
            onChange={(e) => setRoomName(e.target.value)}
          />
        </div>
      </Modal>
    </main>
  );
};

export default Index;
