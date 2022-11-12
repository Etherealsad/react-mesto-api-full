import PopupWithForm from "./PopupWithForm"
import {useEffect, useRef} from "react"

function EditAvatarPopup ({isOpen, onClose, closePopupByClickOutside, onUpdateAvatar, waiting}) {
  
  const avatarRef = useRef(null)
 
  useEffect(() => {
    if (avatarRef && avatarRef.current && isOpen) {
      avatarRef.current.value = '';
    }
  }, [avatarRef, isOpen])

  function handleSubmit(e) {
    e.preventDefault()
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    })
  }
  
  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      closePopupByClickOutside={closePopupByClickOutside}
      handleSubmit={handleSubmit}
      buttonText={waiting || 'Сохранить'}
      >
        <label className="popup__field">
          <input
            className="popup__input popup__input_type_link"
            required
            placeholder="Ссылка на изорбажение"
            type="url"
            defaultValue=""
            name="avatar-url"
            minLength="2"
            maxLength="200"
            ref={avatarRef}
          />
          <span className="popup__error" id="avatar-url-error" />
        </label>
    </PopupWithForm>
  )
}

export default EditAvatarPopup
