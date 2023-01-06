import "../styles/card.css";
import { Link } from "wouter";
const Card = ({ text, iconClass, fnc }) => {
  return (
    <div class="card" onClick={fnc}>
      {text}
      <i class="fa-solid fa-circle-plus"></i>
    </div>
  );
};

export default Card;
