import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useContext } from "react";


const Card = ({ card, onCardClick, onCardLike, onCardDelete }) => {
    const currentUserId = useContext(CurrentUserContext)._id
    const handleClick = () => {
        onCardClick(card)
    }

    const handleLikeClick = () => {
        onCardLike(card)
    }

    const handleDeleteClick = () => {
        onCardDelete(card)
    }

    // Определяем, являемся ли мы владельцем текущей карточки и лайка
    const isOwn = card.owner._id === currentUserId
    const isLiked = card.likes.some(i => i._id === currentUserId)

    // Создаём переменную, которую после зададим в `className` для кнопки удаления
    const cardDeleteButtonClassName = (
        `element__trash-button ${isOwn ? '' : 'element__trash-button_type_none'}`
    );

    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = (
        `element__like ${isLiked ? 'element__like-active' : ''}`
    );

    return (
        <article className="element">
            <img className="element__img"
                onClick={handleClick}
                src={card.link}
                alt={card.name}
            />
            <div className="element__info">
                <h2 className="element__title">{card.name}</h2>
                <div className="element__like-block">
                    <button className={cardLikeButtonClassName}
                        aria-label="лайк"
                        type="button"
                        onClick={handleLikeClick} />
                    <p className="element__like-counter">{card.likes.length}</p>
                </div>
            </div>
            <button
                type="button"
                onClick={handleDeleteClick}
                className={cardDeleteButtonClassName}
                aria-label="удалить" />
        </article>
    )
}

export default Card