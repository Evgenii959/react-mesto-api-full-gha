import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import Login from "./Login.js";
import Register from "./Register.js";
import PopupWithForm from "./PopupWithForm.js";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup.js";
import InfoTooltip from "./InfoTooltip.js";
import { register, login, loginWithToken } from "../utils/apiAuth";
import { ProtectedRoute } from "./ProtectedRoute.js";
import { api } from "../utils/Api.js";
import { UserContext } from "../contexts/CurrentUserContext";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [status, setStatus] = useState(false);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [openToolTip, setOpenToolTip] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  function handleUserLeave() {
    /*     localStorage.removeItem("jwt"); */
    setUserEmail("");
  }

  const handleTokenCheck = () => {
    loginWithToken()
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
          setUserEmail(res.email);
          navigate("/", { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    handleTokenCheck();
  }, []);

  const handleRegister =
    ({ password, email }) =>
    (event) => {
      event.preventDefault();
      register(password, email)
        .then((res) => {
          if (res !== false) {
            navigate("/sign-in", { replace: true });
            setStatus(true);
            setMessage("Вы успешно зарегистрировались!");
          }
        })
        .catch((err) => {
          console.log(err);
          setStatus(false);
          setMessage("Неудачно");
        })
        .finally(() => {
          setOpenToolTip(true);
        });
    };

  const handleLogin =
    ({ password, email }) =>
    (event) => {
      event.preventDefault();
      login(password, email)
        .then((res) => {
          if (res !== false) {
            setUserEmail(email);
            navigate("/", { replace: true });
            setIsLoggedIn(true);
          }
        })
        .catch((err) => {
          console.log(err);
          setIsLoggedIn(false);
          setOpenToolTip(true);
        });
    };

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then((res) => {
        const newCardsArray = cards.filter((c) =>
          c._id === card._id ? "" : res
        );
        setCards(newCardsArray);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (isLoggedIn) {
      api
        .getInitialCards()
        .then((res) => {
          setCards(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      api
        .getUser()
        .then((res) => setCurrentUser(res))
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLoggedIn]);

  function handleEditAvatar() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddCard() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditProfile() {
    setIsEditProfilePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setImagePopupOpen(false);
    setOpenToolTip(false);
  }

  function handleUpdateUser(user) {
    api
      .editUser(user)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(avatar) {
    api
      .editAvatar(avatar.url)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(card) {
    api
      .addCard(card)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <UserContext.Provider value={currentUser}>
      <Header
        status={status}
        userEmail={userEmail}
        handleUserLeave={handleUserLeave}
      />
      <Routes>
        <Route path="/sign-in" element={<Login handleLogin={handleLogin} />} />
        <Route
          path="/sign-up"
          element={<Register handleRegister={handleRegister} />}
        />
        <Route
          path="/"
          element={
            <ProtectedRoute
              element={Main}
              isLoggedIn={isLoggedIn}
              onEditProfile={handleEditProfile}
              onAddPlace={handleAddCard}
              onEditAvatar={handleEditAvatar}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              cards={cards}
              onCardDelete={handleCardDelete}
            />
          }
        />
        <Route path="*" element={<h2>Not found</h2>} />
      </Routes>
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        name="profile-popup"
        title="Редактировать профиль"
        form="profile-form"
        buttonText="Сохранить"
        onUpdateUser={handleUpdateUser}
      />
      <AddPlacePopup
        name="element-popup"
        title="Редактировать профиль"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        form="element-form"
        buttonText="Сохранить"
        button="element-submit"
        onAddPlace={handleAddPlaceSubmit}
      />
      <PopupWithForm
        name="confirm-popup"
        title="Вы уверены?"
        onClose={closeAllPopups}
        form="confirm-form"
        buttonText="Да"
      />
      <EditAvatarPopup
        name="update-popup"
        title="Обновить аватар"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        buttonText="Сохранить"
        button="avatar-submit"
        onUpdateUserAvatar={handleUpdateAvatar}
      />
      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
        isOpen={isImagePopupOpen}
      />
      <InfoTooltip
        status={status}
        message={message}
        isOpen={openToolTip}
        onClose={closeAllPopups}
      />
      <Footer />
    </UserContext.Provider>
  );
}

export default App;
