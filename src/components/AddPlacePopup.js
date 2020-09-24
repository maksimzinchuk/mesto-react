import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup(props) {
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    function handleName(event) {
        setName(event.target.value);
    }

    function handleLink(event) {
        setLink(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        props.onAddCard({
            name,
            link
        });
    }

    return (
        <PopupWithForm title="Новое место"
                       name="add"
                       button="Создать"
                       isOpen={props.isOpen}
                       onClose={props.onClose}
                       onSubmit={handleSubmit}>
            <>
                <div className="form__field">
                    <input
                        onChange={handleName}
                        className="popup__profile popup__profile_name form__input"
                        name="name"
                        placeholder="Название"
                        minLength="1"
                        maxLength="30"
                        required
                    />
                    <span className="form__input-error"></span>
                </div>
                <div className="form__field">
                    <input
                        onChange={handleLink}
                        className="popup__profile popup__profile_label form__input"
                        name="link"
                        placeholder="Ссылка на картинку"
                        type="url"
                        required
                    />
                    <span className="form__input-error"></span>
                </div>
            </>
        </PopupWithForm>
    );
}