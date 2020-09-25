import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup(props) {
    const linkInput = React.useRef();

    function handleSubmit(event) {
        event.preventDefault();
        props.onUpdateAvatar({
            avatar: linkInput.current.value
        });
    }

    return (
        <PopupWithForm title="Обновить аватар"
                       name="avatar"
                       button="Сохранить"
                       isOpen={props.isOpen}
                       onClose={props.onClose}
                       onSubmit={handleSubmit}>
                <div className="form__field">
                    <input
                        ref={linkInput}
                        className="popup__profile popup__profile_label form__input"
                        name="link"
                        placeholder="Ссылка на аватар"
                        type="url"
                        required
                    />
                    <span className="form__input-error"></span>
                </div>
        </PopupWithForm>
    )
}