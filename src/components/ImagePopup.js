import React from "react";

export default function ImagePopup (props) {
    return (
        <div className={`image-preview ${props.card && 'popup__opened'}`}>
            <div className="image-preview__container">
                <button className="popup__close-button"
                        type="button"
                        onClick={props.onClose}></button>
                <img src={props.card ? props.card.link : ''} className="image-preview__item" alt={props.card ? props.card.name : ''} />
                <h2 className="image-preview__title">{props.card ? props.card.name : ''}</h2>
            </div>
        </div>
    )
}