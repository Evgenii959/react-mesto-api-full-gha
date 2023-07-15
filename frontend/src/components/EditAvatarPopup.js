import { useRef } from "react";
import PopupWithForm from "./PopupWithForm.js";

function EditAvatarPopup(props) {
  const userAvatar = useRef();

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUserAvatar({
      url: userAvatar.current.value,
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
        className="popup__name avatar-country"
        required
        type="url"
        name="avatar"
        placeholder="ссылка на аватар"
        minLength="2"
        maxLength="200"
        id="avatar-input"
        ref={userAvatar}
      />
      <span className="popup__name-error avatar-input-error"></span>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
