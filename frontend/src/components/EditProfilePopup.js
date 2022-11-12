import PopupWithForm from "./PopupWithForm"
import {useContext, useEffect, useState} from "react"
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function EditProfilePopup ({isOpen, onClose, closePopupByClickOutside, onUpdateUser, waiting}) {
  const [name, setName] = useState('')
  const [about, setAbout] = useState('')
  const currentUser = useContext(CurrentUserContext)

  useEffect(() => {   
    if (isOpen && currentUser && currentUser.name && currentUser.about){
      setName(currentUser.name);
      setAbout(currentUser.about);
    }
  }, [currentUser, isOpen]);

  function handleNameChange(e) {
    setName(e.target.value)
  }
  function handleAboutChange(e) {
    setAbout(e.target.value)
  }
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about,
    })
  }


  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      closePopupByClickOutside={closePopupByClickOutside}
      handleSubmit={handleSubmit}
      buttonText={waiting || 'Сохранить'}
      >
        <label className="popup__field">
          <input className="popup__input popup__input_type_name"
          required
          placeholder="Введите имя"
          type="text"
          name="profile-title"
          minLength="2"
          maxLength="40"
          onChange={handleNameChange}
          value={name || ''}
          />
          <span className="popup__error" id="profile-title-error" />
        </label>
        <label className="popup__field">
          <input
          className="popup__input popup__input_type_job"
          required
          placeholder="Введите профессию"
          type="text"
          name="profile-subtitle"
          minLength="2"
          maxLength="200"
          onChange={handleAboutChange}
          value={about || ''}
          />
          <span className="popup__error" id="profile-subtitle-error" />
        </label>
    </PopupWithForm>
  )
}

export default EditProfilePopup
