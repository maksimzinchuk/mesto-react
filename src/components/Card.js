import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card (props) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = props.card.owner._id === currentUser._id;
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);

    function handleClick() {
        props.onPreviewOpen(props.card);
    }
    return (
        <div className="elements__item"
              >
            <img src={props.card.link} className="elements__image" alt={props.card.name}
                 onClick={handleClick}
            />
            <div className={`elements__trash ${isOwn ? 'elements__trash_visible' : ''}`} onClick={() => props.onCardDelete(props.card)}></div>
            <div className="elements__title-container">
                <h2 className="elements__title">{props.card.name}</h2>
                <div className="elements__like-wrapper">
                    <button className={`elements__like ${isLiked ? 'elements__like_active' : 'elements__like'}`} type="button" onClick={() => props.onCardLike(props.card)}></button>
                    <p className="elements__like-number">{props.card.likes.length}</p>
                </div>
            </div>
        </div>
    )
}