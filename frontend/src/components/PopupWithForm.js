function PopupWithForm(props) {
  return (
    <div
      className={`popup ${props.name} ${props.isOpen ? "popup_opened" : ""}`}
    >
      <div className="popup__container">
        <button
          type="button"
          className="popup__close"
          onClick={props.onClose}
        ></button>
        <h3 className="popup__title">{props.title}</h3>
        <form
          className={`popup__content ${props.form}`}
          onSubmit={props.handleSubmit}
          name={props.name}
        >
          {props.children}
          <button className={`popup__submit ${props.button}`} type="submit">
            {props.buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
export default PopupWithForm;
