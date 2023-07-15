import { useContext } from "react";
import Card from "./Card.js";
import { UserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = useContext(UserContext);

  return (
    <>
      <main>
        <section className="profile">
          <div className="profile__avatar-overlay" onClick={props.onEditAvatar}>
            <img className="profile__image" src={currentUser.avatar} />
          </div>
          <div className="profile__block">
            <div className="profile__info">
              <h2 className="profile__title">{currentUser.name}</h2>
              <p className="profile__subtitle">{currentUser.about}</p>
            </div>
            <button
              className="profile__icon"
              type="button"
              onClick={props.onEditProfile}
            ></button>
          </div>
          <button
            className="profile__plus"
            type="button"
            onClick={props.onAddPlace}
          ></button>
        </section>
        <section className="elements">
          <article className="list">
            {props.cards.map((elem) => (
              <Card
                element={elem}
                onImagePopup={props.onCardClick}
                key={elem._id}
                onCardLike={props.onCardLike}
                onCardDelete={props.onCardDelete}
              />
            ))}
          </article>
        </section>
      </main>
    </>
  );
}

export default Main;
