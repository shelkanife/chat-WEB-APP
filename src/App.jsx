import { Link, Redirect, Route, Router } from "wouter";
import Chat from "./pages/Chat";
import Index from "./pages/Index";
import "./App.css";
import io from "socket.io-client";
import RoomList from "./pages/RoomList";

const socket = io("https://bem-chat.azurewebsites.net");

function App() {
  return (
    <>
      <Route path="/">
        <Redirect to="/chat"></Redirect>
      </Route>
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
