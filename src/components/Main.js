import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Main (props) {
    const currentUser = React.useContext(CurrentUserContext);
    return (
        <main className="content">
            <section className="profile">
                <div className="profile__wrapper" onClick={props.onEditAvatar}>
                    <div className="profile__avatar profile__reset"
                         style={{ backgroundImage: `url(${currentUser.avatar})` }}/>
                </div>

                <div className="profile__info">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <button
                        className="profile__edit-button profile__reset"
                        type="button"
                        onClick={props.onEditProfile}
                    ></button>
                    <p className="profile__label">{currentUser.about}</p>
                </div>

                <button
                    className="profile__add-button profile__reset"
                    type="button"
                    onClick={props.onAddPlace}
                ></button>
            </section>

            <section className="elements">
                { props.cards.map((card) => (
                   <Card
                       onPreviewOpen={props.onPreviewOpen}
                       onCardLike={props.onCardLike}
                       onCardDelete={props.onCardDelete}
                       card={card}
                       key={card._id}
                    />
                ))}
            </section>
        </main>
    )
}