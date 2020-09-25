import React from "react";

export default function PopupWithForm (props) {
    return (
        <div className={`popup popup_type_${props.name} ${props.isOpen && 'popup__opened'}`}>
            <form className="popup__container form" name={props.name} onSubmit={props.onSubmit} noValidate>
                <button className="popup__close-button"
                        type="button"
                        onClick={props.onClose}></button>
                <h2 className="popup__title">{props.title}</h2>
                {props.children}
                <button className="popup__save-button form__submit">{props.button}</button>
            </form>
        </div>
    )
}