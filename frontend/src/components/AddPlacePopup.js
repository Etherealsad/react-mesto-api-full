import PopupWithForm from "./PopupWithForm"
import {useState} from "react"


function AddPlacePopup ({isOpen, onClose, closePopupByClickOutside, onAddPlace, waiting}) {
  const [name, setName] = useState('')
  const [link, setLink] = useState('')

  function handleNameChange(e) {
    setName(e.target.value)
  }
  function handleLinkChange(e) {
    setLink(e.target.value)
  }
  function handleSubmit(e) {
    e.preventDefault()
    onAddPlace({
      name,
      link,
    })
    setName('')
    setLink('')
  }

  return (
    <PopupWithForm
    name="add-picture"
    title="Новое место"
    isOpen={isOpen}
    onClose={onClose}
    closePopupByClickOutside={closePopupByClickOutside}
    buttonText={waiting || 'Добавить'}
    handleSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input className="popup__input popup__input_type_pic"
        required
        placeholder="Название"
        type="text"
        name="picture-title"
        minLength="2"
        maxLength="30"
        onChange={handleNameChange}
        value={name}
        />
        <span className="popup__error" id="picture-title-error" />
      </label>
      <label className="popup__form-field">
        <input
        className="popup__input popup__input_type_link"
        required
        placeholder="Ссылка на изорбажение"
        type="url"
        name="picture-url"
        minLength="2"
        maxLength="200"
        onChange={handleLinkChange}
        value={link}
        />
        <span className="popup__error avatar-input-error" id="picture-url-error" />
      </label>
    </PopupWithForm>
  )
}

export default AddPlacePopup
