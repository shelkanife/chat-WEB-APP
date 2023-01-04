import { Link, Route, Router } from "wouter";
import Chat from "./pages/Chat";
import Index from "./pages/Index";
import "./App.css";
import io from "socket.io-client";
import RoomList from "./pages/RoomList";
import { useEffect } from "react";

const socket = io(import.meta.env.VITE_API_URL);

function App() {
  useEffect(() => {
    console.log(import.meta.env.VITE_API_URL);
    console.log(import.meta.env.MODE);
  }, []);
  return (
    <>
      <Route path="/chat" component={Index} />
      <Router base="/rooms" key="rooms">
        <Route path="/" component={RoomList}></Route>
        <Route path="/:roomName">
          <Chat socket={socket} />
        </Route>
      </Router>
    </>
  );
}

export default App;
