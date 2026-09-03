import "./UserCreateButton.css";

const UserCreateButton = ({ onClick, disabled = false }) => (
  <button
    type="button"
    className="userCreateButton"
    onClick={onClick}
    disabled={disabled}
  >
    <span className="userCreateButtonIcon" aria-label="true">+</span>
    Añadir usuario
  </button>
);

export default UserCreateButton;
