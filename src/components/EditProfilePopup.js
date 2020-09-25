import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup(props) {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const currentUser = React.useContext(CurrentUserContext);

    function handleNameChange(event) {
        setName(event.target.value);
    }

    function handleDescriptionChange(event) {
        setDescription(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        props.onUpdateUser({
            name,
            about: description
        });
    }

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);

    return (
        <PopupWithForm title="Редактировать профиль"
                       name="profile"
                       button="Сохранить"
                       isOpen={props.isOpen}
                       onClose={props.onClose}
                       onSubmit={handleSubmit}>
                <div className="form__field">
                    <input
                        onChange={handleNameChange}
                        className="popup__profile popup__profile_name form__input"
                        name="name"
                        minLength="2"
                        maxLength="40"
                        placeholder="Имя"
                        value={name}
                        required
                    />
                    <span className="form__input-error"></span>
                </div>
                <div className="form__field">
                    <input
                        onChange={handleDescriptionChange}
                        className="popup__profile popup__profile_label form__input"
                        minLength="2"
                        maxLength="200"
                        name="about"
                        placeholder="Занятие"
                        value={description}
                        required
                    />
                    <span className="form__input-error"></span>
                </div>
        </PopupWithForm>
    )
}