import React from "react";
import Card from "./Card";
import { apiEntity } from '../utils/api';

export default function Main (props) {
    const [userName, setUserName] = React.useState('');
    const [userDescription, setUserDescription] = React.useState('');
    const [userAvatar, setUserAvatar] = React.useState('');
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        Promise.all([apiEntity.getUserData(), apiEntity.getInitialCards()])
            .then(([result, data]) => {
                setUserName(result.name);
                setUserDescription(result.about);
                setUserAvatar(result.avatar);
                setCards(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__wrapper" onClick={props.onEditAvatar}>
                    <div className="profile__avatar profile__reset"
                         style={{ backgroundImage: `url(${userAvatar})` }}/>
                </div>

                <div className="profile__info">
                    <h1 className="profile__name">{userName}</h1>
                    <button
                        className="profile__edit-button profile__reset"
                        type="button"
                        onClick={props.onEditProfile}
                    ></button>
                    <p className="profile__label">{userDescription}</p>
                </div>

                <button
                    className="profile__add-button profile__reset"
                    type="button"
                    onClick={props.onAddPlace}
                ></button>
            </section>

            <section className="elements">
                { cards.map((card) => (
                   <Card
                       onPreviewOpen={props.onPreviewOpen}
                       card={card}
                       key={card._id}
                    />
                ))}
            </section>
        </main>
    )
}