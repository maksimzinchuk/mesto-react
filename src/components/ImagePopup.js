import React from "react";

export default function ImagePopup (props) {
    return (
        <div className={'image-preview ' + (props.card.cardSelected && 'popup__opened')}>
            <div className="image-preview__container">
                <button className="popup__close-button"
                        type="button"
                        onClick={props.onClose}></button>
                <img src={props.card.cardLink} className="image-preview__item" alt={props.card.cardName}/>
                <h2 className="image-preview__title">{props.card.cardName}</h2>
            </div>
        </div>
    )
}