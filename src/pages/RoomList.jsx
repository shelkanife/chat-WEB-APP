import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import Modal from "../components/Modal";
import RoomLink from "../components/RoomLink";
import { requestTo } from "../services/rooms";
import "../styles/roomList.css";

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [show, setShow] = useState(false);
  const [nickname, setNickname] = useState("");
  const [roomName, setRoomName] = useState("");
  const [location, navigate] = useLocation();
  useEffect(() => {
    async function getRooms() {
      const currentRooms = await requestTo("", "GET");
      const rooms = await currentRooms.json();
      setRooms([...rooms.roomNames]);
    }
    getRooms();
  }, []);
  const showError = (msg) => {
    alert(msg);
  };
  const joinToRoom = async (e) => {
    e.preventDefault();
    const response = await requestTo("join", "POST", { nickname, roomName });
    if (response.status === 200) navigate(`/${roomName}?nickname=${nickname}`);
    else {
      showError((await response.json()).msg);
      window.location.reload();
    }
  };
  return (
    <>
      <header className="index-header">
        <h1>Room list</h1>
      </header>
      <main className="index-main room-list-wrapper">
        <ul className={rooms.length ? "room-list" : "room-list-no-room"}>
          {!rooms.length ? (
            <>
              <p style={{ textAlign: "center" }}>
                There is not any rooom right now :(.
              </p>
              <p style={{ textAlign: "center" }}>
                But, you can create one{" "}
                <a
                  href="/chat"
                  style={{
                    color: "#fff",
                    fontWeight: "bolder",
                    letterSpacing: ".2rem",
                  }}
                >
                  here
                </a>
              </p>
            </>
          ) : (
            rooms.map((room) => (
              <RoomLink
                key={room}
                roomName={room}
                fnc={() => {
                  setShow(true);
                  setRoomName(room);
                }}
              />
            ))
          )}
        </ul>
        {show && (
          <Modal
            onSubmit={joinToRoom}
            title="Join to room"
            btnText="Join"
            fnc={() => setShow(false)}
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
          </Modal>
        )}
      </main>
    </>
  );
};

export default RoomList;
