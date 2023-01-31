import { useState, lazy, Suspense } from "react";
import { requestTo } from "../services/rooms";
import { useLocation } from "wouter";
import Card from "../components/Card";
import "../styles/index.css";

const Modal = lazy(() => import("../components/Modal"));

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
    <>
      <header className="index-header">
        <h1>Chat rooms</h1>
      </header>
      <main className="index-main">
        <section id="cards-wrapper">
          <Card
            text="Create a new room"
            fnc={() => setShow(true)}
            iconClass="fa-solid fa-circle-plus"
          />
          <Card
            text="Join to a room"
            fnc={() => navigate("/rooms")}
            iconClass="fa-solid fa-right-to-bracket"
          />
        </section>
        <Suspense fallback={<div>Loading ...</div>}>
          {show && (
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
          )}
        </Suspense>
      </main>
    </>
  );
};

export default Index;
