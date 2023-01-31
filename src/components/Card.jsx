import "../styles/card.css";

const Card = ({ text, iconClass, fnc }) => {
  return (
    <div class="card" onClick={fnc}>
      {text}
      <i class={`${iconClass} index-icon`}></i>
    </div>
  );
};

export default Card;
