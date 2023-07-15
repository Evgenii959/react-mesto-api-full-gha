import { useContext } from "react";
import { UserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = useContext(UserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.element.owner === currentUser._id;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.element.likes.some((i) => i === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `element__heart ${
    isLiked && "element__heart_aktiv"
  }`;

  function handleLikeClick() {
    props.onCardLike(props.element);
  }

  function handleClick() {
    props.onImagePopup(props.element);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.element);
  }

  return (
    <>
      <article className="element">
        <img
          className="element__image"
          alt={props.element.name}
          src={props.element.link}
          onClick={handleClick}
        />
        {isOwn && (
          <button
            className="element__trash"
            onClick={handleDeleteClick}
          ></button>
        )}
        <div className="element__title-heart">
          <h2 className="element__title">{props.element.name}</h2>
          <div>
            <button
              type="button"
              className={cardLikeButtonClassName}
              onClick={handleLikeClick}
            ></button>
            <div className="element__heart_count">
              {props.element.likes.length}
            </div>
          </div>
        </div>
      </article>
    </>
  );
}

export default Card;
