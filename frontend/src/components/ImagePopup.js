import closeButton from "../images/CloseIconclosepopup.svg"

const ImagePopup = ({card, onClose, closePopupByClickOutside}) => {
  return (
  <div className={`popup popup_view-picture ${card.isOpened ? "popup_open" : ""}`}
  onMouseUp={closePopupByClickOutside}>
    <figure className="popup__view-window">
      <button type="button"
      className="popup__close-button"
      aria-label="закрыть"
      onClick={onClose}
      >
        <img className="popup__close-button-img" src={closeButton} alt="закрыть" />
      </button>
      <img className="popup__huge-picture" src={card.link} alt={card.name} />
      <figcaption className="popup__figcaption">{card.name}</figcaption>
    </figure>
  </div>
  )
}

export default ImagePopup