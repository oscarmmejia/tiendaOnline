import "./UserCard.css";

const UserCard = ({ avatar, name, id }) => {
  return (
    <div className="userCard">
      <div className="userCardAvatarWrapper">
        <img src={avatar} alt={name} className="userCardAvatar" />
      </div>
      <h3 className="userCardName">{name}</h3>
    </div>
  );
};

export default UserCard;