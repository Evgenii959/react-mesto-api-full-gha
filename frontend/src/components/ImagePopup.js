function ImagePopup(props) {
  return (
    <>
      <div
        className={`popup ${props.isOpen ? "popup_opened" : ""}`}
      >
        <div className="popup__box">
          <img
            className="popup__image"
            alt={props.card.name}
            src={props.card.link}
          />
          <button
            type="button"
            className="popup__close"
            onClick={props.onClose}
          ></button>
          <p className="popup__subtitle">{props.card.name}</p>
        </div>
      </div>
    </>
  );
}

export default ImagePopup;
