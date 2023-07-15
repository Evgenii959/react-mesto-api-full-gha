import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  useEffect(() => {
    setName('');
    setLink('');
  }, [props.isOpen])

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onAddPlace({
      name,
      link,
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
        className="popup__name element-country"
        type="text"
        name="name"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        id="title-input"
        title="Вы пропустили это поле."
        onChange={handleChangeName}
        value={name}
      />
      <span className="popup__name-error title-input-error"></span>
      <input
        className="popup__name element-src"
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        id="src-input"
        onChange={handleChangeLink}
        value={link}
      />
      <span
        className="popup__name-error src-input-error"
        title="Введите адрес сайта."
      ></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
