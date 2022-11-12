import editButton from "../images/editprofile.svg"
import addButton from "../images/Vectorplus.svg"
import { useContext } from "react"
import Card from "./Card.js"
import Header from "./Header";
import {CurrentUserContext} from '../contexts/CurrentUserContext';


const Main = ({onSignOut, mailHandler,  onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete, cards, onHeaderButton}) => {
  const {name, avatar, about} = useContext(CurrentUserContext)

  return (
    <>
    <Header
      buttonText="Выйти"
      onHeaderButton={onHeaderButton}
      linkHandler={onSignOut}
      mailHandler={mailHandler} />
    <main className="content">
      <section className="profile">
        <div className="profile__info">
          <div className="avatar"
          onClick={onEditAvatar}
          style={{ backgroundImage: `url(${avatar})` }}>
            <div className="avatar__cover">
            <img className="avatar__edit-button-img"
            src={editButton}
            alt="редактирование аватара" />
            </div>
          </div>
          <div className="profile__name">
            <h1 className="profile__title">{name}</h1>
            <button className="profile__edit"
            onClick={onEditProfile}
            aria-label="редактировать"
            type="button">
              <img className="profile__edit-button-img"
              src={editButton}
              alt="редактирование профиля" />
            </button>
            <p className="profile__subtitle">{about}</p>
          </div>
        </div>
        <button
        onClick={onAddPlace}
        type="button"
        className="profile__add-button"
        aria-label="добавить">
          <img
          className="profile__add-button-img"
          src={addButton}
          alt="добавление контента" />
        </button>
      </section>
  
      <section className="elements">
        {cards.map((card) => (
          <Card
          card={card}
          onCardClick={onCardClick}
          key={card._id}
          onCardLike={onCardLike}
          onCardDelete={onCardDelete} />
        ))}
      </section>
    </main>
    </>
    )
}

export default Main