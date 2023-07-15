import { useEffect, useState, useContext } from "react";
import { UserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm.js";

function EditProfilePopup(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = useContext(UserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    console.log("test");
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      name={props.name}
      onClose={props.onClose}
      handleSubmit={handleSubmit}
      form={props.form}
      title={props.title}
      button={props.button}
      buttonText={props.buttonText}
    >
      <input
        value={name || ""}
        onChange={handleChangeName}
        className="popup__name profile-name"
        type="text"
        name="name"
        placeholder="Имя"
        minLength="2"
        maxLength="400"
        id="name-input"
        title="Вы пропустили это поле."
      />
      <span className="popup__name-error name-input-error"></span>
      <input
        value={description || ""}
        onChange={handleChangeDescription}
        className="popup__name profile-job"
        type="text"
        name="job"
        placeholder="О себе"
        minLength="2"
        maxLength="200"
        id="describe-input"
        title="Вы пропустили это поле."
      />
      <span className="popup__name-error describe-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
